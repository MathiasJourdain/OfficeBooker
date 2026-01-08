import { createClient } from "@/utils/supabase/server"
import { SuccessPopup } from "@/components/home/SuccessPopup"
import { ErrorPopup } from "@/components/home/ErrorPopup"
import { RoomsGrid } from "@/components/home/RoomsGrid"
import { HomeHeader } from "@/components/home/HomeHeader" // 👈 Import du nouveau composant

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ bookingSuccess?: string; error?: string }>
}) {
  const params = await searchParams
  const showSuccessPopup = params.bookingSuccess === "true"
  const errorMessage = params.error
await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabase = await createClient()
  const { data: rooms } = await supabase.from("rooms").select("*").order("id")

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Popups de notification */}
      {showSuccessPopup && <SuccessPopup />}
      {errorMessage && <ErrorPopup message={errorMessage} />}

      <div className="max-w-6xl mx-auto p-8">
        {/* Header avec Titre + Bouton Ajouter */}
        <HomeHeader count={rooms?.length || 0} />

        {/* Grille des salles */}
        <section>
          <RoomsGrid rooms={rooms ?? undefined} />
        </section>
      </div>
    </main>
  )
}