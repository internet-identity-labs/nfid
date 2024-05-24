import { userInfoStorage } from "../../storage.service"
import { Icrc25Dto, RPCMessage, RPCSuccessResponse, Scope } from "../../../type"
import { SilentMethodService } from "./silent-method.service"

class Icrc25GrantedPermissionsMethodService extends SilentMethodService {
  public getMethod(): string {
    return "icrc25_granted_permissions"
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
