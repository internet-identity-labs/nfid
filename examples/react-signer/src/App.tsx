import { Box, Flex } from "@radix-ui/themes"
import { Loader } from "./ui/loader"
import { useSigner } from "./hook/use-signer"

function App() {
  const { component } = useSigner()

  return (
    <>
      <Box>
        <Flex className="flex flex-col justify-center h-screen">
          {component ? (
            component
          ) : (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default App
