import { RequestPermissions } from "../methods/request-permissions"
import { PermissionsComponentData } from "../service/method/interactive/icrc25-request-permissions-method.service"
import { ComponentData } from "../service/method/interactive/interactive-method.service"
import { MethodComponent } from "./method.component"

export const icrc25RevokePermissionsMethodComponent: MethodComponent = {
  getMethod(): string {
    return "icrc25_revoke_permissions"
  },
  getComponent(componentData: ComponentData) {
    const { origin, permissions } = componentData as PermissionsComponentData
    return <RequestPermissions origin={origin} permissions={permissions} />
  },
}
