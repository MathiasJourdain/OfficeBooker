import { Suspense } from "react"
import { ErrorBoundary } from "@/app/_components/ErrorBoundary"
import { RoomDetails } from "../_components/RoomDetails"
import { RoomDetailsFallback } from "../_components/RoomDetailsFallback"
import { cookies } from "next/headers"
import { Locale } from "@/messages"

export default async function RoomPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("locale")?.value || "fr") as Locale
  const messages = (await import(`@/messages`))[locale]
  const t = messages.rooms
  
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <ErrorBoundary title={t.loadingError}>
        <Suspense fallback={<RoomDetailsFallback />}>
          <RoomDetails />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
} 