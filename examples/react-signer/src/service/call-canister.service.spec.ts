import { DelegationChain, DelegationIdentity, Ed25519KeyIdentity } from "@dfinity/identity"
import { JsonnableEd25519KeyIdentity } from "@dfinity/identity/lib/cjs/identity/ed25519.js"
import { callCanisterService, CallCanisterRequest } from "./call-canister.service"

const HOUR = 3_600_000
const PUBLIC_IDENTITY: JsonnableEd25519KeyIdentity = [
  "302a300506032b65700321003b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
  "00000000000000000000000000000000000000000000000000000000000000003b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
]
const SESSION_IDENTITY: JsonnableEd25519KeyIdentity = [
  "302a300506032b65700321003008adc857dfcd0477a7aaa01a657ca6923ce76c07645704b1e872deb1253baa",
  "de33b3c3ed88942af13cb4fe4384f9e9126d8af5482dbc9ccd71208f250bdaed",
]

describe("Call Canister Service", function () {
  it("should call canister and return expected result", async function () {
    const identity = Ed25519KeyIdentity.fromParsedJson(PUBLIC_IDENTITY)
    const sessionKey = Ed25519KeyIdentity.fromParsedJson(SESSION_IDENTITY)
    const chain = await DelegationChain.create(
      identity,
      sessionKey.getPublicKey(),
      new Date(Date.now() + 44 * HOUR),
      {}
    )
    const delegation = DelegationIdentity.fromDelegation(sessionKey, chain)
    const request: CallCanisterRequest = {
      delegation,
      canisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai",
      calledMethodName: "lookup",
      parameters: "[10000]",
    }
    const response = await callCanisterService.call(request)
    const origins = response.result.result[0] as { origin: string[] }

    expect(response.result.verification.contentMap).toMatch(/^d9d9f7a467636f6e74656e74a7636172674f/)
    expect(response.result.verification.certificate).toMatch(/^d9d9f7a36474726565830183018/)
    expect(origins.origin[0]).toBe("https://identity.ic0.app")
  }, 10000)
})
