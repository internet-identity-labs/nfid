import React, { useContext } from "react"
import { IdentityKitContext } from "./context"
import * as Dialog from "@radix-ui/react-dialog"
import { useTheme } from "next-themes"

export const IdentityKitModal: React.FC = () => {
  const { isModalOpen, toggleModal, selectedSigner, signers, selectSigner, signerIframeRef } =
    useContext(IdentityKitContext)

  const { theme } = useTheme()

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={toggleModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 z-[1009]" />
        <Dialog.Content className="flex flex-col gap-2 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-black p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[1010]">
          {selectedSigner ? (
            <>
              {/* <div
                className="transition-opacity cursor-pointer hover:opacity-50"
                onClick={() => selectSigner(undefined)}
              >
                Back
              </div> */}
              <iframe
                className="min-h-[640px]"
                ref={signerIframeRef}
                src={selectedSigner?.providerUrl + "?theme=" + theme}
              />
            </>
          ) : (
            <>
              <div className="text-xl text-black dark:text-white mb-1 font-bold px-2">
                Connect your wallet
              </div>
              {signers.map((signer) => (
                <div
                  key={`signer_${signer.id}`}
                  className="flex items-center w-full p-5 space-x-3 text-xl font-bold dark:bg-neutral-900 hover:bg-gray-300 border border-solid dark:border-neutral-800 dark:hover:bg-neutral-800"
                  onClick={() => selectSigner(signer.id)}
                >
                  <img
                    src={signer.icon}
                    alt={signer.label}
                    className="w-8 h-8 bg-gray-100 rounded-full"
                  />
                  <p className="text-black dark:text-white text-sm">{signer.label}</p>
                </div>
              ))}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
