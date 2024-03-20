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
    let className = trs.constructor.name
    let mapper = RequestMapperRegistry.get(className);
    if (!mapper) {
        throw Error("No mapper found " + className)
    }
    return  mapper.toCandid(trs)
}