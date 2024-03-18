import {Currency, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    TransferQuorumTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";


export interface TransferQuorumTransaction extends Transaction {
    currency: Currency,
    address: string,
    wallet: string,
    amount: bigint,
    blockIndex: bigint | undefined
}

export class TransferQuorumTransactionRequest implements TransactionRequest {
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
            TransferQuorumTransactionRequestV: {
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

export class TransferQuorumTransactionMapper extends TransactionMapperAbstract<TransactionCandid, TransferQuorumTransaction> {
    getVariant(): PropertyKey {
        return "TransferQuorumTransactionV";
    }

    convert(candid: TransactionCandid): TransferQuorumTransaction {
        return {
            address: candid.address,
            amount: candid.amount,
            currency: Currency.ICP, //TODO
            wallet: candid.wallet,
            blockIndex: candid.block_index.length === 0 ? undefined : candid.block_index[0],
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.TransferQuorum;
    }

}




