"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden bg-navy-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <p className="font-serif text-2xl text-gold-300 sm:text-3xl" lang="pa">
              ਨਿਸ਼ਾਨੀਆਂ ਦੀ ਸੇਵਾ ਸੰਭਾਲ
            </p>
            {/*
              Tighter tracking than the other eyebrows on purpose: those sit at
              text-sm where 0.2em reads as a small-caps label, but this one is
              text-lg/xl and the same spacing pulled the words too far apart.
            */}
            <p className="mt-4 text-lg font-semibold uppercase tracking-[0.08em] text-gold-400 sm:text-xl">
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-cream-100 sm:text-4xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
              {t("heroBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#schedule"
                className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 sm:text-base"
              >
                {t("heroCtaSchedule")}
              </a>
              <a
                href="#relics"
                className="rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:border-gold-400 hover:text-gold-300 sm:text-base"
              >
                {t("heroCtaRelics")}
              </a>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <figure className="mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-xl border border-gold-400/30 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-guru.jpg"
                  alt={t("heroImageAlt")}
                  className="block h-auto w-full"
                />
              </div>
              <figcaption
                className="mt-4 text-center text-sm italic leading-relaxed text-cream-100/70"
                lang={language}
              >
                {t("heroCaption")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
