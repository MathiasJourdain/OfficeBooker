import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { LoginForm } from "@/components/login/LoginForm"
import { SignupForm } from "@/components/login/SignupForm"
import { getTranslations } from "next-intl/server"

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message: string }> }) {
  const params = await searchParams
  const message = params.message
  const t = await getTranslations("login")
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {message && <AlertMessage message={message} />}

      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">{t("login")}</TabsTrigger>
          <TabsTrigger value="register">{t("signup")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login"><LoginForm /></TabsContent>
        <TabsContent value="register"><SignupForm /></TabsContent>
      </Tabs>
    </div>
  )
}

async function AlertMessage({ message }: { message: string }) {
  const t = await getTranslations("login")
  
  return (
    <Alert variant="destructive" className="mb-6 max-w-md w-full">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{t("error")}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
