import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export function SuccessPopup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold">Réservation confirmée !</h2>
        <p className="text-gray-500">Votre créneau a bien été enregistré.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button variant="outline">Fermer</Button></Link>
          <Link href="/my-bookings"><Button className="bg-blue-600 hover:bg-blue-700">Voir mes réservations</Button></Link>
        </div>
      </div>
    </div>
  )
}
