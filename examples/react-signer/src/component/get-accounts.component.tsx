import { useState } from "react"
import { InteractivePanel } from "./interactive-panel.component"
import { Account } from "../service/account.service"
import { Loader } from "./loader.component"

interface GetAccountsRequest {
  origin: string
  accounts: Account[]
  singleChoice?: boolean
  onReject: () => void
  onApprove: (accounts: Account[]) => Promise<void>
}

export const GetAccounts = ({
  origin,
  accounts,
  singleChoice,
  onApprove,
  onReject,
}: GetAccountsRequest) => {
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSelect = (acc: Account) => {
    if (singleChoice) {
      setSelectedAccounts([acc])
      return
    }

    if (selectedAccounts.includes(acc))
      return setSelectedAccounts(selectedAccounts.filter((a) => a !== acc))

    setSelectedAccounts([...selectedAccounts, acc])
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    )
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
          {accounts.map((acc) => (
            <div
              onClick={() => handleSelect(acc)}
              key={`acc_${acc.displayName}`}
              className="flex items-center space-x-2.5 cursor-pointer"
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
          setIsLoading(true)
          await onApprove(selectedAccounts)
          setIsLoading(false)
        }}
        onReject={onReject}
      />
    </>
  )
}
