import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/app/_components/ErrorBoundary"
import { BookingsList } from "./_components/BookingsList"
import { BookingsListFallback } from "./_components/BookingsListFallback"
import { getTranslations } from "next-intl/server"

export default async function MyBookingsPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams
  const t = await getTranslations("booking")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">+ {t("newBooking")}</Button>
          </Link>
        </div>

        {params.success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 border border-green-200 flex items-center shadow-sm">
            ✅ {t("success")}
          </div>
        )}

        <ErrorBoundary title="Erreur lors du chargement des réservations">
          <Suspense fallback={<BookingsListFallback />}>
            <BookingsList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
} 