import {
  Actor,
  ActorMethod,
  ActorSubclass,
  Agent,
  CallCanisterActorMethodMapped,
  Certificate,
  HttpAgent,
  Identity,
  LookupResultFound,
} from "@nfid/agent"
import { Principal } from "@dfinity/principal"
import { ReadStateResponse } from "@dfinity/agent/lib/esm/agent/api"
import { IDL } from "@dfinity/candid"
import { DelegationIdentity } from "@dfinity/identity"
import * as console from "console"

const CANDID_UI_CANISTER = "a4gq6-oaaaa-aaaab-qaa4q-cai"
const IC_HOSTNAME = "https://ic0.app"

export interface CallCanisterRequest {
  delegation: DelegationIdentity
  canisterId: string
  calledMethodName: string
  parameters: string
}

export interface CallCanisterResponse {
  result: {
    verification: {
      contentMap: string,
      certificate: string
    },
    result: unknown[]
  }
}

class CallCanisterService {
  public async call(request: CallCanisterRequest): Promise<CallCanisterResponse> {
    try {
      const agent = new HttpAgent({ host: IC_HOSTNAME })
      const result: string | undefined = await this.getCandidFile(request.canisterId, agent)
      if (!result) {
        console.error(`Unable to retrieve candid from the canister ${request.canisterId}`)
        throw Error("Unable to retrieve candid")
      }
      const js = await this.transformDidToJs(result, agent)
      const actor = await this.createActorDynamically(js, request.canisterId, request.delegation as never)
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

  private async getCandidFile(canisterId: string, agent: HttpAgent): Promise<string> {
    const canister = Principal.fromText(canisterId)
    const encoder = new TextEncoder()
    const pathCandid = [
      encoder.encode("canister"),
      canister.toUint8Array().buffer,
      encoder.encode("metadata"),
      encoder.encode("candid:service"),
    ]
    let responseCandid: ReadStateResponse
    try {
      responseCandid = await agent.readState(canister, { paths: [pathCandid] })
    } catch (error) {
      throw new Error(`Not possible to retrieve candid file from the canister ${canisterId} : ${error}`)
    }

    const certificate = await Certificate.create({
      certificate: responseCandid.certificate,
      canisterId: canister,
      rootKey: agent.rootKey,
    })
    const dataCandid = certificate.lookup(pathCandid)
    return new TextDecoder().decode((dataCandid as LookupResultFound).value as ArrayBuffer)
  }

  private async transformDidToJs(candid: string, agent: HttpAgent): Promise<string> {
    const transformInterface: IDL.InterfaceFactory = ({ IDL }) =>
      IDL.Service({
        did_to_js: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ["query"]),
      })
    const didJs: ActorSubclass = Actor.createActor(transformInterface, {
      agent,
      canisterId: CANDID_UI_CANISTER,
    })
    const result = await didJs["did_to_js"](candid)
    if (!result) {
      throw Error("DidtoJs transformation Error")
    }
    return (result as string[])[0]
  }

  private async createActorDynamically(
    js: string,
    canisterId: string,
    identity: Identity
  ): Promise<ActorSubclass<CallCanisterActorMethodMapped<Record<string, ActorMethod>>>> {
    const agent: Agent = new HttpAgent({ host: IC_HOSTNAME, identity })
    const dataUri = "data:text/javascript;charset=utf-8," + encodeURIComponent(js)
    const candid = await eval('import("' + dataUri + '")')
    return Actor.createCallCanisterActor(candid.idlFactory, { agent, canisterId }) as ActorSubclass<CallCanisterActorMethodMapped<Record<string, ActorMethod>>>
  }

  private async evaluateMethod(actor: ActorSubclass, methodName: string, parameters: string) {
    if (parameters === undefined || parameters.length === 0 || parameters[0] === undefined) {
      return actor[methodName]()
    }
    return actor[methodName](...JSON.parse(parameters))
  }
}

export const callCanisterService = new CallCanisterService()
