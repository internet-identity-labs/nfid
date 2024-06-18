import { Header } from "./ui/molecules/header"
import {
  icrc25RequestPermissionsSection,
  icrc25GrantedPermissionsSection,
  icrc25RevokePermissionsSection,
  icrc25SupportedStandardsSection,
  icrc27GetAccountsSection,
} from "./data"
import { Section } from "./ui/organisms/section"
import { ToastContainer } from "react-toastify"
import { SectionContainer } from "./ui/organisms/section-container"
import { icrc29StatusSection } from "./data/icrc29_status"
import { icrc34SGetDelegationSection } from "./data/icrc34_get_delegation"
import { icrc49CallCanisterSection } from "./data/icrc49_call_canister"
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react"
import { MockedSigner, NFID } from "./signers"
import { useTheme } from "next-themes"

const icrc25data = [
  icrc25RequestPermissionsSection,
  icrc25GrantedPermissionsSection,
  icrc25RevokePermissionsSection,
  icrc25SupportedStandardsSection,
]
const icrc27data = [icrc27GetAccountsSection]
const icrc29data = [icrc29StatusSection]
const icrc34data = [icrc34SGetDelegationSection]
const icrc49data = [icrc49CallCanisterSection]

function App() {
  const { theme } = useTheme()
  return (
    <IdentityKitProvider signers={[NFID, MockedSigner]} theme={theme as IdentityKitTheme}>
      <div className="h-full min-h-screen bg-white dark:bg-dark px-[30px] pb-20">
        <ToastContainer />
        <Header />
        <div className="flex flex-col space-y-20">
          <SectionContainer title="1. ICRC-29: Status">
            {icrc29data.map((section, index) => (
              <Section key={index} {...section} />
            ))}
          </SectionContainer>
          <SectionContainer title="2. ICRC-25: Signer Interaction Standard">
            {icrc25data.map((section, index) => (
              <Section key={index} {...section} />
            ))}
          </SectionContainer>
          <SectionContainer title="3. ICRC-27: Get Accounts">
            {icrc27data.map((section, index) => (
              <Section key={index} {...section} />
            ))}
          </SectionContainer>
          <SectionContainer title="4. ICRC-34: Get delegation">
            {icrc34data.map((section, index) => (
              <Section key={index} {...section} />
            ))}
          </SectionContainer>
          <SectionContainer title="5. ICRC-49: Call canister">
            {icrc49data.map((section, index) => (
              <Section key={index} {...section} />
            ))}
          </SectionContainer>
        </div>
      </div>
    </IdentityKitProvider>
  )
}

export default App
