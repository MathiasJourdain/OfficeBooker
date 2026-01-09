"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

export function useBookingsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings")
      if (!res.ok) throw new Error("Erreur lors du chargement des réservations")
      return res.json()
    },
  })
}

