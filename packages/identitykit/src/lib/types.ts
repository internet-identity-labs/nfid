import { ICRC25Methods, ICRC25RequestTypeMap, ICRC25ResponseTypeMap } from "../standards/icrc-25"
import { ICRC49Methods, ICRC49RequestTypeMap, ICRC49ResponseTypeMap } from "../standards/icrc-49"

export type SignerConfig = {
  id: string
  providerUrl: string
  label: string
  icon?: string
}

export type WithRpcResponse<T> = {
  id: string
  jsonrpc: string
  origin: string
} & T extends ResponseFailed
  ? ResponseFailed
  : { result: T }

export type IdentityKitMethod = ICRC25Methods | ICRC49Methods

export type ResponseFailed = {
  error: {
    code: number
    message?: string
    description?: string
  }
}

export type RequestTypeMap = ICRC25RequestTypeMap & ICRC49RequestTypeMap
export type ResponseTypeMap = ICRC25ResponseTypeMap & ICRC49ResponseTypeMap

export interface IRequestFunction {
  <T extends IdentityKitMethod>(
    args: RequestTypeMap[T] extends undefined
      ? { method: T }
      : { method: T; params: RequestTypeMap[T] }
  ): Promise<WithRpcResponse<ResponseTypeMap[T] | ResponseFailed>>
}
