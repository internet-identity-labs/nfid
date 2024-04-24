import React from "react"
import * as Avatar from "@radix-ui/react-avatar"

type SignerIconProps = {
  label: string
  src?: string
}

export const SignerIcon: React.FC<SignerIconProps> = ({ label, src }) => {
  const [first, second] = label.split(' ')
  return (
    <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={`${label} Logo`}
      />
      <Avatar.Fallback
        className="leading-1 flex h-full w-full items-center justify-center bg-gray-300 text-[15px] font-medium"
        delayMs={600}
      >
        {first[0]}{second[0]}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
