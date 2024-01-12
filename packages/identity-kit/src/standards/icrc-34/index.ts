import { Version } from "../ version";

/**
 * Represents the response to getting delegation information, including the version, identities, and optional delegation details.
 */
export type GetDelegationResponse = Version & {
  /**
   * A list of identities the user has selected to share with the relying party.
   */
  identities: string[];

  /**
   * An optional field representing delegation information.
   *
   * @remarks
   * If present, it contains the details of the delegation, including public key, expiration, and targets.
   */
  delegation?: {
    /**
     * Public key as described in the IC interface specification.
     */
    pubkey: Blob;

    /**
     * Expiration of the delegation, in nanoseconds since 1970-01-01, as a base-10 string.
     */
    expiration: string;

    /**
     * A list of target canister ids (textual representation) the delegation is restricted to making canister calls to.
     * If the list is not present, the delegation applies to all canisters (i.e. it is not restricted).
     */
    targets: string[];
  };
};

/**
 * Interface for ICRC34 adapters.
 */
export interface IRCR34Adapter {
  /**
   * The purpose of the getDelegation method is for the relying party to receive delegation identity.
   *
   * @remarks
   * Prerequisite: Active session with granted permission scope icrc34_get_delegation or *.
   *
   * @returns A Promise resolving to the GetDelegationResponse containing the response to the delegation request.
   */
  getDelegation(): Promise<GetDelegationResponse>;
}
