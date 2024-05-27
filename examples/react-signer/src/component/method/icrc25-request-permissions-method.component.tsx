import { RequestPermissions } from "../request-permissions.component"
import { PermissionsComponentData } from "../../service/method/interactive/icrc25-request-permissions-method.service"
import { ComponentData } from "../../service/method/interactive/interactive-method.service"
import { MethodComponent } from "./method.component"

export const icrc25RequestPermissionsMethodComponent: MethodComponent = {
  getMethod(): string {
    return "icrc25_request_permissions"
  },
  getComponent(componentData: ComponentData) {
    const { origin, permissions, onApprove, onReject } = componentData as PermissionsComponentData
    return (
      <RequestPermissions
        origin={origin}
        permissions={permissions}
        onApprove={onApprove}
        onReject={onReject}
      />
    )
  },
}
