"use client";

import Link from "next/link";
import { tourStops } from "@/lib/data";
import DeepLinkMenu from "./DeepLinkMenu";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
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
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-gold-300 sm:text-xl">
              The Sacred Relics Tour
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageToggle />
            <Link
              href="/#schedule"
              className="rounded-md border border-gold-400 px-3 py-1.5 text-xs font-semibold text-gold-300 transition hover:bg-gold-400 hover:text-navy-950 sm:text-sm"
            >
              {t("viewTourSchedule")}
            </Link>
            <DeepLinkMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
