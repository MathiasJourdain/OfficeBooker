import { signup } from "@/app/login/actions"
import { SubmitButton } from "@/components/submit-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un compte 🚀</CardTitle>
        <CardDescription>Rejoignez OfficeBooker en quelques secondes.</CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input id="fullName" name="fullName" placeholder="Jean Dupont" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input id="register-email" name="email" type="email" placeholder="exemple@boite.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Mot de passe</Label>
            <Input id="register-password" name="password" type="password" placeholder="Min. 6 caractères" required />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full" formAction={signup}>S'inscrire</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
