"use client"

import { useQuery } from "@tanstack/react-query"
import { Bell, Info, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "@/providers/I18nProvider"

// 1. La fonction qui va chercher les données sur ton API
const fetchFeed = async () => {
  const res = await fetch("/api/feed")
  if (!res.ok) throw new Error("Erreur réseau")
  return res.json()
}

export function NewsFeed() {
  const t = useTranslations("home")
  
  // 2. Utilisation de TanStack Query
  const { data: feed, isLoading, isError } = useQuery({
    queryKey: ["feed"], // Clé unique pour le cache
    queryFn: fetchFeed,
  })

  if (isLoading) return <NewsFeedSkeleton />
  if (isError) return <div className="text-red-500 text-sm">{t("feedError")}</div>

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-600" />
        {t("latestNews")}
      </h2>
      
      <div className="space-y-4">
        {feed.map((item: any) => (
          <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
            <div className={`mt-1 p-2 rounded-full ${item.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
               {item.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">{item.content}</p>
              <div className="flex gap-2 text-xs text-gray-400 mt-1">
                <span>{item.author}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Un petit squelette de chargement pour faire pro
function NewsFeedSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 space-y-4">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
