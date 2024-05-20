import React, { useContext } from "react"
import { IdentityKitContext } from "./context"
import * as Dialog from "@radix-ui/react-dialog"

export const IdentityKitModal: React.FC = () => {
  const { isModalOpen, toggleModal, selectedSigner, signers, selectSigner, signerIframeRef } =
    useContext(IdentityKitContext)

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={toggleModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 z-[1009]" />
        <Dialog.Content className="flex flex-col gap-2 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[1010]">
          {selectedSigner ? (
            <>
              <div
                className="transition-opacity cursor-pointer hover:opacity-50"
                onClick={() => selectSigner(undefined)}
              >
                Back
              </div>
              <iframe ref={signerIframeRef} src={selectedSigner?.providerUrl} />
            </>
          ) : (
            signers.map((signer) => (
              <div
                key={`signer_${signer.id}`}
                className="flex items-center w-full py-2 space-x-2 text-xl font-bold hover:bg-gray-300"
                onClick={() => selectSigner(signer.id)}
              >
                <img
                  src={signer.icon}
                  alt={signer.label}
                  className="w-12 h-12 bg-gray-100 rounded-full"
                />
                <p>{signer.label}</p>
              </div>
            ))
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
