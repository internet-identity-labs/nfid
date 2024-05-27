import { Currency, TransactionType } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  TransactionRequest as TransactionRequestCandid,
  TransferTransaction as TransactionCandid,
} from "../../idl/service_vault"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { RequestMapperAbstract } from "../request_mapper"

/**
 * Interface for a transaction that transfers assets.
 * This transaction requires created policy for the wallet.
 * This transaction can be created or approved by an admin/member.
 */
export interface TransferTransaction extends Transaction {
  /**
   * The currency used for the transfer.
   */
  currency: Currency

  /**
   * The address to which assets are transferred.
   */
  address: string

  /**
   * The walletID from which the currency is transferred.
   */
  wallet: string

  /**
   * The amount of assets to be transferred.
   */
  amount: bigint

  /**
   * The policy under which the transfer is made. Will be set up when transaction is unblocked.
   */
  policy: string | undefined

  /**
   * The block index. After the execution.
   */
  blockIndex: bigint | undefined
}

export class TransferTransactionRequest implements TransactionRequest {
  currency: Currency
  address: string
  wallet: string
  amount: bigint
  memo: string | undefined

  constructor(currency: Currency, address: string, wallet: string, amount: bigint, memo?: string) {
    this.currency = currency
    this.address = address
    this.wallet = wallet
    this.amount = amount
    this.memo = memo
  }

  getType(): string {
    return "TransferTransactionRequest"
  }
}

export class TransferTransactionMapper extends TransactionMapperAbstract<TransactionCandid> {
  getVariant(): PropertyKey {
    return "TransferTransactionV"
  }

  convert(candid: TransactionCandid): TransferTransaction {
    return {
      address: candid.address,
      amount: candid.amount,
      currency: Currency.ICP, //TODO
      wallet: candid.wallet,
      policy: candid.policy.length === 0 ? undefined : candid.policy[0],
      blockIndex: candid.block_index.length === 0 ? undefined : candid.block_index[0],
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.Transfer
  }
}

export class TransferRequestMapper extends RequestMapperAbstract {
  toCandid(request: TransferTransactionRequest): TransactionRequestCandid {
    return {
      TransferTransactionRequestV: {
        //TODO
        currency: { ICP: null },
        address: request.address,
        wallet: request.wallet,
        amount: request.amount,
        memo: request.memo !== undefined ? [request.memo] : [],
      },
    }
  }

  getMappedRequestType(): string {
    return "TransferTransactionRequest"
  }
}
