import {TransactionState, TransactionType} from "../enum/enums";
import {VaultError} from "../idl/service_vault";
import {Approve} from "../approve/approve";

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
    batchUid: string | undefined;
    threshold: number | undefined
    error?: VaultError
}

