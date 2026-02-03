'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function cancelBooking(formData: FormData) {
  const supabase = await createClient()
  const bookingId = formData.get('bookingId')

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

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
