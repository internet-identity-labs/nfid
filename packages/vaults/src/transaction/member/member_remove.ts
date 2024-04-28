import {TransactionType, VaultRole} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    MemberRemoveTransaction as MemberRemoveTransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";

/**
 * Interface for a transaction that removes an existing member.
 * The memberId is the principal of the user with the default subaccount.
 * This transaction can only be requested or approved only by users with the admin role.
 * This transaction can be executed in a batch
 */
export interface MemberRemoveTransaction extends Transaction {
    /**
     * The ID of the member to be removed.
     */
    memberId: string;
}


export class MemberRemoveTransactionRequest implements TransactionRequest {
    member_id: string
    batch_uid: string | undefined

    constructor(member_id: string, batch_uid?: string) {
        this.member_id = member_id
        this.batch_uid = batch_uid

    }

    getType(): string {
        return "MemberRemoveTransactionRequest";
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
        return TransactionType.MemberRemove;
    }

}

export class MemberRemoveRequestMapper extends RequestMapperAbstract{
    toCandid(request: MemberRemoveTransactionRequest): TransactionRequestCandid {
        return {
            MemberRemoveTransactionRequestV: {
                member_id: request.member_id,
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }
    getMappedRequestType(): string {
        return "MemberRemoveTransactionRequest";
    }
}




