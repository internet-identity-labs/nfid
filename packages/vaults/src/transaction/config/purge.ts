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
 * This type of transaction is used to clear the queue.
 * All blocked transactions will be removed.
 * The transaction is executed outside the queue.
 * Can be requested/approved only by admins.
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




