import { AdapterConfig, ICRC25Adapter, Standard, SupportedStandard } from "../../standars/icrc-25"
import { GetPrincipalResponse, ICRC31Adapter } from "../../standars/icrc-31"
import { ICRC32Adapter, SignChallengeRequest, SignChallengeResponse } from "../../standars/icrc-32"
import { CallCanisterRequest, CallCanisterResponse, ICRC33Adapter } from "../../standars/icrc-33"
import { IRCR34Adapter } from "../../standars/icrc-34"

export class II
  implements ICRC25Adapter<II>, ICRC31Adapter, ICRC32Adapter, ICRC33Adapter, IRCR34Adapter
{
  private _config: AdapterConfig

  constructor(request: AdapterConfig) {
    this._config = request
  }

  static config(request: AdapterConfig): II {
    return new II(request)
  }

  config(request: AdapterConfig): II {
    this._config = request
    return this
  }

  getSupportedStandards(): SupportedStandard[] {
    return [
      { type: Standard.ICRC25, url: "url" },
      { type: Standard.ICRC31, url: "url" },
      { type: Standard.ICRC32, url: "url" },
      { type: Standard.ICRC33, url: "url" },
      { type: Standard.ICRC34, url: "url" },
    ]
  }

  getDelegation(request: unknown): Promise<unknown> {
    throw new Error("Method not implemented.")
  }
  callCanister(request: CallCanisterRequest): CallCanisterResponse {
    throw new Error("Method not implemented.")
  }
  signChallange(request: SignChallengeRequest): SignChallengeResponse {
    throw new Error("Method not implemented.")
  }
  getPrincipals(): GetPrincipalResponse {
    throw new Error("Method not implemented.")
  }
}
