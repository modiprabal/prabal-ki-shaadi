import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Prabal & Shreya | शुभ विवाह — 24 June 2026",
  description: "You are warmly invited to celebrate the wedding of Prabal Modi & Shreya Baisakhiya on 24 June 2026 at Shubh Heaven Resort, Lalitpur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${devanagari.variable} antialiased scroll-smooth overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <main className="flex-grow overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
