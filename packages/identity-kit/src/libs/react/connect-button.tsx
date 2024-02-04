import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { InfoCircledIcon } from "@radix-ui/react-icons"

import { Box, Button, Flex, IconButton } from "@radix-ui/themes"

import "./styles.css"
import "@radix-ui/themes/styles.css"

export const ConnectButton = () => {
  const [showInfo, toggleInfo] = React.useReducer((value) => !value, false)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Connect</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            <Flex>
              <Box grow={"1"}>Connect your wallet</Box>
              <IconButton radius="full" variant="soft" onClick={toggleInfo}>
                <InfoCircledIcon width="18" height="18" />
              </IconButton>
            </Flex>
          </Dialog.Title>
          {showInfo ? <div>This is Info</div> : <div>Regular Content</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
