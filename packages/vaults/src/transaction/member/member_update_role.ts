import {TransactionType, VaultRole} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    MemberUpdateRoleTransaction as MemberUpdateRoleTransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {candidToRole, roleToCandid} from "../../util/helper";


export interface MemberUpdateRoleTransaction extends Transaction {
    memberId: string;
    role: VaultRole;
}

export class MemberUpdateRoleTransactionRequest implements TransactionRequest {
    member_id: string
    role: VaultRole
    batch_uid: string | undefined

    constructor(member_id: string, role: VaultRole, batch_uid?: string) {
        this.member_id = member_id
        this.role = role
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            MemberUpdateRoleTransactionRequestV: {
                member_id: this.member_id, role: roleToCandid(this.role),
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class MemberUpdateRoleTransactionMapper extends TransactionMapperAbstract<MemberUpdateRoleTransactionCandid, MemberUpdateRoleTransaction> {

    getVariant(): PropertyKey {
        return "MemberUpdateRoleTransactionV";
    }

    convert(candid: MemberUpdateRoleTransactionCandid): MemberUpdateRoleTransaction {
        return {
            memberId: candid.member_id,
            role: candidToRole(candid.role),
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.MemberUpdateRole;
    }
}

export class MemberUpdateRoleRequestMapper {
    toCandid(request: MemberUpdateRoleTransactionRequest): TransactionRequestCandid {
        return {
            MemberUpdateRoleTransactionRequestV: {
                member_id: request.member_id, role: roleToCandid(request.role),
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }
}




