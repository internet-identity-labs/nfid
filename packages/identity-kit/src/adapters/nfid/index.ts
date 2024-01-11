import { AdapterConfig, GetSupportedStandardRequest, GetSupportedStandardResponse, GrantedPermissionRequest, ICRC25Adapter, PermissionRequest, PermissionResponse, RevokePermissionRequest, SupportedStandard } from "../../standards/icrc-25"
import { GetPrincipalResponse, ICRC31Adapter } from "../../standards/icrc-31"
import { ICRC32Adapter, SignChallengeRequest, SignChallengeResponse } from "../../standards/icrc-32"
import { CallCanisterRequest, CallCanisterResponse, ICRC33Adapter } from "../../standards/icrc-33"
import { GetDelegationRequest, GetDelegationResponse, IRCR34Adapter } from "../../standards/icrc-34"

export class NFIDAdapter
  implements ICRC25Adapter<NFIDAdapter>, ICRC31Adapter, ICRC32Adapter, ICRC33Adapter, IRCR34Adapter
{
  private _config: AdapterConfig | undefined

  config(request: AdapterConfig): NFIDAdapter {
    this._config = request
    return this
  }
  callCanister(request: CallCanisterRequest): Promise<CallCanisterResponse> {
    throw new Error("Method not implemented.")
  }
  signChallange(request: SignChallengeRequest): Promise<SignChallengeResponse> {
    throw new Error("Method not implemented.")
  }
  getPrincipals(): Promise<GetPrincipalResponse> {
    throw new Error("Method not implemented.")
  }
  getDelegation(request: GetDelegationRequest): Promise<GetDelegationResponse> {
    throw new Error("Method not implemented.")
  }
  getSupportedStandards(request: GetSupportedStandardRequest): GetSupportedStandardResponse {
    throw new Error("Method not implemented.")
  }
  requestPermission(request: PermissionRequest): Promise<PermissionResponse> {
    throw new Error("Method not implemented.")
  }
  grantedPermission(request: GrantedPermissionRequest): Promise<PermissionResponse> {
    throw new Error("Method not implemented.")
  }
  revokePermission(request: RevokePermissionRequest): Promise<PermissionResponse> {
    throw new Error("Method not implemented.")
  }
}

export const NFID = new NFIDAdapter()
