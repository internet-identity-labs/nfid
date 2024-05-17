import React, { useState, useCallback, PropsWithChildren, useRef } from "react"

import { IRequestFunction, IResponse, SignerConfig } from "../../lib/types"
import { IdentityKitContext } from "./context"
import { IdentityKitModal } from "./modal"

interface IdentityKitProviderProps extends PropsWithChildren {
  signers: SignerConfig[]
}

export const IdentityKitProvider: React.FC<IdentityKitProviderProps> = ({ children, signers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSigner, setSelectedSigner] = useState<SignerConfig | undefined>(undefined)
  const response = useRef<IResponse | undefined>(undefined)
  const signerIframeRef = useRef<HTMLIFrameElement>(null)

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  }, [])

  const selectSigner = useCallback(
    (signerId?: string) => {
      if (typeof signerId === "undefined") return setSelectedSigner(undefined)
      const signer = signers.find((s) => s.id === signerId)
      if (!signer) throw new Error(`Signer with id ${signerId} not found`)
      setSelectedSigner(signer)
      return signer
    },
    [signers, selectedSigner]
  )

  const request: IRequestFunction = useCallback(
    async (_, request) => {
      setIsModalOpen(true)

      // If no signer is selected, wait for the user to select one
      if (!signerIframeRef.current) {
        await new Promise((resolve) => {
          const int = setInterval(() => {
            if (signerIframeRef.current) {
              clearInterval(int)
              resolve(true)
            }
          }, 500)
        })
      }
      console.log({ selectedSigner: selectedSigner, signerIframeRef })
      // Send RPC message to signer

      await new Promise((resolve) => setTimeout(resolve, 500))
      const iframe = signerIframeRef.current
      if (!iframe) throw new Error("Iframe not found")
      console.log({ request })
      const message = { type: "RPC", method: "someMethod", params: ["param1", "param2"] }
      iframe.contentWindow?.postMessage(message, iframe.src)

      return new Promise((resolve) => {
        window.addEventListener("message", (event) => {
          setIsModalOpen(false)
          return resolve(event.data)
        })
      })
    },
    [selectedSigner, response, signerIframeRef, response.current, setIsModalOpen]
  )

  return (
    <IdentityKitContext.Provider
      value={{
        signers,
        selectedSigner,
        signerIframeRef,
        isModalOpen,
        toggleModal,
        selectSigner,
        request,
      }}
    >
      <IdentityKitModal />
      {children}
    </IdentityKitContext.Provider>
  )
}
