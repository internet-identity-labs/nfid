import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"
import { accountService } from "../../account.service"
import { callCanisterService } from "../../call-canister.service"
import { DelegationChain, DelegationIdentity, Ed25519KeyIdentity } from "@dfinity/identity"

const HOUR = 3_600_000

export interface CallCanisterComponentData extends ComponentData {
  origin: string
  methodName: string
  canisterId: string
  sender: string
  args: string
  consentMessage?: string
}

export interface Icrc49Dto {
  canisterId: string
  sender: string
  method: string
  arg: string
}

class Icrc49GetDelegationMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc49_call_canister"
  }

  public async onApprove(message: MessageEvent<RPCMessage>): Promise<void> {
    const icrc34Dto = message.data.params as unknown as Icrc49Dto
    const key = await accountService.getAccountKeyIdentityByPrincipal(icrc34Dto.sender)

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

    const sessionKey = Ed25519KeyIdentity.generate()
    const chain = await DelegationChain.create(
      key,
      sessionKey.getPublicKey(),
      new Date(Date.now() + 44 * HOUR),
      {}
    )
    const delegation = DelegationIdentity.fromDelegation(sessionKey, chain)

    const callResponse = await callCanisterService.call({
      canisterId: icrc34Dto.canisterId,
      calledMethodName: icrc34Dto.method,
      parameters: icrc34Dto.arg,
      delegation,
    })

    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: {
        ...callResponse.result.verification,
      },
    }

    window.parent.postMessage(response, message.origin)
  }

  public async getСomponentData(
    message: MessageEvent<RPCMessage>
  ): Promise<CallCanisterComponentData> {
    const icrc34Dto = message.data.params as unknown as Icrc49Dto

    const account = await accountService.getAccountKeyIdentityByPrincipal(icrc34Dto.sender)

    if (!account) {
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
      origin: message.origin,
      methodName: icrc34Dto.method,
      canisterId: icrc34Dto.canisterId,
      sender: icrc34Dto.sender,
      args: icrc34Dto.arg,
    }
  }
}

export const icrc49GetDelegationMethodService = new Icrc49GetDelegationMethodService()
