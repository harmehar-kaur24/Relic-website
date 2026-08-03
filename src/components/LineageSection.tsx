"use client";

import Link from "next/link";
import PlaceholderBox from "./PlaceholderBox";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function LineageSection() {
  const { t } = useLanguage();

  return (
    <section id="lineage" className="bg-navy-900 py-16 text-cream-100 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <PlaceholderBox
              label="[Image Placeholder: Village Bhai Rupa / Historical Lineage Map]"
              aspect="aspect-[4/3]"
              dark
            />
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t("lineageEyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {t("lineageHeading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/80">
              {t("lineageBody")}
            </p>
            <div className="mt-8">
              <Link
                href="/lineage"
                className="inline-block rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 sm:text-base"
              >
                {t("lineageCta")}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
