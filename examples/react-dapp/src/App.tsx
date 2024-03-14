import { IdentityKitProvider, ConnectButton } from "@nfid/identity-kit/react"

import "@nfid/identity-kit/react/styles.css"

import { Box } from "@radix-ui/themes"
import { SignerCard } from "./signer-card"

function App() {
  return (
    <IdentityKitProvider
      config={{
        signer: [
          {
            providerUrl: "http://localhost:3002",
            label: "React Signer",
            id: "@nfid/react-signer",
          },
          {
            providerUrl: "http://localhost:3003",
            label: "Vue Signer",
            id: "@nfid/vue-signer",
          },
        ],
      }}
    >
      <Box>
        <pre>@nfid/react-dapp</pre>
        <ConnectButton />
        <SignerCard label="React Signer" onClick={() => console.debug("test")} />
      </Box>
    </IdentityKitProvider>
  )
}

export default App
