import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"
import { Account, accountService } from "../../account.service"
import { DelegationChain, Ed25519PublicKey } from "@dfinity/identity"
import { Principal } from "@dfinity/principal"
import { fromHex } from "@dfinity/agent"
import { targetService } from "../../target.service"

export interface AccountsComponentData extends ComponentData {
  accounts: Account[]
}

export interface Icrc34Dto {
  publicKey: string
  targets: string[]
  maxTimeToLive: string
}

class Icrc34GetDelegationMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc34_get_delegation"
  }

  public async onApprove(message: MessageEvent<RPCMessage>, data?: unknown): Promise<void> {
    const icrc34Dto = message.data.params as unknown as Icrc34Dto
    const account = (data as Account[])[0]
    const key = await accountService.getAccountKeyIdentityById(account.id)

    if (!key) {
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
      throw Error("No key found")
    }

    const sessionPublicKey = Ed25519PublicKey.fromDer(fromHex(icrc34Dto.publicKey))

    try {
      await targetService.validateTargets(icrc34Dto.targets, message.origin)
    } catch (e: unknown) {
      window.parent.postMessage(
        {
          origin: message.data.origin,
          jsonrpc: message.data.jsonrpc,
          id: message.data.id,
          error: {
            code: 1000,
            message: "Generic error",
            text: (e as Error).message,
          },
        },
        message.origin
      )
      throw e
    }

    const targets = icrc34Dto.targets.map((x) => Principal.fromText(x))
    const chain = await DelegationChain.create(
      key,
      sessionPublicKey,
      new Date(Date.now() + Number(icrc34Dto.maxTimeToLive)),
      { targets }
    )

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: {
        ...chain.toJSON(),
      },
    }

    window.parent.postMessage(response, message.origin)
  }

  public async getСomponentData(message: MessageEvent<RPCMessage>): Promise<AccountsComponentData> {
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

export const icrc34GetDelegationMethodService = new Icrc34GetDelegationMethodService()