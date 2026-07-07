"use client";

import Link from "next/link";
import RelicsCarousel from "./RelicsCarousel";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { relics } from "@/lib/data";

export default function RelicsSection() {
  const { t } = useLanguage();

  return (
    <section id="relics" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("relicsEyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-950 sm:text-4xl">
            {t("relicsHeading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            {t("relicsIntro")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <RelicsCarousel relics={relics} />
        </Reveal>

        <Reveal delay={0.15} className="mt-12 text-center">
          <Link
            href="/relics"
            className="inline-block rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:bg-navy-800 sm:text-base"
          >
            {t("relicsCta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
