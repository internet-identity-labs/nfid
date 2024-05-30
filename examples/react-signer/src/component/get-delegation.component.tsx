import { Dispatch, SetStateAction, useState } from "react"
import { InteractivePanel } from "./interactive-panel.component"
import { Account, AccountType } from "../service/account.service"
import { State } from "../hook/use-signer"

interface GetDelegationRequest {
  origin: string
  accounts: Account[]
  onReject: () => Promise<void>
  onApprove: (accounts: Account[]) => Promise<void>
  setState: Dispatch<SetStateAction<State>>
}

const Radio = ({
  inputId,
  displayName,
  checked,
  onChange,
  ...props
}: {
  inputId: string
  displayName: string
  checked?: boolean
  onChange: () => unknown
}) => {
  return (
    <div className="flex items-center space-x-2.5" {...props}>
      <input
        id={inputId}
        type="radio"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
      />
      <label htmlFor={inputId} className="text-xs uppercase cursor-pointer">
        {displayName}
      </label>
    </div>
  )
}

export const GetDelegation = ({
  origin,
  accounts,
  onApprove,
  onReject,
  setState,
}: GetDelegationRequest) => {
  const globalAccount = accounts.find((acc) => acc.type === AccountType.GLOBAL)
  const sessionAccounts = accounts.filter((acc) => acc.type === AccountType.SESSION)

  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(globalAccount)

  return (
    <>
      <div className="pt-9">
        <div className="mb-2 text-xl font-bold text-center">Get Delegation</div>
        <small className="block text-center">
          Choose a delegation for{" "}
          <a className="text-blue-500" target="_blank" href={origin}>
            {origin}
          </a>
        </small>
        <div className="flex flex-col mt-5 rounded-xl border border-solid border-neutral-200">
          <div className="space-y-4 px-5 py-5 border-b border-solid border-neutral-200">
            <small className="font-bold">Global account</small>
            {globalAccount && (
              <Radio
                inputId={`acc_${globalAccount.id}`}
                displayName={globalAccount.displayName}
                checked={selectedAccount === globalAccount}
                onChange={() => setSelectedAccount(globalAccount)}
              />
            )}
          </div>
          <div className="space-y-4 px-5 py-5">
            <small className="font-bold">Session accounts</small>
            {sessionAccounts.map((acc) => (
              <Radio
                key={`acc_${acc.displayName}`}
                inputId={`acc_${acc.id}`}
                displayName={acc.displayName}
                checked={selectedAccount === acc}
                onChange={() => setSelectedAccount(acc)}
              />
            ))}
          </div>
        </div>
      </div>
      <InteractivePanel
        onApprove={async () => {
          if (selectedAccount) await onApprove([selectedAccount])
        }}
        onReject={onReject}
        setState={setState}
        approveDisabled={!selectedAccount}
      />
    </>
  )
}
