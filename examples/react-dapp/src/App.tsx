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

const icrc25data = [
  icrc25RequestPermissionsSection,
  icrc25GrantedPermissionsSection,
  icrc25RevokePermissionsSection,
  icrc25SupportedStandardsSection,
]
const icrc27data = [icrc27GetAccountsSection]

function App() {
  return (
    <div className="h-full min-h-screen bg-white dark:bg-dark px-[30px] pb-20">
      <ToastContainer />
      <Header />
      <div className="flex flex-col space-y-20">
        <SectionContainer title="1. ICRC-25: Signer Interaction Standard">
          {icrc25data.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </SectionContainer>
        <SectionContainer title="2. ICRC-27: Get Accounts">
          {icrc27data.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </SectionContainer>
      </div>
    </div>
  )
}

export default App
