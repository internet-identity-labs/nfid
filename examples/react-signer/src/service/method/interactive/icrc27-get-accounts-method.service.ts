import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"
import { Account, accountService } from "../../account.service"
import { authService } from "../../auth.service"

export interface AccountsComponentData extends ComponentData {
  accounts: Account[]
}

class Icrc27GetAccountsMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc27_get_accounts"
  }

  public async onApprove(message: MessageEvent<RPCMessage>, data?: unknown): Promise<void> {
    const accounts = data as Account[]

    const accountsResponse = accounts.map((x) => {
      return {
        principal: x.principal,
        subaccount: x.subaccount,
      }
    })

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: {
        accounts: accountsResponse,
      },
    }

    window.parent.postMessage(response, message.origin)
  }

  public async getСomponentData(message: MessageEvent<RPCMessage>): Promise<AccountsComponentData> {
    const authorized = await authService.hasPermission(this.getMethod())

    if (!authorized) {
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
      throw Error("Permission not granted")
    }

    const accounts = await accountService.getAccounts()
    if (!accounts) {
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
      throw Error("User is not found")
    }

    const baseData = await super.getСomponentData(message)
    return {
      ...baseData,
      accounts,
    }
  }
}

export const icrc27GetAccountsMethodService = new Icrc27GetAccountsMethodService()
