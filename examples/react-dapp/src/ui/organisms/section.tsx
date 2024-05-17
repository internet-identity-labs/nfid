import { Title } from "../atoms/title"
import { RequestSection } from "../molecules/request-section"
import { ResponseSection } from "../molecules/response-section"
import { Text } from "../atoms/text"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import { isValidJSON } from "../../utils/json"
import "react-toastify/dist/ReactToastify.css"
import { Loader } from "../atoms/loader"
import { Button } from "../atoms/button"
import { CodeSection } from "../molecules/code-section"
import { SubTitle } from "../atoms/subtitle"
import { DropdownSelect } from "../molecules/dropdown-select"
import { useIdentityKit } from "@nfid/identity-kit/react"
import { ICRC25Methods } from "@nfid/identity-kit"

export interface IRequestExample {
  title: string
  value: string
}

export interface ISection {
  index?: number
  title: string
  description: JSX.Element
  requestsExamples: IRequestExample[]
  getCodeSnippet: (requestJSON: string) => string
  onSubmit: (requestJSON: string) => Promise<string>
}

export const Section: React.FC<ISection> = ({
  index,
  title,
  description,
  requestsExamples,
  getCodeSnippet,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(0)
  const [requestValue, setRequestValue] = useState(requestsExamples[0].value)
  const [responseValue, setResponseValue] = useState("{}")

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!isValidJSON(requestValue)) {
      setIsLoading(false)
      return toast.error("Invalid JSON")
    }
    const res = await onSubmit(requestValue)
    setResponseValue(JSON.stringify(JSON.parse(res), null, 2))
    setIsLoading(false)
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

  const { request } = useIdentityKit()

  return (
    <div>
      <Loader isLoading={isLoading} />
      <Title>
        {index ? `${index}. ` : ""}
        {title}
      </Title>
      <Text className="mb-5">{description}</Text>
      <DropdownSelect
        label="Request examples"
        isMultiselect={false}
        options={requestsOptions}
        selectedValues={[requestsOptions[selectedRequestIndex].value]}
        setSelectedValues={(values) => {
          setSelectedRequestIndex(requestsOptions.findIndex((o) => o.value === values[0]))
          setRequestValue(values[0])
        }}
      />
      <div className="grid grid-cols-2 gap-[30px] my-3">
        <RequestSection value={requestValue} setValue={setRequestValue} />
        <ResponseSection value={responseValue} />
      </div>
      <CodeSection value={codeSection} />
      <div className="flex gap-5">
        <Button className="w-[160px] mt-5" onClick={handleSubmit} isSmall>
          Submit
        </Button>
        <Button
          type="stroke"
          className="w-[160px] mt-5"
          onClick={async () => {
            const res = await request(ICRC25Methods.icrc25_granted_permissions, {
              method: ICRC25Methods.icrc25_granted_permissions,
            })

            // setRequestValue(requestsExamples[selectedRequestIndex].value)
            setResponseValue(JSON.stringify(res, null, 2))
          }}
          isSmall
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
