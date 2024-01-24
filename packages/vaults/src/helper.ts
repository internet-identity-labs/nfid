import {
    Network as NetworkCandid,
    TransactionState as TransactionStateCandid,
    VaultRole as VaultRoleCandid
} from "./service_vault";
import {Network, TransactionState, TransactionType, VaultRole} from "./enums";
import {randomBytes} from "crypto";

export function transactionStateToCandid(
    state: TransactionState,
): TransactionStateCandid {
    if (state === TransactionState.Approved) {
        return {Approved: null}
    }
    if (state === TransactionState.Rejected) {
        return {Rejected: null}
    }
    throw Error("Unexpected enum value")
}

export function candidToRole(response: VaultRoleCandid): VaultRole {
    if (hasOwnProperty(response, "Admin")) {
        return VaultRole.ADMIN
    }
    if (hasOwnProperty(response, "Member")) {
        return VaultRole.MEMBER
    }
    throw Error("Unexpected enum value")
}


export function candidToTransactionState(trType: TransactionStateCandid): TransactionState {
    const transactionTypeKeys = Object.values(TransactionState);
    for (const key of transactionTypeKeys) {
        if (hasOwnProperty(trType, key)) {
            return TransactionState[key];
        }
    }
    throw Error("Invalid transaction state");
}


export function candidToNetwork(n: NetworkCandid): Network {
    const networks = Object.values(Network);
    for (const key of networks) {
        if (hasOwnProperty(n, key)) {
            return Network[key];
        }
    }
    throw Error();
}


// A `hasOwnProperty` that produces evidence for the typechecker
export function hasOwnProperty<
    X extends Record<string, unknown>,
    Y extends PropertyKey,
>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop)
}


export function roleToCandid(response: VaultRole): VaultRoleCandid {
    if (response === VaultRole.ADMIN) {
        return {Admin: null} as VaultRoleCandid
    }
    if (response === VaultRole.MEMBER) {
        return {Member: null} as VaultRoleCandid
    }
    throw Error("Unexpected enum value")
}

export function networkToCandid(network: Network): NetworkCandid {
    if (network === Network.IC) {
        return {IC: null} as NetworkCandid
    }
    throw Error("Unexpected enum value")
}

export function generateRandomString(): string {
    const bytes = randomBytes(32);
    return bytes.toString('hex');
}