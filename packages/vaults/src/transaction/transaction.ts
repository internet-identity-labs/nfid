import { TransactionState, TransactionType } from "../enum/enums"
import { VaultError } from "../idl/service_vault"
import { Approve } from "../approve/approve"

/**
 * This is the base interface for all types of transactions.
 * It includes the common fields for all transactions.
 */
export interface Transaction {
  /**
   * The unique identifier of the transaction.
   * Transactions are marked in ascending order, incremented by 1.
   */
  id: bigint

  /**
   * The type of the transaction.
   */
  transactionType: TransactionType

  /**
   * The initiator of the transaction.
   */
  initiator: string

  /**
   * The date when the transaction was last modified.
   * It's in nanoseconds since the Unix Epoch.
   */
  modifiedDate: bigint

  /**
   * An optional memo for the transaction.
   */
  memo?: string

  /**
   * The current state of the transaction.
   */
  state: TransactionState

  /**
   * An array of approvals for the transaction.
   */
  approves: Approve[]

  /**
   * A boolean indicating whether the transaction is a vault state.
   */
  isVaultState: boolean

  /**
   * The date when the transaction was created.
   * It's in nanoseconds since the Unix Epoch.
   */
  createdDate: bigint

  /**
   * The unique identifier of the batch that this transaction is part of. Optional.
   * All transactions marked with a single batch_id are either executed or rejected together.
   */
  batchUid: string | undefined

  /**
   * The threshold for the transaction. It will be set up after the transaction is unblocked. Optional.
   */
  threshold: number | undefined

  /**
   * An error associated with the transaction, if any. Optional.
   */
  error?: VaultError
}
