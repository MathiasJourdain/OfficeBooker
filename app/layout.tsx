import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
// 👇 1. Import du Provider
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OfficeBooker",
  description: "Réservez vos salles de réunion simplement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* 👇 2. On enveloppe tout le contenu */}
        <QueryProvider>
          <Header />
          <main>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}