import { ComponentData } from "../../service/method/interactive/interactive-method.service"
import { GetDelegation } from "../get-delegation.component"
import { MethodComponent } from "./method.component"
import { Dispatch, SetStateAction } from "react"
import { State } from "../../hook/use-signer"
import { GetDelegationComponentData } from "../../service/method/interactive/icrc34-get-delegation-method.service"

export const icrc34GetDelegationMethodComponent: MethodComponent = {
  getMethod(): string {
    return "icrc34_get_delegation"
  },
  getComponent(
    componentData: ComponentData,
    setState: Dispatch<SetStateAction<State>>,
    timeout: ReturnType<typeof setTimeout>
  ) {
    const { origin, accounts, isPublicAccountsAllowed, onApprove, onReject } =
      componentData as GetDelegationComponentData
    return (
      <GetDelegation
        accounts={accounts}
        origin={origin}
        onApprove={onApprove}
        onReject={onReject}
        setState={setState}
        isPublicAccountsAllowed={isPublicAccountsAllowed}
        timeout={timeout}
      />
    )
  },
}
