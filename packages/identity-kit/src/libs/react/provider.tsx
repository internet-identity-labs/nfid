import React, { useState, useCallback, PropsWithChildren, useRef } from "react"

import { SignerConfig } from "./types"
import { IRequest, IRequestFunction, IResponse } from "../../lib/types"
import { IdentityKitContext } from "./context"
import { IdentityKit } from "../../lib/identity-kit"
import { IdentityKitModal } from "./modal"

interface IdentityKitProviderProps extends PropsWithChildren {
  signers: SignerConfig[]
}

export const IdentityKitProvider: React.FC<IdentityKitProviderProps> = ({ children, signers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSigner, setSelectedSigner] = useState<SignerConfig | undefined>() // TODO: validate signers
  const [activeRequest, setActiveRequest] = useState<IRequest | undefined>(undefined) // TODO: validate request
  const response = useRef<IResponse | undefined>(undefined)

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  }, [])

  const selectSigner = useCallback(
    (signerId: string) => {
      const signer = signers.find((s) => s.id === signerId)
      if (!signer) throw new Error(`Signer with id ${signerId} not found`)
      setSelectedSigner(signer)
      return signer
    },
    [signers, setSelectedSigner]
  )

  const reject = useCallback(() => {
    setIsModalOpen(false)
    response.current = { error: { code: 100, message: "Operation rejected by user" } }
    setActiveRequest(undefined)
  }, [setIsModalOpen, response, setActiveRequest])

  const approve = useCallback(async (): Promise<void> => {
    if (!activeRequest) throw new Error("No active request")
    // send request to signer
    // wait for response
    // close modal
    // store response for sending back to the caller

    const res = await IdentityKit.request(activeRequest.method, activeRequest)
    response.current = res
  }, [selectedSigner, activeRequest])

  const request: IRequestFunction = useCallback(
    async (_, request) => {
      setActiveRequest(request)
      setIsModalOpen(true)
      return new Promise((resolve) => {
        setInterval(() => {
          if (response.current) {
            const responseCopy = response.current
            response.current = undefined
            setIsModalOpen(false)
            resolve(responseCopy)
          }
        }, 500)
      })
    },
    [selectedSigner, response, response.current, setIsModalOpen]
  )

  return (
    <IdentityKitContext.Provider
      value={{
        signers,
        selectedSigner,
        isModalOpen,
        toggleModal,
        selectSigner,
        reject,
        approve,
        request,
      }}
    >
      <IdentityKitModal />
      {children}
    </IdentityKitContext.Provider>
  )
}
