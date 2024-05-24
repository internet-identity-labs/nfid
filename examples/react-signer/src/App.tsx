import { Box, Flex } from "@radix-ui/themes"
import { Loader } from "./ui/loader"
import { useSigner } from "./hook/use-signer"
import { methodComponents } from "./component/method.component"

function App() {
  const { componentData } = useSigner()

  const component =
    componentData && methodComponents.get(componentData.method)?.getComponent(componentData)

  if (!component)
    return (
      <Box>
        <Flex className="flex flex-col justify-center h-screen">
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        </Flex>
      </Box>
    )

  return (
    <>
      <Box>
        <Flex className="flex flex-col justify-center h-screen">
          <>
            <div className="pt-9">{component}</div>
            <div className="flex justify-between w-full mt-auto">
              <button
                className="px-3.5 py-3 mr-2 font-bold dark:text-white text-black text-sm dark:bg-black bg-white rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black focus:outline-none flex-1 border border-black dark:border-white border-solid"
                onClick={componentData.onReject}
              >
                Reject
              </button>
              <button
                className="px-3.5 py-3 font-bold text-white text-sm bg-blue-600 rounded hover:bg-blue-700 focus:outline-none flex-1"
                onClick={componentData.onApprove}
              >
                Approve
              </button>
            </div>
          </>
        </Flex>
      </Box>
    </>
  )
}

export default App
