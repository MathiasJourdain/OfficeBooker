"use client"

import { useRoomsSuspenseQuery } from "../_hooks/queries/useRoomsSuspenseQuery"
import { RoomsGrid } from "@/components/home/RoomsGrid"
import { useTranslations } from "next-intl"

interface RoomsListProps {
  search?: string
  minCapacity?: number
}

export function RoomsList({ search, minCapacity }: RoomsListProps) {
  const { data: rooms } = useRoomsSuspenseQuery({ search, minCapacity })
  const t = useTranslations("common")

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {rooms.length === 0
          ? t("noRooms")
          : t("roomsFound", { count: rooms.length })}
      </p>
      <RoomsGrid rooms={rooms} />
    </div>
  )
}

