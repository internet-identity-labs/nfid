export const RPC_PARSE_ERROR = {
  code: -32700,
  message: "Parse error",
}

export const RPC_INVALID_REQUEST = {
  code: -32600,
  message: "Invalid Request",
}

export const RPC_METHOD_NOT_FOUND = {
  code: -32601,
  message: "Method not found",
}

export const RPC_INVALID_PARAMS = {
  code: -32602,
  message: "Invalid params",
}

export const RPC_INTERNAL_ERROR = {
  code: -32603,
  message: "Internal Error",
}

export const RPC_SERVER_ERROR = {
  code: -32000, // to -32099 TODO: create error factory
  message: "Server error",
}
