// app/my-bookings/actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function cancelBooking(formData: FormData) {
  const supabase = await createClient()
  const bookingId = formData.get('bookingId')

  // Sécurité : On vérifie que l'utilisateur est bien connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Suppression de la réservation
  // La politique RLS (Row Level Security) qu'on a mise en place au début 
  // empêchera automatiquement de supprimer la réservation de quelqu'un d'autre.
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Erreur annulation:', error)
    return
  }

  revalidatePath('/my-bookings')
}