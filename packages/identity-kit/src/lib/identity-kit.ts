import { requestFactory, RequestTimeoutError } from "@nfid/postmessage-rpc"
import {
  IdentityKitMethod,
  RequestTypeMap,
  ResponseFailed,
  ResponseTypeMap,
  WithRpcResponse,
} from "./types"

const MINUTE_MILLIS = 60000

export class IdentityKit {
  // TODO: Handle transport selection

  public static init = async (): Promise<void> => {
    return await new Promise((resolve, reject) => {
      const removeEventListener = () => {
        window.removeEventListener("message", handleReadyEvent)
      }

      const timeout = setTimeout(() => {
        removeEventListener()
        reject(new Error("Signer iframe did not respond in time"))
      }, MINUTE_MILLIS / 2)

      const handleReadyEvent = (event: MessageEvent<string>) => {
        if (event.data === "ready") {
          removeEventListener()
          console.debug("Signer iframe ready")
          clearTimeout(timeout)
          resolve()
        }
      }

      window.addEventListener("message", handleReadyEvent)
    })
  }

  public static request = async <T extends IdentityKitMethod>(
    args: RequestTypeMap[T] extends undefined
      ? { iframe: HTMLIFrameElement; method: T }
      : { iframe: HTMLIFrameElement; method: T; params: RequestTypeMap[T] }
  ): Promise<WithRpcResponse<ResponseTypeMap[T] | ResponseFailed>> => {
    const { iframe, method, params } = args as {
      iframe: HTMLIFrameElement
      method: T
      params: RequestTypeMap[T]
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postMessage = (message: any, targetOrigin: string) => {
        iframe.contentWindow!.postMessage(message, targetOrigin)
      }

      const makeRequest = requestFactory({
        addEventListener: window.addEventListener,
        removeEventListener: window.removeEventListener,
        postMessage,
      })

      const providerUrl = iframe.src

      return await makeRequest(providerUrl, { method, params })
    } catch (e) {
      // TODO: Handle error response
      console.error(e)
      if (e instanceof RequestTimeoutError) throw e
      throw new Error("Internal Server Error")
    }
  }
}
