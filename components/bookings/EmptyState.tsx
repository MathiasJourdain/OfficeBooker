"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/providers/I18nProvider"

export function EmptyState() {
  const t = useTranslations("booking")
  
  return (
    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
      <p className="text-gray-500 mb-4">{t("noUpcomingBookings")}</p>
      <Link href="/"><Button variant="outline">{t("bookRoom")}</Button></Link>
    </div>
  )
}
