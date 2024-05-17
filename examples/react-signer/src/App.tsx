import React from "react"
import { Box, Heading, Code } from "@radix-ui/themes"

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
    const obj = JSON.parse(messages[messages.length - 1])
    window.parent.postMessage(obj, "*")
  }, [messages])

  const onReject = React.useCallback(() => {
    const obj = JSON.parse(messages[messages.length - 1])

    window.parent.postMessage(
      {
        id: obj.id,
        jsonrpc: obj.jsonrpc,
        error: {
          code: -32000,
          message: "User rejected the request",
        },
      },
      "*"
    )
  }, [messages])

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
