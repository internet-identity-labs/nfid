import React, { useState, useCallback, PropsWithChildren, useRef } from "react"

import {
  IdentityKitMethod,
  RequestTypeMap,
  ResponseFailed,
  ResponseTypeMap,
  SignerConfig,
  WithRpcResponse,
} from "../../lib/types"
import { IdentityKitContext } from "./context"
import { IdentityKitModal } from "./modal"
import { IdentityKit } from "../../lib/identity-kit"

export type IdentityKitProviderTheme = "light" | "dark"

interface IdentityKitProviderProps extends PropsWithChildren {
  signers: SignerConfig[]
  theme?: IdentityKitProviderTheme
}

export const IdentityKitProvider: React.FC<IdentityKitProviderProps> = ({
  children,
  signers,
  theme = "light",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSigner, setSelectedSigner] = useState<SignerConfig | undefined>(undefined)
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
  const request = useCallback(
    async <T extends IdentityKitMethod>({
      method,
      ...args
    }: RequestTypeMap[T] extends undefined
      ? { method: T }
      : { method: T; params: RequestTypeMap[T] }): Promise<
      WithRpcResponse<ResponseTypeMap[T] | ResponseFailed>
    > => {
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

      const iframe = signerIframeRef.current
      if (!iframe) throw new Error("Iframe not found")

      // if signer is selected wait for iframe to be ready
      if (!Number(iframe.getAttribute("data-ready"))) {
        await IdentityKit.init()
        iframe.setAttribute("data-ready", "1")
      }

      try {
        const res = await IdentityKit.request({
          iframe,
          method,
          ...args,
        } as { iframe: HTMLIFrameElement; method: T; params: RequestTypeMap[T] })
        return res
      } finally {
        setIsModalOpen(false)
      }
    },
    [selectedSigner, signerIframeRef, setIsModalOpen]
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
      <IdentityKitModal theme={theme} />
      {children}
    </IdentityKitContext.Provider>
  )
}
