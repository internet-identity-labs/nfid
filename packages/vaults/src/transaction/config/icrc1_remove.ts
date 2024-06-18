import { TransactionType } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  TransactionRequest as TransactionRequestCandid,
  ICRC1CanistersAddTransaction as TransactionCandid,
} from "../../idl/service_vault"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { RequestMapperAbstract } from "../request_mapper"
import { Principal } from "@dfinity/principal"

/**
 * Transaction for removing ICRC1 canisters from vault.
 * Can be requested/approved only by users with the admin role.
 * This transaction can be executed in a batch,
 * which means either all transactions marked with a single batch_id
 * are executed or rejected together.
 * This transaction requires onl 1 approval.
 */
export interface ICRC1CanistersRemoveTransaction extends Transaction {
  /**
   * The ledger canister id.
   */
  ledger_canister: Principal
}

export class ICRC1CanistersRemoveTransactionRequest implements TransactionRequest {
  ledger_canister: Principal
  batch_uid: string | undefined

  constructor(ledger_canister: Principal, batch_uid?: string) {
    this.ledger_canister = ledger_canister
    this.batch_uid = batch_uid
  }

  getType(): string {
    return "ICRC1CanistersRemoveTransactionRequest"
  }
}

export class ICRC1CanistersRemoveTransactionMapper extends TransactionMapperAbstract<TransactionCandid> {
  getVariant(): PropertyKey {
    return "ICRC1CanistersRemoveTransactionV"
  }

  convert(candid: TransactionCandid): ICRC1CanistersRemoveTransaction {
    return {
      ledger_canister: candid.ledger_canister,
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.ICRC1RemoveCanisters
  }
}

export class ICRC1CanistersRemoveTransactionRequestMapper extends RequestMapperAbstract {
  toCandid(request: ICRC1CanistersRemoveTransactionRequest): TransactionRequestCandid {
    return {
      ICRC1CanistersRemoveTransactionRequestV: {
        ledger_canister: request.ledger_canister,
        batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : [],
      },
    }
  }
  getMappedRequestType(): string {
    return "ICRC1CanistersRemoveTransactionRequest"
  }
}
