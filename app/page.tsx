import { SuccessPopup } from "@/components/home/SuccessPopup"
import { ErrorPopup } from "@/components/home/ErrorPopup"
import { HomeHeader } from "@/components/home/HomeHeader"
import { NewsFeed } from "@/components/home/NewsFeed"
import { FilteredRoomList } from "@/components/home/FilteredRoomList"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ bookingSuccess?: string; error?: string }>
}) {
  const params = await searchParams
  const showSuccessPopup = params.bookingSuccess === "true"
  const errorMessage = params.error

  return (
    <main className="min-h-screen bg-gray-50">
      {showSuccessPopup && <SuccessPopup />}
      {errorMessage && <ErrorPopup message={errorMessage} />}

      <div className="max-w-6xl mx-auto p-8">
        <HomeHeader />

        <section className="mb-8">
            <NewsFeed />
        </section>

        <section>
          <FilteredRoomList />
        </section>
      </div>
    </main>
  )
}