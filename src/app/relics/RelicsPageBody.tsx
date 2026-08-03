"use client";

import RelicsArchiveGrid from "@/components/RelicsArchiveGrid";
import Reveal from "@/components/Reveal";
import Header from "@/components/Header";
import { useLanguage } from "@/components/LanguageProvider";
import { relics } from "@/lib/data";

/**
 * The page body lives in a client component so its copy can follow the
 * language toggle; page.tsx stays a server component so it can still export
 * `metadata`, which a client component is not allowed to do.
 */
export default function RelicsPageBody() {
  const { t } = useLanguage();

  return (
    <>
      <Header breadcrumb={t("menuRelicArchive")} />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("relicsEyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            {t("relicsHeading")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            {t("relicsPageIntro1")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            {t("relicsPageIntro2")}
          </p>
        </Reveal>

        <RelicsArchiveGrid relics={relics} />

        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy-950">
            {t("relicsProvenanceHeading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            {t("relicsProvenanceBody")}
          </p>
        </Reveal>
      </main>
    </>
  );
}
