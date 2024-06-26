import { Title } from "../atoms/title"
import { RequestSection } from "../molecules/request-section"
import { ResponseSection } from "../molecules/response-section"
import { Text } from "../atoms/text"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { isValidJSON } from "../../utils/json"
import { Button } from "../atoms/button"
import { CodeSection } from "../molecules/code-section"
import { useIdentityKit } from "@nfid/identitykit/react"
import { Actor } from "@dfinity/agent"
import { Principal } from "@dfinity/principal"
import { getRequestObject } from "../../utils/requests"
import { DropdownSelect } from "../molecules/dropdown-select"
import { Buffer } from "buffer"
import { fromBase64, toBase64 } from "@slide-computer/signer"

import "react-toastify/dist/ReactToastify.css"
import { IdentityKitAgent } from "@nfid/identitykit"
import { idlFactory } from "../../idl/service_idl"

export interface IRequestExample {
  title: string
  value: string
}

export interface ISection {
  id: string
  title: string
  description: JSX.Element
  requestsExamples: IRequestExample[]
  getCodeSnippet: (requestJSON: string) => string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignerMethod: any = {
  icrc25_request_permissions: "requestPermissions",
  icrc25_permissions: "permissions",
  icrc25_supported_standards: "supportedStandards",
  icrc27_accounts: "accounts",
  icrc34_delegation: "delegation",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignerMethodParamsField: any = {
  icrc25_request_permissions: "scopes",
}

export const Section: React.FC<ISection> = ({
  id,
  title,
  description,
  requestsExamples,
  getCodeSnippet,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(0)
  const [requestValue, setRequestValue] = useState(requestsExamples[selectedRequestIndex].value)
  const [responseValue, setResponseValue] = useState("{}")
  const [icrc49SignerResponse, setIcrc49SignerResponse] = useState<{
    certificate: string
    contentMap: string
  } | null>(null)
  const [icrc49ActorResponse, setIcrc49ActorResponse] = useState<string | null>(null)

  const { selectedSigner } = useIdentityKit()

  const handleSubmit = async () => {
    if (!selectedSigner) return
    setIsLoading(true)

    if (!isValidJSON(requestValue)) {
      setIsLoading(false)
      return toast.error("Invalid JSON")
    }

    const requestObject = getRequestObject(requestValue)
    let res

    try {
      if (requestObject.method === "icrc49_call_canister") {
        setIcrc49SignerResponse(null)
        setIcrc49ActorResponse(null)
        const { sender, canisterId } = requestObject.params
        const agent = new IdentityKitAgent({
          signer: {
            ...selectedSigner,
            // custom call canister here just to save certificate and contentMap to local state
            callCanister: async (params) => {
              const response = await selectedSigner.callCanister(params)
              setIcrc49SignerResponse({
                certificate: toBase64(response.certificate),
                contentMap: toBase64(response.contentMap),
              })
              return response
            },
          },
          account: Principal.fromText(sender),
        })
        const actor = Actor.createActor(idlFactory, {
          agent,
          canisterId,
        })
        setIcrc49ActorResponse((await actor[requestObject.params.method]("me")) as string)
      } else {
        // TODO for icrc25_request_permissions should pass params.scopes as arg and for icrc34_delegation change params to Principals
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res = await (selectedSigner as any)?.[SignerMethod[requestObject.method]](
          SignerMethodParamsField[requestObject.method]
            ? requestObject.params[SignerMethodParamsField[requestObject.method]]
            : requestObject.method === "icrc34_delegation"
              ? {
                  ...requestObject.params,
                  targets: requestObject.params.targets.map((t: string) => Principal.fromText(t)),
                  publicKey: fromBase64(requestObject.params.publicKey),
                }
              : requestObject.params
        )
        // TODO only for get accounts response (subaccount is ArrayBuffer)
        if (Array.isArray(res) && res[0].subaccount) {
          res[0].subaccount = Buffer.from(new Uint8Array(res[0].subaccount)).toString("base64")
          res[0].owner = res[0].owner.toString()
        }
        setResponseValue(JSON.stringify(res, null, 2))
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e)
        toast.error(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // when certificates, contentMap and content returned from actor are in local state we can group them in one response
  useEffect(() => {
    if (icrc49SignerResponse !== null && icrc49ActorResponse !== null) {
      const { contentMap, certificate } = icrc49SignerResponse
      setResponseValue(
        JSON.stringify(
          {
            origin: "http://localhost:3001",
            jsonrpc: "2.0",
            id: "7812362e-29b8-4099-824c-067e8a50f6f3",
            result: { contentMap, certificate, content: icrc49ActorResponse },
          },
          null,
          2
        )
      )
    }
  }, [icrc49SignerResponse, icrc49ActorResponse])

  const codeSection = useMemo(() => {
    if (!isValidJSON(requestValue)) return "Invalid JSON"
    return getCodeSnippet(requestValue)
  }, [getCodeSnippet, requestValue])

  const requestsOptions = useMemo(() => {
    return requestsExamples.map((r) => ({
      label: r.title,
      value: r.value,
    }))
  }, [requestsExamples])

  return (
    <div id={id}>
      <Title>{title}</Title>
      <Text className="mb-5">{description}</Text>
      {requestsOptions.length > 1 ? (
        <DropdownSelect
          id="select-request"
          label="Request examples"
          isMultiselect={false}
          options={requestsOptions}
          selectedValues={[requestsOptions[selectedRequestIndex].value]}
          setSelectedValues={(values) => {
            setSelectedRequestIndex(requestsOptions.findIndex((o) => o.value === values[0]))
            setRequestValue(values[0])
          }}
        />
      ) : null}
      <div className="grid grid-cols-2 gap-[30px] my-3">
        <RequestSection value={requestValue} setValue={setRequestValue} />
        <ResponseSection value={responseValue} />
      </div>
      <CodeSection value={codeSection} />
      <div className="flex gap-5">
        <Button
          id="submit"
          loading={isLoading}
          className="w-[160px] mt-5"
          onClick={handleSubmit}
          disabled={!selectedSigner}
          isSmall
        >
          Submit
        </Button>
        <Button
          type="stroke"
          className="w-[160px] mt-5"
          onClick={() => {
            setRequestValue(requestsExamples[selectedRequestIndex].value)
            setResponseValue("{}")
          }}
          isSmall
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
