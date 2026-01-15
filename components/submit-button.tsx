"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { type ComponentProps } from "react"

// On définit les types : les props du Button normal + notre pendingText optionnel
type Props = ComponentProps<typeof Button> & {
  pendingText?: string
}

// 👇 C'est ici que la magie opère : on "destructure" pendingText
export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      aria-disabled={pending} 
      disabled={pending} 
      {...props} 
    >
      {pending && pendingText ? pendingText : children}
    </Button>
  )
}