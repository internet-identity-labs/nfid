import { II } from "."
import { AdapterConfig } from "../../standars/icrc-25"

describe("nfid", () => {
  test("config", () => {
    const adapterConfig: AdapterConfig = {
        providerUrl: "test"
    }

    const ii = II.config(adapterConfig)

    expect(ii.getSupportedStandards).toBeDefined()
    expect(ii.getDelegation).toBeDefined()
    expect(ii.callCanister).toBeDefined()
    expect(ii.signChallange).toBeDefined()
    expect(ii.getPrincipals).toBeDefined()
  })
})
