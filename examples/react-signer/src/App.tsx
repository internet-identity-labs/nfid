import React from "react"
import { Box, Flex, Heading, Code } from "@radix-ui/themes"

function App() {
  const [messages, setMessages] = React.useState<string[]>([])

  const handleMessage = React.useCallback((message: object) => {
    setMessages((messages) => [...messages, JSON.stringify(message)])
  }, [])

  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  return (
    <Box>
      <pre>@nfid/react-signer</pre>
      <Flex>
        {messages.length ? <Heading as="h3">Messages</Heading> : "No messages, yet"}
        {messages.map((message, index) => (
          <Code key={index}>{message}</Code>
        ))}
      </Flex>
    </Box>
  )
}

export default App
