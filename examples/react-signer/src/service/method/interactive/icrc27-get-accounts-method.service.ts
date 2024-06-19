import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"
import { Account, accountService } from "../../account.service"
import { GenericError } from "../../exception-handler.service"

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
    const accounts = await accountService.getAccounts()
    if (!accounts) {
      throw new GenericError("User data has not been found")
    }

    const baseData = await super.getСomponentData(message)
    return {
      ...baseData,
      accounts,
    }
  }
}

export const icrc27GetAccountsMethodService = new Icrc27GetAccountsMethodService()
