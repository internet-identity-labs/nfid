import {TransactionType} from "../../enum/enums";
import {Transaction} from "../transaction";
import {
    TransactionRequest as TransactionRequestCandid,
    TransferICRC1QuorumTransaction as TransactionCandid
} from "../../idl/service_vault";
import {TransactionMapperAbstract} from "../transaction_mapper";
import {TransactionRequest} from "../transaction_request";
import {RequestMapperAbstract} from "../request_mapper";
import {Principal} from "@dfinity/principal";


export interface TransferICRC1QuorumTransaction extends Transaction {
    to_principal: Principal,
    blockIndex: bigint | undefined,
    to_subaccount: undefined | Uint8Array | number[],
    ledger_id: Principal,
    wallet: string,
    amount: bigint,
}

export class TransferICRC1QuorumTransactionRequest implements TransactionRequest {
    toPrincipal: Principal;
    ledgerId: Principal;
    toSubaccount: undefined | Uint8Array | number[];
    wallet: string;
    amount: bigint;
    memo: string | undefined;

    constructor(toPrincipal: Principal, toSubaccount: undefined | Uint8Array | number[], ledgerId: Principal, wallet: string, amount: bigint, memo?: string) {
        this.toPrincipal = toPrincipal
        this.ledgerId = ledgerId
        this.toSubaccount = toSubaccount
        this.wallet = wallet
        this.amount = amount
        this.memo = memo
    }

    getType(): string {
        return "TransferICRC1QuorumTransactionRequest";
    }

}

export class TransferICRC1QuorumTransactionMapper extends TransactionMapperAbstract<TransactionCandid, TransferICRC1QuorumTransaction> {
    getVariant(): PropertyKey {
        return "TransferICRC1QuorumTransactionV";
    }

    convert(candid: TransactionCandid): TransferICRC1QuorumTransaction {
        return {
            ledger_id: candid.ledger_id,
            to_principal: candid.to_principal,
            to_subaccount: candid.to_subaccount.length === 0 ? undefined : candid.to_subaccount[0],
            amount: candid.amount,
            wallet: candid.wallet,
            blockIndex: candid.block_index.length === 0 ? undefined : BigInt(candid.block_index[0]),
            ...this.basicFieldsConvert(candid.common)
        };
    }

    getType(): TransactionType {
        return TransactionType.TransferICRC1Quorum;
    }

}

export class TransferICRC1QuorumRequestMapper extends RequestMapperAbstract {
    toCandid(request: TransferICRC1QuorumTransactionRequest): TransactionRequestCandid {
        return {
            TransferICRC1QuorumTransactionRequestV: {
                to_principal: request.toPrincipal,
                to_subaccount: request.toSubaccount === undefined ? [] : [request.toSubaccount],
                ledger_id: request.ledgerId,
                wallet: request.wallet,
                amount: request.amount,
                memo: request.memo !== undefined ? [request.memo] : []
            }
        }
    }

    getMappedRequestType(): string {
        return "TransferICRC1QuorumTransactionRequest";
    }
}




