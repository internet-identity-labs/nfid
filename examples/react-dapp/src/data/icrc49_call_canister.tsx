import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc49_call_canister",
  params: {
    canisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai",
    sender: "535yc-uxytb-gfk7h-tny7p-vjkoe-i4krp-3qmcl-uqfgr-cpgej-yqtjq-rqe",
    method: "lookup",
    arg: "[10000]",
  },
}

export const withConsentMessage = {
  method: "icrc49_call_canister",
  params: {
    canisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai",
    sender: "535yc-uxytb-gfk7h-tny7p-vjkoe-i4krp-3qmcl-uqfgr-cpgej-yqtjq-rqe",
    method: "lookup",
    arg: "[10000]",
    consentMessage: "Please confirm the transfer of 100 ICP to Alice",
  },
}

export const icrc49CallCanisterSection: ISection = {
  id: "icrc49_call_canister",
  title: "5.a icrc49_call_canister",
  description: (
    <>
      This Method can be used by the relying party to request calls to 3rd party canister executed
      by the signer using the requested identity. In order to prevent misuse of this method all{" "}
      <Method>icrc49_call_canister</Method> requests are subject to user approval.
    </>
  ),
  requestsExamples: [
    {
      title: "Basic",
      value: JSON.stringify(basicRequest, null, 2),
    },
    {
      title: "With consent message",
      value: JSON.stringify(withConsentMessage, null, 2),
    },
  ],
  getCodeSnippet: function (requestJSON: string): string {
    const basicRequest = JSON.parse(requestJSON)

    return `await IdentityKit.init()
const response = await IdentityKit.request(${JSON.stringify(basicRequest, null, 2)})`
  },
}
