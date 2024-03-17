import {TransactionType, VaultRole} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    MemberRemoveTransaction as MemberRemoveTransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface MemberRemoveTransaction extends Transaction {
    memberId: string;
}


export class MemberRemoveTransactionRequest implements TransactionRequest {
    member_id: string
    batch_uid: string | undefined

    constructor(member_id: string, role: VaultRole, batch_uid?: string) {
        this.member_id = member_id
        this.batch_uid = batch_uid

    }

    toCandid(): TransactionRequestCandid {
        return {
            MemberRemoveTransactionRequestV: {
                member_id: this.member_id,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}


export class MemberRemoveTransactionMapper extends TransactionMapperAbstract<MemberRemoveTransactionCandid, MemberRemoveTransaction> {

    getVariant(): PropertyKey {
        return "MemberRemoveTransactionV";
    }

    convert(candid: MemberRemoveTransactionCandid): MemberRemoveTransaction {
        return {
            memberId: candid.member_id,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.MemberUpdateRole;
    }

}




