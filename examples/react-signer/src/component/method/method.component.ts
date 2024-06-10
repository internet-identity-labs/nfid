import { Dispatch, ReactNode, SetStateAction } from "react"
import { icrc27GetAccountsMethodComponent } from "./icrc27-get-accounts-method.component"
import { icrc25RequestPermissionsMethodComponent } from "./icrc25-request-permissions-method.component"
import { icrc25RevokePermissionsMethodComponent } from "./icrc25-revoke-permissions-method.component"
import { ComponentData } from "../../service/method/interactive/interactive-method.service"
import { utilsService } from "../../service/utils.service"
import { icrc34GetDelegationMethodComponent } from "./icrc34-get-delegation-method.component"
import { State } from "../../hook/use-signer"
import { icrc49CallCanisterMethodComponent } from "./icrc49-call-canister-method.component"

export interface MethodComponent {
  getMethod(): string
  getComponent(componentData: ComponentData, setState: Dispatch<SetStateAction<State>>): ReactNode
}

export const methodComponents: Map<string, MethodComponent> = utilsService.mapByKey(
  (x) => x.getMethod(),
  [
    icrc25RequestPermissionsMethodComponent,
    icrc25RevokePermissionsMethodComponent,
    icrc27GetAccountsMethodComponent,
    icrc34GetDelegationMethodComponent,
    icrc49CallCanisterMethodComponent,
  ]
)
