import {TransactionType, VaultRole} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    MemberCreateTransaction as MemberCreateTransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {candidToRole, roleToCandid} from "../../util/helper";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";

/**
 * Interface for a transaction that creates a new member.
 * The memberId is the principal of the user with the default subaccount.
 * (https://github.com/dfinity/ic-js/blob/86d0fafd012fb3c3b3ef31c8aa4000cb6ff87c28/packages/nns/src/account_identifier.ts#L67)
 * This transaction can only be requested or approved only by users with the admin role.
 * This transaction can be executed in a batch
 */
export interface MemberCreateTransaction extends Transaction {
    /**
     * The ID of the member to be created.
     */
    memberId: string

    /**
     * The name of the member to be created.
     */
    name: string

    /**
     * The role of the member to be created.
     */
    role: VaultRole
}

export class MemberCreateTransactionRequest implements TransactionRequest {
    member_id: string
    name: string
    role: VaultRole
    batch_uid: string | undefined

    constructor(member: string, name: string, role: VaultRole, batch_uid?: string) {
        this.member_id = member
        this.name = name
        this.role = role
        this.batch_uid = batch_uid
    }

    getType(): string {
        return "MemberCreateTransactionRequest";
    }
}

export class MemberCreateTransactionMapper extends TransactionMapperAbstract<MemberCreateTransactionCandid, MemberCreateTransaction> {
    getVariant(): PropertyKey {
        return "MemberCreateTransactionV";
    }

    convert(candid: MemberCreateTransactionCandid): MemberCreateTransaction {
        return {
            memberId: candid.member_id,
            name: candid.name,
            role: candidToRole(candid.role),
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.MemberCreate;
    }

}

export class MemberCreateRequestMapper extends RequestMapperAbstract {
    toCandid(request: MemberCreateTransactionRequest): TransactionRequestCandid {
        return {
            MemberCreateTransactionRequestV: {
                member_id: request.member_id,
                name: request.name,
                role: roleToCandid(request.role),
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }

    getMappedRequestType(): string {
        return "MemberCreateTransactionRequest";
    }
}




