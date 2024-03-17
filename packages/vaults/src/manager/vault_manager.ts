import {
    _SERVICE as VaultService,
    TransactionApproveRequest,
    TransactionCandid,
    TransactionRequest as TransactionRequestCandid,
    VaultState
} from "../idl/service_vault";
import {idlFactory} from "../idl/idl";
import * as Agent from "@dfinity/agent"
import {HttpAgent, Identity} from "@dfinity/agent"
import {candidToVault, Vault} from "../vault/vault";
import {ApproveRequest, approveToCandid} from "../approve/approve";
import {Principal} from "@dfinity/principal";
import {registerMappers, transactionCandidToTransaction} from "../transaction/mapper_registry";
import {Transaction} from "../transaction/transaction";
import {TransactionRequest} from "../transaction/transaction_request";
import {VaultManagerI} from "../vault_manager_i";


export class VaultManager implements VaultManagerI {
    actor: Agent.ActorSubclass<VaultService>;
    canisterId: String;

    constructor(canisterId: string, identity: Identity) {
        registerMappers()
        this.actor = this.getActor(canisterId, identity);
        this.canisterId = canisterId;
    }

    async getTransactions(): Promise<Array<Transaction>> {
        let transactions: Array<TransactionCandid> = await this.actor.get_transactions_all()
        return transactions.map(transactionCandidToTransaction)
    }

    async getVersion(): Promise<string> {
        return await this.actor.get_version()
    }

    async getControllers(): Promise<Array<Principal>> {
        return await this.actor.get_controllers()
    }

    async requestTransaction(request: Array<TransactionRequest>): Promise<Array<Transaction>> {
        let trRequests: Array<TransactionRequestCandid> = request.map(l => l.toCandid())
        let response = await this.actor.request_transaction(trRequests);
        return response.map(transactionCandidToTransaction)
    }

    async canisterBalance(): Promise<bigint> {
        return await this.actor.canister_balance()
    }

    async getState(id?: bigint): Promise<Vault> {
        let param: [bigint] | [] = id === undefined ? [] : [id]
        let state = await this.actor.get_state(param) as VaultState;
        return candidToVault(state)
    }

    async approveTransaction(approves: Array<ApproveRequest>): Promise<Array<Transaction>> {
        let approveRequest: Array<TransactionApproveRequest> = approves.map(approveToCandid)
        let response = await this.actor.approve(approveRequest) as Array<TransactionCandid>;
        return response.map(transactionCandidToTransaction)
    }

    private getActor = (
        imCanisterId: string,
        identity: Identity,
    ): Agent.ActorSubclass<VaultService> => {
        let agent: HttpAgent = new HttpAgent({host: "https://ic0.app", identity: identity});
        return Agent.Actor.createActor<VaultService>(idlFactory, {
            canisterId: imCanisterId,
            agent,
        })
    };

    async execute(): Promise<void> {
        await this.actor.execute()
    }


    async resetToLocalEnv(canisterId: string, identity: Identity) {
        let agent: HttpAgent = new HttpAgent({host: "http://127.0.0.1:8000", identity: identity});
        await agent.fetchRootKey();
        return Agent.Actor.createActor<VaultService>(idlFactory, {
            canisterId,
            agent,
        })
    }
}

