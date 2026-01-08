import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendarDays, LogIn, LogOut, User } from 'lucide-react'
import { signOut } from '@/app/login/actions'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // On récupère le nom complet depuis les métadonnées (stockées lors du sign up)
  // Si pas de nom, on affiche l'email par défaut
  const displayName = user?.user_metadata?.full_name || user?.email

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO (Retour Accueil) */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition group">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition">
            <span className="text-xl">🏢</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">OfficeBooker</span>
        </Link>

        {/* PARTIE DROITE */}
        <div className="flex items-center gap-4">
          {user ? (
            // --- CAS CONNECTÉ ---
            <div className="flex items-center gap-3">
              
              {/* Affichage du Nom avec une petite icône */}
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
              
              {/* Bouton Déconnexion */}
              <form action={signOut}>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 hover:bg-red-50" title="Se déconnecter">
                  <LogOut className="w-5 h-5" />
                </Button>
              </form>
            </div>
          ) : (
            // --- CAS DÉCONNECTÉ ---
            <Link href="/login">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm">
                <LogIn className="w-4 h-4" />
                Connexion
              </Button>
            </Link>
          )}
        </div>

      </div>
    </header>
  )
}