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


export interface MemberCreateTransaction extends Transaction {
    memberId: string;
    name: string;
    role: VaultRole;
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




