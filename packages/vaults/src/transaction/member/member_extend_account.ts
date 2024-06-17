import {TransactionType} from "../../enum/enums"
import {Transaction} from "../transaction"
import {
    MemberExtendICRC1AccountTransaction as MemberExtendICRC1AccountTransactionCandid,
    SubAccount,
    TransactionRequest as TransactionRequestCandid,
} from "../../idl/service_vault"
import {TransactionMapperAbstract} from "../transaction_mapper"
import {TransactionRequest} from "../transaction_request"
import {RequestMapperAbstract} from "../request_mapper"
import {Principal} from "@dfinity/principal";

/**
 * Interface for a transaction that extends a member with missed account ID.
 */

export interface MemberExtendICRC1AccountTransaction extends Transaction {
    /**
     * The ICRC1 account of the member to be created.
     */
    account: {
        owner: Principal
        subaccount: undefined | Uint8Array | number[]
    }
}

export class MemberExtendICRC1AccountRequest implements TransactionRequest {
    account: {
        owner: Principal
        subaccount: undefined | Uint8Array | number[]
    }
    batch_uid: string | undefined

    constructor(account: { owner: Principal, subaccount: undefined | Uint8Array | number[] }, batch_uid?: string) {
        this.account = account
        this.batch_uid = batch_uid
    }

    getType(): string {
        return "MemberExtendICRC1AccountRequest"
    }
}

export class MemberExtendAccountTransactionMapper extends TransactionMapperAbstract<MemberExtendICRC1AccountTransactionCandid> {
    getVariant(): PropertyKey {
        return "MemberExtendICRC1AccountTransactionV"
    }

    convert(candid: MemberExtendICRC1AccountTransactionCandid): MemberExtendICRC1AccountTransaction {
        return {
            account: {
                owner: candid.account.owner,
                subaccount: candid.account.subaccount[0],
            },
            ...this.basicFieldsConvert(candid.common),
        }
    }

    getType(): TransactionType {
        return TransactionType.MemberExtendICRC1Account
    }
}

export class MemberExtendICRC1AccountRequestMapper extends RequestMapperAbstract {
    toCandid(request: MemberExtendICRC1AccountRequest): TransactionRequestCandid {
        const subaccount: [] | [SubAccount] = request.account.subaccount === undefined ? [] : [request.account.subaccount]
        const account: {
            'owner': Principal,
            'subaccount': [] | [SubAccount],
        } = {
            owner: request.account.owner,
            subaccount,
        }
        return {
            MemberExtendICRC1AccountRequestV: {
                account,
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : [],
            },
        }
    }

    getMappedRequestType(): string {
        return "MemberExtendICRC1AccountRequest"
    }
}
