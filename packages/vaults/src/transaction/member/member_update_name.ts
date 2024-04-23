import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    MemberCreateTransaction as MemberCreateTransactionCandid,
    MemberUpdateNameTransaction as MemberUpdateNameTransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";

/**
 * Interface for a transaction that updates name of an existing member.
 * The memberId is the principal of the user with the default subaccount.
 * This transaction can only be created or approved by an admin.
 * This transaction can be executed in a batch
 */
export interface MemberUpdateNameTransaction extends Transaction {
    /**
     * The ID of the member to be updated.
     */
    memberId: string;
    /**
     * The new name of the member.
     */
    name: string;
}

export class MemberUpdateNameTransactionRequest implements TransactionRequest {
    member_id: string
    name: string
    batch_uid: string | undefined

    constructor(member: string, name: string, batch_uid?: string) {
        this.member_id = member
        this.name = name
        this.batch_uid = batch_uid
    }

    getType(): string {
        return "MemberUpdateNameTransactionRequest";
    }

}

export class MemberUpdateNameTransactionMapper extends TransactionMapperAbstract<MemberUpdateNameTransactionCandid, MemberUpdateNameTransaction> {

    getVariant(): PropertyKey {
        return "MemberUpdateNameTransactionV";
    }

    convert(candid: MemberCreateTransactionCandid): MemberUpdateNameTransaction {
        return {
            memberId: candid.member_id,
            name: candid.name,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.MemberUpdateName;
    }

}

export class MemberUpdateNameRequestMapper extends RequestMapperAbstract {
    toCandid(request: MemberUpdateNameTransactionRequest): TransactionRequestCandid {
        return {
            MemberUpdateNameTransactionRequestV: {
                member_id: request.member_id,
                name: request.name,
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }

    getMappedRequestType(): string {
        return "MemberUpdateNameTransactionRequest";
    }
}




