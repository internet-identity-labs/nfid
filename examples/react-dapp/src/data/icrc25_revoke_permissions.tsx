import { ICRC25Methods } from "@nfid/identitykit"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: ICRC25Methods.icrc25_revoke_permissions,
  params: {
    scopes: [
      {
        method: "icrc27_get_accounts",
      },
      {
        method: "icrc34_get_delegation",
      },
      {
        method: "icrc49_call_canister",
      },
    ],
  },
}

export const icrc25RevokePermissionsSection: ISection = {
  id: "icrc25_revoke_permissions",
  title: "2.c icrc25_revoke_permissions",
  description: (
    <>
      The relying party can request to revoke all or a subset of the previously granted permission
      scopes. If all granted permission scopes are revoked, the session (if any) is terminated.
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
    return `await IdentityKit.init()
const permissions = await IdentityKit.request(${JSON.stringify(basicRequest, undefined, 2)}`
  },
}
