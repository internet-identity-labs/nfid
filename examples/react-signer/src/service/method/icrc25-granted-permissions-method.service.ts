import { userInfoStorage } from "../storage.service"
import { ButtonActions, Icrc25Dto, RPCMessage, RPCSuccessResponse, Scope } from "../../type"
import { MethodService } from "./method.servcie"

class Icrc25GrantedPermissionsMethodService implements MethodService {
  public isUserApprovalNeeded(): boolean {
    return false
  }

  public getMethod(): string {
    return "icrc25_granted_permissions"
  }

  public getButtonActions(): ButtonActions {
    throw Error("Not supported")
  }

  public async sendResponse(message: MessageEvent<RPCMessage>): Promise<void> {
    const permissionsEntity = await userInfoStorage.get("permissions")

    const permissions = permissionsEntity ? JSON.parse(permissionsEntity) as string[] : []
    const scopes: Scope[] = permissions.map(x => { return { method: x } })
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

}

export const icrc25GrantedPermissionsMethodService = new Icrc25GrantedPermissionsMethodService()
