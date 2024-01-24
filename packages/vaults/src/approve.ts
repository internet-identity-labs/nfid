import {TransactionState} from "./enums";
import {Approve as ApproveCandid, TransactionApproveRequest} from "./service_vault";
import {candidToTransactionState, transactionStateToCandid} from "./helper";

export interface Approve {
    status: TransactionState
    signer: string
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
        status: candidToTransactionState(response.status)
    }
}

export function approveToCandid(a: ApproveRequest): TransactionApproveRequest {
    return {
        state: transactionStateToCandid(a.state),
        transaction_id: a.trId,
    }
}