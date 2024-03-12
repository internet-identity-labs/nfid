// @ts-nocheck
import {
    TransactionApproveRequest,
    TransactionCandid,
    TransactionRequest as TransactionRequestCandid,
    VaultState
} from "./service_vault";
import {idlFactory} from "./idl";

import {Actor, ActorMethod, HttpAgent, Identity} from "@dfinity/agent";
import {IDL} from "@dfinity/candid";
import {TransactionRequest} from "./transaction_requests";
import {Transaction, transactionCandidToTransaction} from "./transactions";
import {candidToVault, Vault} from "./vault";
import {ApproveRequest, approveToCandid} from "./approve";
import {Principal} from "@dfinity/principal";

export interface VaultManagerI {
    getTransactions(): Promise<Array<Transaction>>;

    getState(id?: BigInt): Promise<Vault>

    requestTransaction(requests: Array<TransactionRequest>): Promise<Array<Transaction>>

    approveTransaction(approve: Array<ApproveRequest>): Promise<Array<Transaction>>

    execute();

    canisterBalance(): Promise<bigint>;

    getVersion(): Promise<string>

    getControllers(): Promise<Array<Principal>>
}

export class VaultManager implements VaultManagerI {
    actor: Record<string, ActorMethod>;
    canisterId: String;

    public async init(canisterId: string, identity: Identity, isLocalNetwork?: boolean): Promise<VaultManager> {
        this.actor = await this.getActor(canisterId, identity, idlFactory, isLocalNetwork);
        this.canisterId = canisterId;
        return this;
    }

    async getTransactions(): Promise<Array<Transaction>> {
        let transactions = await this.actor.get_transactions_all() as Array<TransactionCandid>
        return transactions.map(transactionCandidToTransaction)
    }

    async getVersion(): Promise<string> {
        return await this.actor.get_version() as string
    }

    async getControllers(): Promise<Array<Principal>> {
        return await this.actor.get_controllers() as Array<Principal>
    }

    async requestTransaction(request: Array<TransactionRequest>): Promise<Array<Transaction>> {
        let trRequests: Array<TransactionRequestCandid> = request.map(l => l.toCandid())
        let response = await this.actor.request_transaction(trRequests) as [TransactionCandid];
        return response.map(transactionCandidToTransaction)
    }

    async canisterBalance(): Promise<bigint> {
        return await this.actor.canister_balance() as bigint
    }

    async getState(id?: BigInt): Promise<Vault> {
        let param = id === undefined ? [] : [id]
        let state = await this.actor.get_state(param) as VaultState;
        return candidToVault(state)
    }

    async approveTransaction(approves: Array<ApproveRequest>): Promise<Array<Transaction>> {
        let approveRequest: Array<TransactionApproveRequest> = approves.map(approveToCandid)
        let response = await this.actor.approve(approveRequest) as Array<TransactionCandid>;
        return response.map(transactionCandidToTransaction)
    }

    private getActor = async (
        imCanisterId: string,
        identity: Identity,
        idl: IDL.InterfaceFactory,
        isTest?: boolean
    ): Promise<Record<string, ActorMethod>> => {
        let agent: HttpAgent;
        if (isTest) {
            agent = new HttpAgent({host: "http://127.0.0.1:8000", identity: identity});
            await agent.fetchRootKey();
        } else {
            agent = new HttpAgent({host: "https://ic0.app", identity: identity});
        }
        return Actor.createActor(idl, {agent, canisterId: imCanisterId});
    };

    async execute() {
        await this.actor.execute()
    }
}

