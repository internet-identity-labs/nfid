import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    PurgeTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface PurgeTransaction extends Transaction {
}


export class PurgeTransactionRequest implements TransactionRequest {

    toCandid(): TransactionRequestCandid {
        return {
            PurgeTransactionRequestV: {}
        }
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




