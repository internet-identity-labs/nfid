import React, { useContext } from "react"
import { IdentityKitContext } from "./context"
import * as Dialog from "@radix-ui/react-dialog"

export const IdentityKitModal = () => {
  const { isModalOpen, toggleModal, approve, reject } = useContext(IdentityKitContext)
  console.log({ isModalOpen })
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={toggleModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="flex flex-col gap-2 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          we choose signer here
          <button onClick={approve}>approve</button>
          <button onClick={reject}>reject</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
