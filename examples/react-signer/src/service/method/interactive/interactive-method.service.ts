import { RPCMessage, RPCErrorResponse } from "../../../type"
import { MethodService } from "../method.servcie"

export interface ComponentData {
  method: string
  origin: string
  onApprove: () => Promise<void>
  onReject: () => Promise<void>
}

export abstract class InteractiveMethodService implements MethodService {
  public async invokeAndGetComponentData(message: MessageEvent<RPCMessage>): Promise<ComponentData | undefined> {
      const componentData = this.getСomponentData(message)
      if (!componentData) {
        window.parent.postMessage(
          {
            origin: message.data.origin,
            jsonrpc: message.data.jsonrpc,
            id: message.data.id,
            error: {
              code: 2000,
              message: "Not supported",
            },
          },
          message.origin
        )
      }
    
    return componentData
  }

  public abstract getMethod(): string
  public abstract onApprove(message: MessageEvent<RPCMessage>): Promise<void>

  public getСomponentData(message: MessageEvent<RPCMessage>): ComponentData {
    return {
      method: message.data.method,
      origin: message.origin,
      onApprove: () => this.onApprove(message),
      onReject: () => this.onReject(message),
    }
  }

  protected async onReject(message: MessageEvent<RPCMessage>): Promise<void> {
    const response: RPCErrorResponse = {
      origin: message.origin,
      jsonrpc: message.data.jsonrpc,
      id: message.data.id,
      error: {
        code: 3001,
        message: "Action aborted",
      },
    }

    window.parent.postMessage(response, message.origin)
  }
}
