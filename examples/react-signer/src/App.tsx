import React from "react"
import { Box, Flex } from "@radix-ui/themes"
import { methodServices } from "./service/method/method.servcie"
import { ButtonActions, RPCMessage } from "./type"
import { userInfoStorage } from "./service/storage.service"
import { Ed25519KeyIdentity } from "@dfinity/identity"

function App() {
  const [buttonActions, setButtonActions] = React.useState<ButtonActions | undefined>(undefined)

  const handleMessage = React.useCallback((message: MessageEvent<RPCMessage>) => {
    const methodService = methodServices.get(message.data.method)

    if (!methodService) {
      window.parent.postMessage(
        {
          origin: message.data.origin,
          jsonrpc: message.data.jsonrpc,
          id: message.data.id,
          error: {
            code: 2000,
            message: "Not supported",
          },
        },
        message.origin
      )
      return
    }

    if (!methodService.isUserApprovalNeeded()) {
      methodService.sendResponse(message)
      return
    }

    const buttonActionsNew = methodServices.get(message.data.method)?.getButtonActions(message)
    if (!buttonActionsNew) {
      window.parent.postMessage(
        {
          origin: message.data.origin,
          jsonrpc: message.data.jsonrpc,
          id: message.data.id,
          error: {
            code: 2000,
            message: "Not supported",
          },
        },
        message.origin
      )
    }
    setButtonActions(buttonActionsNew)
  }, [])

  React.useEffect(() => {
    window.addEventListener("message", handleMessage, false)

    async function initDb() {
      const keyPair = await userInfoStorage.get("keyPair")
      if (!keyPair) {
        userInfoStorage.set("keyPair", JSON.stringify(Ed25519KeyIdentity.generate().toJSON()))
      }
    }
    initDb()
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  return (
    <>
      <Box>
        <Flex className="flex items-center justify-center h-screen">
          {buttonActions ? (
            <div className="flex justify-center">
              <button
                className="px-4 py-2 mr-4 font-bold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                onClick={buttonActions.onApprove}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                onClick={buttonActions.onReject}
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="flex justify-center">Loading</div>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default App
