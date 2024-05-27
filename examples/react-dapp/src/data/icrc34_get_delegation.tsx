import { Method } from "../ui/atoms/method.js"
import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc34_get_delegation",
  params: {
    publicKey:
      "MDwwDAYKKwYBBAGDuEMBAgMsAAoAAAAAAGAAJwEB9YN/ErQ8yN+14qewhrU0Hm2rZZ77SrydLsSMRYHoNxM=",
    targets: ["xhy27-fqaaa-aaaao-a2hlq-cai"],
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
