import type { Principal } from "@dfinity/principal"
import type { ActorMethod } from "@dfinity/agent"
import type { IDL } from "@dfinity/candid"

export interface Account {
  owner: Principal
  subaccount: [] | [Uint8Array | number[]]
}
export interface Approve {
  status: TransactionState
  signer: string
  created_date: bigint
}
export interface BasicTransactionFields {
  id: bigint
  threshold: [] | [number]
  initiator: string
  modified_date: bigint
  memo: [] | [string]
  error: [] | [VaultError]
  state: TransactionState
  approves: Array<Approve>
  is_vault_state: boolean
  created_date: bigint
  batch_uid: [] | [string]
}
export interface Conf {
  origins: Array<string>
  repo_canister: string
}
export interface ControllersUpdateTransaction {
  principals: Array<Principal>
  common: BasicTransactionFields
  current_controllers: Array<Principal>
}
export interface ControllersUpdateTransactionRequest {
  principals: Array<Principal>
}
export type Currency = { ICP: null }
export interface ICRC1 {
  ledger: Principal
  index: [] | [Principal]
}
export interface ICRC1CanistersAddTransaction {
  index_canister: [] | [Principal]
  ledger_canister: Principal
  common: BasicTransactionFields
}
export interface ICRC1CanistersAddTransactionRequest {
  index_canister: [] | [Principal]
  ledger_canister: Principal
  batch_uid: [] | [string]
}
export interface ICRC1CanistersRemoveTransaction {
  ledger_canister: Principal
  common: BasicTransactionFields
}
export interface ICRC1CanistersRemoveTransactionRequest {
  ledger_canister: Principal
  batch_uid: [] | [string]
}
export interface Member {
  modified_date: bigint
  name: string
  role: VaultRole
  account: [] | [Account]
  member_id: string
  created_date: bigint
}
export interface MemberCreateTransaction {
  name: string
  role: VaultRole
  member_id: string
  common: BasicTransactionFields
}
export interface MemberCreateTransactionRequest {
  name: string
  role: VaultRole
  member_id: string
  batch_uid: [] | [string]
}
export interface MemberCreateTransactionRequestV2 {
  name: string
  role: VaultRole
  account: Account
  batch_uid: [] | [string]
}
export interface MemberCreateTransactionV2 {
  name: string
  role: VaultRole
  account: Account
  common: BasicTransactionFields
}
export interface MemberExtendICRC1AccountRequest {
  account: Account
  batch_uid: [] | [string]
}
export interface MemberExtendICRC1AccountTransaction {
  account: Account
  common: BasicTransactionFields
}
export interface MemberRemoveTransaction {
  member_id: string
  common: BasicTransactionFields
}
export interface MemberRemoveTransactionRequest {
  member_id: string
  batch_uid: [] | [string]
}
export interface MemberUpdateNameTransaction {
  name: string
  member_id: string
  common: BasicTransactionFields
}
export interface MemberUpdateNameTransactionRequest {
  name: string
  member_id: string
  batch_uid: [] | [string]
}
export interface MemberUpdateRoleTransaction {
  role: VaultRole
  member_id: string
  common: BasicTransactionFields
}
export interface MemberUpdateRoleTransactionRequest {
  role: VaultRole
  member_id: string
  batch_uid: [] | [string]
}
export type Network = { IC: null } | { BTC: null } | { ETH: null }
export interface Policy {
  uid: string
  member_threshold: number
  modified_date: bigint
  amount_threshold: bigint
  wallets: Array<string>
  currency: Currency
  created_date: bigint
}
export interface PolicyCreateTransaction {
  uid: string
  member_threshold: number
  amount_threshold: bigint
  wallets: Array<string>
  currency: Currency
  common: BasicTransactionFields
}
export interface PolicyCreateTransactionRequest {
  uid: string
  member_threshold: number
  amount_threshold: bigint
  wallets: Array<string>
  currency: Currency
  batch_uid: [] | [string]
}
export interface PolicyRemoveTransaction {
  uid: string
  common: BasicTransactionFields
}
export interface PolicyRemoveTransactionRequest {
  uid: string
  batch_uid: [] | [string]
}
export interface PolicyUpdateTransaction {
  uid: string
  member_threshold: number
  amount_threshold: bigint
  common: BasicTransactionFields
}
export interface PolicyUpdateTransactionRequest {
  uid: string
  member_threshold: number
  amount_threshold: bigint
  batch_uid: [] | [string]
}
export interface PurgeTransaction {
  common: BasicTransactionFields
}
export interface Quorum {
  modified_date: bigint
  quorum: number
}
export interface QuorumUpdateTransaction {
  common: BasicTransactionFields
  quorum: number
}
export interface QuorumUpdateTransactionRequest {
  quorum: number
  batch_uid: [] | [string]
}
export type SubAccount = Uint8Array | number[]
export interface TopUpQuorumTransaction {
  block_index: [] | [bigint]
  currency: Currency
  wallet: string
  common: BasicTransactionFields
  amount: bigint
}
export interface TopUpTransaction {
  block_index: [] | [bigint]
  currency: Currency
  wallet: string
  common: BasicTransactionFields
  amount: bigint
  policy: [] | [string]
}
export interface TopUpTransactionRequest {
  currency: Currency
  wallet: string
  amount: bigint
}
export interface TransactionApproveRequest {
  transaction_id: bigint
  state: TransactionState
}
export type TransactionCandid =
  | {
      ControllersUpdateTransactionV: ControllersUpdateTransaction
    }
  | { WalletCreateTransactionV: WalletCreateTransaction }
  | { PolicyCreateTransactionV: PolicyCreateTransaction }
  | { MemberUpdateRoleTransactionV: MemberUpdateRoleTransaction }
  | { ICRC1CanistersRemoveTransactionV: ICRC1CanistersRemoveTransaction }
  | { TopUpTransactionV: TopUpTransaction }
  | { TopUpQuorumTransactionV: TopUpQuorumTransaction }
  | { ICRC1CanistersAddTransactionV: ICRC1CanistersAddTransaction }
  | { VaultNamingUpdateTransactionV: VaultNamingUpdateTransaction }
  | { TransferTransactionV: TransferTransaction }
  | { PolicyRemoveTransactionV: PolicyRemoveTransaction }
  | {
      MemberExtendICRC1AccountTransactionV: MemberExtendICRC1AccountTransaction
    }
  | { PolicyUpdateTransactionV: PolicyUpdateTransaction }
  | { TransferICRC1QuorumTransactionV: TransferICRC1QuorumTransaction }
  | { MemberCreateTransactionV: MemberCreateTransaction }
  | { MemberUpdateNameTransactionV: MemberUpdateNameTransaction }
  | { UpgradeTransactionV: VersionUpgradeTransaction }
  | { PurgeTransactionV: PurgeTransaction }
  | { TransferQuorumTransactionV: TransferQuorumTransaction }
  | { QuorumUpdateTransactionV: QuorumUpdateTransaction }
  | { MemberCreateTransactionV2: MemberCreateTransactionV2 }
  | { WalletUpdateNameTransactionV: WalletUpdateNameTransaction }
  | { MemberRemoveTransactionV: MemberRemoveTransaction }
export type TransactionRequest =
  | {
      ICRC1CanistersRemoveTransactionRequestV: ICRC1CanistersRemoveTransactionRequest
    }
  | { QuorumUpdateTransactionRequestV: QuorumUpdateTransactionRequest }
  | {
      VaultNamingUpdateTransactionRequestV: VaultNamingUpdateTransactionRequest
    }
  | { PurgeTransactionRequestV: {} }
  | {
      ICRC1CanistersAddTransactionRequestV: ICRC1CanistersAddTransactionRequest
    }
  | {
      ControllersUpdateTransactionRequestV: ControllersUpdateTransactionRequest
    }
  | {
      MemberUpdateNameTransactionRequestV: MemberUpdateNameTransactionRequest
    }
  | { TopUpTransactionRequestV: TopUpTransactionRequest }
  | {
      TransferICRC1QuorumTransactionRequestV: TransferICRC1QuorumTransactionRequest
    }
  | { WalletCreateTransactionRequestV: WalletCreateTransactionRequest }
  | { MemberRemoveTransactionRequestV: MemberRemoveTransactionRequest }
  | { MemberCreateTransactionRequestV: MemberCreateTransactionRequest }
  | { TransferQuorumTransactionRequestV: TransferTransactionRequest }
  | { MemberCreateTransactionRequestV2: MemberCreateTransactionRequestV2 }
  | { TransferTransactionRequestV: TransferTransactionRequest }
  | {
      MemberUpdateRoleTransactionRequestV: MemberUpdateRoleTransactionRequest
    }
  | {
      WalletUpdateNameTransactionRequestV: WalletUpdateNameTransactionRequest
    }
  | { PolicyUpdateTransactionRequestV: PolicyUpdateTransactionRequest }
  | { VersionUpgradeTransactionRequestV: VersionUpgradeTransactionRequest }
  | { TopUpQuorumTransactionRequestV: TopUpTransactionRequest }
  | { MemberExtendICRC1AccountRequestV: MemberExtendICRC1AccountRequest }
  | { PolicyRemoveTransactionRequestV: PolicyRemoveTransactionRequest }
  | { PolicyCreateTransactionRequestV: PolicyCreateTransactionRequest }
export type TransactionState =
  | { Blocked: null }
  | { Failed: null }
  | { Approved: null }
  | { Rejected: null }
  | { Executed: null }
  | { Purged: null }
  | { Pending: null }
export interface TransferICRC1QuorumTransaction {
  to_principal: Principal
  block_index: [] | [bigint]
  to_subaccount: [] | [Uint8Array | number[]]
  ledger_id: Principal
  wallet: string
  common: BasicTransactionFields
  amount: bigint
}
export interface TransferICRC1QuorumTransactionRequest {
  to_principal: Principal
  to_subaccount: [] | [Uint8Array | number[]]
  memo: [] | [string]
  ledger_id: Principal
  wallet: string
  amount: bigint
}
export interface TransferQuorumTransaction {
  block_index: [] | [bigint]
  currency: Currency
  address: string
  wallet: string
  common: BasicTransactionFields
  amount: bigint
}
export interface TransferTransaction {
  block_index: [] | [bigint]
  currency: Currency
  address: string
  wallet: string
  common: BasicTransactionFields
  amount: bigint
  policy: [] | [string]
}
export interface TransferTransactionRequest {
  memo: [] | [string]
  currency: Currency
  address: string
  wallet: string
  amount: bigint
}
export type VaultError =
  | { ControllersUpdateError: { message: string } }
  | { WalletNotExists: null }
  | { CouldNotDefinePolicy: null }
  | { ThresholdAlreadyExists: null }
  | { QuorumNotReachable: null }
  | { CanisterReject: { message: string } }
  | { MemberNotExists: null }
  | { MemberAlreadyExists: null }
  | { ThresholdDefineError: { message: string } }
  | { UIDAlreadyExists: null }
  | { PolicyNotExists: null }
export interface VaultNamingUpdateTransaction {
  name: [] | [string]
  description: [] | [string]
  common: BasicTransactionFields
}
export interface VaultNamingUpdateTransactionRequest {
  name: [] | [string]
  description: [] | [string]
  batch_uid: [] | [string]
}
export type VaultRole = { Member: null } | { Admin: null }
export interface VaultState {
  members: Array<Member>
  name: [] | [string]
  description: [] | [string]
  icrc1_canisters: Array<ICRC1>
  wallets: Array<Wallet>
  quorum: Quorum
  policies: Array<Policy>
}
export interface VersionUpgradeTransaction {
  version: string
  initial_version: string
  common: BasicTransactionFields
}
export interface VersionUpgradeTransactionRequest {
  version: string
}
export interface Wallet {
  uid: string
  modified_date: bigint
  name: string
  network: Network
  created_date: bigint
}
export interface WalletCreateTransaction {
  uid: string
  name: string
  network: Network
  common: BasicTransactionFields
}
export interface WalletCreateTransactionRequest {
  uid: string
  name: string
  network: Network
  batch_uid: [] | [string]
}
export interface WalletUpdateNameTransaction {
  uid: string
  name: string
  common: BasicTransactionFields
}
export interface WalletUpdateNameTransactionRequest {
  uid: string
  name: string
  batch_uid: [] | [string]
}
export interface _SERVICE {
  approve: ActorMethod<[Array<TransactionApproveRequest>], Array<TransactionCandid>>
  canister_balance: ActorMethod<[], bigint>
  execute: ActorMethod<[], undefined>
  get_controllers: ActorMethod<[], Array<Principal>>
  get_state: ActorMethod<[[] | [bigint]], VaultState>
  get_transactions_all: ActorMethod<[], Array<TransactionCandid>>
  get_trusted_origins_certified: ActorMethod<
    [],
    {
      certificate: Uint8Array | number[]
      witness: Uint8Array | number[]
      response: Array<string>
    }
  >
  get_version: ActorMethod<[], string>
  request_transaction: ActorMethod<[Array<TransactionRequest>], Array<TransactionCandid>>
}
export declare const idlFactory: IDL.InterfaceFactory
