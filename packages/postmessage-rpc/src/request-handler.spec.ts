import { request } from "./request-handler"

describe("postmessage-rpc", () => {
  test("request-handler", () => {
    expect(request).toBeDefined()
  })
})
