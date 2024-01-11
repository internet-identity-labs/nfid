export type CallCanisterRequest = {
  version: string
  canisterId: string
  sender: string
  method: string
  arg: string
}

export type CallCanisterResponse = {
  version: string
  contentMap: string
  certificate: string
}

export interface ICRC33Adapter {
  callCanister(request: CallCanisterRequest): CallCanisterResponse
}
