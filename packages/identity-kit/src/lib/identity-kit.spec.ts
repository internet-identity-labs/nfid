import { IdentityKit } from ".."

describe("identity-kit", () => {
  test("config", () => {
    const configured = IdentityKit.config()
    expect(configured).toBe(true)
  })
})
