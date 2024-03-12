// @ts-nocheck
import {Currency, Network, TransactionState, TransactionType, VaultRole} from "./enums";
import {
    ControllersUpdateTransaction as ControllersUpdateTransactionCandid,
    MemberCreateTransaction as MemberCreateTransactionCandid,
    MemberRemoveTransaction as MemberRemoveTransactionCandid,
    MemberUpdateNameTransaction as MemberUpdateNameTransactionCandid,
    MemberUpdateRoleTransaction as MemberUpdateRoleTransactionCandid,
    PolicyCreateTransaction as PolicyCreateTransactionCandid,
    PolicyRemoveTransaction as PolicyRemoveTransactionCandid,
    PolicyUpdateTransaction as PolicyUpdateTransactionCandid,
    QuorumUpdateTransaction as QuorumUpdateTransactionCandid,
    TopUpTransaction as TopUpTransactionCandid,
    TransactionCandid,
    TransferTransaction as TransferTransactionCandid,
    TransferQuorumTransaction as TransferQuorumTransactionCandid,
    VaultError,
    VaultNamingUpdateTransaction as VaultNamingUpdateTransactionCandid,
    VersionUpgradeTransaction as VersionUpgradeCandid,
    WalletCreateTransaction as WalletCreateTransactionCandid,
    WalletUpdateNameTransaction as WalletUpdateNameTransactionCandid
} from "./service_vault";
import {Approve, candidToApprove} from "./approve";
import {candidToNetwork, candidToRole, candidToTransactionState, hasOwnProperty} from "./helper";
import {Principal} from "@dfinity/principal";

export interface Transaction {
    id: bigint;
    transactionType: TransactionType;
    initiator: string;
    modifiedDate: bigint;
    memo?: string;
    state: TransactionState;
    approves: Approve[];
    isVaultState: boolean;
    createdDate: bigint;
    batchUid: string;
    threshold: number | undefined
    error?: VaultError
}

export interface MemberCreateTransaction extends Transaction {
    memberId: string;
    name: string;
    role: VaultRole;
}

export interface MemberUpdateNameTransaction extends Transaction {
    memberId: string;
    name: string;
}

export interface MemberUpdateRoleTransaction extends Transaction {
    memberId: string;
    role: VaultRole;
}

export interface MemberRemoveTransaction extends Transaction {
    memberId: string;
}

export interface QuorumUpdateTransaction extends Transaction {
    quorum: number
}

export interface VersionUpgradeTransaction extends Transaction {
    version: string
    initial_version: string
}

export interface VaultUpdateNamingTransaction extends Transaction {
    name?: string
    description?: string
}

export interface WalletCreateTransaction extends Transaction {
    name: string,
    network: Network,
    uid: string
}

export interface PolicyCreateTransaction extends Transaction {
    uid: string,
    member_threshold: number,
    amount_threshold: bigint,
    wallets: Array<string>,
    currency: Currency,
}

export interface PolicyUpdateTransaction extends Transaction {
    uid: string,
    member_threshold: number,
    amount_threshold: bigint,
}

export interface PolicyRemoveTransaction extends Transaction {
    uid: string,
}

export interface TransferTransaction extends Transaction {
    currency: Currency,
    address: string,
    wallet: string,
    amount: bigint,
    policy: string | undefined
    blockIndex: bigint | undefined
}

export interface TransferQuorumTransaction extends Transaction {
    currency: Currency,
    address: string,
    wallet: string,
    amount: bigint,
    blockIndex: bigint | undefined
}

export interface TopUpTransaction extends Transaction {
    currency: Currency,
    wallet: string,
    amount: bigint,
    blockIndex?: bigint
}

export interface WalletUpdateNameTransaction extends Transaction {
    name: string,
    uid: string
}

export interface ControllersUpdateTransaction extends Transaction {
    principals: Array<Principal>
    current_controllers: Array<Principal>
}

export interface PurgeTransaction extends Transaction {
}

export function transactionCandidToTransaction(trs: TransactionCandid): Transaction {
    if (hasOwnProperty(trs, "QuorumUpdateTransactionV")) {
        let response = trs.QuorumUpdateTransactionV as QuorumUpdateTransactionCandid
        let transaction: QuorumUpdateTransaction = {
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            quorum: response.quorum,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.QuorumUpdate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "UpgradeTransactionV")) {
        let response = trs.UpgradeTransactionV as VersionUpgradeCandid
        let transaction: VersionUpgradeTransaction = {
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            version: response.version,
            initial_version: response.initial_version,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.VersionUpgrade,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "VaultNamingUpdateTransactionV")) {
        let response = trs.VaultNamingUpdateTransactionV as VaultNamingUpdateTransactionCandid
        let transaction: VaultUpdateNamingTransaction = {
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            name: response.name.length === 0 ? undefined : response.name[0],
            description: response.description.length === 0 ? undefined : response.description[0],
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.VaultNamingUpdate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "MemberCreateTransactionV")) {
        let response = trs.MemberCreateTransactionV as MemberCreateTransactionCandid
        let transaction: MemberCreateTransaction = {
            memberId: response.member_id,
            name: response.name,
            role: candidToRole(response.role),
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.MemberCreate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "MemberUpdateNameTransactionV")) {
        let response = trs.MemberUpdateNameTransactionV as MemberUpdateNameTransactionCandid
        let transaction: MemberUpdateNameTransaction = {
            memberId: response.member_id,
            name: response.name,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.MemberUpdateName,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "MemberUpdateRoleTransactionV")) {
        let response = trs.MemberUpdateRoleTransactionV as MemberUpdateRoleTransactionCandid
        let transaction: MemberUpdateRoleTransaction = {
            memberId: response.member_id,
            role: candidToRole(response.role),
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.MemberUpdateRole,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "MemberRemoveTransactionV")) {
        let response = trs.MemberRemoveTransactionV as MemberRemoveTransactionCandid
        let transaction: MemberRemoveTransaction = {
            memberId: response.member_id,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.MemberRemove,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "WalletCreateTransactionV")) {
        let response = trs.WalletCreateTransactionV as WalletCreateTransactionCandid
        let transaction: WalletCreateTransaction = {
            name: response.name,
            uid: response.uid,
            network: candidToNetwork(response.network),
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.WalletCreate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "WalletUpdateNameTransactionV")) {
        let response = trs.WalletUpdateNameTransactionV as WalletUpdateNameTransactionCandid
        let transaction: WalletUpdateNameTransaction = {
            name: response.name,
            uid: response.uid,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.WalletUpdateName,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "PolicyCreateTransactionV")) {
        let response = trs.PolicyCreateTransactionV as PolicyCreateTransactionCandid
        let transaction: PolicyCreateTransaction = {
            amount_threshold: response.amount_threshold,
            currency: Currency.ICP, //TODO
            member_threshold: response.member_threshold,
            wallets: response.wallets,
            uid: response.uid,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.PolicyCreate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            memo: response.common.memo.length === 0 ? undefined : response.common.memo[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "PolicyUpdateTransactionV")) {
        let response = trs.PolicyUpdateTransactionV as PolicyUpdateTransactionCandid
        let transaction: PolicyUpdateTransaction = {
            amount_threshold: response.amount_threshold,
            member_threshold: response.member_threshold,
            uid: response.uid,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.PolicyUpdate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "PolicyRemoveTransactionV")) {
        let response = trs.PolicyRemoveTransactionV as PolicyRemoveTransactionCandid
        let transaction: PolicyRemoveTransaction = {
            uid: response.uid,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.PolicyRemove,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "TransferTransactionV")) {
        let response = trs.TransferTransactionV as TransferTransactionCandid
        let transaction: TransferTransaction = {
            address: response.address,
            amount: response.amount,
            currency: Currency.ICP, //TODO
            wallet: response.wallet,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.Transfer,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            memo: response.common.memo.length === 0 ? undefined : response.common.memo[0],
            policy: response.policy.length === 0 ? undefined : response.policy[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0],
            blockIndex: response.block_index.length === 0 ? undefined : response.block_index[0],
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "TransferQuorumTransactionV")) {
        let response = trs.TransferQuorumTransactionV as TransferQuorumTransactionCandid
        let transaction: TransferQuorumTransaction = {
            address: response.address,
            amount: response.amount,
            currency: Currency.ICP, //TODO
            wallet: response.wallet,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.TransferQuorum,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            memo: response.common.memo.length === 0 ? undefined : response.common.memo[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0],
            blockIndex: response.block_index.length === 0 ? undefined : response.block_index[0],
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "TopUpTransactionV")) {
        let response = trs.TopUpTransactionV as TopUpTransactionCandid
        let transaction: TopUpTransaction = {
            amount: response.amount,
            currency: Currency.ICP, //TODO
            wallet: response.wallet,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.TopUp,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            memo: response.common.memo.length === 0 ? undefined : response.common.memo[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0],
            blockIndex: response.block_index.length === 0 ? undefined : response.block_index[0],
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "PurgeTransactionV")) {
        let response = trs.PurgeTransactionV as TopUpTransactionCandid
        let transaction: PurgeTransaction = {
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.Purge,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            memo: response.common.memo.length === 0 ? undefined : response.common.memo[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0],
        }
        return transaction;
    }
    if (hasOwnProperty(trs, "ControllersUpdateTransactionV")) {
        let response = trs.ControllersUpdateTransactionV as ControllersUpdateTransactionCandid
        let transaction: ControllersUpdateTransaction = {
            principals: response.principals,
            current_controllers: response.current_controllers,
            approves: response.common.approves.map(candidToApprove),
            batchUid: response.common.batch_uid.length === 0 ? undefined : response.common.batch_uid[0],
            createdDate: response.common.created_date,
            id: response.common.id,
            initiator: response.common.initiator,
            isVaultState: response.common.is_vault_state,
            modifiedDate: response.common.modified_date,
            state: candidToTransactionState(response.common.state),
            transactionType: TransactionType.ControllerUpdate,
            threshold: response.common.threshold.length === 0 ? undefined : response.common.threshold[0],
            memo: response.common.memo.length === 0 ? undefined : response.common.memo[0],
            error: response.common.error.length === 0 ? undefined : response.common.error[0]
        }
        return transaction;
    }
    throw Error("Unexpected transaction type: " + JSON.stringify(trs))
}
