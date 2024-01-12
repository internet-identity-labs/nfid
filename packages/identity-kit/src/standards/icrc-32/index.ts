import { Version } from "../ version"

/**
 * Represents a request to sign a challenge for cryptographic proof of ownership.
 *
 * @remarks
 * The `SignChallengeRequest` type is used as input for the `signChallange` method in the `ICRC32Adapter` interface.
 */
export type SignChallengeRequest = {
  /**
   * Principal (text): Principal (textual representation) corresponding to the identity
   * that the signer should provide the challenge signature for.
   */
  principal?: string

  /**
   * A challenge used for the signer to sign in order to prove its access to the identity.
   * The challenge should be an array of 32 cryptographically random bytes generated from a secure random source by the sender of the request.
   */
  challenge: string
}

/**
 * Represents the response to signing a challenge, containing the signed challenge and related data to verify the signature.
 */
export type SignChallengeResponse = Version & {
  /**
   * Object containing the signed challenge and related data to verify the signature.
   */
  signedChallenge: {
    /**
     * The DER-encoded public key associated with the identity,
     * derived in accordance with one of the signature algorithms supported by the IC.
     * The public key can be used to derive a self-authenticating principal.
     */
    publicKey: string

    /**
     * The signature produced by signing the concatenation of the domain separator \x13ic-signer-challenge
     * (UTF-8 encoded) and the challenge with the private key associated with the identity.
     */
    signature: string

    /**
     * An optional field representing delegation information.
     */
    delegation?: {
      /**
       * Public key as described in the IC interface specification.
       */
      pubkey: Blob

      /**
       * Expiration of the delegation, in nanoseconds since 1970-01-01, as a base-10 string.
       */
      expiration: string

      /**
       * A list of target canister ids (textual representation) the delegation is restricted to making canister calls to.
       * If the list is not present, the delegation applies to all canisters (i.e. it is not restricted).
       */
      targets: string[]
    }
  }
}

/**
 * Interface for ICRC32 adapters.
 */
export interface ICRC32Adapter {
  /**
   * The purpose of the signChallange method is for the relying party to receive
   * a cryptographic proof of ownership for the user's identities.
   *
   * @remarks
   * Prerequisite: Active session with granted permission scope icrc32_sign_challenge or *.
   * This scope may be restricted to specific principals.
   *
   * @param request - The SignChallengeRequest containing the challenge information.
   * @returns The SignChallengeResponse containing the signed challenge and related data.
   */
  signChallange(request: SignChallengeRequest): Promise<SignChallengeResponse>
}
