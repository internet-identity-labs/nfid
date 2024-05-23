import { userInfoStorage } from "../storage.service"
import {
  RPCMessage,
  RPCSuccessResponse,
  RPCErrorResponse,
  Icrc25Dto,
  ButtonActions,
  Scope,
} from "../../type"
import { MethodService } from "./method.servcie"

class Icrc25RevokePermissionsMethodService implements MethodService {
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
    return "icrc25_revoke_permissions"
  }

  private async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
    const icrc25Message = message.data.params as unknown as Icrc25Dto

    if (!icrc25Message.scopes) {
      await userInfoStorage.remove("permissions")
      const response: RPCSuccessResponse = {
        origin: message.origin,
        jsonrpc: message.data.jsonrpc,
        id: message.data.id,
        result: { scopes: [] },
      }
      window.parent.postMessage(response, message.origin)
      return
    }

    const permissionEntity = await userInfoStorage.get("permissions")
    if (!permissionEntity) {
      const response: RPCSuccessResponse = {
        origin: message.origin,
        jsonrpc: message.data.jsonrpc,
        id: message.data.id,
        result: { scopes: [] },
      }
      window.parent.postMessage(response, message.origin)
      return
    }

    const revokePermission = icrc25Message.scopes.map(x => x.method)
    const permissions = JSON.parse(permissionEntity) as string[]
    const newPermissions = permissions.filter(x => !revokePermission.includes(x))
    await userInfoStorage.set("permissions", JSON.stringify(newPermissions))

    const scopes: Scope[] = newPermissions.map(x => { return { method: x } })
    const icrc25: Icrc25Dto = {
      scopes
    }

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: icrc25,
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

export const icrc25RevokePermissionsMethodService = new Icrc25RevokePermissionsMethodService()
