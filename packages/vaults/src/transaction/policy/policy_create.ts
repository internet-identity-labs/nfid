import {Currency, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    PolicyCreateTransaction as TransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface PolicyCreateTransaction extends Transaction {
    uid: string,
    member_threshold: number,
    amount_threshold: bigint,
    wallets: Array<string>,
    currency: Currency,
}


export class PolicyCreateTransactionRequest implements TransactionRequest {
    uid: string
    member_threshold: number;
    amount_threshold: bigint;
    wallets: Array<string>;
    batch_uid: string | undefined

    constructor(uid: string, member_threshold: number, amount_threshold: bigint, wallets: Array<string>, batch_uid?: string) {
        this.member_threshold = member_threshold
        this.amount_threshold = amount_threshold
        this.wallets = wallets
        this.batch_uid = batch_uid
        this.uid = uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            PolicyCreateTransactionRequestV: {
                uid: this.uid,
                member_threshold: this.member_threshold,
                amount_threshold: this.amount_threshold,
                wallets: this.wallets,
                currency: {'ICP': null}, //TODO
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}


export class PolicyCreateTransactionMapper extends TransactionMapperAbstract<TransactionCandid, PolicyCreateTransaction> {
    getVariant(): PropertyKey {
        return "PolicyCreateTransactionV";
    }

    convert(candid: TransactionCandid): PolicyCreateTransaction {
        return {
            amount_threshold: candid.amount_threshold,
            currency: Currency.ICP, //TODO
            member_threshold: candid.member_threshold,
            wallets: candid.wallets,
            uid: candid.uid,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.PolicyCreate;
    }

}




