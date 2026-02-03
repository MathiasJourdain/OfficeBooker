import { RoomForm } from "./_components/RoomForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cookies } from "next/headers"
import { Locale } from "@/messages"

export default async function AddRoomPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("locale")?.value || "fr") as Locale
  const messages = (await import(`@/messages`))[locale]
  const t = messages.common

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
        </Link>

        <RoomForm />
      </div>
    </div>
  )
}

