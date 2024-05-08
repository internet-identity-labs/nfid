import React from "react"
import { SignerIcon } from "./signer-icon"

type SignerCardProps = {
  label: string
  icon?: string
  onClick: () => void
}

export const SignerCard: React.FC<SignerCardProps> = ({ label, icon, onClick }) => {
  return (
    <div className="flex w-full gap-2 text-center border rounded p-2 cursor-pointer" onClick={onClick}>
      {/* <Avatar size="3" src={icon} radius="full" fallback={label[0]} /> */}
      <SignerIcon src={icon} label={label} />
      <span className="flex items-center justify-center">{label}</span>
    </div>
  )
}
