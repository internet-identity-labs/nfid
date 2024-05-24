import { Ed25519KeyIdentity } from "@dfinity/identity"
import { userInfoStorage } from "../../storage.service"
import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"
import { IAccount } from "../../../methods/get_accounts"

export interface AccountsComponentData extends ComponentData {
  accounts: IAccount[]
}

class Icrc27GetAccountsMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc27_get_accounts"
  }

  public async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
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
        accounts: [
          {
            principal,
            subaccount: "0000000000000000000000000000000000000000000000000000000000000000",
          },
        ],
      },
    }

    window.parent.postMessage(response, message.origin)
  }

  public getСomponentData(message: MessageEvent<RPCMessage>): AccountsComponentData {
    const accounts = [
      { displayName: "Some display name 1", value: "123" },
      { displayName: "Some display name 2", value: "1234" },
      { displayName: "Some display name 3", value: "12345" },
    ]
    return {
      accounts,
      ...super.getСomponentData(message),
    }
  }
}

export const icrc27GetAccountsMethodService = new Icrc27GetAccountsMethodService()
