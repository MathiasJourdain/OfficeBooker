// app/login/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Récupération des données du formulaire
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Erreur de connexion')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // On passe le nom complet pour qu'il soit ajouté au profil via notre Trigger SQL
      data: {
        full_name: fullName, 
      },
    },
  })

  if (error) {
    return redirect('/login?message=Erreur inscription')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// ✅ NOUVELLE FONCTION AJOUTÉE : DÉCONNEXION
export async function signOut() {
  const supabase = await createClient()
  
  await supabase.auth.signOut()
  
  // On redirige vers l'accueil après la déconnexion
  revalidatePath('/', 'layout')
  redirect('/')
}