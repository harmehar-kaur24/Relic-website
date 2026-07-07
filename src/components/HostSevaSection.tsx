"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function HostSevaSection() {
  const { t } = useLanguage();

  return (
    <section id="host-seva" className="bg-navy-900 py-16 text-cream-100 sm:py-24">
      <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
          {t("hostSevaEyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
          {t("hostSevaHeading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream-100/80">
          {t("hostSevaBody")}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/host"
            className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 sm:text-base"
          >
            {t("hostSevaCtaHost")}
          </Link>
          <Link
            href="/seva"
            className="rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:border-gold-400 hover:text-gold-300 sm:text-base"
          >
            {t("hostSevaCtaSeva")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
