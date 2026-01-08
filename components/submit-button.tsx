'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { ComponentProps } from 'react'

// On dit à TypeScript : "Ce composant accepte TOUTES les props d'un bouton Shadcn"
type SubmitButtonProps = ComponentProps<typeof Button>

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className={className}
      {...props} // 👈 C'est ici que la magie opère : on transmet formAction au vrai bouton
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Patientez...
        </>
      ) : (
        children
      )}
    </Button>
  )
}