import { createContext, useContext } from "react"
import { IdentityKitProvider } from "./types"
import { IRequestFunction } from "../../lib/types"

const defaultState: IdentityKitProvider = {
  signers: [],
  selectedSigner: undefined,
  isModalOpen: false,
  toggleModal: () => {
    throw new Error("toggleModal not implemented")
  },
  selectSigner: () => {
    throw new Error("selectSigner not implemented")
  },
  reject: () => {
    throw new Error("reject not implemented")
  },
  approve: async () => {
    throw new Error("approve not implemented")
  },
  request: async () => {
    throw new Error("request not implemented")
  },
}

export const IdentityKitContext = createContext<IdentityKitProvider>(defaultState)

export function useIdentityKit(): {
  request: IRequestFunction
} {
  const { request } = useContext(IdentityKitContext)
  if (!request) throw new Error("useIdentityKit must be used within an IdentityKitProvider")

  return {
    request,
  }
}
