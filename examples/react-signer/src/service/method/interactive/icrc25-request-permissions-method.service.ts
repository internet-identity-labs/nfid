import { userInfoStorage } from "../../storage.service"
import { RPCMessage, RPCSuccessResponse, Icrc25Dto } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"

export interface PermissionsComponentData extends ComponentData {
  permissions: string[]
}

class Icrc25RequestPermissionsMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc25_request_permissions"
  }

  public async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
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

  public getСomponentData(message: MessageEvent<RPCMessage>): PermissionsComponentData {
    const icrc25Message = message.data.params as unknown as Icrc25Dto
    const permissions = icrc25Message.scopes.map((el) => el.method)
    return {
      permissions,
      ...super.getСomponentData(message)
    }
  }

}

export const icrc25RequestPermissionsMethodService = new Icrc25RequestPermissionsMethodService()
