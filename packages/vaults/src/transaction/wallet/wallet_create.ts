import {Network, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    WalletCreateTransaction as TransactionCandid
} from "../../idl/service_vault";
import {candidToNetwork, networkToCandid} from "../../util/helper";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";


/**
 * Interface for a transaction that creates a new wallet.
 * This transaction can be created or approved by an admin.
 * This transaction can be executed in a batch.
 */
export interface WalletCreateTransaction extends Transaction {
    /**
     * The name of the wallet to be created.
     */
    name: string

    /**
     * The network of the wallet to be created.
     */
    network: Network

    /**
     * The unique identifier of the wallet to be created.
     * It have to be a hex representation of the subaccount
     * use generateRandomString() from helper.ts to generate UID
     */
    uid: string
}

export class WalletCreateTransactionRequest implements TransactionRequest {
    network: Network
    name: string
    //use generateRandomString() from helper.ts to generate UID
    uid: string
    batch_uid: string | undefined

    constructor(uid: string, name: string, network: Network, batch_uid?: string) {
        this.network = network
        this.name = name
        this.batch_uid = batch_uid
        this.uid = uid
    }

    getType(): string {
        return "WalletCreateTransactionRequest";
    }

}


export class WalletCreateTransactionMapper extends TransactionMapperAbstract<TransactionCandid, WalletCreateTransaction> {
    getVariant(): PropertyKey {
        return "WalletCreateTransactionV";
    }

    convert(candid: TransactionCandid): WalletCreateTransaction {
        return {
            name: candid.name,
            uid: candid.uid,
            network: candidToNetwork(candid.network),
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.WalletCreate;
    }

}

export class WalletCreateRequestMapper extends RequestMapperAbstract {
    toCandid(request: WalletCreateTransactionRequest): TransactionRequestCandid {
        return {
            WalletCreateTransactionRequestV: {
                name: request.name,
                uid: request.uid,
                network: networkToCandid(request.network),
                batch_uid: request.batch_uid !== undefined ? [request.batch_uid] : []
            }
        }
    }

    getMappedRequestType(): string {
        return "WalletCreateTransactionRequest";
    }
}




