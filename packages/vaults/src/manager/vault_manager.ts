import {
  _SERVICE as VaultService,
  TransactionApproveRequest,
  TransactionCandid,
  TransactionRequest as TransactionRequestCandid,
} from "../idl/service_vault"
import { idlFactory } from "../idl/idl"
import * as Agent from "@dfinity/agent"
import { HttpAgent, Identity } from "@dfinity/agent"
import { candidToVault, Vault } from "../vault/vault"
import { ApproveRequest, approveToCandid } from "../approve/approve"
import { Principal } from "@dfinity/principal"
import { registerRequestMappers, registerTransactionMappers } from "../transaction/mapper_registry"
import { Transaction } from "../transaction"
import { TransactionRequest } from "../transaction/transaction_request"
import { VaultManagerI } from "../vault_manager_i"
import { transactionCandidToTransaction } from "../transaction/transaction_mapper"
import { requestToCandid } from "../transaction/request_mapper"
import { TransactionState } from "../enum/enums"

/**
 * Class representing a manager for vault operations.
 * This class provides methods for interacting with the vault canister.
 */
export class VaultManager implements VaultManagerI {
  /**
   * The actor used to interact with the vault canister.
   */
  private actor: Agent.ActorSubclass<VaultService>

  /**
   * The principal ID of the canister.
   */
  private canisterId: string

  /**
   * Users identity used for signing requests.
   */
  private readonly identity: Identity

  /**
   * Constructs a new VaultManager.
   * @param canisterId - The principal ID of the canister.
   * @param identity - The identity used for signing requests.
   */
  constructor(canisterId: string, identity: Identity) {
    registerTransactionMappers()
    registerRequestMappers()
    this.actor = this.getActor(canisterId, identity)
    this.canisterId = canisterId
    this.identity = identity
  }

  /**
   * Retrieves all user transactions.
   * In the foreseeable future, optional parameter will be used for filtering/pagination.
   */
  async getTransactions(): Promise<Array<Transaction>> {
    const transactions: Array<TransactionCandid> = await this.actor.get_transactions_all()
    return transactions.map(transactionCandidToTransaction)
  }

  /**
   * Retrieves the version of the vault.
   * @returns The version of the vault.
   */
  async getVersion(): Promise<string> {
    return await this.actor.get_version()
  }

  /**
   * Retrieves the controllers of the vault.
   * @returns An array of the controllers of the vault.
   */
  async getControllers(): Promise<Array<Principal>> {
    return await this.actor.get_controllers()
  }

  /**
   * Update method. Can be requested by a registered user (admin/member).
   * Creates a transaction.
   * If the transaction is approved, it is automatically executed.
   * Returns an array of requested transactions with current states.
   * @param requests The array of transaction requests.
   */
  async requestTransaction(request: Array<TransactionRequest>): Promise<Array<Transaction>> {
    const trRequests: Array<TransactionRequestCandid> = request.map((l) => requestToCandid(l))
    const response = await this.actor.request_transaction(trRequests)
    const transactions = response.map(transactionCandidToTransaction)
    if (transactions.find((t) => t.state === TransactionState.Approved) !== undefined) {
      this.execute()
    }
    return transactions
  }

  /**
   * Retrieves the cycles balance of the canister.
   * @returns The balance of the canister.
   */
  async canisterBalance(): Promise<bigint> {
    return await this.actor.canister_balance()
  }

  /**
   * Retrieves the vault state.
   * If no id is specified, returns the current state of the vault.
   * If id is specified, returns the state of the vault at the time of the transaction with the specified id.
   * @param id The ID of the transaction.
   */
  async getState(id?: bigint): Promise<Vault> {
    const param: [bigint] | [] = id === undefined ? [] : [id]
    const state = await this.actor.get_state(param)
    return candidToVault(state)
  }

  /**
   * Update method. Approves or rejects a transaction.
   * If the transaction is approved, it is automatically executed.
   * Returns an array of transactions with current states.
   * @param approve The array of approve requests.
   */
  async approveTransaction(approves: Array<ApproveRequest>): Promise<Array<Transaction>> {
    const approveRequest: Array<TransactionApproveRequest> = approves.map(approveToCandid)
    const response = (await this.actor.approve(approveRequest)) as Array<TransactionCandid>
    const transactions = response.map(transactionCandidToTransaction)
    if (
      transactions.find(
        (t) => t.state === TransactionState.Approved || t.state === TransactionState.Rejected
      ) !== undefined
    ) {
      this.execute()
    }
    return transactions
  }

  /**
   * Retrieves the actor for interacting with the vault service.
   * Actor set up for interacting with the main network
   * to reset for local environment use resetToLocalEnv().
   * @param imCanisterId - The principal ID of the canister.
   * @param identity - The identity used for signing.
   * @returns The actor for interacting with the vault service.
   */
  private getActor = (
    imCanisterId: string,
    identity: Identity
  ): Agent.ActorSubclass<VaultService> => {
    const agent: HttpAgent = new HttpAgent({ host: "https://ic0.app", identity: identity })
    return Agent.Actor.createActor<VaultService>(idlFactory, {
      canisterId: imCanisterId,
      agent,
    })
  }

  /**
   * The vault is built on the CQRS approach.
   * Executes all approved transactions (called automatically
   * when creating or approving a transaction).
   */
  async execute(): Promise<void> {
    await this.actor.execute()
  }

  /**
   * Resets the environment to local.
   * Since we need an asynchronous call to fetchRootKey
   * for the local environment - it's moved to a separate method.
   * Used for testing purposes.
   */
  async resetToLocalEnv() {
    const agent: HttpAgent = new HttpAgent({
      host: "http://127.0.0.1:8000",
      identity: this.identity,
    })
    await agent.fetchRootKey()
    this.actor = Agent.Actor.createActor<VaultService>(idlFactory, {
      canisterId: this.canisterId.toString(),
      agent,
    })
  }
}
