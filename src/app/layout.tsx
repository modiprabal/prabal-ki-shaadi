import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Prabal and [Bride's Name] | Wedding Invitation",
  description: "Join us in celebrating our union.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-brand-sage selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
