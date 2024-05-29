import { Box, Flex } from "@radix-ui/themes"
import { Loader } from "./component/loader.component"
import { State, useSigner } from "./hook/use-signer"

function App() {
  const { component, state } = useSigner()

  if (State.LOADING === state || State.READY == state || !component) {
    return (
      <Box>
        <Flex className="flex flex-col justify-center h-screen">
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        </Flex>
      </Box>
    )
  }

  return (
    <>
      <Box>
        <Flex className="flex flex-col justify-center h-screen">{component}</Flex>
      </Box>
    </>
  )
}

export default App
