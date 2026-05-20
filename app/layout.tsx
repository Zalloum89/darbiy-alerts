import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darbiy.app";

const defaultTitle = "داربي | مركز مراقبة السفر المباشر";
const defaultDescription =
  "مركز مراقبة السفر المباشر — رصد الرحلات والمطارات في الوقت الفعلي";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  keywords: ["داربي", "تنبيهات السفر", "مطارات", "رحلات", "مسافرين عرب"],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName: "داربي",
    locale: "ar_SA",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
