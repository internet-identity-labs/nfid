/* eslint-disable no-unused-vars */
import {
  ICRC25Methods,
  ICRC25RequestTypeMap,
  ICRC25Requests,
  ICRC25ResponseTypeMap,
  ICRC25Responses,
} from "../standards/icrc-25/types"

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
export type IRequest = ICRC25Requests
export type IResponse = ICRC25Responses | ResponseFailed

export interface IRequestFunction {
  <T extends ICRC25Methods>(
    method: T,
    params: RequestTypeMap[T]
  ): Promise<ResponseTypeMap[T] | ResponseFailed>
}
