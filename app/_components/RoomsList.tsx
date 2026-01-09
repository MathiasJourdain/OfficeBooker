"use client"

import { useRoomsSuspenseQuery } from "../_hooks/queries/useRoomsSuspenseQuery"
import { RoomsGrid } from "@/components/home/RoomsGrid"

interface RoomsListProps {
  search?: string
  minCapacity?: number
}

export function RoomsList({ search, minCapacity }: RoomsListProps) {
  const { data: rooms } = useRoomsSuspenseQuery({ search, minCapacity })

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {rooms.length === 0
          ? "Aucune salle trouvée."
          : `${rooms.length} salle(s) correspondent à vos critères.`}
      </p>
      <RoomsGrid rooms={rooms} />
    </div>
  )
}

