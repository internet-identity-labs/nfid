import { Ed25519KeyIdentity } from "@dfinity/identity"
import { SubAccount } from "@dfinity/ledger-icp"
import { idbRepository } from "./storage.service"
import { uint8ArrayToHexString } from "@dfinity/utils"

const key = "accounts"

export interface Account {
  id: number
  displayName: string
  principal: string
  subaccount: string
}

interface AccountEntity {
  id: number
  displayName: string
  subaccount: number
  keyIdentity: string
}

export const accountService = {
  async initWithPredefinedUsers(): Promise<void> {
    const accounts = await idbRepository.get(key)
    if (!accounts) {
      const key1 = Ed25519KeyIdentity.generate()
      const key2 = Ed25519KeyIdentity.generate()
      const accountEntities: AccountEntity[] = [
        {
          id: 1,
          displayName: "Account #1",
          keyIdentity: JSON.stringify(key1.toJSON()),
          subaccount: 0,
        },
        {
          id: 1,
          displayName: "Account #2",
          keyIdentity: JSON.stringify(key1.toJSON()),
          subaccount: 1,
        },
        {
          id: 1,
          displayName: "Account #3",
          keyIdentity: JSON.stringify(key2.toJSON()),
          subaccount: 0,
        },
      ]

      idbRepository.set(key, JSON.stringify(accountEntities))
    }
  },

  async getAccounts(): Promise<Account[]> {
    const accountsJson = await idbRepository.get(key)

    console.log("result", accountsJson)

    if (!accountsJson) {
      return []
    }

    const accountEntities = JSON.parse(accountsJson) as AccountEntity[]

    const accounts: Account[] = accountEntities.map((account) => {
      const keyIdentity = Ed25519KeyIdentity.fromJSON(account.keyIdentity)
      const subAccount = SubAccount.fromID(account.subaccount)
      return {
        id: account.id,
        displayName: account.displayName,
        principal: keyIdentity.getPrincipal().toText(),
        subaccount: uint8ArrayToHexString(subAccount.toUint8Array()),
      }
    })

    return accounts
  },
}
