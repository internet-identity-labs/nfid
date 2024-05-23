import React from "react"
import { Box, Flex } from "@radix-ui/themes"
import { methodServices } from "./service/method/method.servcie"
import { ButtonActions, RPCMessage } from "./type"
import { userInfoStorage } from "./service/storage.service"
import { Ed25519KeyIdentity } from "@dfinity/identity"
import { Loader } from "./ui/loader"
import { RequestPermissions } from "./methods/request-permissions"
import { GetAccounts } from "./methods/get_accounts"

function App() {
  const [buttonActions, setButtonActions] = React.useState<ButtonActions | undefined>(undefined)
  const [handlingMessage, setHandlingMessage] = React.useState<
    MessageEvent<RPCMessage> | undefined
  >()

  const handleMessage = React.useCallback((message: MessageEvent<RPCMessage>) => {
    setHandlingMessage(message)
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

  React.useEffect(() => {
    window.parent.postMessage("ready", "*")
  }, [])

  return (
    <>
      <Box>
        <Flex className="flex flex-col justify-center h-screen">
          {buttonActions ? (
            <>
              <div className="pt-9">
                {handlingMessage &&
                  handlingMessage.data.method === "icrc25_request_permissions" && (
                    <RequestPermissions
                      origin={handlingMessage.origin}
                      permissions={(handlingMessage as any).data.params.scopes.map(
                        (el: { method: string }) => el.method
                      )}
                    />
                  )}
                {handlingMessage && handlingMessage.data.method === "icrc25_revoke_permissions" && (
                  <RequestPermissions
                    origin={handlingMessage.origin}
                    permissions={(handlingMessage as any).data.params.scopes.map(
                      (el: { method: string }) => el.method
                    )}
                    revoke
                  />
                )}
                {handlingMessage && handlingMessage.data.method === "icrc27_get_accounts" && (
                  <GetAccounts
                    accounts={[
                      { displayName: "Some display name 1", value: "123" },
                      { displayName: "Some display name 2", value: "1234" },
                      { displayName: "Some display name 3", value: "12345" },
                    ]}
                    origin={handlingMessage.origin}
                  />
                )}
              </div>
              <div className="flex justify-between w-full mt-auto">
                <button
                  className="px-3.5 py-3 mr-2 font-bold dark:text-white text-black text-sm dark:bg-black bg-white rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black focus:outline-none flex-1 border border-black dark:border-white border-solid"
                  onClick={buttonActions.onReject}
                >
                  Reject
                </button>
                <button
                  className="px-3.5 py-3 font-bold text-white text-sm bg-blue-600 rounded hover:bg-blue-700 focus:outline-none flex-1"
                  onClick={buttonActions.onApprove}
                >
                  Approve
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default App
