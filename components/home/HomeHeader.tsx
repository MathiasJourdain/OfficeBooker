"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

export function HomeHeader() {
  const t = useTranslations("common")

  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b pb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("welcome")}</h1>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/rooms/add">
          <Button size="sm" className="bg-slate-900 text-white gap-2 hover:bg-slate-800">
            <Plus className="w-4 h-4" /> {t("addRoom")}
          </Button>
        </Link>
      </div>
    </div>
  )
}
