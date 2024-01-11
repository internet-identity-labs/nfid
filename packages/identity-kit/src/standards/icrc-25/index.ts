export type SupportedStandard = {
  name: string
  url: string
}

export type AdapterConfig = {
  providerUrl: string
}

export interface ICRC25Adapter<T> {
  config(request: AdapterConfig): T
  getSupportedStandards(): SupportedStandard[]
}