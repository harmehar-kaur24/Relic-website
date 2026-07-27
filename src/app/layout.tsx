import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baba Bhai Roop Chand Ji Collection Museum",
  description:
    "A touring exhibition of the sacred shastars and relics bestowed by Sri Guru Hargobind Sahib Ji, in the continuing custodianship of the descendants of Bhai Roop Chand Ji.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-50 text-navy-950">
        <LanguageProvider>
          {children}
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
