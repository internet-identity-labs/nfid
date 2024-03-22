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


export interface MemberUpdateNameTransaction extends Transaction {
    memberId: string;
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




