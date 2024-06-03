import { Dispatch, SetStateAction } from "react"
import { InteractivePanel } from "./interactive-panel.component"
import { State } from "../hook/use-signer"

interface CallCanisterRequest {
  origin: string
  onReject: () => Promise<void>
  onApprove: () => Promise<void>
  setState: Dispatch<SetStateAction<State>>
  methodName: string
  canisterId: string
  sender: string
  args: Array<{ key: string; value: string }>
  consentMessage?: string
}

export const CallCanister = ({
  origin,
  onApprove,
  onReject,
  setState,
  methodName,
  canisterId,
  sender,
  args,
  consentMessage,
}: CallCanisterRequest) => {
  return (
    <>
      <div className="pt-9">
        <div className="mb-2 text-xl font-bold text-center">{methodName}</div>
        <small className="block text-center">
          Request from{" "}
          <a className="text-blue-500" target="_blank" href={origin}>
            {origin}
          </a>
        </small>
        <div className="flex flex-col p-5 pb-8 mt-5 space-y-4 rounded-xl bg-neutral-100 text-neutral-500">
          <div className="flex">
            <small className="block font-bold w-[100px]">Canister ID</small>
            <small>{canisterId}</small>
          </div>
          <div className="flex">
            <small className="block font-bold w-[100px]">Sender</small>
            <small>{sender}</small>
          </div>
          <small className="font-bold block">Arguments</small>
          {args.map((a) => (
            <div className="flex" key={a.key}>
              <small className="block font-bold w-[100px] ps-4">{a.key}</small>
              <small>{a.value}</small>
            </div>
          ))}
          {consentMessage && <small className="leading-5">{consentMessage}</small>}
        </div>
      </div>
      <InteractivePanel onApprove={onApprove} onReject={onReject} setState={setState} />
    </>
  )
}