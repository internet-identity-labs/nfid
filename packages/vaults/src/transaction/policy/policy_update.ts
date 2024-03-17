import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    PolicyUpdateTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface PolicyUpdateTransaction extends Transaction {
    uid: string,
    member_threshold: number,
    amount_threshold: bigint,
}


export class PolicyUpdateTransactionRequest implements TransactionRequest {
    uid: string;
    member_threshold: number;
    amount_threshold: bigint;
    batch_uid: string | undefined

    constructor(uid: string, member_threshold: number, amount_threshold: bigint, batch_uid?: string) {
        this.uid = uid
        this.member_threshold = member_threshold
        this.amount_threshold = amount_threshold
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            PolicyUpdateTransactionRequestV: {
                uid: this.uid,
                member_threshold: this.member_threshold,
                amount_threshold: this.amount_threshold,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []

            }
        }
    }
}


export class PolicyUpdateTransactionMapper extends TransactionMapperAbstract<TransactionCandid, PolicyUpdateTransaction> {
    getVariant(): PropertyKey {
        return "PolicyUpdateTransactionV";
    }

    convert(candid: TransactionCandid): PolicyUpdateTransaction {
        return {
            amount_threshold: candid.amount_threshold,
            member_threshold: candid.member_threshold,
            uid: candid.uid,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.PolicyUpdate;
    }

}




