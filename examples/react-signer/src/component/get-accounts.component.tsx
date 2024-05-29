import { Dispatch, SetStateAction, useState } from "react"
import { InteractivePanel } from "./interactive-panel.component"
import { Account } from "../service/account.service"
import { State } from "../hook/use-signer"

interface GetAccountsRequest {
  origin: string
  accounts: Account[]
  singleChoice?: boolean
  onReject: () => Promise<void>
  onApprove: (accounts: Account[]) => Promise<void>
  setState: Dispatch<SetStateAction<State>>
}

export const GetAccounts = ({
  origin,
  accounts,
  singleChoice,
  onApprove,
  onReject,
  setState,
}: GetAccountsRequest) => {
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([])

  const handleSelect = (acc: Account) => {
    if (singleChoice) {
      setSelectedAccounts([acc])
      return
    }

    if (selectedAccounts.includes(acc))
      return setSelectedAccounts(selectedAccounts.filter((a) => a !== acc))

    setSelectedAccounts([...selectedAccounts, acc])
  }

  return (
    <>
      <div className="pt-9">
        <div className="mb-2 text-xl font-bold text-center">Get Accounts</div>
        <small className="block text-center">
          <a className="text-blue-500" target="_blank" href={origin}>
            {origin}
          </a>{" "}
          wants to get your principal and subaccount
        </small>

        <div className="flex flex-col p-5 mt-5 space-y-4">
          {accounts.map((acc, index) => (
            <div
              onClick={() => handleSelect(acc)}
              key={`acc_${acc.displayName}`}
              className="flex items-center space-x-2.5 cursor-pointer"
              id={`acc_${index}`}
            >
              <div
                className={`w-6 h-6 border border-black rounded-sm ${selectedAccounts.includes(acc) ? "bg-blue-500" : "bg-none"}`}
              />
              <p>{acc.displayName}</p>
            </div>
          ))}
        </div>
      </div>
      <InteractivePanel
        onApprove={async () => {
          await onApprove(selectedAccounts)
        }}
        onReject={onReject}
        setState={setState}
      />
    </>
  )
}
