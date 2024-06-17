import { TransactionType, VaultRole } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  MemberCreateTransactionV2 as MemberCreateTransactionV2Candid,
  SubAccount,
  TransactionRequest as TransactionRequestCandid,
} from "../../idl/service_vault"
import { candidToRole, roleToCandid } from "../../util/helper"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { RequestMapperAbstract } from "../request_mapper"
import { Principal } from "@dfinity/principal"

/**
 * Interface for a transaction that creates a new member.
 * The memberId is the principal of the user with the default subaccount.
 * (https://github.com/dfinity/ic-js/blob/86d0fafd012fb3c3b3ef31c8aa4000cb6ff87c28/packages/nns/src/account_identifier.ts#L67)
 * This transaction can only be requested or approved only by users with the admin role.
 * This transaction can be executed in a batch
 */

export interface MemberCreateTransactionV2 extends Transaction {
  /**
   * The ICRC1 account of the member to be created.
   */
  account: {
    owner: Principal
    subaccount: undefined | Uint8Array | number[]
  }

  /**
   * The name of the member to be created.
   */
  name: string

  /**
   * The role of the member to be created.
   */
  role: VaultRole
}

export class MemberCreateTransactionRequestV2 implements TransactionRequest {
  account: {
    owner: Principal
    subaccount: undefined | Uint8Array | number[]
  }
  name: string
  role: VaultRole
  batch_uid: string | undefined

  constructor(
    account: { owner: Principal; subaccount: undefined | Uint8Array | number[] },
    name: string,
    role: VaultRole,
    batch_uid?: string
  ) {
    this.account = account
    this.name = name
    this.role = role
    this.batch_uid = batch_uid
  }

  getType(): string {
    return "MemberCreateTransactionRequestV2"
  }
}

export class MemberCreateTransactionMapperV2 extends TransactionMapperAbstract<MemberCreateTransactionV2Candid> {
  getVariant(): PropertyKey {
    return "MemberCreateTransactionV2"
  }

  convert(candid: MemberCreateTransactionV2Candid): MemberCreateTransactionV2 {
    return {
      account: {
        owner: candid.account.owner,
        subaccount: candid.account.subaccount[0],
      },
      name: candid.name,
      role: candidToRole(candid.role),
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.MemberCreateV2
  }
}

export class MemberCreateRequestMapperV2 extends RequestMapperAbstract {
  toCandid(request: MemberCreateTransactionRequestV2): TransactionRequestCandid {
    const subaccount: [] | [SubAccount] =
      request.account.subaccount === undefined ? [] : [request.account.subaccount]
    const account: {
      owner: Principal
      subaccount: [] | [SubAccount]
    } = {
      owner: request.account.owner,
      subaccount,
    }
    return {
      MemberCreateTransactionRequestV2: {
        account,
        name: request.name,
        role: roleToCandid(request.role),
        batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : [],
      },
    }
  }

  getMappedRequestType(): string {
    return "MemberCreateTransactionRequestV2"
  }
}
