import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc25_revoke_permissions",
  params: {
    scopes: [
      {
        method: "icrc27_get_accounts",
      },
    ],
  },
}

export const icrc25RevokePermissionsSection: ISection = {
  title: "1.c icrc25_revoke_permissions",
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
    return `const identityKit = new IdentityKit().init()
const permissions = await identityKit.request(ICRC25Methods.${basicRequest.method}, ${JSON.stringify(basicRequest.params, undefined, 2)}`
  },
}
