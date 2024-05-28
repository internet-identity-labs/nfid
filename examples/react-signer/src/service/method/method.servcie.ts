import { utilsService } from "../utils.service"
import { icrc25GrantedPermissionsMethodService } from "./silent/icrc25-granted-permissions-method.service"
import { icrc25RequestPermissionsMethodService } from "./interactive/icrc25-request-permissions-method.service"
import { icrc25RevokePermissionsMethodService } from "./interactive/icrc25-revoke-permissions-method.service"
import { icrc25SupportedStandardsMethodService } from "./silent/icrc25-supported-standards-method.service"
import { icrc27GetAccountsMethodService } from "./interactive/icrc27-get-accounts-method.service"
import { ComponentData } from "./interactive/interactive-method.service"
import { RPCMessage } from "../../type"
import { icrc29GetStatusMethodService } from "./silent/icrc29-get-status-method.service"
import { icrc34GetDelegationMethodService } from "./interactive/icrc34-get-delegation-method.service"

export interface MethodService {
  getMethod(): string
  invokeAndGetComponentData(message: MessageEvent<RPCMessage>): Promise<ComponentData | undefined>
}

export const methodServices: Map<string, MethodService> = utilsService.mapByKey(
  (x) => x.getMethod(),
  [
    icrc25RequestPermissionsMethodService,
    icrc25GrantedPermissionsMethodService,
    icrc25RevokePermissionsMethodService,
    icrc25SupportedStandardsMethodService,
    icrc27GetAccountsMethodService,
    icrc29GetStatusMethodService,
    icrc34GetDelegationMethodService,
  ]
)
