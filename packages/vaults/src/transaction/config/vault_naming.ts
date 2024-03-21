import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    VaultNamingUpdateTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";


export interface VaultUpdateNamingTransaction extends Transaction {
    name?: string
    description?: string
}


export class VaultNamingTransactionRequest implements TransactionRequest {
    name: string | undefined
    description: string | undefined
    batch_uid: string | undefined


    constructor(name?: string, description?: string, batch_uid?: string) {
        this.name = name
        this.description = description
        this.batch_uid = batch_uid
    }

}

export class VaultUpdateNamingTransactionMapper extends TransactionMapperAbstract<TransactionCandid, VaultUpdateNamingTransaction> {
    getVariant(): PropertyKey {
        return "VaultNamingUpdateTransactionV";
    }

    convert(candid: TransactionCandid): VaultUpdateNamingTransaction {
        return {
            name: candid.name.length === 0 ? undefined : candid.name[0],
            description: candid.description.length === 0 ? undefined : candid.description[0],
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.VaultNamingUpdate;
    }

}

export class VaultUpdateNamingRequestMapper extends RequestMapperAbstract {
    toCandid(request: VaultNamingTransactionRequest): TransactionRequestCandid {
        return {
            VaultNamingUpdateTransactionRequestV: {
                name: request.name !== undefined ? [request.name] : [],
                description: request.description !== undefined ? [request.description] : [],
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }
    getMappedRequestType(): string {
        return "VaultNamingTransactionRequest";
    }
}




