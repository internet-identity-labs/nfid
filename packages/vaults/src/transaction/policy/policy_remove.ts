import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    PolicyRemoveTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";


/**
 * Interface for a transaction that removes an existing policy.
 * This transaction can only be requested or approved only by users with the admin role.
 * This transaction can be executed in a batch.
 */
export interface PolicyRemoveTransaction extends Transaction {
    /**
     * The unique identifier of the policy to be removed.
     */
    uid: string
}

export class PolicyRemoveTransactionRequest implements TransactionRequest {
    uid: string;
    batch_uid: string | undefined

    constructor(uid: string, batch_uid?: string) {
        this.uid = uid
        this.batch_uid = batch_uid
    }

    getType(): string {
        return "PolicyRemoveTransactionRequest";
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

export class PolicyRemoveRequestMapper extends RequestMapperAbstract {
    toCandid(request: PolicyRemoveTransactionRequest): TransactionRequestCandid {
        return {
            PolicyRemoveTransactionRequestV: {
                uid: request.uid,
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }

    getMappedRequestType(): string {
        return "PolicyRemoveTransactionRequest";
    }
}




