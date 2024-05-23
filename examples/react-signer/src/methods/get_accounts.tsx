import { useState } from "react"

export interface IAccount {
  displayName: string
  value: string
}

export const GetAccounts = ({
  origin,
  accounts,
  onChange,
}: {
  origin: string
  accounts: IAccount[]
  onChange?: (value: string) => void
}) => {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([accounts[0].value])

  const handleSelect = (acc: IAccount) => {
    if (selectedAccounts.includes(acc.value))
      return setSelectedAccounts(selectedAccounts.filter((a) => a !== acc.value))

    setSelectedAccounts([...selectedAccounts, acc.value])
    onChange && onChange(acc.value)
  }

  return (
    <>
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
              className={`w-6 h-6 border border-black rounded-sm ${selectedAccounts.includes(acc.value) ? "bg-blue-500" : "bg-none"}`}
            />
            <p>{acc.displayName}</p>
          </div>
        ))}
      </div>
    </>
  )
}
