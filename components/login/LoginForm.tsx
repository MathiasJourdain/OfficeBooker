"use client"

import { login } from "@/app/login/actions"
import { SubmitButton } from "@/components/submit-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "@/providers/I18nProvider"

export function LoginForm() {
  const t = useTranslations("login")
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("loginTitle")}</CardTitle>
        <CardDescription>{t("loginDescription")}</CardDescription>
      </CardHeader>
      <form action={login}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" name="email" type="email" placeholder={t("emailPlaceholder")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full bg-blue-600 hover:bg-blue-700">{t("connect")}</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
