import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    PurgeTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";

/**
 * Use this method to clear all transactions from the current queue of those awaiting approval.
 * It is meant to be used only in emergency situations if something unexpected happens
 * and transactions end up stuck in a non-approvable state.
 * Can be requested/approved only by users with the admin role.
 * All blocked transactions will be removed.
 * The transaction is executed outside the queue.
 * Can be requested/approved only by users with the admin role.
 */
export interface PurgeTransaction extends Transaction {
}


export class PurgeTransactionRequest implements TransactionRequest {
    getType(): string {
        return "PurgeTransactionRequest";
    }
}

export class PurgeTransactionMapper extends TransactionMapperAbstract<TransactionCandid, PurgeTransaction> {
    getVariant(): PropertyKey {
        return "PurgeTransactionV";
    }

    convert(candid: TransactionCandid): PurgeTransaction {
        return {
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.Purge;
    }

}

export class PurgeRequestMapper extends RequestMapperAbstract{
    toCandid(request: PurgeTransactionRequest): TransactionRequestCandid {
        return {
            PurgeTransactionRequestV: {
            }
        }
    }
    getMappedRequestType(): string {
        return "PurgeTransactionRequest";
    }
}




