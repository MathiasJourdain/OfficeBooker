"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/providers/I18nProvider"

export function RoomCard({ room }: { room: any }) {
  const t = useTranslations("home")
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col group">
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {room.image_url ? <img src={room.image_url} alt={room.name} className="object-cover w-full h-full" /> : <div className="flex items-center justify-center h-full text-gray-400">{t("imageNotAvailable")}</div>}
        <div className="absolute top-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800">👥 {room.capacity}</div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {room.equipment?.slice(0, 4).map((e: string, i: number) => <span key={i} className="text-[10px] uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">{e}</span>)}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-50">
          <Link href={`/rooms/${room.id}`} className="w-full block">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">{t("viewSchedule")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
