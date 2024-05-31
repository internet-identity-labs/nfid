import { ICRC25Methods, ICRC25RequestTypeMap, ICRC25ResponseTypeMap } from "../standards/icrc-25"

export type SignerConfig = {
  id: string
  providerUrl: string
  label: string
  icon?: string
}

export type IdentityKitMethod = ICRC25Methods

export type ResponseFailed = {
  error: {
    code: number
    message?: string
    description?: string
  }
}

export type RequestTypeMap = ICRC25RequestTypeMap
export type ResponseTypeMap = ICRC25ResponseTypeMap

export interface IRequestFunction {
  <T extends IdentityKitMethod>(
    args: RequestTypeMap[T] extends undefined
      ? { method: T }
      : { method: T; params: RequestTypeMap[T] }
  ): Promise<ResponseTypeMap[T] | ResponseFailed>
}
