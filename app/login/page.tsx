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
      {/* J'ai défini ce composant plus bas 👇 */}
      {message && <AlertMessage message={message} />}

      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>
        
        {/* J'ai défini ces composants plus bas 👇 */}
        <TabsContent value="login"><LoginForm /></TabsContent>
        <TabsContent value="register"><SignupForm /></TabsContent>
      </Tabs>
    </div>
  )
}

// --- LES COMPOSANTS MANQUANTS ---

function AlertMessage({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="mb-6 max-w-md w-full">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>
          Entrez votre email et mot de passe pour accéder à votre compte.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="nom@exemple.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          {/* On connecte l'action login ici */}
          <SubmitButton formAction={login} pendingText="Connexion...">
            Se connecter
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}

function SignupForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>
          Créez un compte pour commencer à réserver des salles.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Nom complet</Label>
            <Input id="full_name" name="full_name" placeholder="Elon Musk" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-register">Email</Label>
            <Input id="email-register" name="email" type="email" placeholder="nom@exemple.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-register">Mot de passe</Label>
            <Input id="password-register" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          {/* On connecte l'action signup ici */}
          <SubmitButton formAction={signup} pendingText="Inscription...">
            S'inscrire
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}