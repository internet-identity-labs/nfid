import { II } from "."
import { AdapterConfig } from "../../standards/icrc-25"

describe("ii", () => {
  test("config", () => {
    const adapterConfig: AdapterConfig = {
      providerUrl: "test",
    }

    const ii = II.config(adapterConfig)

    expect(ii.getSupportedStandards).toBeDefined()
    expect(ii.getDelegation).toBeDefined()
    expect(ii.callCanister).toBeDefined()
    expect(ii.signChallange).toBeDefined()
    expect(ii.getPrincipals).toBeDefined()
    expect(ii.requestPermission).toBeDefined()
    expect(ii.grantedPermission).toBeDefined()
    expect(ii.revokePermission).toBeDefined()
  })
})
