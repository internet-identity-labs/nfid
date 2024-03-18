import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    VaultNamingUpdateTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


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

    toCandid(): TransactionRequestCandid {
        return {
            VaultNamingUpdateTransactionRequestV: {
                name: this.name !== undefined ? [this.name] : [],
                description: this.description !== undefined ? [this.description] : [],
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
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




