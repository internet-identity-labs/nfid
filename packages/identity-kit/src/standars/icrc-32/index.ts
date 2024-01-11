export type SignChallengeRequest = {
  version?: string
  principal?: string
  challenge: string
}

export type SignChallengeResponse = {
  version: string
  signedChallenge: {
    publicKey: string
    signature: string
  }
}

export interface ICRC32Adapter {
  signChallange(request: SignChallengeRequest): SignChallengeResponse
}
