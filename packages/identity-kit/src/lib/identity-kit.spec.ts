import { IdentityKit } from "..";

describe("identity-kit", () => {
  test("init", () => {
    const initialised = IdentityKit.init();
    expect(initialised).toBe(true);
  });
});
