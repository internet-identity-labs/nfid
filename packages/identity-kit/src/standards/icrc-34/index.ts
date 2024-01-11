// TODO: define type
export type GetDelegationRequest = unknown
// TODO: define type
export type GetDelegationResponse = unknown

export interface IRCR34Adapter {
  getDelegation(request: GetDelegationRequest): Promise<GetDelegationResponse>
}
