import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PopunderManager from "./components/PopunderManager";
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
        {/* popunder – Option 2: lần 1 ngay, lần 2 sau 3-5 phút, max 2/session */}
        <PopunderManager />
        {children}
      </body>
    </html>
  );
}
