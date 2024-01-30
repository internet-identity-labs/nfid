import * as uuid from "uuid"
import { RPCMessage } from "./types"
import { RPC_BASE } from "./constants"

export async function request<M, P, R>(
  iframe: { contentWindow: Window },
  { method, params }: Omit<RPCMessage<M, P>, "jsonrpc" | "id">
) {
  const requestId = uuid.v4()
  const req = {
    ...RPC_BASE,
    id: requestId,
    method,
    params,
  }
  console.debug("postmsg-rpc request", { ...req })

  return new Promise<R>((resolve, reject) => {
    const timeout = setTimeout(() => {
      window.removeEventListener("message", handleEvent)
      reject(new Error("Request timed out"))
      // TODO: improve timeout handling
    }, 60000)

    const handleEvent = (event: MessageEvent) => {
      if (event.data && event.data.id === requestId) {
        console.debug(`resolve id: ${requestId}`, { event })
        resolve(event.data)
        window.removeEventListener("message", handleEvent)
        timeout && clearTimeout(timeout)
      }
    }

    window.addEventListener("message", handleEvent)

    iframe.contentWindow.postMessage(req, "*")
  })
}
