import { TransactionType } from "../enum/enums"
import { Transaction } from "./transaction"
import { BasicTransactionFields, TransactionCandid } from "../idl/service_vault"
import { candidToApprove } from "../approve/approve"
import { candidToTransactionState, hasOwnProperty } from "../util/helper"
import { TransactionMapperRegistry } from "./mapper_registry"

export interface TransactionMapper {
  getVariant(): PropertyKey

  mapTransaction(trsCandid: TransactionCandid): Transaction
}

export abstract class TransactionMapperAbstract<A> implements TransactionMapper {
  abstract getVariant(): PropertyKey

  abstract convert(candid: A): Transaction

  abstract getType(): TransactionType

  constructor() {}

  public mapTransaction(trsCandid: TransactionCandid): Transaction {
    if (!hasOwnProperty(trsCandid, this.getVariant())) {
      throw Error("Incorrect property key")
    }
    const response = trsCandid[this.getVariant()]
    return this.convert(response as A)
  }

  public basicFieldsConvert(candid: BasicTransactionFields) {
    const transaction: Transaction = {
      approves: candid.approves.map(candidToApprove),
      batchUid: candid.batch_uid.length === 0 ? undefined : candid.batch_uid[0],
      createdDate: candid.created_date,
      id: candid.id,
      initiator: candid.initiator,
      isVaultState: candid.is_vault_state,
      modifiedDate: candid.modified_date,
      state: candidToTransactionState(candid.state),
      transactionType: this.getType(),
      threshold: candid.threshold.length === 0 ? undefined : candid.threshold[0],
      error: candid.error.length === 0 ? undefined : candid.error[0],
      memo: candid.memo.length === 0 ? undefined : candid.memo[0],
    }
    return transaction
  }
}

export function transactionCandidToTransaction(trs: TransactionCandid): Transaction {
  const variant = Object.keys(trs)
  for (const key of variant) {
    if (hasOwnProperty(trs, key)) {
      const mapper = TransactionMapperRegistry.get(key)
      if (mapper) {
        return mapper.mapTransaction(trs)
      }
    }
  }
  throw Error("No transaction mapper found")
}
