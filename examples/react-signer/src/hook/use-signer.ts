import { Ed25519KeyIdentity } from "@dfinity/identity"
import React from "react"
import { methodServices } from "../service/method/method.servcie"
import { userInfoStorage } from "../service/storage.service"
import { RPCMessage } from "../type"
import {
  ComponentData,
} from "../service/method/interactive/interactive-method.service"

export type UseSignerResponse = {
  componentData?: ComponentData
}

export const useSigner = (): UseSignerResponse => {
  const [componentData, setComponentData] = React.useState<ComponentData | undefined>(undefined)

  const handleMessage = React.useCallback(async (message: MessageEvent<RPCMessage>) => {
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

    const componentData = await methodService.invokeAndGetComponentData(message)
    setComponentData(componentData)
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

  return {
    componentData
  }
}
