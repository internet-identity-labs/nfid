import { Link } from "../ui/atoms/link"
import { Method } from "../ui/atoms/method"
import { ISection } from "../ui/organisms/section"

export const basicRequest = {
  id: 1,
  jsonrpc: "2.0",
  method: "icrc25_request_permissions",
  params: {
    scopes: [
      {
        method: "icrc31_get_accounts",
      },
    ],
  },
}

export const icrc25Section: ISection = {
  title: "icrc25_request_permissions",
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
const permissions = await identityKit.requestPermissions([${basicRequest.params.scopes.map((s: any) => `"${s.method}"`).join(", ")}])`
  },
  getRequestObject: function (requestJSON: string) {
    const basicRequest = JSON.parse(requestJSON)
    return {
      method: basicRequest.method,
      params: basicRequest.params,
    }
  },
}
