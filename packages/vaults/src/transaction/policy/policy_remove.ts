import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    PolicyRemoveTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface PolicyRemoveTransaction extends Transaction {
    uid: string,
}


export class PolicyRemoveTransactionRequest implements TransactionRequest {
    uid: string;
    batch_uid: string | undefined

    constructor(uid: string, batch_uid?: string) {
        this.uid = uid
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            PolicyRemoveTransactionRequestV: {
                uid: this.uid,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []

            }
        }
    }
}


export class PolicyRemoveTransactionMapper extends TransactionMapperAbstract<TransactionCandid, PolicyRemoveTransaction> {
    getVariant(): PropertyKey {
        return "PolicyRemoveTransactionV";
    }

    convert(candid: TransactionCandid): PolicyRemoveTransaction {
        return {
            uid: candid.uid,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.PolicyRemove;
    }

}




