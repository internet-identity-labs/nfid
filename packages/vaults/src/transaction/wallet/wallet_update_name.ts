import { TransactionType } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  TransactionRequest as TransactionRequestCandid,
  WalletUpdateNameTransaction as TransactionCandid,
} from "../../idl/service_vault"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { RequestMapperAbstract } from "../request_mapper"

/**
 * Interface for a transaction that updates the name of an existing wallet.
 * This transaction can be created or approved by an admin.
 * This transaction can be executed in a batch.
 */
export interface WalletUpdateNameTransaction extends Transaction {
  /**
   * The new name of the wallet.
   */
  name: string

  /**
   * The unique identifier of the wallet to be updated.
   */
  uid: string
}

export class WalletUpdateNameTransactionRequest implements TransactionRequest {
  uid: string
  name: string
  batch_uid: string | undefined

  constructor(name: string, uid: string, batch_uid?: string) {
    this.uid = uid
    this.name = name
    this.batch_uid = batch_uid
  }

  getType(): string {
    return "WalletUpdateNameTransactionRequest"
  }
}

export class WalletUpdateNameTransactionMapper extends TransactionMapperAbstract<TransactionCandid> {
  getVariant(): PropertyKey {
    return "WalletUpdateNameTransactionV"
  }

  convert(candid: TransactionCandid): WalletUpdateNameTransaction {
    return {
      name: candid.name,
      uid: candid.uid,
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.WalletUpdateName
  }
}

export class WalletUpdateNameRequestMapper extends RequestMapperAbstract {
  toCandid(request: WalletUpdateNameTransactionRequest): TransactionRequestCandid {
    return {
      WalletUpdateNameTransactionRequestV: {
        name: request.name,
        uid: request.uid,
        batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : [],
      },
    }
  }

  getMappedRequestType(): string {
    return "WalletUpdateNameTransactionRequest"
  }
}
