import { Dispatch, SetStateAction } from "react"
import { State } from "../hook/use-signer"

interface InteractivePanelRequest {
  onReject: () => Promise<void>
  onApprove: () => Promise<void>
  setState: Dispatch<SetStateAction<State>>
  approveDisabled?: boolean
}

export const InteractivePanel = ({
  onReject,
  onApprove,
  setState,
  approveDisabled,
}: InteractivePanelRequest) => {
  return (
    <div className="flex justify-between w-full mt-auto">
      <button
        className="px-3.5 py-3 mr-2 font-bold dark:text-white text-black text-sm dark:bg-black bg-white rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black focus:outline-none flex-1 border border-black dark:border-white border-solid"
        onClick={async () => {
          setState(State.LOADING)
          await onReject()
          setState(State.READY)
        }}
        id="reject"
      >
        Reject
      </button>
      <button
        className="px-3.5 py-3 font-bold text-white text-sm bg-blue-600 rounded hover:bg-blue-700 focus:outline-none flex-1"
        onClick={async () => {
          setState(State.LOADING)
          await onApprove()
          setState(State.READY)
        }}
        id="approve"
        disabled={approveDisabled}
      >
        Approve
      </button>
    </div>
  )
}
