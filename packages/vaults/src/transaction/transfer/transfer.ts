import {Currency, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    TransferTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface TransferTransaction extends Transaction {
    currency: Currency,
    address: string,
    wallet: string,
    amount: bigint,
    policy: string | undefined
    blockIndex: bigint | undefined
}


export class TransferTransactionRequest implements TransactionRequest {
    currency: Currency;
    address: string;
    wallet: string;
    amount: bigint;
    memo: string | undefined;

    constructor(currency: Currency, address: string, wallet: string, amount: bigint) {
        this.currency = currency
        this.address = address
        this.wallet = wallet
        this.amount = amount
    }

    toCandid(): TransactionRequestCandid {
        return {
            TransferTransactionRequestV: {
                //TODO
                currency: {'ICP': null},
                address: this.address,
                wallet: this.wallet,
                amount: this.amount,
                memo: this.memo !== undefined ? [this.memo] : []
            }
        }
    }
}


export class TransferTransactionMapper extends TransactionMapperAbstract<TransactionCandid, TransferTransaction> {
    getVariant(): PropertyKey {
        return "TransferTransactionV";
    }

    convert(candid: TransactionCandid): TransferTransaction {
        return {
            address: candid.address,
            amount: candid.amount,
            currency: Currency.ICP, //TODO
            wallet: candid.wallet,
            policy: candid.policy.length === 0 ? undefined : candid.policy[0],
            blockIndex: candid.block_index.length === 0 ? undefined : candid.block_index[0],
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.Transfer;
    }

}




