import { createClient } from "@/utils/supabase/server"
import { Logo } from "./header/logo"
import { AuthControls } from "./header/auth-controls"

export default async function Header() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName = user?.user_metadata?.full_name || user?.email

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <AuthControls user={user} displayName={displayName} />
        </div>
      </div>
    </header>
  )
} 