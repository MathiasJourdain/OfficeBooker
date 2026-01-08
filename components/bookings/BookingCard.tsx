import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Trash2 } from "lucide-react"
import { cancelBooking } from "@/app/my-bookings/actions"
import Link from "next/link"

export function BookingCard({ booking }: { booking: any }) {
  return (
    <Card className="overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition">
      <div className="sm:w-48 h-32 sm:h-auto bg-gray-200 relative">
        {booking.rooms?.image_url ? <img src={booking.rooms.image_url} alt="Salle" className="absolute inset-0 w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400">No Image</div>}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-xl text-gray-800">{booking.rooms?.name || 'Salle inconnue'}</h3>
          <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-sm"><Calendar className="w-4 h-4" />{new Date(booking.start_time).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-sm"><Clock className="w-4 h-4" />{new Date(booking.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(booking.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <form action={cancelBooking}>
            <input type="hidden" name="bookingId" value={booking.id} />
            <Button variant="destructive" size="sm" className="flex items-center gap-2"><Trash2 className="w-4 h-4" />Annuler</Button>
          </form>
        </div>
      </div>
    </Card>
  )
}
