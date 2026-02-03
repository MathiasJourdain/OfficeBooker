"use client"

import { signup } from "@/app/login/actions"
import { SubmitButton } from "@/components/submit-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

export function SignupForm() {
  const t = useTranslations("login")
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("signupTitle")}</CardTitle>
        <CardDescription>{t("signupDescription")}</CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("fullName")}</Label>
            <Input id="fullName" name="fullName" placeholder={t("fullNamePlaceholder")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">{t("email")}</Label>
            <Input id="register-email" name="email" type="email" placeholder={t("emailPlaceholder")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">{t("password")}</Label>
            <Input id="register-password" name="password" type="password" placeholder={t("passwordPlaceholder")} required />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full" formAction={signup}>{t("register")}</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
