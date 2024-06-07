export class RequestTimeoutError extends Error {
  constructor() {
    super("Request timed out")
  }
}
