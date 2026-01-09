"use client"

import { useParams } from "next/navigation"
import { useRoomSuspenseQuery } from "../_hooks/queries/useRoomSuspenseQuery"
import { Card } from "@/components/ui/card"
import { RoomImage } from "@/components/rooms/RoomImage"
import { BookingForm } from "@/components/rooms/BookingForm"

export function RoomDetails() {
  const { id } = useParams<{ id: string }>()
  const { data: room } = useRoomSuspenseQuery(id)

  return (
    <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
      <RoomImage room={room} />
      <BookingForm room={room} />
    </Card>
  )
}

