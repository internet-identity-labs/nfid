import {Transaction} from "./transaction/transaction";
import {Vault} from "./vault/vault";
import {TransactionRequest} from "./transaction/transaction_request";
import {ApproveRequest} from "./approve/approve";
import {Principal} from "@dfinity/principal";

export interface VaultManagerI {
    getTransactions(): Promise<Array<Transaction>>;

    getState(id?: BigInt): Promise<Vault>

    requestTransaction(requests: Array<TransactionRequest>): Promise<Array<Transaction>>

    approveTransaction(approve: Array<ApproveRequest>): Promise<Array<Transaction>>

    execute(): Promise<void>

    canisterBalance(): Promise<bigint>;

    getVersion(): Promise<string>

    getControllers(): Promise<Array<Principal>>
}