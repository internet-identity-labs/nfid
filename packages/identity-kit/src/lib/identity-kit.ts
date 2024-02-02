import { BaseAdapter } from "../adapters/types"

export class IdentityKit {
  public static config() {
    console.debug("IdentityKit.config()")
    return true
  }
  public static connect({ signer }: { signer: BaseAdapter }) {
    return signer
  }
}
