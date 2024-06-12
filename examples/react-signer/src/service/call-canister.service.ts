import {
  Actor,
  ActorMethod,
  ActorSubclass,
  Agent,
  CallCanisterActorMethodMapped,
} from "@nfid/agent"
import { DelegationIdentity } from "@dfinity/identity"
import * as console from "console"
import { interfaceFactoryService } from "./interface-factory.service"

export interface CallCanisterRequest {
  delegation: DelegationIdentity
  canisterId: string
  calledMethodName: string
  parameters: string
  agent: Agent
}

export interface CallCanisterResponse {
  result: {
    verification: {
      contentMap: string
      certificate: string
    }
    result: unknown[]
  }
}

class CallCanisterService {
  public async call(request: CallCanisterRequest): Promise<CallCanisterResponse> {
    try {
      const interfaceFactory = await interfaceFactoryService.getInterfaceFactory(
        request.canisterId,
        request.agent
      )
      const actor = Actor.createCallCanisterActor(interfaceFactory, {
        agent: request.agent,
        canisterId: request.canisterId,
      }) as ActorSubclass<CallCanisterActorMethodMapped<Record<string, ActorMethod>>>
      const evalResult = await this.evaluateMethod(
        actor,
        request.calledMethodName,
        request.parameters
      )

      const response = JSON.stringify({ result: evalResult }, (_key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value
      )
      return JSON.parse(response) as CallCanisterResponse
    } catch (error) {
      console.error(`The call cannot be executed`)
      throw error
    }
  }

  private async evaluateMethod(actor: ActorSubclass, methodName: string, parameters: string) {
    if (parameters === undefined || parameters.length === 0 || parameters[0] === undefined) {
      return actor[methodName]()
    }
    return actor[methodName](...JSON.parse(parameters))
  }
}

export const callCanisterService = new CallCanisterService()
