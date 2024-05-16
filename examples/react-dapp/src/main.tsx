import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ThemeProvider } from "next-themes"
import "./index.css"
import { IdentityKitProvider } from "@nfid/identity-kit/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <IdentityKitProvider signers={[]}>
        <App />
      </IdentityKitProvider>
    </ThemeProvider>
  </React.StrictMode>
)
