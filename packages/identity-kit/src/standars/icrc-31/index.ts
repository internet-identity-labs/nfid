export type GetPrincipalResponse = {
  version: string
  principals: string[]
}

export type ICRC31ResponseTypes = GetPrincipalResponse

export interface ICRC31Adapter {
  getPrincipals(): ICRC31ResponseTypes
}
