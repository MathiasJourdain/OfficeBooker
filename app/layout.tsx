import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import QueryProvider from "@/providers/QueryProvider";
import { I18nProvider } from "@/providers/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OfficeBooker",
  description: "Réservez vos salles de réunion simplement.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Charger les messages en français (statique pour l'instant)
  const locale = "fr";
  const messages = (await import(`@/messages`))[locale];

  return (
    <html lang="fr">
      <body className={inter.className}>
        <I18nProvider locale={locale} messages={messages}>
          <QueryProvider>
            <Header />
            <main>
              {children}
            </main>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
