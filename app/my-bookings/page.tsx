import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookingCard } from "@/components/bookings/BookingCard"
import { EmptyState } from "@/components/bookings/EmptyState"

export default async function MyBookingsPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: bookings } = await supabase.from("bookings").select("*, rooms(*)").eq("user_id", user?.id).order("start_time", { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
          <Link href="/"><Button className="bg-blue-600 hover:bg-blue-700">+ Nouvelle réservation</Button></Link>
        </div>

        {params.success && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 border border-green-200 flex items-center shadow-sm">✅ Votre réservation a été confirmée avec succès !</div>}

        <div className="space-y-4">
          {bookings?.map((b) => <BookingCard key={b.id} booking={b} />)}
          {(!bookings || bookings.length === 0) && <EmptyState />}
        </div>
      </div>
    </div>
  )
} 