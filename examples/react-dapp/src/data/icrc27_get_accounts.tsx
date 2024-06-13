import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc27_get_accounts",
}

export const icrc27GetAccountsSection: ISection = {
  id: "icrc27_get_accounts",
  title: "3.a icrc27_get_accounts",
  description: (
    <>
      The purpose of the <Method>icrc27_get_accounts</Method> message is for the relying party to
      receive principals and subaccounts managed by the signer.
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
const accounts = await IdentityKit.request(${JSON.stringify(basicRequest, null, 2)})`
  },
}
