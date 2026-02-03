"use client"

import { useLocale } from "@/providers/I18nProvider"
import { useRouter } from "next/navigation"
import { LOCALES, type Locale } from "@/messages"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    // Définir le cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    // Recharger la page pour appliquer la nouvelle langue
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      {LOCALES.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? "default" : "outline"}
          size="sm"
          onClick={() => switchLocale(loc)}
          className={locale === loc ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          {loc.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}
