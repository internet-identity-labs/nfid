import {Currency, TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    TransferQuorumTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";

/**
 * Interface for a transaction that transfers assets.
 * Requires amount of approvals equal to quorum.
 * This transaction can be created or approved by an admin.
 */
export interface TransferQuorumTransaction extends Transaction {
    /**
     * The currency used for the transfer.
     */
    currency: Currency

    /**
     * The address to which assets are transferred.
     */
    address: string

    /**
     * The walletID from which the currency is transferred.
     */
    wallet: string

    /**
     * The amount of assets to be transferred.
     */
    amount: bigint

    /**
     * The block index. After the execution.
     */
    blockIndex: bigint | undefined
}

export class TransferQuorumTransactionRequest implements TransactionRequest {
    currency: Currency;
    address: string;
    wallet: string;
    amount: bigint;
    memo: string | undefined;

    constructor(currency: Currency, address: string, wallet: string, amount: bigint, memo?: string) {
        this.currency = currency
        this.address = address
        this.wallet = wallet
        this.amount = amount
        this.memo = memo
    }

    getType(): string {
        return "TransferQuorumTransactionRequest";
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

export class TransferQuorumRequestMapper extends RequestMapperAbstract {
    toCandid(request: TransferQuorumTransactionRequest): TransactionRequestCandid {
        return {
            TransferQuorumTransactionRequestV: {
                //TODO
                currency: {'ICP': null},
                address: request.address,
                wallet: request.wallet,
                amount: request.amount,
                memo: request.memo !== undefined ? [request.memo] : []
            }
        }
    }

    getMappedRequestType(): string {
        return "TransferQuorumTransactionRequest";
    }
}




