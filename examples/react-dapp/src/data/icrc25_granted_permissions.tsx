import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc25_granted_permissions",
}

export const icrc25GrantedPermissionsSection: ISection = {
  title: "1.b icrc25_granted_permissions",
  description: (
    <>
      The purpose of the <Method>icrc25_granted_permissions</Method> method is for the relying party
      to query the granted permission scopes on the active session.
    </>
  ),
  requestsExamples: [
    {
      title: "Basic",
      value: JSON.stringify(basicRequest, null, 2),
    },
  ],
  getCodeSnippet: function (requestJSON: string): string {
    const basicRequest = JSON.parse(requestJSON)
    return `const identityKit = new IdentityKit().init()
const grantedPermsissions = await identityKit.request(ICRC25Methods.${basicRequest.method})`
  },
}
