import React, { createContext, useContext } from "react"
import invariant from "tiny-invariant"
import { Signer } from "../../signer"
import { IdentityKit } from "../../lib/identity-kit"

type SignerConfig = {
  id: string
  providerUrl: string
  label: string
  icon?: string
}

interface IdentityKitConfig {
  signer: SignerConfig[]
}

type IdentityKitContextProps = IdentityKitConfig & {
  handleConnect: (id: string) => void
}

const IdentityKitContext = createContext<IdentityKitContextProps | null>(null)

export function useIdentityKit(): IdentityKitContextProps {
  const identity = useContext(IdentityKitContext)
  if (!identity) {
    throw new Error("useIdentityKitConfig must be used within an IdentityKitProvider")
  }
  return identity
}

interface IdentityKitProviderProps {
  config: IdentityKitConfig
  children: React.ReactNode
}

export const IdentityKitProvider: React.FC<IdentityKitProviderProps> = ({ config, children }) => {
  const signers = React.useMemo(
    () =>
      config.signer.map(
        ({ id }) =>
          new Signer({ id })
      ),
    [config.signer]
  )
  console.debug("IdentityKitProvider", { adapter: signers })

  const handleConnect = React.useCallback(
    (id: string) => {
      console.debug("IdentityKitProvider.handleConnect", { id })
      const signer = signers.find((signer) => signer.isSigner(id))
      invariant(signer, `No signer found for id: ${id}`)
      IdentityKit.connect({ signer })
    },
    [signers]
  )

  return (
    <IdentityKitContext.Provider value={{ ...config, handleConnect }}>
      {children}
    </IdentityKitContext.Provider>
  )
}
