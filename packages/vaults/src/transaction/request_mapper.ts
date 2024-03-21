import {TransactionRequest} from "./transaction_request";
import {TransactionRequest as TransactionRequestCandid} from "../idl/service_vault";
import {RequestMapperRegistry} from "./mapper_registry";


export interface RequestMapper {

    toCandid(request: TransactionRequest): TransactionRequestCandid

    getMappedRequestType(): string

}

export abstract class RequestMapperAbstract implements RequestMapper {
    abstract getMappedRequestType(): string
    abstract toCandid(request: TransactionRequest): TransactionRequestCandid
    constructor() {
    }
}


export function requestToCandid(trs: TransactionRequest): TransactionRequestCandid {
    let requestType = trs.getType();
    let mapper = RequestMapperRegistry.get(requestType);
    if (!mapper) {
        throw Error("No mapper found " + requestType)
    }
    return  mapper.toCandid(trs)
}