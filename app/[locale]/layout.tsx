import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import QueryProvider from "@/providers/QueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OfficeBooker",
  description: "Réservez vos salles de réunion simplement.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const validLocales = ["en", "fr"];

  if (!validLocales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <Header />
            <main>
              {children}
            </main>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
