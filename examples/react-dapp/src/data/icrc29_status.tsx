import { ISection } from "../ui/organisms/section.js"

export const basicRequest = {
  method: "icrc29_status",
}

export const icrc29StatusSection: ISection = {
  title: "3.a icrc29_status",
  description: (
    <>
      This standard defines a transport channel to send ICRC-25 messages from a relying party to a
      signer. The transport channel is based on the window.postMessage API.
    </>
  ),
  requestsExamples: [
    {
      title: "Basic",
      value: JSON.stringify(basicRequest, null, 2),
    },
  ],
  getCodeSnippet: function (): string {
    return `const identityKit = new IdentityKit().init()`
  },
}
