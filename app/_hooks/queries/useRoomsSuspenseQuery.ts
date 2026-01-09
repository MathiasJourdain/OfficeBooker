"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

interface RoomFilters {
  search?: string
  minCapacity?: number
}

export function useRoomsSuspenseQuery(filters: RoomFilters = {}) {
  const { search = "", minCapacity = 0 } = filters

  return useSuspenseQuery({
    queryKey: ["rooms", search, minCapacity],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (minCapacity > 0) params.set("minCapacity", minCapacity.toString())

      const res = await fetch(`/api/rooms?${params.toString()}`)
      if (!res.ok) throw new Error("Erreur lors du chargement des salles")
      return res.json()
    },
  })
}

