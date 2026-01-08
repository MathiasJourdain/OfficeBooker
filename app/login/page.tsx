import { login, signup } from './actions'
import { SubmitButton } from '@/components/submit-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message: string }> }) {
  const params = await searchParams
  const message = params.message
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {message && <AlertMessage message={message} />}
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><LoginForm /></TabsContent>
        <TabsContent value="register"><SignupForm /></TabsContent>
      </Tabs>
    </div>
  )
}