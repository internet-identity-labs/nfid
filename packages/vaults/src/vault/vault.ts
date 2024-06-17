import { Currency, Network, VaultRole } from "../enum/enums"
import {
  Member,
  ICRC1 as ICRC1Candid,
  Policy as PolicyCandid,
  VaultState,
  Wallet as WalletCandid,
} from "../idl/service_vault"
import { candidToRole, candidToNetwork } from "../util/helper"
import { Principal } from "@dfinity/principal"

export interface Vault {
  members: Array<VaultMember>
  quorum: Quorum
  wallets: Array<Wallet>
  policies: Array<Policy>
  name?: string
  description?: string
  icrc1_canisters: Array<ICRC1>
}

export interface ICRC1 {
  ledger: Principal
  index: Principal | undefined
}

export interface Quorum {
  quorum: number
  modifiedDate: bigint
}

export interface VaultMember {
  userId: string
  name: string | undefined
  role: VaultRole
  account:
    | undefined
    | {
        owner: Principal
        subaccount: undefined | Uint8Array | number[]
      }
  modifiedDate: bigint
  createdDate: bigint
}

export interface Wallet {
  uid: string
  modifiedDate: bigint
  name: string
  network: Network
  createdDate: bigint
}

export interface Policy {
  uid: string
  memberThreshold: number
  modifiedDate: bigint
  amountThreshold: bigint
  wallets: Array<string>
  currency: Currency
  createdDate: bigint
}

export function candidToVault(vaultCandid: VaultState): Vault {
  const members: Array<VaultMember> = vaultCandid.members.map(mapMember)
  const quorum: Quorum = {
    modifiedDate: vaultCandid.quorum.modified_date,
    quorum: vaultCandid.quorum.quorum,
  }
  const wallets: Array<Wallet> = vaultCandid.wallets.map(mapWallet)
  const policies: Array<Policy> = vaultCandid.policies.map(mapPolicy)
  const name = vaultCandid.name.length === 0 ? undefined : vaultCandid.name[0]
  const description = vaultCandid.description.length === 0 ? undefined : vaultCandid.description[0]
  const vault: Vault = {
    icrc1_canisters: vaultCandid.icrc1_canisters.map(mapICRC1),
    members: members,
    quorum: quorum,
    wallets,
    policies,
    name,
    description,
  }

  return vault
}

function mapMember(candid: Member): VaultMember {
  return {
    createdDate: candid.created_date,
    modifiedDate: candid.modified_date,
    name: candid.name,
    role: candidToRole(candid.role),
    userId: candid.member_id,
    account:
      candid.account.length === 0
        ? undefined
        : {
            owner: candid.account[0].owner,
            subaccount:
              candid.account[0].subaccount.length === 0
                ? undefined
                : candid.account[0].subaccount[0],
          },
  }
}

function mapICRC1(candid: ICRC1Candid): ICRC1 {
  return {
    ledger: candid.ledger,
    index: candid.index.length === 0 ? undefined : candid.index[0],
  }
}

function mapWallet(candid: WalletCandid): Wallet {
  return {
    network: candidToNetwork(candid.network),
    uid: candid.uid,
    createdDate: candid.created_date,
    modifiedDate: candid.modified_date,
    name: candid.name,
  }
}

function mapPolicy(candid: PolicyCandid): Policy {
  return {
    amountThreshold: candid.amount_threshold,
    createdDate: candid.created_date,
    currency: Currency.ICP, //TODO
    memberThreshold: candid.member_threshold,
    modifiedDate: candid.modified_date,
    uid: candid.uid,
    wallets: candid.wallets,
  }
}
