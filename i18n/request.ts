import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"
import { Locale } from "../messages"

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("locale")?.value || "fr") as Locale

  return {
    locale,
    messages: (await import(`../messages`))[locale],
  }
})
