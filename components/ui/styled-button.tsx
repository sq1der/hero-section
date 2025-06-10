"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const styledButtonVariants = cva("transition-all duration-300 group", {
  variants: {
    variant: {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      outline:
        "border-blue-600/30 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:border-blue-600/50 hover:text-blue-300",
      ghost: "text-blue-400 hover:bg-blue-600/10 hover:text-blue-300",
      gradient: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
      "gradient-outline":
        "bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-600/30 hover:border-blue-600/50 text-white hover:from-blue-600/20 hover:to-purple-600/20",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-12 px-6 py-3",
      xl: "px-6 py-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface StyledButtonProps extends ButtonProps, VariantProps<typeof styledButtonVariants> {}

const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <Button className={cn(styledButtonVariants({ variant, size, className }))} ref={ref} {...props} />
})
StyledButton.displayName = "StyledButton"

export { StyledButton }
