import {TransactionType, VaultRole} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    MemberCreateTransaction as MemberCreateTransactionCandid,
    TransactionRequest as TransactionRequestCandid
} from "../../idl/service_vault";
import {candidToRole, roleToCandid} from "../../util/helper";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


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

    toCandid(): TransactionRequestCandid {
        return {
            MemberCreateTransactionRequestV: {
                member_id: this.member_id, name: this.name, role: roleToCandid(this.role),
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
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




