import { Link } from "../ui/atoms/link.js"
import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc25_request_permissions",
  params: {
    scopes: [
      {
        method: "icrc27_get_accounts",
      },
    ],
  },
}

export const icrc25RequestPermissionsSection: ISection = {
  id: "icrc25_request_permissions",
  title: "1.a icrc25_request_permissions",
  description: (
    <>
      The purpose of the <Method>icrc25_request_permissions</Method> method is for the relying party
      to request <Link href="#">permission scopes</Link> to perform further actions. If the set of
      granted scopes is not empty and there was no <Link href="#">session</Link> before, a new
      session is created. Some wallets auto-approve permissions, resulting in no approval screen
      after authentication (i.e. NFID Wallet).
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
