import { Version } from "../ version"
import { RPCMessage, RPCResponse } from "@nfid/postmessage-rpc"

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
  /**
   * Methods of supported standard.
   */
  methods: Array<{ name: ICRC25Methods; isInteractive: boolean }>
}

/**
 * Represents the response containing the supported standards.
 */
export type GetSupportedStandardResponse = Version & {
  /**
   * List of supported standards and their information.
   */
  supportedStandards: SupportedStandard[]
}

/**
 * Configuration for the adapter.
 */
export type AdapterConfig = {
  /**
   * The version of the standard used. If the signer does not support the version of the request,
   * it must send the "VERSION_NOT_SUPPORTED" error in response.
   * Optional.
   */
  version?: string
  /**
   * URL of the provider.
   */
  providerUrl: string
  /**
   * Handler transporting the messages
   */
  // FIXME:
  // @ts-expect-error err
  requestHandler?: (rpcMessage: RPCMessage) => RPCResponse
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
export type PermissionRequest = {
  /**
   * Array of permission scope objects.
   */
  scopes: ScopeRequest[]
}

/**
 * Represents a collection of permission scopes.
 */
export type RevokePermissionRequest = {
  /**
   * Array of permission scope objects.
   */
  scopes?: ScopeRequest[]
}

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
  getSupportedStandards(): GetSupportedStandardResponse

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
  grantedPermission(): Promise<PermissionResponse>

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

export type ICRC25RequestTypeMap = {
  [ICRC25Methods.icrc25_request_permissions]: PermissionRequest
  [ICRC25Methods.icrc25_revoke_permissions]: PermissionRequest
  [ICRC25Methods.icrc25_granted_permissions]: undefined
  [ICRC25Methods.icrc25_supported_standards]: undefined
}

export type ICRC25ResponseTypeMap = {
  [ICRC25Methods.icrc25_request_permissions]: PermissionResponse
  [ICRC25Methods.icrc25_revoke_permissions]: PermissionResponse
  [ICRC25Methods.icrc25_granted_permissions]: PermissionResponse
  [ICRC25Methods.icrc25_supported_standards]: GetSupportedStandardResponse
}

export enum ICRC25Methods {
  "icrc25_request_permissions" = "icrc25_request_permissions",
  "icrc25_revoke_permissions" = "icrc25_revoke_permissions",
  "icrc25_granted_permissions" = "icrc25_granted_permissions",
  "icrc25_supported_standards" = "icrc25_supported_standards",
}
