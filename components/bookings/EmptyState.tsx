import Link from "next/link"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
      <p className="text-gray-500 mb-4">Vous n'avez aucune réservation à venir.</p>
      <Link href="/"><Button variant="outline">Réserver une salle</Button></Link>
    </div>
  )
}
