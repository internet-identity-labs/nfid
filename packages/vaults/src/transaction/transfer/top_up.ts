import {Currency, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    TopUpTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";




export interface TopUpTransaction extends Transaction {
    currency: Currency,
    wallet: string,
    amount: bigint,
    blockIndex?: bigint
}


export class TopUpTransactionRequest implements TransactionRequest {
    currency: Currency;
    wallet: string;
    amount: bigint;


    constructor(currency: Currency, wallet: string, amount: bigint) {
        this.currency = currency
        this.wallet = wallet
        this.amount = amount
    }

}


export class TopUpTransactionMapper extends TransactionMapperAbstract<TransactionCandid, TopUpTransaction> {
    getVariant(): PropertyKey {
        return "TopUpTransactionV";
    }

    convert(candid: TransactionCandid): TopUpTransaction {
        return {
            amount: candid.amount,
            currency: Currency.ICP, //TODO
            wallet: candid.wallet,
            blockIndex: candid.block_index.length === 0 ? undefined : candid.block_index[0],
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.TopUp;
    }

}

export class TopUpRequestMapper {
    toCandid(request: TopUpTransactionRequest): TransactionRequestCandid {
        return {
            TopUpTransactionRequestV: {
                currency: {'ICP': null},
                wallet: request.wallet,
                amount: request.amount
            }
        }
    }
}




