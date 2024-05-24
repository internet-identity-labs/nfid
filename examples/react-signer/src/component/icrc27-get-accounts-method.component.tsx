import { GetAccounts } from "../methods/get_accounts"
import { AccountsComponentData } from "../service/method/interactive/icrc27-get-accounts-method.service"
import { ComponentData } from "../service/method/interactive/interactive-method.service"
import { MethodComponent } from "./method.component"

export const icrc27GetAccountsMethodComponent: MethodComponent = {
  getMethod(): string {
    return "icrc27_get_accounts"
  },
  getComponent(componentData: ComponentData) {
    const { origin, accounts } = componentData as AccountsComponentData
    return <GetAccounts accounts={accounts} origin={origin} />
  },
}
