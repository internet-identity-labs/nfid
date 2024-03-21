import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    QuorumUpdateTransaction as TransactionCandid,
    TransactionRequest as RequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapper, RequestMapperAbstract} from "../request_mapper";


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

    getType(): string {
        return "QuorumTransactionRequest";
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


export class QuorumUpdateRequestMapper  extends RequestMapperAbstract {

    toCandid(request: QuorumTransactionRequest): RequestCandid {
        return {
            QuorumUpdateTransactionRequestV: {
                quorum: request.quorum,
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }
    getMappedRequestType(): string {
        return "QuorumTransactionRequest";
    }
}




