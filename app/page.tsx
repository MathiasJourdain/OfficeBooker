import { createClient } from "@/utils/supabase/server"
import { SuccessPopup } from "@/components/home/SuccessPopup"
import { ErrorPopup } from "@/components/home/ErrorPopup"
import { RoomsGrid } from "@/components/home/RoomsGrid"

export default async function Home({ searchParams }: { searchParams: Promise<{ bookingSuccess?: string; error?: string }> }) {
  const params = await searchParams
  const showSuccessPopup = params.bookingSuccess === "true"
  const errorMessage = params.error

  const supabase = await createClient()
  const { data: rooms } = await supabase.from("rooms").select("*").order("id")

  return (
    <main className="min-h-screen bg-gray-50">
      {showSuccessPopup && <SuccessPopup />}
      {errorMessage && <ErrorPopup message={errorMessage} />}
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-end mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold">Bienvenue sur OfficeBooker</h1>
            <p className="text-gray-500 mt-2">Réservez l'espace idéal pour vos réunions.</p>
          </div>
          <span className="text-sm bg-gray-200 px-3 py-1 rounded-full text-gray-700">{rooms?.length || 0} salles disponibles</span>
        </div>
        <section><RoomsGrid rooms={rooms ?? undefined} /></section>
      </div>
    </main>
  )
}
