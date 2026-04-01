import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans, Noto_Serif_Devanagari, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

const signatureFont = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-signature-font",
  weight: "400",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prabal & Shreya | शुभ विवाह — 23 & 24 June 2026",
  description:
    "You are warmly invited to celebrate the wedding of Prabal Modi & Shreya Baisakhiya on 23 & 24 June 2026 at Shubh Heaven Resort, Lalitpur.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${plusJakarta.variable} ${devanagari.variable} ${signatureFont.variable} antialiased scroll-smooth overflow-x-hidden`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-body text-on-surface overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Navbar />
        <main className="flex-grow overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
