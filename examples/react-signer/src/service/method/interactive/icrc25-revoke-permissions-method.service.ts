import { userInfoStorage } from "../../storage.service"
import {
  RPCMessage,
  RPCSuccessResponse,
  Icrc25Dto,
  Scope,
} from "../../../type"
import { InteractiveMethodService } from "./interactive-method.service"
import { PermissionsComponentData } from "./icrc25-request-permissions-method.service"

class Icrc25RevokePermissionsMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc25_revoke_permissions"
  }

  public async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
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

  public getСomponentData(message: MessageEvent<RPCMessage>): PermissionsComponentData {
    const icrc25Message = message.data.params as unknown as Icrc25Dto
    const permissions = icrc25Message.scopes.map((el) => el.method)
    return {
      permissions,
      ...super.getСomponentData(message)
    }
  }
}

export const icrc25RevokePermissionsMethodService = new Icrc25RevokePermissionsMethodService()
