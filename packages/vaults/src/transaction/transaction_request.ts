import {TransactionRequest as TransactionRequestCandid} from "../idl/service_vault";

export abstract class TransactionRequest {
    abstract toCandid(): TransactionRequestCandid
}




