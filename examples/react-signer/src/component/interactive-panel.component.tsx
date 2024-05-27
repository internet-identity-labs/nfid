interface InteractivePanelRequest {
  onReject: () => void
  onApprove: () => void
}

export const InteractivePanel = ({ onReject, onApprove }: InteractivePanelRequest) => {
  return (
    <div className="flex justify-between w-full mt-auto">
      <button
        className="px-3.5 py-3 mr-2 font-bold dark:text-white text-black text-sm dark:bg-black bg-white rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black focus:outline-none flex-1 border border-black dark:border-white border-solid"
        onClick={onReject}
      >
        Reject
      </button>
      <button
        className="px-3.5 py-3 font-bold text-white text-sm bg-blue-600 rounded hover:bg-blue-700 focus:outline-none flex-1"
        onClick={onApprove}
      >
        Approve
      </button>
    </div>
  )
}
