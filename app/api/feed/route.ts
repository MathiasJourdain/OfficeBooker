import { NextResponse } from "next/server";
import { getTranslations, getLocale } from "next-intl/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Récupérer la locale actuelle (depuis le cookie ou la config)
  const locale = await getLocale();
  
  // Récupérer les traductions pour cette locale
  const t = await getTranslations({ locale, namespace: "home" });
  
  // Construire le feed avec les traductions
  const MOCK_FEED = [
    {
      id: 1,
      author: t("feed.item1.author"),
      content: t("feed.item1.content"),
      date: t("feed.item1.date"),
      type: "alert"
    },
    {
      id: 2,
      author: t("feed.item2.author"),
      content: t("feed.item2.content"),
      date: t("feed.item2.date"),
      type: "info"
    },
    {
      id: 3,
      author: t("feed.item3.author"),
      content: t("feed.item3.content"),
      date: t("feed.item3.date"),
      type: "info"
    }
  ];
  
  return NextResponse.json(MOCK_FEED);
}