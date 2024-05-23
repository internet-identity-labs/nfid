import { ButtonActions, RPCMessage, RPCSuccessResponse } from "../../type"
import { MethodService } from "./method.servcie"

class Icrc25SupportedStandardsMethodService implements MethodService {
  public isUserApprovalNeeded(): boolean {
    return false
  }

  public getMethod(): string {
    return "icrc25_supported_standards"
  }

  public getButtonActions(): ButtonActions {
    throw Error("Not supported")
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
