import { Transaction } from "./transaction/transaction"
import { Vault } from "./vault/vault"
import { TransactionRequest } from "./transaction/transaction_request"
import { ApproveRequest } from "./approve/approve"
import { Principal } from "@dfinity/principal"

/**
 * Interface representing a manager for vault operations.
 * This class provides methods for interacting with the vault canister.
 */
export interface VaultManagerI {
  /**
   * Retrieves all user transactions.
   * In the foreseeable future, optional parameter will be used for filtering/pagination.
   */
  getTransactions(): Promise<Array<Transaction>>

  /**
   * Retrieves the vault state.
   * If no id is specified, returns the current state of the vault.
   * If id is specified, returns the state of the vault at the time of the transaction with the specified id.
   * @param id The ID of the transaction.
   */
  getState(id?: bigint): Promise<Vault>

  /**
   * Update method. Can be requested by a registered user (admin/member).
   * Creates a transaction. Accepts the list.
   * If the transaction is approved, it is automatically executed.
   * Returns an array of requested transactions with current states.
   * @param requests The array of transaction requests.
   */
  requestTransaction(requests: Array<TransactionRequest>): Promise<Array<Transaction>>

  /**
   * Update method. Approves or rejects a transaction.
   * If the transaction is approved, it is automatically executed.
   * Returns an array of transactions with current states.
   * @param approve The array of approve requests.
   */
  approveTransaction(approve: Array<ApproveRequest>): Promise<Array<Transaction>>

  /**
   * The vault is built on the CQRS approach.
   * Executes all approved transactions (called automatically
   * when creating or approving a transaction).
   */
  execute(): Promise<void>

  /**
   * Retrieves the vault balance in cycles.
   */
  canisterBalance(): Promise<bigint>

  /**
   * Retrieves the current vault semver version.
   */
  getVersion(): Promise<string>

  /**
   * Retrieves the list of vault controllers.
   */
  getControllers(): Promise<Array<Principal>>

  /**
   * Method for adding a personal list of ICRC-1 canisters by the user.
   * Returns the updated vault state.
   * Needed for displaying the balance of ICRC-1 tokens.
   * @param canisters The array of ICRC-1 canisters to be added.
   */
  addICRC1Canisters(canisters: Array<Principal>): Promise<Vault>
}
