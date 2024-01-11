import { NFID } from "."
import { AdapterConfig } from "../../standards/icrc-25"

describe("nfid", () => {
  test("config", () => {
    const adapterConfig: AdapterConfig = {
      providerUrl: "test",
    }

    const nfid = NFID.config(adapterConfig)

    expect(nfid.getSupportedStandards).toBeDefined()
    expect(nfid.getDelegation).toBeDefined()
    expect(nfid.callCanister).toBeDefined()
    expect(nfid.signChallange).toBeDefined()
    expect(nfid.getPrincipals).toBeDefined()
    expect(nfid.requestPermission).toBeDefined()
    expect(nfid.grantedPermission).toBeDefined()
    expect(nfid.revokePermission).toBeDefined()
  })
})
