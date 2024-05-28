import React, { useState, useCallback, PropsWithChildren, useRef } from "react"

import { IRequestFunction, IResponse, SignerConfig } from "../../lib/types"
import { IdentityKitContext } from "./context"
import { IdentityKitModal } from "./modal"
import { IdentityKit } from "../../lib/identity-kit"

interface IdentityKitProviderProps extends PropsWithChildren {
  signers: SignerConfig[]
}

// may be better to add silent flag to such methods in constants
const SILENT_METHODS = ["icrc25_granted_permissions", "icrc25_supported_standards", "icrc29_status"]

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

  // TODO: Maybe split this into multiple functions
  const request: IRequestFunction = useCallback(
    async (method, request) => {
      if (!selectedSigner || !SILENT_METHODS.includes(method)) setIsModalOpen(true)

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

      // if signer is selected wait for iframe to be ready
      if (!Number(signerIframeRef.current?.getAttribute("ready"))) {
        await new Promise((resolve) => {
          const int = setInterval(() => {
            if (Number(signerIframeRef.current?.getAttribute("ready"))) {
              clearInterval(int)
              resolve(true)
            }
          }, 500)
        })
      }

      const iframe = signerIframeRef.current
      if (!iframe) throw new Error("Iframe not found")

      const res = await IdentityKit.request({ iframe, method, params: request })
      setIsModalOpen(false)
      return res
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
      <IdentityKitModal
        onIframeLoad={async function (e) {
          if (!e.currentTarget.getAttribute("ready")) {
            await IdentityKit.init()
            signerIframeRef.current?.setAttribute("ready", "1")
          }
        }}
      />
      {children}
    </IdentityKitContext.Provider>
  )
}
