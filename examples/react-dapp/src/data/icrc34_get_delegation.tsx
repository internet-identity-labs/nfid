import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

const targetCanister = import.meta.env.VITE_TARGET_CANISTER

export const basicRequest = {
  method: "icrc34_get_delegation",
  params: {
    publicKey:
      "302a300506032b65700321000da059000c5e09ab2ebd5f0c72e3f08899c37ab057262db7211b6bc890d8f861",
    targets: [targetCanister],
    maxTimeToLive: "28800000000000",
  },
}

export const icrc34SGetDelegationSection: ISection = {
  id: "icrc34_get_delegation",
  title: "4.a icrc34_get_delegation",
  description: (
    <>
      When a relying party wants to authenticate as a user, it uses a session key, and below{" "}
      <Method>icrc34_get_delegation</Method> method to obtain a delegation chain that allows the
      session key to sign for the user's identity.
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
const delegation = await identityKit.request(ICRC34Methods.${basicRequest.method}, {
    publicKey: "${basicRequest.params.publicKey}",
    targets: ${JSON.stringify(basicRequest.params.targets)}, // optional
    maxTimeToLive: "${basicRequest.params.maxTimeToLive}",
})`
  },
}
