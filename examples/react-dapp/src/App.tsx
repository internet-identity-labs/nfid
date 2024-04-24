import { IdentityKitProvider, ConnectButton } from "@nfid/identity-kit/react"

import "@nfid/identity-kit/react/styles.css"

function App() {
  return (
    <IdentityKitProvider
      config={{
        signer: [
          {
            providerUrl: "http://localhost:3003",
            label: "Example Signer",
            id: "@nfid/vue-signer",
          },
        ],
      }}
    >
      <div>
        <pre>@nfid/react-dapp</pre>
        <ConnectButton />
      </div>
    </IdentityKitProvider>
  )
}

export default App
