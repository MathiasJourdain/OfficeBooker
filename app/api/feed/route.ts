import { NextResponse } from "next/server";

const MOCK_FEED = [
  {
    id: 1,
    author: "Service Technique",
    content: "⚠️ La machine à café du 2ème étage est en maintenance jusqu'à 14h.",
    date: "Il y a 10 min",
    type: "alert"
  },
  {
    id: 2,
    author: "Happiness Manager",
    content: "🎉 Afterwork prévu ce jeudi soir dans l'Open Space !",
    date: "Il y a 2 heures",
    type: "info"
  },
  {
    id: 3,
    author: "Admin Système",
    content: "Le Wifi 'Guest' va changer de mot de passe demain.",
    date: "Il y a 5 heures",
    type: "info"
  }
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return NextResponse.json(MOCK_FEED);
}