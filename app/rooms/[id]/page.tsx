import { Suspense } from "react"
import { RoomDetails } from "../_components/RoomDetails"
import { RoomDetailsFallback } from "../_components/RoomDetailsFallback"

export default function RoomPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <Suspense fallback={<RoomDetailsFallback />}>
        <RoomDetails />
      </Suspense>
    </div>
  )
} 