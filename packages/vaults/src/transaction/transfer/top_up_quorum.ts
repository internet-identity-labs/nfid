import { Currency, TransactionType } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  TransactionRequest as TransactionRequestCandid,
  TopUpTransaction as TransactionCandid,
} from "../../idl/service_vault"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { RequestMapperAbstract } from "../request_mapper"

/**
 * Interface for a transaction that tops up the number of cycles in a vault canister.
 * The top-up is done by converting ICP from the specified wallet.
 * Threshold is equal to current quorum value.
 * This transaction can be created or approved by an admin.
 */
export interface TopUpQuorumTransaction extends Transaction {
  /**
   * The currency used for the top-up.
   */
  currency: Currency

  /**
   * The wallet from which the ICP is converted.
   */
  wallet: string

  /**
   * The amount of ICP to be converted.
   */
  amount: bigint

  /**
   * The block index. Optional.
   */
  blockIndex?: bigint
}

export class TopUpQuorumTransactionRequest implements TransactionRequest {
  currency: Currency
  wallet: string
  amount: bigint

  constructor(currency: Currency, wallet: string, amount: bigint) {
    this.currency = currency
    this.wallet = wallet
    this.amount = amount
  }

  getType(): string {
    return "TopUpQuorumTransactionRequest"
  }
}

export class TopUpQuorumTransactionMapper extends TransactionMapperAbstract<TransactionCandid> {
  getVariant(): PropertyKey {
    return "TopUpQuorumTransactionV"
  }

  convert(candid: TransactionCandid): TopUpQuorumTransaction {
    return {
      amount: candid.amount,
      currency: Currency.ICP, //TODO
      wallet: candid.wallet,
      blockIndex: candid.block_index.length === 0 ? undefined : candid.block_index[0],
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.TopUpQuorum
  }
}

export class TopUpQuorumRequestMapper extends RequestMapperAbstract {
  toCandid(request: TopUpQuorumTransactionRequest): TransactionRequestCandid {
    return {
      TopUpQuorumTransactionRequestV: {
        currency: { ICP: null },
        wallet: request.wallet,
        amount: request.amount,
      },
    }
  }

  getMappedRequestType(): string {
    return "TopUpQuorumTransactionRequest"
  }
}
