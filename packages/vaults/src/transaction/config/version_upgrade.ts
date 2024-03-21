import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    VersionUpgradeTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";


export interface VersionUpgradeTransaction extends Transaction {
    version: string
    initial_version: string
}


export class VersionUpgradeTransactionRequest implements TransactionRequest {
    version: string

    constructor(version: string) {
        this.version = version
    }

    getType(): string {
        return "VersionUpgradeTransactionRequest";
    }
}

export class VersionUpgradeTransactionMapper extends TransactionMapperAbstract<TransactionCandid, VersionUpgradeTransaction> {
    getVariant(): PropertyKey {
        return "UpgradeTransactionV";
    }

    convert(candid: TransactionCandid): VersionUpgradeTransaction {
        return {
            version: candid.version,
            initial_version: candid.initial_version,
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.VersionUpgrade;
    }

}

export class VersionUpgradeRequestMapper extends RequestMapperAbstract {
    toCandid(request: VersionUpgradeTransactionRequest): TransactionRequestCandid {
        return {
            VersionUpgradeTransactionRequestV: {
                version: request.version,
            }
        }
    }
    getMappedRequestType(): string {
        return "VersionUpgradeTransactionRequest";
    }
}




