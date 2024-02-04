import {
  AdapterConfig,
  GetSupportedStandardResponse,
  ICRC25Adapter,
  PermissionRequest,
  PermissionResponse,
  RevokePermissionRequest,
} from '../standards/icrc-25';
import { GetPrincipalResponse, ICRC31Adapter } from '../standards/icrc-31';
import {
  ICRC32Adapter,
  SignChallengeRequest,
  SignChallengeResponse,
} from '../standards/icrc-32';
import {
  CallCanisterRequest,
  CallCanisterResponse,
  ICRC49Adapter,
} from '../standards/icrc-49';
import { GetDelegationResponse, IRCR34Adapter } from '../standards/icrc-34';

export class NFIDAdapter
  implements
    ICRC25Adapter<NFIDAdapter>,
    ICRC31Adapter,
    ICRC32Adapter,
    ICRC49Adapter,
    IRCR34Adapter
{
  // @ts-ignore
  private _config: AdapterConfig | undefined;

  config(config: AdapterConfig): NFIDAdapter {
    this._config = config;
    return this;
  }
  // @ts-ignore
  callCanister(_request: CallCanisterRequest): Promise<CallCanisterResponse> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  signChallange(request: SignChallengeRequest): Promise<SignChallengeResponse> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  getPrincipals(): Promise<GetPrincipalResponse> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  getDelegation(): Promise<GetDelegationResponse> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  getSupportedStandards(): GetSupportedStandardResponse {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  requestPermission(request: PermissionRequest): Promise<PermissionResponse> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  grantedPermission(): Promise<PermissionResponse> {
    throw new Error('Method not implemented.');
  }
  revokePermission(
    // @ts-ignore
    request: RevokePermissionRequest
  ): Promise<PermissionResponse> {
    throw new Error('Method not implemented.');
  }
}

export const NFID = new NFIDAdapter();
