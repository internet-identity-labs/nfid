export interface RPCBase {
  /**
   * A String specifying the version of the JSON-RPC protocol. MUST be exactly "2.0".
   */
  jsonrpc: "2.0"
  /**
   * An identifier established by the Client that MUST contain a String, Number, or NULL value if included.
   * If it is not included it is assumed to be a notification.
   * The value SHOULD normally not be Null and Numbers SHOULD NOT contain fractional parts
   */
  id: string
}

export interface RPCMessage<M, P> extends RPCBase {
  /**
   * A String containing the name of the method to be invoked.
   * Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.
   */
  method: M
  /**
   * A Structured value that holds the parameter values to be used during the invocation of the method. This member MAY be omitted.
   */
  params: P
}

interface RPCSuccessResponse extends RPCBase {
  /**
   * This member is REQUIRED on success.
   * This member MUST NOT exist if there was an error invoking the method.
   * The value of this member is determined by the method invoked on the Server.
   */
  result: unknown
}

interface RpcError {
  /**
   * A Number that indicates the error type that occurred.
   * This MUST be an integer.
   */
  code: number
  /**
   * A String providing a short description of the error.
   * The message SHOULD be limited to a concise single sentence.
   */
  message: string
  /**
   * A Primitive or Structured value that contains additional information about the error.
   * This may be omitted.
   * The value of this member is defined by the Server (e.g. detailed error information, nested errors etc.).
   */
  data?: unknown
}

interface RPCErrorResponse extends RPCBase {
  error: RpcError
}

export type RPCResponse = RPCSuccessResponse | RPCErrorResponse
