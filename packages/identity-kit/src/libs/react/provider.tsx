import React, { createContext, useContext } from "react"
import invariant from "tiny-invariant"
import { SignerAdapter } from "../../adapters"
import { requestFactory } from "@nfid/postmessage-rpc"

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
  const adapter = React.useMemo(
    () =>
      config.signer.map(
        ({ providerUrl, id }) =>
          new SignerAdapter({
            id,
            providerUrl,
            onMessage: (message) => console.debug("onMessage", message),
            requestFactory,
          })
      ),
    [config.signer]
  )
  console.debug("IdentityKitProvider", { adapter })

  const handleConnect = React.useCallback(
    (id: string) => {
      console.debug("IdentityKitProvider.handleConnect", { id })
      const signer = adapter.find((signer) => signer.isSigner(id))
      invariant(signer, `No signer found for id: ${id}`)
      signer.connect()
    },
    [adapter]
  )

  return (
    <IdentityKitContext.Provider value={{ ...config, handleConnect }}>
      {children}
    </IdentityKitContext.Provider>
  )
}
