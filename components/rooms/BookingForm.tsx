"use client"

import { bookRoom } from "@/app/rooms/[id]/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export function BookingForm({ room }: { room: any }) {
  const t = useTranslations("rooms")
  
  return (
    <div className="md:w-1/2 p-6">
      <CardHeader>
        <CardTitle>{t("bookSlot")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={bookRoom} className="space-y-4">
          <input type="hidden" name="roomId" value={room.id} />
          <div>
            <label className="text-sm font-medium">{t("start")}</label>
            <Input type="datetime-local" name="startTime" required />
          </div>
          <div>
            <label className="text-sm font-medium">{t("end")}</label>
            <Input type="datetime-local" name="endTime" required />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">{t("confirmBooking")}</Button>
        </form>
      </CardContent>
    </div>
  )
}
