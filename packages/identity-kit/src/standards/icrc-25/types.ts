import { IdentityKitMethod, ResponseFailed } from "../../lib/types"

// icrc25_request_permissions
export interface ICRC25RequestPermissionsRequest {
  method: ICRC25Methods.icrc25_request_permissions
  scopes: {
    method: IdentityKitMethod
  }[]
}

export interface ICRC25RequestPermissionsResponse {
  scopes: {
    method: IdentityKitMethod
  }[]
}

// icrc25_granted_permissions
export interface ICRC25GrantedPermissionsRequest {
  method: ICRC25Methods.icrc25_granted_permissions
}

export interface ICRC25GrantedPermissionsResponse {
  scopes: {
    method: IdentityKitMethod
  }[]
}

export type ICRC25Requests = ICRC25RequestPermissionsRequest | ICRC25GrantedPermissionsRequest
export type ICRC25Responses = ICRC25RequestPermissionsResponse | ICRC25GrantedPermissionsResponse

export type ICRC25RequestTypeMap = {
  [ICRC25Methods.icrc25_request_permissions]: ICRC25RequestPermissionsRequest
  [ICRC25Methods.icrc25_granted_permissions]: ICRC25GrantedPermissionsRequest
}

export type ICRC25ResponseTypeMap = {
  [ICRC25Methods.icrc25_request_permissions]: ICRC25RequestPermissionsResponse | ResponseFailed
  [ICRC25Methods.icrc25_granted_permissions]: ICRC25GrantedPermissionsResponse | ResponseFailed
}

export enum ICRC25Methods {
  "icrc25_request_permissions",
  "icrc25_granted_permissions",
}
