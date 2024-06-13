import { actorService } from "./actor.service"
import {
  Icrc21ConsentMessageRequest,
  type _SERVICE as ConsentMessageCanister,
} from "../idl/consent"
import { idlFactory as ConsentMessageCanisterIDL } from "../idl/consent_idl"
import { IDL } from "@dfinity/candid"
import { interfaceFactoryService } from "./interface-factory.service"
import { Agent } from "@nfid/agent"

class ConsentMessageError extends Error {}

export const consentMessageService = {
  async getConsentMessage(
    canisterId: string,
    methodName: string,
    arg: string,
    agent: Agent
  ): Promise<string | undefined> {
    try {
      const interfaceFactory = await interfaceFactoryService.getInterfaceFactory(canisterId, agent)
      const idl: IDL.ServiceClass = interfaceFactory({ IDL })
      const func: IDL.FuncClass = idl._fields.find((x: unknown[]) => methodName === x[0])![1]
      const argument = IDL.encode(func.argTypes, JSON.parse(arg))

      const actor = actorService.getActor<ConsentMessageCanister>(
        canisterId,
        ConsentMessageCanisterIDL,
        agent as never
      )

      const request: Icrc21ConsentMessageRequest = {
        method: methodName,
        arg: new Uint8Array(argument),
        user_preferences: {
          metadata: { language: "en" },
          device_spec: [],
        },
      }

      const consentMessageResult = await actor.icrc21_canister_call_consent_message(request)

      if ("Err" in consentMessageResult) {
        const description = Object.values(consentMessageResult.Err)[0].description
        throw new ConsentMessageError(description)
      }

      if ("LineDisplayMessage" in consentMessageResult.Ok.consent_message) {
        throw new ConsentMessageError("LineDisplayMessage is not supported")
      }

      return consentMessageResult.Ok.consent_message.GenericDisplayMessage
    } catch (error) {
      console.error("consentMessageService getConsentMessage", error)
      return undefined
    }
  },
}