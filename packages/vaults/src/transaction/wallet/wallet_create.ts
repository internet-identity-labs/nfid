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


export interface WalletCreateTransaction extends Transaction {
    name: string,
    network: Network,
    uid: string
}


export class WalletCreateTransactionRequest implements TransactionRequest {
    network: Network
    name: string
    //use generateRandomString() from helper.ts to generate uid
    uid: string
    batch_uid: string | undefined

    constructor(uid: string, name: string, network: Network, batch_uid?: string) {
        this.network = network
        this.name = name
        this.batch_uid = batch_uid
        this.uid = uid
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




