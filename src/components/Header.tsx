"use client";

import Link from "next/link";
import { tourStops } from "@/lib/data";
import DeepLinkMenu from "./DeepLinkMenu";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageProvider";

export default function Header({ breadcrumb }: { breadcrumb?: string } = {}) {
  const nextStop = tourStops.find((stop) => stop.status === "next");
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50">
      {nextStop && (
        <div className="bg-gold-500 text-navy-950">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-xs font-semibold sm:text-sm">
            <span className="uppercase tracking-wide">{t("nextTourStop")}</span>
            <span>
              {nextStop.city} &middot; {nextStop.venue} &middot; {nextStop.date}
            </span>
            <Link
              href="/#schedule"
              className="underline decoration-2 underline-offset-2 hover:text-navy-800"
            >
              {t("viewDetails")}
            </Link>
          </div>
        </div>
      )}
      <div className="border-b border-navy-800 bg-navy-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="font-serif text-xl font-semibold leading-tight text-gold-300 sm:text-2xl">
              Baba Bhai Roop Chand Ji Collection Museum
            </span>
          </Link>
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/#schedule"
              className="hidden rounded-md border border-gold-400 px-3 py-1.5 text-xs font-semibold text-gold-300 transition hover:bg-gold-400 hover:text-navy-950 sm:inline-block sm:text-sm"
            >
              {t("viewTourSchedule")}
            </Link>
            <DeepLinkMenu />
          </div>
        </div>
      </div>
      {breadcrumb && (
        <div className="border-b border-navy-900/10 bg-cream-100">
          <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 text-sm sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-medium text-gold-600 transition hover:text-gold-500"
            >
              <span aria-hidden>&larr;</span> {t("navHome")}
            </Link>
            <span className="text-navy-300">/</span>
            <span className="text-navy-500">{breadcrumb}</span>
          </nav>
        </div>
      )}
    </header>
  );
}
