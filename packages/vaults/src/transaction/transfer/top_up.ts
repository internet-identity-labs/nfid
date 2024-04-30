import {Currency, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    TopUpTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";

/**
 * Interface for a transaction that tops up the number of cycles in a vault canister.
 * The top-up is done by converting ICP from the specified wallet.
 * This transaction can be created or approved by an admin/member.
 */
export interface TopUpTransaction extends Transaction {
    /**
     * The currency used for the top-up.
     */
    currency: Currency

    /**
     * The wallet from which the ICP is converted.
     */
    wallet: string

    /**
     * The amount of ICP to be converted.
     */
    amount: bigint

    /**
     * The block index. Optional.
     */
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

    getType(): string {
        return "TopUpTransactionRequest";
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

export class TopUpRequestMapper extends RequestMapperAbstract{
    toCandid(request: TopUpTransactionRequest): TransactionRequestCandid {
        return {
            TopUpTransactionRequestV: {
                currency: {'ICP': null},
                wallet: request.wallet,
                amount: request.amount
            }
        }
    }

    getMappedRequestType(): string {
        return "TopUpTransactionRequest";
    }
}




