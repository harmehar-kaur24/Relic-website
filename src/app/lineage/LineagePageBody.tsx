"use client";

import Header from "@/components/Header";
import PlaceholderBox from "@/components/PlaceholderBox";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

/** Client body so the copy follows the language toggle; see RelicsPageBody. */
export default function LineagePageBody() {
  const { t } = useLanguage();

  return (
    <>
      <Header breadcrumb={t("menuLineageHistory")} />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("lineageEyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            {t("lineageHeading")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            {t("lineagePageIntro")}
          </p>
        </Reveal>

        <section className="bg-cream-100 py-4">
          <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
            <PlaceholderBox
              label="[Image Placeholder: Lineage Family Tree / Village Bhai Rupa]"
              aspect="aspect-[16/7]"
            />
          </Reveal>
        </section>

        <section className="py-12 sm:py-16">
          <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t("lineageTimelineEyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-950">
              {t("lineageTimelineHeading")}
            </h2>
          </Reveal>
          <AnimatedTimeline />
        </section>
      </main>
    </>
  );
}
