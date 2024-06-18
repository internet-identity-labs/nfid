import { IdentityKitAgentType } from "../../lib/identity-kit-agent"
import { IRequestFunction, SignerConfig } from "../../lib/types"

export interface IdentityKitProvider {
  signers: SignerConfig[]
  selectedSigner?: SignerConfig
  isModalOpen: boolean
  toggleModal: () => void
  selectSigner: (signerId?: string) => SignerConfig | void
  signerIframeRef?: React.RefObject<HTMLIFrameElement>

  request: IRequestFunction
  IdentityKitAgent: IdentityKitAgentType
}
