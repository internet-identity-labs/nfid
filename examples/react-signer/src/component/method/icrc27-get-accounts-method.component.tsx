import { AccountsComponentData } from "../../service/method/interactive/icrc27-get-accounts-method.service"
import { ComponentData } from "../../service/method/interactive/interactive-method.service"
import { GetAccounts } from "../get-accounts.component"
import { MethodComponent } from "./method.component"
import { Dispatch, SetStateAction } from "react"
import { State } from "../../hook/use-signer"

export const icrc27GetAccountsMethodComponent: MethodComponent = {
  getMethod(): string {
    return "icrc27_get_accounts"
  },
  getComponent(
    componentData: ComponentData,
    setState: Dispatch<SetStateAction<State>>,
    timeout: ReturnType<typeof setTimeout>
  ) {
    const { origin, accounts, onApprove, onReject } = componentData as AccountsComponentData
    return (
      <GetAccounts
        accounts={accounts}
        origin={origin}
        onApprove={onApprove}
        onReject={onReject}
        setState={setState}
        timeout={timeout}
      />
    )
  },
}
