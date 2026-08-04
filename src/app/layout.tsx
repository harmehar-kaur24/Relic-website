import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Gurmukhi } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import BackToTop from "@/components/BackToTop";
import ImageLightbox from "@/components/ImageLightbox";
// EXPERIMENTAL: temporary palette picker. Remove this import and the
// <ThemeSwitcher /> below to drop it.

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

/*
 * Gurmukhi has to ship with the site. Inter and Playfair contain no Gurmukhi
 * glyphs, so Punjabi text was falling back to whatever the visitor happened to
 * have installed — fine on macOS, but empty boxes ("tofu") on any device
 * without a Gurmukhi font, which would make the entire Punjabi translation
 * unreadable. Loading it explicitly removes that dependency.
 */
const gurmukhi = Noto_Sans_Gurmukhi({
  variable: "--font-gurmukhi",
  subsets: ["gurmukhi"],
  display: "swap",
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
      data-theme="kesri"
      className={`${inter.variable} ${playfair.variable} ${gurmukhi.variable} h-full antialiased`}
    >
      <head>
        <script
          // Runs before paint so a stored light preference doesn't flash dark
          // first. Kept inline and tiny for that reason.
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=localStorage.getItem('theme');if(m==='puratan')document.documentElement.setAttribute('data-theme','puratan')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream-50 text-navy-950">
        <LanguageProvider>
          {children}
          <BackToTop />
          <ImageLightbox />
        </LanguageProvider>
      </body>
    </html>
  );
}
