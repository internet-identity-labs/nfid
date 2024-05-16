/* eslint-disable no-unused-vars */
import { Signer } from "../signer"
import { ICRC25Methods } from "../standards/icrc-25/types"
import {
  IRequestFunction,
  IdentityKitMethod,
  RequestTypeMap,
  ResponseFailed,
  ResponseTypeMap,
} from "./types"

export class IdentityKit {
  public static config() {
    console.debug("IdentityKit.config()")
    return true
  }

  public static connect({ signer }: { signer: Signer }) {
    console.debug("IdentityKit.connect", { signer })
    return signer
  }

  public static request: IRequestFunction = async <T extends IdentityKitMethod>(
    _method: T,
    _params: RequestTypeMap[T]
  ): Promise<ResponseTypeMap[T] | ResponseFailed> => {
    // Here we send RPC request to the signer and wait for response
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          scopes: [
            {
              method: ICRC25Methods.icrc25_request_permissions,
            },
          ],
        })
      }, 2000)
    )

    return response as ResponseTypeMap[T]
  }
}
