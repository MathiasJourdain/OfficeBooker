import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { RoomImage } from "@/components/rooms/RoomImage"
import { BookingForm } from "@/components/rooms/BookingForm"

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: room } = await supabase.from("rooms").select("*").eq("id", id).single()
  if (!room) return notFound()
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <RoomImage room={room} />
        <BookingForm room={room} />
      </Card>
    </div>
  )
} 