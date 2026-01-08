import { login, signup } from './actions'
import { SubmitButton } from '@/components/submit-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  // Dans Next.js 15, on doit attendre (await) les searchParams
  const params = await searchParams;
  const message = params.message;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      
      {/* --- Bloc d'alerte en cas d'erreur --- */}
      {message && (
        <Alert variant="destructive" className="max-w-md w-full mb-6 bg-red-50 border-red-200 text-red-900">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* --- Système d'onglets --- */}
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>

        {/* --- ONGLET 1 : CONNEXION --- */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Bon retour parmi nous 👋</CardTitle>
              <CardDescription>
                Connectez-vous pour gérer vos réservations.
              </CardDescription>
            </CardHeader>
            {/* CORRECTION : L'action est définie ici sur le formulaire */}
            <form action={login}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="exemple@boite.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton className="w-full bg-blue-600 hover:bg-blue-700">
                  Se connecter
                </SubmitButton>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* --- ONGLET 2 : INSCRIPTION --- */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Créer un compte 🚀</CardTitle>
              <CardDescription>
                Rejoignez OfficeBooker en quelques secondes.
              </CardDescription>
            </CardHeader>
            <form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Jean Dupont" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    name="email" 
                    type="email" 
                    placeholder="exemple@boite.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <Input 
                    id="register-password" 
                    name="password" 
                    type="password" 
                    placeholder="Min. 6 caractères"
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                {/* Ici on utilise formAction directement sur le bouton */}
                <SubmitButton className="w-full" formAction={signup}>
                  S'inscrire
                </SubmitButton>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}