import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

// GET /api/rooms - Liste des salles avec filtres optionnels
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const minCapacity = parseInt(searchParams.get("minCapacity") || "0")

  const supabase = await createClient()
  
  let query = supabase.from("rooms").select("*").order("id")

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (minCapacity > 0) {
    query = query.gte("capacity", minCapacity)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST /api/rooms - Créer une nouvelle salle
export async function POST(request: Request) {
  const supabase = await createClient()
  
  // Vérifier l'authentification
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const body = await request.json()
  const { name, capacity, equipment, image_url } = body

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      name,
      capacity: parseInt(capacity),
      equipment: equipment || [],
      image_url: image_url || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

