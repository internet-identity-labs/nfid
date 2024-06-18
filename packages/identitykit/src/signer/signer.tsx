type SignerAdapterConfig = {
  id: string
}

export class Signer {
  private _id: string

  constructor({ id }: SignerAdapterConfig) {
    this._id = id
  }

  isSigner(id: string) {
    return this._id === id
  }

  connect() {
    console.debug("Signer.connect", { id: this._id })
  }
}
