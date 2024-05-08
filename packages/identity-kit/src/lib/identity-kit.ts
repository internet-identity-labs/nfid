import { Signer } from "../signer"

export class IdentityKit {
  public static config() {
    console.debug("IdentityKit.config()")
    return true
  }
  public static connect({ signer }: { signer: Signer }) {
    console.debug("IdentityKit.connect", { signer})
    return signer
  }
}
