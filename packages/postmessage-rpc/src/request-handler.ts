import * as uuid from "uuid"
import { RPCMessage } from "./types"
import { RPC_BASE } from "./constants"

type addEventListener = (type: string, listener: (event: MessageEvent) => void) => void
type removeEventListener = (type: string, listener: (event: MessageEvent) => void) => void
type postMessage = (message: any, targetOrigin: string) => void

export type RequestFactoryProps = {
  addEventListener: addEventListener
  removeEventListener: removeEventListener
  postMessage: postMessage
}

export const requestFactory =
  ({ addEventListener, removeEventListener, postMessage }: RequestFactoryProps) =>
  async <M, P, R>(
    providerUrl: string,
    { method, params }: Omit<RPCMessage<M, P>, "jsonrpc" | "id">
  ) => {
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
        removeEventListener("message", handleEvent)
        reject(new Error("Request timed out"))
        // TODO: improve timeout handling
      }, 60000)

      const handleEvent = (event: MessageEvent) => {
        if (event.data && event.data.id === requestId) {
          console.debug(`resolve id: ${requestId}`, { event })
          resolve(event.data)
          removeEventListener("message", handleEvent)
          timeout && clearTimeout(timeout)
        }
      }

      addEventListener("message", handleEvent)
      console.log({ req, providerUrl })

      postMessage(req, providerUrl)
    })
  }
