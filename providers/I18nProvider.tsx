"use client"

import { createContext, useContext, ReactNode } from "react"
import { Locale } from "@/messages"
import { fr } from "@/messages/fr"
import { en } from "@/messages/en"

const I18nContext = createContext<{
  locale: Locale
  messages: typeof fr | typeof en
}>({
  locale: "fr",
  messages: fr,
})

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: Locale
  messages: typeof fr | typeof en
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function useTranslations(namespace: string) {
  const { messages } = useI18n()
  const translations = (messages as any)[namespace] || {}
  
  return (key: string) => {
    const keys = key.split(".")
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
}

export function useLocale() {
  const { locale } = useI18n()
  return locale
}
