'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function bookRoom(formData: FormData) {
  const supabase = await createClient()

  // 1. Vérif session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  // 2. Récup info form
  const roomId = formData.get('roomId')
  const startTime = formData.get('startTime')
  const endTime = formData.get('endTime')

  // Validation basique des dates
  if (new Date(startTime as string) >= new Date(endTime as string)) {
    return redirect(`/?error=La date de fin doit être après la date de début`)
  }

  // 3. Insert Supabase
  const { error } = await supabase.from('bookings').insert({
    room_id: roomId,
    user_id: user.id,
    start_time: startTime,
    end_time: endTime,
  })

  // 4. GESTION DES ERREURS (C'est ici que ça se joue)
  if (error) {
    console.error("Erreur réservation:", error)

    // Le code 23P01 correspond à une violation de la contrainte d'exclusion (Doublon)
    if (error.code === '23P01') {
      return redirect(`/?error=Ce créneau est déjà réservé ! Veuillez en choisir un autre.`)
    }

    // Autres erreurs
    return redirect(`/?error=Une erreur est survenue lors de la réservation.`)
  }

  // 5. Succès
  revalidatePath('/')
  redirect('/?bookingSuccess=true')
}