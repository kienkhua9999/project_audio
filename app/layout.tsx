import type { Metadata } from "next";
// import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Xem phim ngắn hãy xem trên NetChill",
  description: "Xem phim ngắn hãy xem trên NetChill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* popunder */}
       {/* <Script src="https://pl28850045.effectivegatecpm.com/fb/6f/87/fb6f87d26b7d7e4d1afc6f8ee65d73c5.js" strategy="afterInteractive" /> */}
        {children}
      </body>
    </html>
  );
}
