import { Version } from "../ version"

/**
 * Response structure for the 'getPrincipals' method.
 */
export type GetPrincipalResponse = Version & {
  /**
   * A list of principals (textual representation) the user has selected to share with the relying party.
   */
  principals: string[]
}

/**
 * Interface for ICRC31 adapters.
 */
export interface ICRC31Adapter {
  /**
   * The purpose of the 'getPrincipals' method is for the relying party to receive information about the identities managed by the signer.
   * @returns {GetPrincipalResponse} - Response containing information about the identities managed by the signer.
   * @throws {Error} Possible errors:
   *   - 10001: Unknown error
   *   - 20101: Version not supported
   */
  getPrincipals(): Promise<GetPrincipalResponse>
}
