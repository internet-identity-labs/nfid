import {
  RPCMessage,
  RPCSuccessResponse,
  Icrc25Dto,
  Scope,
} from "../../../type"
import { InteractiveMethodService } from "./interactive-method.service"
import { PermissionsComponentData } from "./icrc25-request-permissions-method.service"
import { authService } from "../../auth.service"

class Icrc25RevokePermissionsMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc25_revoke_permissions"
  }

  public async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
    const icrc25Message = message.data.params as unknown as Icrc25Dto

    if (!icrc25Message.scopes) {
      await authService.revokePermissions()
      const response: RPCSuccessResponse = {
        origin: message.origin,
        jsonrpc: message.data.jsonrpc,
        id: message.data.id,
        result: { scopes: [] },
      }
      window.parent.postMessage(response, message.origin)
      return
    }

    const revokePermissions = icrc25Message.scopes.map(x => x.method)
    const permissions = await authService.revokePermissions(revokePermissions)
    if (!permissions || permissions.length === 0) {
      const response: RPCSuccessResponse = {
        origin: message.origin,
        jsonrpc: message.data.jsonrpc,
        id: message.data.id,
        result: { scopes: [] },
      }
      window.parent.postMessage(response, message.origin)
      return
    }

    const scopes: Scope[] = permissions.map(x => { return { method: x } })
    const icrc25: Icrc25Dto = {
      scopes,
    }

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: icrc25,
    }

    window.parent.postMessage(response, message.origin)
  }

  public async getСomponentData(message: MessageEvent<RPCMessage>): Promise<PermissionsComponentData> {
    const icrc25Message = message.data.params as unknown as Icrc25Dto
    const permissions = icrc25Message.scopes.map((el) => el.method)
    const baseData = await super.getСomponentData(message)
    return {
      ...baseData,
      permissions
    }
  }
}

export const icrc25RevokePermissionsMethodService = new Icrc25RevokePermissionsMethodService()
