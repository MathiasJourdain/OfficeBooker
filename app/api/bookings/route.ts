import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

// GET /api/bookings - Liste des réservations de l'utilisateur connecté
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*, rooms(*)")
    .eq("user_id", user.id)
    .order("start_time", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST /api/bookings - Créer une nouvelle réservation
export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const body = await request.json()
  const { roomId, startTime, endTime } = body

  // Validation dates
  if (new Date(startTime) >= new Date(endTime)) {
    return NextResponse.json(
      { error: "La date de fin doit être après la date de début" },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      room_id: roomId,
      user_id: user.id,
      start_time: startTime,
      end_time: endTime,
    })
    .select()
    .single()

  if (error) {
    // Gestion de l'erreur de chevauchement
    if (error.code === "23P01") {
      return NextResponse.json(
        { error: "Ce créneau est déjà réservé" },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

