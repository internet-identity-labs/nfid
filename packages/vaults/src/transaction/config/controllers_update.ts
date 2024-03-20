import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    ControllersUpdateTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import { TransactionRequest} from "../transaction_request";
import {Principal} from "@dfinity/principal";
import {TransactionRequest as RequestCandid} from "../../idl/service_vault";
import {RequestMapper, RequestMapperAbstract} from "../request_mapper";


export interface ControllersUpdateTransaction extends Transaction {
    principals: Array<Principal>
    current_controllers: Array<Principal>
}

export class ControllersUpdateTransactionRequest implements TransactionRequest {
    principals: Array<Principal>

    constructor(principals: Array<Principal>) {
        this.principals = principals
    }
}

export class ControllersUpdateTransactionMapper extends TransactionMapperAbstract<TransactionCandid, ControllersUpdateTransaction> {
    getVariant(): PropertyKey {
        return "ControllersUpdateTransactionV";
    }

    convert(candid: TransactionCandid): ControllersUpdateTransaction {
        return {
            principals: candid.principals,
            current_controllers: candid.current_controllers,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.ControllerUpdate;
    }

}


export class ControllersRequestMapper extends RequestMapperAbstract{



    toCandid(request: ControllersUpdateTransactionRequest): RequestCandid {
        return {
            ControllersUpdateTransactionRequestV: {
                principals: request.principals
            }
        }
    }

    getMappedRequestType(): string {
        return "ControllersUpdateTransactionRequest";
    }
}




