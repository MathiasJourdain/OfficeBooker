import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, LogIn, LogOut, User } from "lucide-react"
import { signOut } from "@/app/login/actions"

export function AuthControls({ user, displayName }: { user?: any; displayName?: string }) {
  return user ? (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
        <User className="w-4 h-4 text-gray-500" />
        {displayName}
      </div>

      <Link href="/my-bookings">
        <Button variant="outline" size="sm" className="gap-2 border-blue-200 hover:bg-blue-50 text-blue-700">
          <CalendarDays className="w-4 h-4" />
          <span className="hidden sm:inline">Mes Réservations</span>
        </Button>
      </Link>

      <form action={signOut}>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 hover:bg-red-50" title="Se déconnecter">
          <LogOut className="w-5 h-5" />
        </Button>
      </form>
    </div>
  ) : (
    <Link href="/login">
      <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm">
        <LogIn className="w-4 h-4" />
        Connexion
      </Button>
    </Link>
  )
}
