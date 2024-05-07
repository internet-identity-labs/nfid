import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    ControllersUpdateTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import { TransactionRequest} from "../transaction_request";
import {Principal} from "@dfinity/principal";
import {TransactionRequest as RequestCandid} from "../../idl/service_vault";
import {RequestMapperAbstract} from "../request_mapper";


/**
 * This transaction type is used for updating the vault controllers.
 * Through this transaction, the list of vault controllers can be replaced.
 * The vault acts as its own controller to allow version updates via the VersionUpgrade transaction.
 * Be careful - if the vault's ID is removed from the list of controllers, the upgrade transaction will throw an error.
 * Can be requested/approved only by users with the admin role
 */
export interface ControllersUpdateTransaction extends Transaction {
    /**
     * The principals (controllers) to be added to the vault.
     */
    principals: Array<Principal>

    /**
     * The current controllers of the vault.
     */
    current_controllers: Array<Principal>
}

export class ControllersUpdateTransactionRequest implements TransactionRequest {
    principals: Array<Principal>

    constructor(principals: Array<Principal>) {
        this.principals = principals
    }

    getType(): string {
        return "ControllersUpdateTransactionRequest";
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




