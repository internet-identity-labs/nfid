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
            methods: [
              {
                name: "icrc25_request_permissions",
                isInteractive: true,
              },
              {
                name: "icrc25_revoke_permissions",
                isInteractive: true,
              },
              {
                name: "icrc25_granted_permissions",
                isInteractive: false,
              },
              {
                name: "icrc25_supported_standards",
                isInteractive: false,
              },
            ],
          },
          {
            name: "ICRC-27",
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-27/ICRC-27.md",
            methods: [
              {
                name: "icrc27_get_accounts",
                isInteractive: true,
              },
            ],
          },
          {
            name: "ICRC-28",
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-28/ICRC-28.md",
            methods: [],
          },
          {
            name: "ICRC-29",
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-29/ICRC-29.md",
            methods: [
              {
                name: "icrc29_status",
                isInteractive: false,
              },
            ],
          },
          {
            name: "ICRC-34",
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-34/ICRC-34.md",
            methods: [
              {
                name: "icrc34_get_delegation",
                isInteractive: true,
              },
            ],
          },
        ],
      },
    }

    window.parent.postMessage(response, message.origin)
  }
}

export const icrc25SupportedStandardsMethodService = new Icrc25SupportedStandardsMethodService()
