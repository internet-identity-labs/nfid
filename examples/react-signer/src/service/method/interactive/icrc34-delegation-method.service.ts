import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { ComponentData, InteractiveMethodService } from "./interactive-method.service"
import { Account, accountService } from "../../account.service"
import { DelegationChain, Ed25519PublicKey } from "@dfinity/identity"
import { Principal } from "@dfinity/principal"
import { targetService } from "../../target.service"
import { GenericError } from "../../exception-handler.service"
import { fromBase64, toBase64 } from "@slide-computer/signer"

export interface DelegationComponentData extends ComponentData {
  accounts: Account[]
  isPublicAccountsAllowed: boolean
}

export interface Icrc34Dto {
  publicKey: string
  targets: string[]
  maxTimeToLive: string
}

class Icrc34DelegationMethodService extends InteractiveMethodService {
  public getMethod(): string {
    return "icrc34_delegation"
  }

  private formatDelegationChain(chain: DelegationChain) {
    return {
      signerDelegation: chain.delegations.map((signedDelegation) => {
        const { delegation, signature } = signedDelegation
        const { targets } = delegation
        return {
          delegation: Object.assign(
            {
              expiration: delegation.expiration,
              pubkey: toBase64(delegation.pubkey),
            },
            targets && {
              targets: targets.map((t) => t.toText()),
            }
          ),
          signature: toBase64(signature),
        }
      }),
      publicKey: toBase64(chain.publicKey),
    }
  }

  public async onApprove(message: MessageEvent<RPCMessage>, data?: unknown): Promise<void> {
    const icrc34Dto = message.data.params as unknown as Icrc34Dto
    const account = (data as Account[])[0]
    const key = await accountService.getAccountKeyIdentityById(account.id)
    let targets

    if (!key) {
      throw new GenericError("User data has not been found")
    }

    const sessionPublicKey = Ed25519PublicKey.fromDer(fromBase64(icrc34Dto.publicKey))

    if (icrc34Dto.targets && icrc34Dto.targets.length != 0) {
      try {
        await targetService.validateTargets(icrc34Dto.targets, message.origin)
      } catch (e: unknown) {
        const text = e instanceof Error ? e.message : "Unknown error"
        throw new GenericError(text)
      }
      targets = icrc34Dto.targets.map((x) => Principal.fromText(x))
    }

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
      result: this.formatDelegationChain(chain),
    }

    window.opener.postMessage(response, "*")
  }

  public async getСomponentData(
    message: MessageEvent<RPCMessage>
  ): Promise<DelegationComponentData> {
    const icrc34Dto = message.data.params as unknown as Icrc34Dto
    const accounts = await accountService.getAccounts()
    const isPublicAccountsAllowed = !icrc34Dto.targets || icrc34Dto.targets.length === 0
    if (!accounts) {
      throw new GenericError("User data has not been found")
    }

    const baseData = await super.getСomponentData(message)
    return {
      ...baseData,
      accounts,
      isPublicAccountsAllowed,
    }
  }
}

export const icrc34DelegationMethodService = new Icrc34DelegationMethodService()
