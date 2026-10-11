import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { AnimatedFooter } from '@/components/AnimatedFooter';

const anekBangla = Anek_Bangla({
  variable: "--font-bangla",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["bengali", "latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Tripper - Travel & Explore | From Bangladesh to the World",
  description: "Experience authentic Bangladesh travel discovery, district guides, international visa assistance & document attestation.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/logo-icon.png",
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${anekBangla.variable} font-bangla antialiased bg-[#faf8f5] text-[#17201c] selection:bg-[#0f6b4f] selection:text-white min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <AnimatedFooter isBn={locale === "bn"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
