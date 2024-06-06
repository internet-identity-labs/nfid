import React, { useState, useCallback, PropsWithChildren, useRef, useEffect } from "react"

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
import { GetSupportedStandardResponse, ICRC25Methods } from "../../standards/icrc-25"

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
  const [silentMethods, setSilentMethods] = useState<Array<string>>([
    ICRC25Methods.icrc25_supported_standards,
  ])

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
      // check somehow that silent methods request ended
      if (!selectedSigner || !silentMethods.includes(method)) setIsModalOpen(true)

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
      if (!Number(signerIframeRef.current?.getAttribute("data-ready"))) {
        await new Promise((resolve) => {
          const int = setInterval(() => {
            if (Number(signerIframeRef.current?.getAttribute("data-ready"))) {
              clearInterval(int)
              resolve(true)
            }
          }, 500)
        })
      }

      const iframe = signerIframeRef.current
      if (!iframe) throw new Error("Iframe not found")

      const res = await IdentityKit.request({
        iframe: signerIframeRef.current,
        method,
        ...args,
      } as { iframe: HTMLIFrameElement; method: T; params: RequestTypeMap[T] })
      setIsModalOpen(false)
      return res
    },
    [silentMethods, selectedSigner, signerIframeRef, setIsModalOpen]
  )

  useEffect(() => {
    ;(async function () {
      if (signerIframeRef.current) {
        await IdentityKit.init()

        const response = await IdentityKit.request({
          iframe: signerIframeRef.current,
          method: ICRC25Methods.icrc25_supported_standards,
        })

        const supportedStandards = (response as WithRpcResponse<GetSupportedStandardResponse>)
          .result.supportedStandards

        if (supportedStandards) {
          setSilentMethods(
            supportedStandards.reduce((acc, { methods }) => {
              return [...acc, ...methods.filter((m) => !m.isInteractive).map((m) => m.name)]
            }, [] as string[])
          )
          signerIframeRef.current.setAttribute("data-ready", "1")
        }
      }
    })()
  }, [selectedSigner, signerIframeRef])

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
