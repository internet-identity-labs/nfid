import { ButtonActions, RPCMessage } from "../../type"
import { utilsService } from "../utils.service"
import { icrc25GrantedPermissionsMethodService } from "./icrc25-granted-permissions-method.service"
import { icrc25RequestPermissionsMethodService } from "./icrc25-request-permissions-method.service"
import { icrc25RevokePermissionsMethodService } from "./icrc25-revoke-permissions-method.service"
import { icrc25SupportedStandardsMethodService } from "./icrc25-supported-standards-method.service"
import { icrc31GetPrincipalsMethodService } from "./icrc31-get-principals-method.service"

export interface MethodService {
    getMethod(): string,
    isUserApprovalNeeded(): boolean,
    sendResponse(message: MessageEvent<RPCMessage>): Promise<void>,
    getButtonActions(message: MessageEvent<RPCMessage>): ButtonActions
}

export const methodServices: Map<string, MethodService> = utilsService.mapByKey(x => x.getMethod(), [
    icrc25RequestPermissionsMethodService,
    icrc25GrantedPermissionsMethodService,
    icrc25RevokePermissionsMethodService,
    icrc25SupportedStandardsMethodService,
    icrc31GetPrincipalsMethodService
])