"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

interface RoomPayload {
  name: string
  capacity: number
  equipment: string[]
  image_url: string
}

export function usePostRoomMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: RoomPayload) => {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Erreur lors de la création")
      }

      return res.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
    },
  })
}
