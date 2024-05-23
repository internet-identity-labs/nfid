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
import { useIdentityKit } from "@nfid/identity-kit/react"
import { ICRC25Methods } from "@nfid/identity-kit"
import { getRequestObject } from "../../utils/requests"

export interface IRequestExample {
  title: string
  value: string
}

export interface ISection {
  title: string
  description: JSX.Element
  requestsExamples: IRequestExample[]
  getCodeSnippet: (requestJSON: string) => string
}

export const Section: React.FC<ISection> = ({
  title,
  description,
  requestsExamples,
  getCodeSnippet,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRequestIndex] = useState(0)
  const [requestValue, setRequestValue] = useState(requestsExamples[0].value)
  const [responseValue, setResponseValue] = useState("{}")
  const { request } = useIdentityKit()

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!isValidJSON(requestValue)) {
      setIsLoading(false)
      return toast.error("Invalid JSON")
    }
    const requestObject = getRequestObject(requestValue)
    const res = await request(requestObject.method as ICRC25Methods, requestObject.params)
    setResponseValue(JSON.stringify(res, null, 2))
    setIsLoading(false)
  }

  const codeSection = useMemo(() => {
    if (!isValidJSON(requestValue)) return "Invalid JSON"
    return getCodeSnippet(requestValue)
  }, [getCodeSnippet, requestValue])

  // const requestsOptions = useMemo(() => {
  //   return requestsExamples.map((r) => ({
  //     label: r.title,
  //     value: r.value,
  //   }))
  // }, [requestsExamples])

  return (
    <div>
      <Loader isLoading={isLoading} />
      <Title>{title}</Title>
      <Text className="mb-5">{description}</Text>
      {/* <DropdownSelect
        label="Request examples"
        isMultiselect={false}
        options={requestsOptions}
        selectedValues={[requestsOptions[selectedRequestIndex].value]}
        setSelectedValues={(values) => {
          setSelectedRequestIndex(requestsOptions.findIndex((o) => o.value === values[0]))
          setRequestValue(values[0])
        }}
      /> */}
      <div className="grid grid-cols-2 gap-[30px] my-3">
        <RequestSection value={requestValue} setValue={setRequestValue} />
        <ResponseSection value={responseValue} />
      </div>
      <CodeSection value={codeSection} />
      <div className="flex gap-5">
        <Button
          className="w-[160px] mt-5"
          onClick={handleSubmit}
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
