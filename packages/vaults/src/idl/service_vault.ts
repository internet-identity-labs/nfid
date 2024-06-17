import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
    'owner' : Principal,
    'subaccount' : [] | [SubAccount],
}
export type AccountIdentifier = string;
export interface Approve {
    'status' : TransactionState,
    'signer' : string,
    'created_date' : bigint,
}
export interface BasicTransactionFields {
    'id' : bigint,
    'threshold' : [] | [number],
    'initiator' : string,
    'modified_date' : bigint,
    'memo' : [] | [string],
    'error' : [] | [VaultError],
    'state' : TransactionState,
    'approves' : Array<Approve>,
    'is_vault_state' : boolean,
    'created_date' : bigint,
    'batch_uid' : [] | [string],
}
export type BlockIndex = bigint;
export interface CanisterSettings {
    'controller' : [] | [Principal],
    'freezing_threshold' : [] | [bigint],
    'controllers' : [] | [Array<Principal>],
    'reserved_cycles_limit' : [] | [bigint],
    'log_visibility' : [] | [log_visibility],
    'memory_allocation' : [] | [bigint],
    'compute_allocation' : [] | [bigint],
}
export interface Conf { 'origins' : Array<string>, 'repo_canister' : string }
export interface ControllersUpdateTransaction {
    'principals' : Array<Principal>,
    'common' : BasicTransactionFields,
    'current_controllers' : Array<Principal>,
}
export interface ControllersUpdateTransactionRequest {
    'principals' : Array<Principal>,
}
export interface CreateCanisterArg {
    'subnet_selection' : [] | [SubnetSelection],
    'settings' : [] | [CanisterSettings],
    'subnet_type' : [] | [string],
}
export type CreateCanisterError = {
    'Refunded' : { 'create_error' : string, 'refund_amount' : bigint }
} |
    { 'RefundFailed' : { 'create_error' : string, 'refund_error' : string } };
export type CreateCanisterResult = { 'Ok' : Principal } |
    { 'Err' : CreateCanisterError };
export type Currency = { 'ICP' : null };
export type Cycles = bigint;
export interface CyclesCanisterInitPayload {
    'exchange_rate_canister' : [] | [ExchangeRateCanister],
    'cycles_ledger_canister_id' : [] | [Principal],
    'last_purged_notification' : [] | [bigint],
    'governance_canister_id' : [] | [Principal],
    'minting_account_id' : [] | [AccountIdentifier],
    'ledger_canister_id' : [] | [Principal],
}
export type ExchangeRateCanister = { 'Set' : Principal } |
    { 'Unset' : null };
export interface ICRC1 { 'ledger' : Principal, 'index' : [] | [Principal] }
export interface IcpXdrConversionRate {
    'xdr_permyriad_per_icp' : bigint,
    'timestamp_seconds' : bigint,
}
export interface IcpXdrConversionRateResponse {
    'certificate' : Uint8Array | number[],
    'data' : IcpXdrConversionRate,
    'hash_tree' : Uint8Array | number[],
}
export interface Member {
    'modified_date' : bigint,
    'name' : string,
    'role' : VaultRole,
    'account' : [] | [Account],
    'member_id' : string,
    'created_date' : bigint,
}
export interface MemberCreateTransaction {
    'name' : string,
    'role' : VaultRole,
    'member_id' : string,
    'common' : BasicTransactionFields,
}
export interface MemberCreateTransactionRequest {
    'name' : string,
    'role' : VaultRole,
    'member_id' : string,
    'batch_uid' : [] | [string],
}
export interface MemberCreateTransactionRequestV2 {
    'name' : string,
    'role' : VaultRole,
    'account' : Account,
    'batch_uid' : [] | [string],
}
export interface MemberCreateTransactionV2 {
    'name' : string,
    'role' : VaultRole,
    'account' : Account,
    'common' : BasicTransactionFields,
}
export interface MemberExtendICRC1AccountRequest {
    'account' : Account,
    'batch_uid' : [] | [string],
}
export interface MemberExtendICRC1AccountTransaction {
    'account' : Account,
    'batch_uid' : [] | [string],
    'common' : BasicTransactionFields,
}
export interface MemberRemoveTransaction {
    'member_id' : string,
    'common' : BasicTransactionFields,
}
export interface MemberRemoveTransactionRequest {
    'member_id' : string,
    'batch_uid' : [] | [string],
}
export interface MemberUpdateNameTransaction {
    'name' : string,
    'member_id' : string,
    'common' : BasicTransactionFields,
}
export interface MemberUpdateNameTransactionRequest {
    'name' : string,
    'member_id' : string,
    'batch_uid' : [] | [string],
}
export interface MemberUpdateRoleTransaction {
    'role' : VaultRole,
    'member_id' : string,
    'common' : BasicTransactionFields,
}
export interface MemberUpdateRoleTransactionRequest {
    'role' : VaultRole,
    'member_id' : string,
    'batch_uid' : [] | [string],
}
export type Memo = [] | [Uint8Array | number[]];
export type Network = { 'IC' : null } |
    { 'BTC' : null } |
    { 'ETH' : null };
export interface NotifyCreateCanisterArg {
    'controller' : Principal,
    'block_index' : BlockIndex,
    'subnet_selection' : [] | [SubnetSelection],
    'settings' : [] | [CanisterSettings],
    'subnet_type' : [] | [string],
}
export type NotifyCreateCanisterResult = { 'Ok' : Principal } |
    { 'Err' : NotifyError };
export type NotifyError = {
    'Refunded' : { 'block_index' : [] | [BlockIndex], 'reason' : string }
} |
    { 'InvalidTransaction' : string } |
    { 'Other' : { 'error_message' : string, 'error_code' : bigint } } |
    { 'Processing' : null } |
    { 'TransactionTooOld' : BlockIndex };
export interface NotifyMintCyclesArg {
    'block_index' : BlockIndex,
    'deposit_memo' : Memo,
    'to_subaccount' : Subaccount,
}
export type NotifyMintCyclesResult = { 'Ok' : NotifyMintCyclesSuccess } |
    { 'Err' : NotifyError };
export interface NotifyMintCyclesSuccess {
    'balance' : bigint,
    'block_index' : bigint,
    'minted' : bigint,
}
export interface NotifyTopUpArg {
    'block_index' : BlockIndex,
    'canister_id' : Principal,
}
export type NotifyTopUpResult = { 'Ok' : Cycles } |
    { 'Err' : NotifyError };
export interface Policy {
    'uid' : string,
    'member_threshold' : number,
    'modified_date' : bigint,
    'amount_threshold' : bigint,
    'wallets' : Array<string>,
    'currency' : Currency,
    'created_date' : bigint,
}
export interface PolicyCreateTransaction {
    'uid' : string,
    'member_threshold' : number,
    'amount_threshold' : bigint,
    'wallets' : Array<string>,
    'currency' : Currency,
    'common' : BasicTransactionFields,
}
export interface PolicyCreateTransactionRequest {
    'uid' : string,
    'member_threshold' : number,
    'amount_threshold' : bigint,
    'wallets' : Array<string>,
    'currency' : Currency,
    'batch_uid' : [] | [string],
}
export interface PolicyRemoveTransaction {
    'uid' : string,
    'common' : BasicTransactionFields,
}
export interface PolicyRemoveTransactionRequest {
    'uid' : string,
    'batch_uid' : [] | [string],
}
export interface PolicyUpdateTransaction {
    'uid' : string,
    'member_threshold' : number,
    'amount_threshold' : bigint,
    'common' : BasicTransactionFields,
}
export interface PolicyUpdateTransactionRequest {
    'uid' : string,
    'member_threshold' : number,
    'amount_threshold' : bigint,
    'batch_uid' : [] | [string],
}
export interface PrincipalsAuthorizedToCreateCanistersToSubnetsResponse {
    'data' : Array<[Principal, Array<Principal>]>,
}
export interface PurgeTransaction { 'common' : BasicTransactionFields }
export interface Quorum { 'modified_date' : bigint, 'quorum' : number }
export interface QuorumUpdateTransaction {
    'common' : BasicTransactionFields,
    'quorum' : number,
}
export interface QuorumUpdateTransactionRequest {
    'quorum' : number,
    'batch_uid' : [] | [string],
}
export type SubAccount = Uint8Array | number[];
export type Subaccount = [] | [Uint8Array | number[]];
export interface SubnetFilter { 'subnet_type' : [] | [string] }
export type SubnetSelection = { 'Filter' : SubnetFilter } |
    { 'Subnet' : { 'subnet' : Principal } };
export interface SubnetTypesToSubnetsResponse {
    'data' : Array<[string, Array<Principal>]>,
}
export interface TopUpQuorumTransaction {
    'block_index' : [] | [bigint],
    'currency' : Currency,
    'wallet' : string,
    'common' : BasicTransactionFields,
    'amount' : bigint,
}
export interface TopUpQuorumTransactionRequest {
    'currency' : Currency,
    'wallet' : string,
    'amount' : bigint,
}
export interface TopUpTransaction {
    'block_index' : [] | [bigint],
    'currency' : Currency,
    'wallet' : string,
    'common' : BasicTransactionFields,
    'amount' : bigint,
    'policy' : [] | [string],
}
export interface TopUpTransactionRequest {
    'currency' : Currency,
    'wallet' : string,
    'amount' : bigint,
}
export interface TransactionApproveRequest {
    'transaction_id' : bigint,
    'state' : TransactionState,
}
export type TransactionCandid = {
    'ControllersUpdateTransactionV' : ControllersUpdateTransaction
} |
    { 'WalletCreateTransactionV' : WalletCreateTransaction } |
    { 'PolicyCreateTransactionV' : PolicyCreateTransaction } |
    { 'MemberUpdateRoleTransactionV' : MemberUpdateRoleTransaction } |
    { 'TopUpTransactionV' : TopUpTransaction } |
    { 'TopUpQuorumTransactionV' : TopUpQuorumTransaction } |
    { 'VaultNamingUpdateTransactionV' : VaultNamingUpdateTransaction } |
    { 'TransferTransactionV' : TransferTransaction } |
    { 'PolicyRemoveTransactionV' : PolicyRemoveTransaction } |
    {
        'MemberExtendICRC1AccountTransactionV' : MemberExtendICRC1AccountTransaction
    } |
    { 'PolicyUpdateTransactionV' : PolicyUpdateTransaction } |
    { 'TransferICRC1QuorumTransactionV' : TransferICRC1QuorumTransaction } |
    { 'MemberCreateTransactionV' : MemberCreateTransaction } |
    { 'MemberUpdateNameTransactionV' : MemberUpdateNameTransaction } |
    { 'UpgradeTransactionV' : VersionUpgradeTransaction } |
    { 'PurgeTransactionV' : PurgeTransaction } |
    { 'TransferQuorumTransactionV' : TransferQuorumTransaction } |
    { 'QuorumUpdateTransactionV' : QuorumUpdateTransaction } |
    { 'MemberCreateTransactionV2' : MemberCreateTransactionV2 } |
    { 'WalletUpdateNameTransactionV' : WalletUpdateNameTransaction } |
    { 'MemberRemoveTransactionV' : MemberRemoveTransaction };
export type TransactionRequest = {
    'QuorumUpdateTransactionRequestV' : QuorumUpdateTransactionRequest
} |
    {
        'VaultNamingUpdateTransactionRequestV' : VaultNamingUpdateTransactionRequest
    } |
    { 'PurgeTransactionRequestV' : {} } |
    {
        'ControllersUpdateTransactionRequestV' : ControllersUpdateTransactionRequest
    } |
    {
        'MemberUpdateNameTransactionRequestV' : MemberUpdateNameTransactionRequest
    } |
    { 'TopUpTransactionRequestV' : TopUpTransactionRequest } |
    {
        'TransferICRC1QuorumTransactionRequestV' : TransferICRC1QuorumTransactionRequest
    } |
    { 'WalletCreateTransactionRequestV' : WalletCreateTransactionRequest } |
    { 'MemberRemoveTransactionRequestV' : MemberRemoveTransactionRequest } |
    { 'MemberCreateTransactionRequestV' : MemberCreateTransactionRequest } |
    { 'TransferQuorumTransactionRequestV' : TransferQuorumTransactionRequest } |
    { 'MemberCreateTransactionRequestV2' : MemberCreateTransactionRequestV2 } |
    { 'TransferTransactionRequestV' : TransferTransactionRequest } |
    {
        'MemberUpdateRoleTransactionRequestV' : MemberUpdateRoleTransactionRequest
    } |
    {
        'WalletUpdateNameTransactionRequestV' : WalletUpdateNameTransactionRequest
    } |
    { 'PolicyUpdateTransactionRequestV' : PolicyUpdateTransactionRequest } |
    { 'VersionUpgradeTransactionRequestV' : VersionUpgradeTransactionRequest } |
    { 'TopUpQuorumTransactionRequestV' : TopUpQuorumTransactionRequest } |
    { 'MemberExtendICRC1AccountRequestV' : MemberExtendICRC1AccountRequest } |
    { 'PolicyRemoveTransactionRequestV' : PolicyRemoveTransactionRequest } |
    { 'PolicyCreateTransactionRequestV' : PolicyCreateTransactionRequest };
export type TransactionState = { 'Blocked' : null } |
    { 'Failed' : null } |
    { 'Approved' : null } |
    { 'Rejected' : null } |
    { 'Executed' : null } |
    { 'Purged' : null } |
    { 'Pending' : null };
export interface TransferICRC1QuorumTransaction {
    'to_principal' : Principal,
    'block_index' : [] | [bigint],
    'to_subaccount' : [] | [Uint8Array | number[]],
    'ledger_id' : Principal,
    'wallet' : string,
    'common' : BasicTransactionFields,
    'amount' : bigint,
}
export interface TransferICRC1QuorumTransactionRequest {
    'to_principal' : Principal,
    'to_subaccount' : [] | [Uint8Array | number[]],
    'memo' : [] | [string],
    'ledger_id' : Principal,
    'wallet' : string,
    'amount' : bigint,
}
export interface TransferQuorumTransaction {
    'block_index' : [] | [bigint],
    'currency' : Currency,
    'address' : string,
    'wallet' : string,
    'common' : BasicTransactionFields,
    'amount' : bigint,
}
export interface TransferQuorumTransactionRequest {
    'memo' : [] | [string],
    'currency' : Currency,
    'address' : string,
    'wallet' : string,
    'amount' : bigint,
}
export interface TransferTransaction {
    'block_index' : [] | [bigint],
    'currency' : Currency,
    'address' : string,
    'wallet' : string,
    'common' : BasicTransactionFields,
    'amount' : bigint,
    'policy' : [] | [string],
}
export interface TransferTransactionRequest {
    'memo' : [] | [string],
    'currency' : Currency,
    'address' : string,
    'wallet' : string,
    'amount' : bigint,
}
export type VaultError = { 'ControllersUpdateError' : { 'message' : string } } |
    { 'WalletNotExists' : null } |
    { 'CouldNotDefinePolicy' : null } |
    { 'ThresholdAlreadyExists' : null } |
    { 'QuorumNotReachable' : null } |
    { 'CanisterReject' : { 'message' : string } } |
    { 'MemberNotExists' : null } |
    { 'MemberAlreadyExists' : null } |
    { 'ThresholdDefineError' : { 'message' : string } } |
    { 'UIDAlreadyExists' : null } |
    { 'PolicyNotExists' : null };
export interface VaultNamingUpdateTransaction {
    'name' : [] | [string],
    'description' : [] | [string],
    'common' : BasicTransactionFields,
}
export interface VaultNamingUpdateTransactionRequest {
    'name' : [] | [string],
    'description' : [] | [string],
    'batch_uid' : [] | [string],
}
export type VaultRole = { 'Member' : null } |
    { 'Admin' : null };
export interface VaultState {
    'members' : Array<Member>,
    'name' : [] | [string],
    'description' : [] | [string],
    'icrc1_canisters' : Array<ICRC1>,
    'wallets' : Array<Wallet>,
    'quorum' : Quorum,
    'policies' : Array<Policy>,
}
export interface VersionUpgradeTransaction {
    'version' : string,
    'initial_version' : string,
    'common' : BasicTransactionFields,
}
export interface VersionUpgradeTransactionRequest { 'version' : string }
export interface Wallet {
    'uid' : string,
    'modified_date' : bigint,
    'name' : string,
    'network' : Network,
    'created_date' : bigint,
}
export interface WalletCreateTransaction {
    'uid' : string,
    'name' : string,
    'network' : Network,
    'common' : BasicTransactionFields,
}
export interface WalletCreateTransactionRequest {
    'uid' : string,
    'name' : string,
    'network' : Network,
    'batch_uid' : [] | [string],
}
export interface WalletUpdateNameTransaction {
    'uid' : string,
    'name' : string,
    'common' : BasicTransactionFields,
}
export interface WalletUpdateNameTransactionRequest {
    'uid' : string,
    'name' : string,
    'batch_uid' : [] | [string],
}
export type log_visibility = { 'controllers' : null } |
    { 'public' : null };
export interface _SERVICE {
    'approve' : ActorMethod<
        [Array<TransactionApproveRequest>],
        Array<TransactionCandid>
    >,
    'canister_balance' : ActorMethod<[], bigint>,
    'execute' : ActorMethod<[], undefined>,
    'get_controllers' : ActorMethod<[], Array<Principal>>,
    'get_state' : ActorMethod<[[] | [bigint]], VaultState>,
    'get_transactions_all' : ActorMethod<[], Array<TransactionCandid>>,
    'get_trusted_origins_certified' : ActorMethod<
        [],
        {
            'certificate' : Uint8Array | number[],
            'witness' : Uint8Array | number[],
            'response' : Array<string>,
        }
    >,
    'get_version' : ActorMethod<[], string>,
    'remove_icrc1_canister' : ActorMethod<[Principal], VaultState>,
    'request_transaction' : ActorMethod<
        [Array<TransactionRequest>],
        Array<TransactionCandid>
    >,
    'store_icrc1_canister' : ActorMethod<
        [Principal, [] | [Principal]],
        VaultState
    >,
}
export declare const idlFactory: IDL.InterfaceFactory;
