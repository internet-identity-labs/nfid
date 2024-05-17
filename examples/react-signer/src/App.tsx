import React from "react"
import { Box, Flex, Heading, Code } from "@radix-ui/themes"

function App() {
  const [messages, setMessages] = React.useState<string[]>([])

  const handleMessage = React.useCallback((message: MessageEvent) => {
    setMessages((messages) => [...messages, JSON.stringify(message?.data, null, 2)])
  }, [])

  React.useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  const onApprove = React.useCallback(() => {
    console.log({ messages })
    window.parent.postMessage({ type: "APPROVE" }, "*")
  }, [messages])

  const onReject = React.useCallback(() => {
    window.parent.postMessage({ type: "REJECT" }, "*")
  }, [])

  return (
    <Box>
      <pre>@nfid/react-signer</pre>
      <div className="flex flex-col">
        {messages.length ? <Heading as="h3">Messages</Heading> : "No messages, yet"}
        {messages.map((message, index) => (
          <Code key={index}>{message}</Code>
        ))}
        {messages.length ? (
          <div>
            <div onClick={onApprove}>approve</div>
            <div onClick={onReject}>reject</div>
          </div>
        ) : null}
      </div>
    </Box>
  )
}

export default App
