import { Box, Flex } from "@radix-ui/themes"
import { Logo } from "./logo"

export const Header = () => {
  return (
    <Box width="100%" height={"9"} p="4">
      <Flex justify="between" align="center">
        <Logo />
        <Box>IdentityKit Playground</Box>
      </Flex>
    </Box>
  )
}
