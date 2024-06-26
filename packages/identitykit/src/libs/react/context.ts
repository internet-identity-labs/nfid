import { createContext, useContext } from "react"
import { IdentityKitProvider } from "./types"
import { IdentityKitAgentType } from "../../lib/identity-kit-agent"
import { Signer } from "@slide-computer/signer"

const defaultState: IdentityKitProvider = {
  signers: [],
  selectedSigner: undefined,
  isModalOpen: false,
  signerIframeRef: undefined,
  toggleModal: () => {
    throw new Error("toggleModal not implemented")
  },
  selectSigner: () => {
    throw new Error("selectSigner not implemented")
  },
  IdentityKitAgent: {} as IdentityKitAgentType,
}

export const IdentityKitContext = createContext<IdentityKitProvider>(defaultState)

export function useIdentityKit(): {
  IdentityKitAgent: IdentityKitAgentType
  selectedSigner?: Signer
} {
  const { IdentityKitAgent, selectedSigner } = useContext(IdentityKitContext)

  return {
    selectedSigner,
    IdentityKitAgent,
  }
}
