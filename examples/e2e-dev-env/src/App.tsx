import { Flex, Heading } from "@radix-ui/themes"
import { Header } from "./components/header"

function App() {
  const dapp = import.meta.env.VITE_DAPP_CANISTER_ID
  const signer = import.meta.env.VITE_SIGNER_CANISTER_ID

  return (
    <Flex direction="column" height={"100%"}>
      <Header />
      <Flex gap="2" height={"100%"}>
        <Flex direction="column" grow="1" p={"4"} gap="4">
          <Heading as="h2">Example dApp</Heading>
          <iframe src={dapp} className="h-full" />
        </Flex>
        <Flex direction="column" grow="1" p={"4"} gap="4">
          <Heading as="h2">Example Signer</Heading>
          <iframe src={signer} className="h-full" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default App
