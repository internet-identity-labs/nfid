import { Version } from "../ version"

/**
 * Represents a request to call a canister, specifying the version, canister id, sender, method, and arguments.
 */
export type CallCanisterRequest = {
  /**
   * The id of the canister on which the call should be executed.
   */
  canisterId: string

  /**
   * The principal (textual representation) requested to execute the call.
   */
  sender: string

  /**
   * The name of the call method to be executed.
   */
  method: string

  /**
   * The arguments for the call.
   */
  arg: string
}

/**
 * Represents the response to calling a canister, including the version, content map, and certificate.
 */
export type CallCanisterResponse = Version & {
  /**
   * The CBOR-encoded content map of the actual request.
   */
  contentMap: string

  /**
   * The certificate returned by the read_state call. The value is CBOR-encoded.
   */
  certificate: string
}

/**
 * Interface for ICRC49 adapters.
 */
export interface ICRC49Adapter {
  /**
   * This method can be used by the relying party to request calls to 3rd party canister executed by the signer using the requested identity.
   * In order to prevent misuse of this method, all icrc49_call_canister requests are subject to user approval.
   *
   * @remarks
   * Prerequisite: Active session with granted permission scope icrc49_call_canister or *.
   * This scope may be restricted to specific target canister ids and/or sender principals.
   *
   * @param request - The CallCanisterRequest containing the details of the canister call.
   * @returns The CallCanisterResponse containing the response to the canister call.
   */
  callCanister(request: CallCanisterRequest): Promise<CallCanisterResponse>
}

export type ICRC49RequestTypeMap = {
  [ICRC49Methods.icrc49_call_canister]: CallCanisterRequest
}

export type ICRC49ResponseTypeMap = {
  [ICRC49Methods.icrc49_call_canister]: CallCanisterResponse
}

export enum ICRC49Methods {
  "icrc49_call_canister" = "icrc49_call_canister",
}
