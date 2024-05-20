import { Ed25519KeyIdentity } from "@dfinity/identity"
import { userInfoStorage } from "../storage.service"
import { RPCMessage, RPCSuccessResponse, RPCErrorResponse, ButtonActions } from "../../type"
import { MethodService } from "./method.servcie"

class Icrc31GetPrincipalsMethodService implements MethodService {
  public sendResponse(): Promise<void> {
    throw new Error("Method not implemented.")
  }

  public isUserApprovalNeeded(): boolean {
    return true
  }

  public getButtonActions(message: MessageEvent<RPCMessage>): ButtonActions {
    return {
      onApprove: () => this.onApprove(message),
      onReject: () => this.onReject(message),
    }
  }

  public getMethod(): string {
    return "icrc31_get_principals"
  }

  private async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
    const permissionsJson = await userInfoStorage.get("permissions")

    if (!permissionsJson || !(JSON.parse(permissionsJson) as string[]).includes(this.getMethod())) {
      window.parent.postMessage(
        {
          origin: message.data.origin,
          jsonrpc: message.data.jsonrpc,
          id: message.data.id,
          error: {
            code: 3000,
            message: "Permission not granted",
          },
        },
        message.origin
      )
      return
    }

    const keyPairJson = await userInfoStorage.get("keyPair")
    if (!keyPairJson) {
      window.parent.postMessage(
        {
          origin: message.data.origin,
          jsonrpc: message.data.jsonrpc,
          id: message.data.id,
          error: {
            code: 1000,
            message: "Generic error",
            text: "User data has not been found",
          },
        },
        message.origin
      )
      return
    }

    const principal = Ed25519KeyIdentity.fromJSON(keyPairJson).getPrincipal().toText()

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: {
        principals: [principal],
      },
    }

    window.parent.postMessage(response, message.origin)
  }

  private onReject(message: MessageEvent<RPCMessage>): void {
    const response: RPCErrorResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      error: {
        code: 3001,
        message: "Action aborted",
      },
    }

    window.parent.postMessage(response, message.origin)
  }
}

export const icrc31GetPrincipalsMethodService = new Icrc31GetPrincipalsMethodService()
