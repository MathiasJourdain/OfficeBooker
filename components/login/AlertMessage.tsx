import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function AlertMessage({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="max-w-md w-full mb-6 bg-red-50 border-red-200 text-red-900">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Attention</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
