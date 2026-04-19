import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdsterraScripts } from "./components/AdsterraScripts";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShortReelDrama – Xem Phim Ngắn Hàn Quốc Hay Nhất",
    template: "%s | ShortReelDrama",
  },
  description: "Xem phim ngắn, phim bộ Hàn Quốc, Trung Quốc hay nhất tại ShortReelDrama. Cập nhật liên tục, nhanh chóng, miễn phí 100%.",
  keywords: ["xem phim ngắn", "phim bộ hàn quốc", "phim trung quốc", "phim ngắn hay", "shortreeldrama"],
  openGraph: {
    siteName: "ShortReelDrama",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}

        <AdsterraScripts />
      </body>
    </html>
  );
}
