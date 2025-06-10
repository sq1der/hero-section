"use client"

import type React from "react"

import type { ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { usePopup } from "@/context/popup-context"

interface ContactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "contact" | "landing" | "corporate" | "store"
  children: React.ReactNode
}

export default function ContactButton({ type, children, ...props }: ContactButtonProps) {
  const { openPopup } = usePopup()

  const handleClick = () => {
    openPopup(type)
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
