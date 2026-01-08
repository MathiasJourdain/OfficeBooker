import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header"; // 👈 1. Import du Header

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
        <Header /> {/* 👈 2. Ajout du Header ici */}
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}