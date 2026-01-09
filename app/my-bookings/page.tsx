import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookingsList } from "./_components/BookingsList"
import { BookingsListFallback } from "./_components/BookingsListFallback"

export default async function MyBookingsPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">+ Nouvelle réservation</Button>
          </Link>
        </div>

        {params.success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 border border-green-200 flex items-center shadow-sm">
            ✅ Votre réservation a été confirmée avec succès !
          </div>
        )}

        <Suspense fallback={<BookingsListFallback />}>
          <BookingsList />
        </Suspense>
      </div>
    </div>
  )
} 