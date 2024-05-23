import { userInfoStorage } from "../storage.service"
import { RPCMessage, RPCSuccessResponse, RPCErrorResponse, Icrc25Dto, ButtonActions } from "../../type"
import { MethodService } from "./method.servcie"

class Icrc25RequestPermissionsMethodService implements MethodService {
  public sendResponse(): Promise<void> {
    throw new Error("Method not implemented.")
  }

  public isUserApprovalNeeded(): boolean {
    return true
  }

  public getButtonActions(message: MessageEvent<RPCMessage>): ButtonActions {
    return {
      onApprove: () => this.onApprove(message),
      onReject: () => this.onReject(message)
    }
  }

  public getMethod(): string {
    return "icrc25_request_permissions"
  }

  private async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
    const icrc25Message = message.data.params as unknown as Icrc25Dto

    await userInfoStorage.set("permissions", JSON.stringify(icrc25Message.scopes.map(x => x.method)))

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: icrc25Message,
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

export const icrc25RequestPermissionsMethodService = new Icrc25RequestPermissionsMethodService()
