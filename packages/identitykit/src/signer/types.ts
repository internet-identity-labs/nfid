import { AdapterConfig } from "../standards/icrc-25"

export interface BaseAdapter {
  config(config: AdapterConfig): this
}
