"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

export function useRoomSuspenseQuery(roomId: string) {
  return useSuspenseQuery({
    queryKey: ["rooms", roomId],
    queryFn: async () => {
      const res = await fetch(`/api/rooms/${roomId}`)
      if (!res.ok) throw new Error("Salle introuvable")
      return res.json()
    },
  })
}
