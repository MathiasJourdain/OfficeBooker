import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Locale } from "@/messages";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Récupérer la locale depuis le cookie
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value || "fr") as Locale;
  
  // Charger les messages pour cette locale
  const messages = (await import(`@/messages`))[locale];
  const t = messages.home;
  
  // Construire le feed avec les traductions
  const MOCK_FEED = [
    {
      id: 1,
      author: t.feed.item1.author,
      content: t.feed.item1.content,
      date: t.feed.item1.date,
      type: "alert"
    },
    {
      id: 2,
      author: t.feed.item2.author,
      content: t.feed.item2.content,
      date: t.feed.item2.date,
      type: "info"
    },
    {
      id: 3,
      author: t.feed.item3.author,
      content: t.feed.item3.content,
      date: t.feed.item3.date,
      type: "info"
    }
  ];
  
  return NextResponse.json(MOCK_FEED);
}