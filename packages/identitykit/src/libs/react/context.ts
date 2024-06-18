import { createContext, useContext } from "react"
import { IdentityKitProvider } from "./types"
import { IRequestFunction } from "../../lib/types"
import { IdentityKitAgentType } from "../../lib/identity-kit-agent"

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
  request: async () => {
    throw new Error("request not implemented")
  },
  IdentityKitAgent: {} as IdentityKitAgentType,
}

export const IdentityKitContext = createContext<IdentityKitProvider>(defaultState)

export function useIdentityKit(): {
  request: IRequestFunction
  IdentityKitAgent: IdentityKitAgentType
} {
  const { request, IdentityKitAgent } = useContext(IdentityKitContext)
  if (!request) throw new Error("useIdentityKit must be used within an IdentityKitProvider")

  return {
    request,
    IdentityKitAgent,
  }
}
