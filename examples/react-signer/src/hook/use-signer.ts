import React, { ReactNode } from "react"
import { methodServices } from "../service/method/method.servcie"
import { RPCMessage } from "../type"
import { methodComponents } from "../component/method/method.component"
import { accountService } from "../service/account.service"

export type UseSignerResponse = {
  component?: ReactNode
  state: State
}

export enum State {
  READY,
  LOADING,
  PROCESSING,
}

;(async () => {
  await accountService.initWithPredefinedUsers()
})()

export const useSigner = (): UseSignerResponse => {
  const [component, setComponent] = React.useState<ReactNode | undefined>(undefined)
  const [state, setState] = React.useState<State>(State.READY)

  const handleMessage = React.useCallback(async (message: MessageEvent<RPCMessage>) => {
    console.debug("useSigner handleMessage:", message)

    setState(State.LOADING)

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
    const methodComponent = componentData && methodComponents.get(componentData.method)
    const component = methodComponent && methodComponent.getComponent(componentData, setState)
    setComponent(component)
    setState(State.PROCESSING)
  }, [])

  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    window.parent.postMessage("ready", "*")
    console.debug("useSigner useEffect: The Ready message has been sent.")
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  return {
    component,
    state,
  }
}
