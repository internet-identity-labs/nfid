import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ThemeProvider } from "next-themes"
import "./index.css"
import { IdentityKitProvider } from "@nfid/identity-kit/react"
import { NFID, MockedSigner } from "./signers.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <IdentityKitProvider signers={[NFID, MockedSigner]}>
        <App />
      </IdentityKitProvider>
    </ThemeProvider>
  </React.StrictMode>
)
