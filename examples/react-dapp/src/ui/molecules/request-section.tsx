import CodeMirror from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { Copy } from "../atoms/copy"

export interface RequestSectionProps {
  value: string
  setValue: (value: string) => void
}

export const RequestSection: React.FC<RequestSectionProps> = ({ value, setValue }) => {
  return (
    <div>
      <p>
        Request <span className="text-sm opacity-50">(editable)</span>
      </p>
      <div className="relative w-full overflow-hidden !font-mono rounded-xl">
        <div className="absolute z-50 scale-125 w-[24px] right-3 top-3">
          <Copy value={value} />
        </div>
        <CodeMirror
          height="350px"
          value={value}
          onChange={setValue}
          theme={"dark"}
          extensions={[json()]}
          basicSetup={{
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
            highlightActiveLine: false,
          }}
        />
      </div>
    </div>
  )
}
