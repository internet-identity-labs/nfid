import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc49_call_canister",
  params: {
    canisterId: "xhy27-fqaaa-aaaao-a2hlq-ca",
    sender: "b7gqo-ulk5n-2kpo7-oalt7-p2kyl-o4j5l-kiuwo-eeybr-dab4l-ur6up-pqe",
    method: "transfer",
    arg: "RElETARte24AbAKzsNrDA2ithsqDBQFsA/vKAQKi3pTrBgHYo4yoDX0BAwEdV+ztKgq7E4l1ffuTuwEmw8AtYSjlrJ+WLO5ofQIAAMgB",
  },
}

export const withConsentMessage = {
  method: "icrc49_call_canister",
  params: {
    canisterId: "xhy27-fqaaa-aaaao-a2hlq-ca",
    sender: "b7gqo-ulk5n-2kpo7-oalt7-p2kyl-o4j5l-kiuwo-eeybr-dab4l-ur6up-pqe",
    method: "transfer",
    arg: "RElETARte24AbAKzsNrDA2ithsqDBQFsA/vKAQKi3pTrBgHYo4yoDX0BAwEdV+ztKgq7E4l1ffuTuwEmw8AtYSjlrJ+WLO5ofQIAAMgB",
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
