import { RPCResponse, requestFactory } from "@nfid/postmessage-rpc"

type requestHandler = ReturnType<typeof requestFactory>
type messageHandler = (message: RPCResponse) => void

type SignerAdapterConfig = {
  providerUrl: string
  id: string
  requestFactory: typeof requestFactory
  onMessage: messageHandler
}

export class SignerAdapter {
  private _id: string
  private _providerUrl: string
  private _requestHandler: requestHandler

  constructor({ providerUrl, id, requestFactory }: SignerAdapterConfig) {
    this._id = id
    this._providerUrl = providerUrl
    this._requestHandler = requestFactory({
      addEventListener: window.addEventListener,
      removeEventListener: window.removeEventListener,
      postMessage: window.postMessage,
    })
  }

  isSigner(id: string) {
    return this._id === id
  }

  connect() {
    this._requestHandler(this._providerUrl, {
      method: "connect",
      params: {
        url: window.location.origin,
      },
    })
  }
}
