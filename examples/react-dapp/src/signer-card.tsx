import React from "react"
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

type SignerCardProps = {
  label: string
  icon?: string
  onClick: () => void
}

export const SignerCard: React.FC<SignerCardProps> = ({ label, icon, onClick }) => {
  return (
    <Card style={{ maxWidth: 240 }} onClick={onClick}>
      <Flex gap="3" align="center">
        <Avatar size="3" src={icon} radius="full" fallback={label[0]} />
        <Box>
          <Text as="div" size="2" weight="bold">
            {label}
          </Text>
        </Box>
      </Flex>
    </Card>
  )
}
