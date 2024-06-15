import { SignerAgent, SignerAgentOptions } from "@slide-computer/signer-agent"

export function createIdentityKitAgentClass(signer: SignerAgentOptions["signer"]) {
  class IdentityKitAgent extends SignerAgent {
    constructor(options: Omit<SignerAgentOptions, "signer">) {
      super({ ...options, signer })
    }
  }
  return IdentityKitAgent as new (options: Omit<SignerAgentOptions, "signer">) => {
    [key in keyof IdentityKitAgent]: IdentityKitAgent[key]
  }
}

export type IdentityKitAgentType = ReturnType<typeof createIdentityKitAgentClass>
