import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    QuorumUpdateTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface QuorumUpdateTransaction extends Transaction {
    quorum: number
}


export class QuorumTransactionRequest implements TransactionRequest {
    quorum: number
    batch_uid: string | undefined


    constructor(quorum: number, batch_uid?: string) {
        this.quorum = quorum
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            QuorumUpdateTransactionRequestV: {
                quorum: this.quorum,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class QuorumUpdateTransactionMapper extends TransactionMapperAbstract<TransactionCandid, QuorumUpdateTransaction> {
    getVariant(): PropertyKey {
        return "QuorumUpdateTransactionV";
    }

    convert(candid: TransactionCandid): QuorumUpdateTransaction {
        return {
            quorum: candid.quorum,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.QuorumUpdate;
    }

}




