import { SignerAgent, SignerAgentOptions } from "@slide-computer/signer-agent"

export type IdentityKitAgentOptions = Omit<SignerAgentOptions, "signer"> & {
  signer?: SignerAgentOptions["signer"]
}

export function createIdentityKitAgentClass(signer: SignerAgentOptions["signer"]) {
  class IdentityKitAgent extends SignerAgent {
    constructor(options: IdentityKitAgentOptions) {
      super({ signer, ...options })
    }
  }
  return IdentityKitAgent as new (options: IdentityKitAgentOptions) => {
    [key in keyof IdentityKitAgent]: IdentityKitAgent[key]
  }
}

export type IdentityKitAgentType = ReturnType<typeof createIdentityKitAgentClass>
