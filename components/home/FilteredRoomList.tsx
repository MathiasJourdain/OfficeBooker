"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { RoomsGrid } from "./RoomsGrid"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"

// 1. La fonction de fetch "intelligente" qui accepte des paramètres
async function fetchFilteredRooms(search: string, minCapacity: number) {
  const supabase = createClient()
  
  // On construit la requête petit à petit
  let query = supabase.from("rooms").select("*").order("id")

  // Si l'utilisateur a tapé un nom, on filtre
  if (search) {
    query = query.ilike("name", `%${search}%`) // ilike = insensible à la casse
  }

  // Si l'utilisateur veut une capacité min, on filtre
  if (minCapacity > 0) {
    query = query.gte("capacity", minCapacity) // gte = greater than or equal
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export function FilteredRoomList() {
  const t = useTranslations("home")
  
  // 2. État local pour les filtres
  const [search, setSearch] = useState("")
  const [capacity, setCapacity] = useState(0)
  
  // Petit bonus : Debounce (attendre que l'utilisateur finisse de taper)
  // Pour éviter de faire 50 requêtes si on tape "Elon Musk"
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(timer)
  }, [search])

  // 3. LE REQUÊTAGE AVANCÉ 🚀
  // La Query Key contient les variables de dépendance ['rooms', debouncedSearch, capacity]
  // Dès qu'une de ces variables change, TanStack Query relance le fetch automatiquement !
  const { data: rooms, isLoading, isError } = useQuery({
    queryKey: ["rooms", debouncedSearch, capacity], 
    queryFn: () => fetchFilteredRooms(debouncedSearch, capacity),
    placeholderData: (previousData) => previousData, // Garde les anciennes données pendant le chargement (transition douce)
  })

  return (
    <div className="space-y-6">
      {/* --- BARRE DE FILTRES --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        
        {/* Filtre Recherche */}
        <div className="w-full md:w-1/2 space-y-2">
          <Label className="flex items-center gap-2 text-gray-600">
            <Search className="w-4 h-4" /> {t("searchRoom")}
          </Label>
          <Input 
            placeholder="Ex: Salle Jeff Bezos..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filtre Capacité */}
        <div className="w-full md:w-1/4 space-y-2">
          <Label className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" /> {t("minCapacity")}
          </Label>
          <Input 
            type="number" 
            min="0"
            value={capacity || ""}
            onChange={(e) => setCapacity(Number(e.target.value))}
            placeholder="Ex: 4"
          />
        </div>
      </div>

      {/* --- RÉSULTATS --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Loading Skeleton rapide */}
            {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center py-10">{t("loadingError")}</div>
      ) : (
        <>
            <p className="text-sm text-gray-500 mb-2">
                {rooms?.length === 0 ? t("noRoomsFound") : t("roomsFound", { count: rooms?.length || 0 })}
            </p>
            <RoomsGrid rooms={rooms ?? undefined} />
        </>
      )}
    </div>
  )
}
