import { Suspense } from "react"
import { ErrorBoundary } from "@/app/_components/ErrorBoundary"
import { RoomDetails } from "../_components/RoomDetails"
import { RoomDetailsFallback } from "../_components/RoomDetailsFallback"

export default function RoomPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <ErrorBoundary title="Erreur lors du chargement de la salle">
        <Suspense fallback={<RoomDetailsFallback />}>
          <RoomDetails />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
} 