import { TransactionType, VaultRole } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  MemberUpdateRoleTransaction as MemberUpdateRoleTransactionCandid,
  TransactionRequest as TransactionRequestCandid,
} from "../../idl/service_vault"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { candidToRole, roleToCandid } from "../../util/helper"
import { RequestMapperAbstract } from "../request_mapper"

/**
 * Interface for a transaction that updates role of an existing member.
 * The memberId is the principal of the user with the default subaccount.
 * This transaction can only be requested or approved only by users with the admin role.
 * This transaction can be executed in a batch
 */
export interface MemberUpdateRoleTransaction extends Transaction {
  /**
   * The ID of the member to be updated.
   */
  memberId: string
  /**
   * The new role of the member.
   */
  role: VaultRole
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

  getType(): string {
    return "MemberUpdateRoleTransactionRequest"
  }
}

export class MemberUpdateRoleTransactionMapper extends TransactionMapperAbstract<MemberUpdateRoleTransactionCandid> {
  getVariant(): PropertyKey {
    return "MemberUpdateRoleTransactionV"
  }

  convert(candid: MemberUpdateRoleTransactionCandid): MemberUpdateRoleTransaction {
    return {
      memberId: candid.member_id,
      role: candidToRole(candid.role),
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.MemberUpdateRole
  }
}

export class MemberUpdateRoleRequestMapper extends RequestMapperAbstract {
  toCandid(request: MemberUpdateRoleTransactionRequest): TransactionRequestCandid {
    return {
      MemberUpdateRoleTransactionRequestV: {
        member_id: request.member_id,
        role: roleToCandid(request.role),
        batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : [],
      },
    }
  }

  getMappedRequestType(): string {
    return "MemberUpdateRoleTransactionRequest"
  }
}
