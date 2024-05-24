import { TransactionState } from "../enum/enums"
import { Approve as ApproveCandid, TransactionApproveRequest } from "../idl/service_vault"
import { candidToTransactionState, transactionStateToCandid } from "../util/helper"

/**
 * Interface for the approval or rejection of a transaction.
 * This interface contains the status of a transaction,
 * who signed it, and when it was created.
 */
export interface Approve {
  /**
   * The status of the transaction. It can be 'Approved' or 'Rejected'.
   */
  status: TransactionState

  /**
   * The signer of the approval request.
   */
  signer: string

  /**
   * The date when the approval or rejection was created. Nanoseconds since the Unix Epoch.
   */
  createdDate: bigint
}

export interface ApproveRequest {
  trId: bigint
  state: TransactionState
}

export function candidToApprove(response: ApproveCandid): Approve {
  return {
    createdDate: response.created_date,
    signer: response.signer,
    status: candidToTransactionState(response.status),
  }
}

export function approveToCandid(a: ApproveRequest): TransactionApproveRequest {
  return {
    state: transactionStateToCandid(a.state),
    transaction_id: a.trId,
  }
}
