import { requestFactory } from "@nfid/postmessage-rpc"
import { IRequest, IdentityKitMethod, ResponseFailed, ResponseTypeMap } from "./types"

export class IdentityKit {
  // TODO: Handle transport selection
  public static request = async <T extends IdentityKitMethod>({
    iframe,
    method,
    params,
  }: {
    iframe: HTMLIFrameElement
    method: T
    params: IRequest
  }): Promise<ResponseTypeMap[T] | ResponseFailed> => {
    return new Promise((resolve) => {
      iframe.onload = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 100))
          const postMessage = (message: any, targetOrigin: string) => {
            iframe.contentWindow!.postMessage(message, targetOrigin)
          }

          const makeRequest = requestFactory({
            addEventListener: window.addEventListener,
            removeEventListener: window.removeEventListener,
            postMessage,
          })

          const providerUrl = iframe.src

          const res = (await makeRequest(providerUrl, { method, params })) as
            | ResponseTypeMap[T]
            | ResponseFailed
          resolve(res)
        } catch (e) {
          // TODO: Handle error response
          console.error(e)
          resolve({ error: { code: 500, message: "Internal Server Error" } })
        }
      }
    })
  }
}
