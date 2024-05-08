import { requestFactory } from "./request-handler"

describe("postmessage-rpc", () => {
  test("request-handler", () => {
    expect(requestFactory).toBeDefined()
  })
})
