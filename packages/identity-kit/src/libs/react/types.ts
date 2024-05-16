import { IRequestFunction } from "../../lib/types"

export type SignerConfig = {
  id: string
  providerUrl: string
  label: string
  icon?: string
}

export interface IdentityKitProvider {
  signers: SignerConfig[]
  selectedSigner?: SignerConfig
  isModalOpen: boolean
  toggleModal: () => void
  selectSigner: (signerId: string) => SignerConfig
  reject: () => void
  approve: () => void

  request: IRequestFunction
}
