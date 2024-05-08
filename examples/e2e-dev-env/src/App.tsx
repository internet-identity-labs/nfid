import { Flex, Heading } from "@radix-ui/themes"
import { Header } from "./components/header"

function App() {
  return (
    <Flex direction="column" height={"100%"}>
      <Header />
      <Flex gap="2" height={"100%"}>
        <Flex direction="column" grow="1" p={"4"} gap="4">
          <Heading as="h2">Example dApp</Heading>
          <iframe src="https://icrc-25-example-dapp-dev.nfid.one/" className="h-full" />
        </Flex>
        <Flex direction="column" grow="1" p={"4"} gap="4">
          <Heading as="h2">Example Signer</Heading>
          <iframe src="https://icrc-25-example-signer-dev.nfid.one/" className="h-full" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default App
