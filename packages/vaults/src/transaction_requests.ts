import {TransactionRequest as TransactionRequestCandid} from "./service_vault";
import {Currency, Network, VaultRole} from "./enums";
import {networkToCandid, roleToCandid} from "./helper";

export abstract class TransactionRequest {
    abstract toCandid(): TransactionRequestCandid
}

export class QuorumTransactionRequest implements TransactionRequest {
    quorum: number
    batch_uid: string | undefined


    constructor(quorum: number, batch_uid?: string) {
        this.quorum = quorum
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            QuorumUpdateTransactionRequestV: {
                quorum: this.quorum,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class VaultNamingTransactionRequest implements TransactionRequest {
    name: string | undefined
    description: string | undefined
    batch_uid: string | undefined


    constructor(name?: string, description?: string, batch_uid?: string) {
        this.name = name
        this.description = description
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            VaultNamingUpdateTransactionRequestV: {
                name: this.name !== undefined ? [this.name] : [],
                description: this.description !== undefined ? [this.description] : [],
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
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

export class TopUpTransactionRequest implements TransactionRequest {
    currency: Currency;
    wallet: string;
    amount: bigint;


    constructor(currency: Currency, wallet: string, amount: bigint) {
        this.currency = currency
        this.wallet = wallet
        this.amount = amount
    }

    toCandid(): TransactionRequestCandid {
        return {
            TopUpTransactionRequestV: {
                currency: {'ICP': null},
                wallet: this.wallet,
                amount: this.amount
            }
        }
    }
}

export class MemberCreateTransactionRequest implements TransactionRequest {
    member_id: string
    name: string
    role: VaultRole
    batch_uid: string | undefined

    constructor(member: string, name: string, role: VaultRole, batch_uid?: string) {
        this.member_id = member
        this.name = name
        this.role = role
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            MemberCreateTransactionRequestV: {
                member_id: this.member_id, name: this.name, role: roleToCandid(this.role),
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
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

    toCandid(): TransactionRequestCandid {
        return {
            WalletCreateTransactionRequestV: {
                uid: this.uid,
                name: this.name,
                network: networkToCandid(this.network),
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class WalletUpdateNameTransactionRequest implements TransactionRequest {
    uid: string
    name: string
    batch_uid: string | undefined

    constructor(name: string, uid: string, batch_uid?: string) {
        this.uid = uid
        this.name = name
        this.batch_uid = batch_uid

    }

    toCandid(): TransactionRequestCandid {
        return {
            WalletUpdateNameTransactionRequestV: {
                name: this.name,
                uid: this.uid,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class MemberUpdateNameTransactionRequest implements TransactionRequest {
    member_id: string
    name: string
    batch_uid: string | undefined

    constructor(member: string, name: string, batch_uid?: string) {
        this.member_id = member
        this.name = name
        this.batch_uid = batch_uid

    }

    toCandid(): TransactionRequestCandid {
        return {
            MemberUpdateNameTransactionRequestV: {
                member_id: this.member_id, name: this.name,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []

            }
        }
    }
}

export class MemberUpdateRoleTransactionRequest implements TransactionRequest {
    member_id: string
    role: VaultRole
    batch_uid: string | undefined

    constructor(member_id: string, role: VaultRole, batch_uid?: string) {
        this.member_id = member_id
        this.role = role
        this.batch_uid = batch_uid

    }

    toCandid(): TransactionRequestCandid {
        return {
            MemberUpdateRoleTransactionRequestV: {
                member_id: this.member_id, role: roleToCandid(this.role),
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class MemberRemoveTransactionRequest implements TransactionRequest {
    member_id: string
    batch_uid: string | undefined

    constructor(member_id: string, batch_uid?: string) {
        this.member_id = member_id
        this.batch_uid = batch_uid

    }

    toCandid(): TransactionRequestCandid {
        return {
            MemberRemoveTransactionRequestV: {
                member_id: this.member_id,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class VersionUpgradeTransactionRequest implements TransactionRequest {
    version: string

    constructor(version: string) {
        this.version = version
    }

    toCandid(): TransactionRequestCandid {
        return {
            VersionUpgradeTransactionRequestV: {
                version: this.version,
            }
        }
    }
}

export class PurgeTransactionRequest implements TransactionRequest {

    toCandid(): TransactionRequestCandid {
        return {
            PurgeTransactionRequestV: {
            }
        }
    }
}

export class PolicyCreateTransactionRequest implements TransactionRequest {
    uid: string
    member_threshold: number;
    amount_threshold: bigint;
    wallets: Array<string>;
    batch_uid: string | undefined

    constructor(uid: string, member_threshold: number, amount_threshold: bigint, wallets: Array<string>, batch_uid?: string) {
        this.member_threshold = member_threshold
        this.amount_threshold = amount_threshold
        this.wallets = wallets
        this.batch_uid = batch_uid
        this.uid = uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            PolicyCreateTransactionRequestV: {
                uid: this.uid,
                member_threshold: this.member_threshold,
                amount_threshold: this.amount_threshold,
                wallets: this.wallets,
                currency: {'ICP': null}, //TODO
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []
            }
        }
    }
}

export class PolicyUpdateTransactionRequest implements TransactionRequest {
    uid: string;
    member_threshold: number;
    amount_threshold: bigint;
    batch_uid: string | undefined

    constructor(uid: string, member_threshold: number, amount_threshold: bigint, batch_uid?: string) {
        this.uid = uid
        this.member_threshold = member_threshold
        this.amount_threshold = amount_threshold
        this.batch_uid = batch_uid

    }

    toCandid(): TransactionRequestCandid {
        return {
            PolicyUpdateTransactionRequestV: {
                uid: this.uid,
                member_threshold: this.member_threshold,
                amount_threshold: this.amount_threshold,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []

            }
        }
    }
}

export class PolicyRemoveTransactionRequest implements TransactionRequest {
    uid: string;
    batch_uid: string | undefined

    constructor(uid: string, batch_uid?: string) {
        this.uid = uid
        this.batch_uid = batch_uid
    }

    toCandid(): TransactionRequestCandid {
        return {
            PolicyRemoveTransactionRequestV: {
                uid: this.uid,
                batch_uid: this.batch_uid !== undefined ? [this.batch_uid] : []

            }
        }
    }
}
