import { Suspense } from "react"
import { ErrorBoundary } from "@/app/_components/ErrorBoundary"
import { RoomDetails } from "../_components/RoomDetails"
import { RoomDetailsFallback } from "../_components/RoomDetailsFallback"
import { getTranslations } from "next-intl/server"

export default async function RoomPage() {
  const t = await getTranslations("rooms")
  
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <ErrorBoundary title={t("loadingError")}>
        <Suspense fallback={<RoomDetailsFallback />}>
          <RoomDetails />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
} 