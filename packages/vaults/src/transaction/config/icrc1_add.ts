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
 * Transaction for adding ICRC1 canisters to vault.
 * Can be requested/approved only by users with the admin role.
 * This transaction can be executed in a batch,
 * which means either all transactions marked with a single batch_id
 * are executed or rejected together.
 * This transaction requires onl 1 approval.
 */
export interface ICRC1CanistersAddTransaction extends Transaction {
  /**
   * The ledger canister id.
   */
  ledger_canister: Principal

  /**
   * The index canister id. Optional.
   */
  index_canister?: Principal
}

export class ICRC1CanistersAddTransactionRequest implements TransactionRequest {
  ledger_canister: Principal
  index_canister: Principal | undefined
  batch_uid: string | undefined

  constructor(ledger_canister: Principal, index_canister?: Principal, batch_uid?: string) {
    this.ledger_canister = ledger_canister
    this.index_canister = index_canister
    this.batch_uid = batch_uid
  }

  getType(): string {
    return "ICRC1CanistersAddTransactionRequest"
  }
}

export class ICRC1CanistersAddTransactionMapper extends TransactionMapperAbstract<TransactionCandid> {
  getVariant(): PropertyKey {
    return "ICRC1CanistersAddTransactionV"
  }

  convert(candid: TransactionCandid): ICRC1CanistersAddTransaction {
    return {
      ledger_canister: candid.ledger_canister,
      index_canister: candid.index_canister.length === 0 ? undefined : candid.index_canister[0],
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.ICRC1AddCanisters
  }
}

export class ICRC1CanistersAddTransactionRequestMapper extends RequestMapperAbstract {
  toCandid(request: ICRC1CanistersAddTransactionRequest): TransactionRequestCandid {
    return {
      ICRC1CanistersAddTransactionRequestV: {
        ledger_canister: request.ledger_canister,
        index_canister: request.index_canister !== undefined ? [request.index_canister] : [],
        batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : [],
      },
    }
  }
  getMappedRequestType(): string {
    return "ICRC1CanistersAddTransactionRequest"
  }
}
