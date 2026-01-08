import { login } from "@/app/login/actions"
import { SubmitButton } from "@/components/submit-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bon retour parmi nous 👋</CardTitle>
        <CardDescription>Connectez-vous pour gérer vos réservations.</CardDescription>
      </CardHeader>
      <form action={login}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="exemple@boite.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full bg-blue-600 hover:bg-blue-700">Se connecter</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
