export type SupportedStandard = {
  type: Standard
  url: string
}

export type AdapterConfig = {
  providerUrl: string
}

export interface ICRC25Adapter<T> {
  config(request: AdapterConfig): T,
  getSupportedStandards(): SupportedStandard[]
}

export enum Standard {
  ICRC25,
  ICRC31,
  ICRC32,
  ICRC33,
  ICRC34
}