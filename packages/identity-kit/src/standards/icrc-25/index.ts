import { Version } from "../ version"

/**
 * Represents a supported standard.
 */
export type SupportedStandard = {
  /**
   * Name of the supported standard.
   */
  name: string
  /**
   * URL providing information about the standard.
   */
  url: string
}

/**
 * Represents a request to get the supported standards.
 */
export type GetSupportedStandardRequest = Version;

/**
 * Represents the response containing the supported standards.
 */
export type GetSupportedStandardResponse = Version & {
  /**
   * List of supported standards and their information.
   */
  standards: SupportedStandard[];
};

/**
 * Configuration for the adapter.
 */
export type AdapterConfig = {
  /**
   * URL of the provider.
   */
  providerUrl: string
}

/**
 * Represents a scope of permission.
 */
export type ScopeRequest = {
  /**
   * Method associated with the scope.
   */
  method: string
  /**
   * Optional array of target entities for the scope.
   */
  targets?: string[]
  /**
   * Optional array of sender entities for the scope.
   */
  senders?: string[]
}

/**
 * Represents a scope of permission.
 */
export type ScopeResponse = {
  /**
   * Method associated with the scope.
   */
  method: string
  /**
   * Array of target entities for the scope.
   */
  targets: string[]
  /**
   * Array of sender entities for the scope.
   */
  senders: string[]
}

/**
 * Represents a collection of permission scopes.
 */
export type PermissionRequest = Version & {
  /**
   * Array of permission scope objects.
   */
  scopes: ScopeRequest[]
}

/**
 * Represents a collection of permission scopes.
 */
export type RevokePermissionRequest = Version & {
  /**
   * Array of permission scope objects.
   */
  scopes?: ScopeRequest[]
}

/**
 * Represents a collection of permission scopes.
 */
export type GrantedPermissionRequest = Version

/**
 * Represents a collection of permission scopes.
 */
export type PermissionResponse = Version & {
  /**
   * Array of permission scope objects.
   */
  scopes: ScopeResponse[]
}

/**
 * Interface for ICRC25 adapter.
 * @template T - Type of the adapter.
 */
export interface ICRC25Adapter<T> {
  /**
   * Configures the adapter with the provided configuration.
   * @param {AdapterConfig} request - The configuration request.
   * @returns {T} - Configured adapter.
   */
  config(request: AdapterConfig): T

  /**
   * Retrieves the list of supported standards.
   * @returns {GetSupportedStandardResponse} - List of supported standards and version.
   * @throws {Error} Possible errors:
   *   - 10001: Unknown error
   *   - 20101: Version not supported
   */
  getSupportedStandards(request: GetSupportedStandardRequest): GetSupportedStandardResponse

  /**
   * Requests permission scopes to perform further actions.
   * If the set of granted scopes is not empty and there was no session before, a new session is created.
   * @param {Scopes} request - The permission scope request.
   * @returns {Promise<Scopes>} - Granted permission scopes.
   * @throws {Error} Possible errors:
   *   - 10001: Unknown error
   *   - 20101: Version not supported
   *   - 30101: Permission not granted
   */
  requestPermission(request: PermissionRequest): Promise<PermissionResponse>

  /**
   * Queries the granted permission scopes on the active session.
   * @returns {Promise<Scopes>} - Granted permission scopes.
   * @throws {Error} Possible errors:
   *   - 10001: Unknown error
   *   - 20101: Version not supported
   */
  grantedPermission(request: GrantedPermissionRequest): Promise<PermissionResponse>

  /**
   * Revokes previously granted permission scopes.
   * If scopes are not specified, revokes all granted scopes and terminates the session.
   * If all granted permission scopes are revoked, the session (if any) is terminated.
   * @param {Scopes} [request] - The permission scope request for revocation.
   * @returns {Promise<Scopes>} - Revoked permission scopes.
   * @throws {Error} Possible errors:
   *   - 10001: Unknown Error
   *   - 20101: Version not supported
   */
  revokePermission(request: RevokePermissionRequest): Promise<PermissionResponse>
}
