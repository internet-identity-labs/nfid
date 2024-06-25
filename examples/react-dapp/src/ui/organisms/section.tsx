import { Title } from "../atoms/title"
import { RequestSection } from "../molecules/request-section"
import { ResponseSection } from "../molecules/response-section"
import { Text } from "../atoms/text"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import { isValidJSON } from "../../utils/json"
import { Button } from "../atoms/button"
import { CodeSection } from "../molecules/code-section"
import { useIdentityKit } from "@nfid/identitykit/react"
// import { Actor } from "@dfinity/agent"
import { Principal } from "@dfinity/principal"
import { getRequestObject } from "../../utils/requests"
import { DropdownSelect } from "../molecules/dropdown-select"
import { Buffer } from "buffer"
import { fromBase64 } from "@slide-computer/signer"

import "react-toastify/dist/ReactToastify.css"
import { ICRC49Methods } from "../../../../../packages/identitykit/src/standards/icrc-49"
// import { idlFactory } from "../../idl/service_idl"

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
  const { selectedSigner } = useIdentityKit()

  const handleSubmit = async () => {
    setIsLoading(true)

    if (!isValidJSON(requestValue)) {
      setIsLoading(false)
      return toast.error("Invalid JSON")
    }

    const requestObject = getRequestObject(requestValue)
    let res

    try {
      if (requestObject.method === ICRC49Methods.icrc49_call_canister) {
        // const { sender, canisterId } = requestObject.params
        // const agent = new IdentityKitAgent({
        //   getPrincipal: () => Principal.fromText(sender),
        // })
        // const actor = Actor.createActor(idlFactory, {
        //   agent,
        //   canisterId,
        // })
        // res = {
        //   origin: "http://localhost:3001",
        //   jsonrpc: "2.0",
        //   id: "7812362e-29b8-4099-824c-067e8a50f6f3",
        //   result: {
        //     certificate:
        //       "2dn3o2R0cmVlgwGDAYIEWCC3oS1uAAAde1oxlNgE/XcDqnQpjhh/vLABjS4KnpwcIIMBggRYIBizX0clGIjvIkmpISYqYgSh5aJ0zrTCfRapjhQ1SpmwgwJOcmVxdWVzdF9zdGF0dXODAYMBgwGDAYMBggRYIMgomUBJvxkbMXt/JZ426tA3e0d3JgXeTC9463LqKRFGgwGCBFggniOjM+bq+b6Bor7w3jJY10Jq/pvmtoIcq+vO0G4N082DAYMBggRYIDBRtk6v+0Cwz4EePm3LSUTVZ/qKKlBJGSGY+1ZB3HUOgwGDAYMCWCAUiTmErwtVMXs57mJAlXtRlr64Hu2dy+iZyKoFU3HeLoMBgwJFcmVwbHmCA1JESURMAAFxCkhlbGxvLCBtZSGDAkZzdGF0dXOCA0dyZXBsaWVkggRYIGnylJHx5Yk6VjmQCS/Wthdt6mjSahhXZoNdpwi/595vggRYIKmQ7/gHPmZJ9ixwaao/PhW2hDPVjXlA1ajbrYZaybZ/ggRYIBE0Q/auhbxxBaN1xLCRsatxXs1lJcVOPaVOANzoDmAUggRYIN0lfTgWI0O4LYUIH+DfycRVLjfVlBZ0PvvFnD7yb2RKggRYIDnEi42+zFM6BTEmfsFuvsybbQeKX7dYh7acjoM0HNP8ggRYIAMtCGCQsy73ZvIhCGTKqNqrLqGqBzT6q5Ma8yF81LjQggRYIHkOaAnM2ZmM67V/+4eThczbut4gcG4CPhm6gu/wxdR+gwGCBFggidF72mmJrTBVMgkDuYRN9Xn0eFXlEqFje0tuODyGlWGDAkR0aW1lggNJ2bn33KKQzewXaXNpZ25hdHVyZVgwogyKpnExxVvjWNTB2WquqreYTBb3/PNPSy8MGgnJwQG70QSQg0nxwWr2k624ZHG7amRlbGVnYXRpb26iaXN1Ym5ldF9pZFgdEnkOdmH8zT1PyDE43K/9nxiOhntFrhDIg23QuAJrY2VydGlmaWNhdGVZAn3Z2feiZHRyZWWDAYIEWCBmTFY01ee5sG6rkMZz8Ud+mjJS6xrZRKxZdViM3MQ6LYMBgwGCBFggPsEkF7QXpIzMU5DM6PgxzTOK80BeMZG/FHUHUsEEb+CDAkZzdWJuZXSDAYMBgwGDAYMBggRYINHTj/yu/Em2QX729fObS65GKA9V9PXYvmgb1IAIPoiXgwGCBFggBR6Ws1C24rOQY9nXNf2abxOqZy+xQOOm59iglb9a4LCDAlgdEnkOdmH8zT1PyDE43K/9nxiOhntFrhDIg23QuAKDAYMCT2NhbmlzdGVyX3Jhbmdlc4IDWBvZ2feBgkoAAAAAAVAAAAEBSgAAAAABX///AQGDAkpwdWJsaWNfa2V5ggNYhTCBgjAdBg0rBgEEAYLcfAUDAQIBBgwrBgEEAYLcfAUDAgEDYQCG2I670vFmPmXTo/8H6O6fpCDQi5poIpGfIkuLgC1dm+FQ3Ek/hMI+c6DMHSwu4ocJ/xQAABKPzV3717RX7zrzRHZtf/CST+en9Fbe13ym3jsbQGtxDE6u1yh6uaNSdmmCBFgg0qcJSo6VnkdEm1Vvie8c2T4z1Y1BiDi0BV/6zkV+33CCBFggRIIjTw0G4vvI2dl8/khNiyx/UNmJCxlBiUlM4gckBAeCBFggt44aAAEaGwTDUE0UdFPw7auxawNvYQfMt4MwNFJ7C4OCBFggDrlGvHFCwRJDuuPmF62PXZIfBOiLuKcv4Ht4HZBsyByDAkR0aW1lggNJmeyGxLvXtewXaXNpZ25hdHVyZVgwjHeY2VJlUlwk5+7BMfESxjdiANFBVfkfdf4viBqogw/NGiKfzhLwEphvTBytvPKy",
        //     contentMap:
        //       "2dn3p2NhcmdKRElETAABcQJtZWtjYW5pc3Rlcl9pZEoAAAAAAVBBaAEBbmluZ3Jlc3NfZXhwaXJ5GxfZNLiJQjgAa21ldGhvZF9uYW1lcGdyZWV0X25vX2NvbnNlbnRlbm9uY2VQalJW8/PSIlA2j3q4HG7oomxyZXF1ZXN0X3R5cGVkY2FsbGZzZW5kZXJYHfiYTFV8824++qVOIjiov3Bgl0gU0RPMROITTCMC",
        //     content: await actor[requestObject.params.method]("me"),
        //   },
        // }
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
      }
      setResponseValue(JSON.stringify(res, null, 2))
    } catch (e) {
      if (e instanceof Error) {
        console.error(e)
        toast.error(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

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
