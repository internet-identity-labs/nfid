import {Currency, Network, VaultRole} from "./enums";
import {Member, Policy as PolicyCandid, VaultState, Wallet as WalletCandid} from "./service_vault";
import {candidToRole, candidToNetwork} from "./helper";

export class Vault {
    members: Array<VaultMember>
    quorum: Quorum
    wallets: Array<Wallet>
    policies: Array<Policy>
    name?: string
    description?: string
}

export interface Quorum {
    quorum: number,
    modifiedDate: bigint
}

export interface VaultMember {
    userId: string
    name: string | undefined
    role: VaultRole
    modifiedDate: bigint
    createdDate: bigint
}

export interface Wallet {
    'uid': string,
    'modifiedDate': bigint,
    'name': string,
    'network': Network,
    'createdDate': bigint,
}

export interface Policy {
    'uid': string,
    'memberThreshold': number,
    'modifiedDate': bigint,
    'amountThreshold': bigint,
    'wallets': Array<string>,
    'currency': Currency,
    'createdDate': bigint,
}


export function candidToVault(vaultCandid: VaultState): Vault {
    let members: Array<VaultMember> = vaultCandid.members.map(mapMember)
    let quorum: Quorum = {
        modifiedDate: vaultCandid.quorum.modified_date,
        quorum: vaultCandid.quorum.quorum
    }
    let wallets: Array<Wallet> = vaultCandid.wallets.map(mapWallet)
    let policies: Array<Policy> = vaultCandid.policies.map(mapPolicy)
    let name = vaultCandid.name.length === 0 ? undefined : vaultCandid.name[0]
    let description = vaultCandid.description.length === 0 ? undefined : vaultCandid.description[0]
    let vault: Vault = {
        members: members, quorum: quorum, wallets, policies, name, description
    }

    return vault
}

function mapMember(candid: Member): VaultMember {
    return {
        createdDate: candid.created_date,
        modifiedDate: candid.modified_date,
        name: candid.name,
        role: candidToRole(candid.role),
        userId: candid.member_id
    }
}

function mapWallet(candid: WalletCandid): Wallet {
    return {
        network: candidToNetwork(candid.network), uid: candid.uid,
        createdDate: candid.created_date,
        modifiedDate: candid.modified_date,
        name: candid.name
    }
}

function mapPolicy(candid: PolicyCandid): Policy {
    return {
        amountThreshold: candid.amount_threshold,
        createdDate: candid.created_date,
        currency: Currency.ICP, //TODO
        memberThreshold: candid.member_threshold,
        modifiedDate: candid.modified_date,
        uid: candid.uid,
        wallets: candid.wallets
    }
}
