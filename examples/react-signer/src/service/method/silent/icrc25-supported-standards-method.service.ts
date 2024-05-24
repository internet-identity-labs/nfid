import { RPCMessage, RPCSuccessResponse } from "../../../type"
import { SilentMethodService } from "./silent-method.service"

class Icrc25SupportedStandardsMethodService extends SilentMethodService {
  public getMethod(): string {
    return "icrc25_supported_standards"
  }

  public async sendResponse(message: MessageEvent<RPCMessage>): Promise<void> {
    const response: RPCSuccessResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      result: {
        supportedStandards: [
          {
            name: "ICRC-25",
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-25/ICRC-25.md",
          },
          {
            name: "ICRC-27",
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-31/ICRC-31.md",
          },
        ],
      },
    }

    window.parent.postMessage(response, message.origin)
  }
}

export const icrc25SupportedStandardsMethodService = new Icrc25SupportedStandardsMethodService()
