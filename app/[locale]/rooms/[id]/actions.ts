'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function bookRoom(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const roomId = formData.get('roomId')
  const startTime = formData.get('startTime')
  const endTime = formData.get('endTime')

  if (new Date(startTime as string) >= new Date(endTime as string)) {
    return redirect(`/?error=La date de fin doit être après la date de début`)
  }

  const { error } = await supabase.from('bookings').insert({
    room_id: roomId,
    user_id: user.id,
    start_time: startTime,
    end_time: endTime,
  })

  if (error) {
    console.error("Erreur réservation:", error)

    if (error.code === '23P01') {
      return redirect(`/?error=Ce créneau est déjà réservé ! Veuillez en choisir un autre.`)
    }

    return redirect(`/?error=Une erreur est survenue lors de la réservation.`)
  }

  revalidatePath('/')
  redirect('/?bookingSuccess=true')
}
