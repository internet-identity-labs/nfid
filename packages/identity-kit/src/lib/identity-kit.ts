import { requestFactory } from "@nfid/postmessage-rpc"
import { IRequest, IdentityKitMethod, ResponseFailed, ResponseTypeMap } from "./types"

export class IdentityKit {
  // TODO: Handle transport selection

  public static init = async (): Promise<IdentityKit> => {
    return await new Promise((resolve, reject) => {
      const removeEventListener = () => {
        window.removeEventListener("message", handleReadyEvent)
      }
      const timeout = setTimeout(() => {
        removeEventListener()
        reject(new Error("Signer iframe did not respond in time"))
      }, 30000)

      const handleReadyEvent = (event: MessageEvent<string>) => {
        if (event.data === "ready") {
          removeEventListener()
          console.debug("Signer iframe ready")
          clearTimeout(timeout)
          resolve(new this())
        }
      }

      window.addEventListener("message", handleReadyEvent)
    })
  }

  public request = async <T extends IdentityKitMethod>({
    iframe,
    method,
    params,
  }: {
    iframe: HTMLIFrameElement
    method: T
    params: IRequest
  }): Promise<ResponseTypeMap[T] | ResponseFailed> => {
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

      return makeRequest(providerUrl, { method, params })
    } catch (e) {
      // TODO: Handle error response
      console.error(e)
      return { error: { code: 500, message: "Internal Server Error" } }
    }
  }
}
