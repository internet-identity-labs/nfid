import { TransactionType } from "../../enum/enums"
import { Transaction } from "../transaction"
import {
  TransactionRequest as TransactionRequestCandid,
  TransferICRC1QuorumTransaction as TransactionCandid,
} from "../../idl/service_vault"
import { TransactionMapperAbstract } from "../transaction_mapper"
import { TransactionRequest } from "../transaction_request"
import { RequestMapperAbstract } from "../request_mapper"
import { Principal } from "@dfinity/principal"

/**
 * Interface for a transaction that transfers ICRC-1 tokens.
 * Requires amount of approvals equal to quorum.
 * This transaction can be created or approved only by an admin.
 */
export interface TransferICRC1QuorumTransaction extends Transaction {
  /**
   * The principal to which the tokens are transferred.
   */
  to_principal: Principal

  /**
   * The block index.
   */
  blockIndex: bigint | undefined

  /**
   * The subaccount to which the tokens are transferred. Optional.
   */
  to_subaccount: undefined | Uint8Array | number[]

  /**
   * The ID of the ICRC-1 ledger.
   */
  ledger_id: Principal

  /**
   * The walletID from which the tokens are transferred.
   */
  wallet: string

  /**
   * The amount of tokens to be transferred.
   */
  amount: bigint
}

export class TransferICRC1QuorumTransactionRequest implements TransactionRequest {
  toPrincipal: Principal
  ledgerId: Principal
  toSubaccount: undefined | Uint8Array | number[]
  wallet: string
  amount: bigint
  memo: string | undefined

  constructor(
    toPrincipal: Principal,
    toSubaccount: undefined | Uint8Array | number[],
    ledgerId: Principal,
    wallet: string,
    amount: bigint,
    memo?: string
  ) {
    this.toPrincipal = toPrincipal
    this.ledgerId = ledgerId
    this.toSubaccount = toSubaccount
    this.wallet = wallet
    this.amount = amount
    this.memo = memo
  }

  getType(): string {
    return "TransferICRC1QuorumTransactionRequest"
  }
}

export class TransferICRC1QuorumTransactionMapper extends TransactionMapperAbstract<TransactionCandid> {
  getVariant(): PropertyKey {
    return "TransferICRC1QuorumTransactionV"
  }

  convert(candid: TransactionCandid): TransferICRC1QuorumTransaction {
    return {
      ledger_id: candid.ledger_id,
      to_principal: candid.to_principal,
      to_subaccount: candid.to_subaccount.length === 0 ? undefined : candid.to_subaccount[0],
      amount: candid.amount,
      wallet: candid.wallet,
      blockIndex: candid.block_index.length === 0 ? undefined : BigInt(candid.block_index[0]),
      ...this.basicFieldsConvert(candid.common),
    }
  }

  getType(): TransactionType {
    return TransactionType.TransferICRC1Quorum
  }
}

export class TransferICRC1QuorumRequestMapper extends RequestMapperAbstract {
  toCandid(request: TransferICRC1QuorumTransactionRequest): TransactionRequestCandid {
    return {
      TransferICRC1QuorumTransactionRequestV: {
        to_principal: request.toPrincipal,
        to_subaccount: request.toSubaccount === undefined ? [] : [request.toSubaccount],
        ledger_id: request.ledgerId,
        wallet: request.wallet,
        amount: request.amount,
        memo: request.memo !== undefined ? [request.memo] : [],
      },
    }
  }

  getMappedRequestType(): string {
    return "TransferICRC1QuorumTransactionRequest"
  }
}
