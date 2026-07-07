"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { relicCategories, type Relic, type RelicCategory } from "@/lib/data";
import Lightbox from "./Lightbox";
import { useLanguage } from "./LanguageProvider";
import { localizeRelic } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

const FILTERS: Array<RelicCategory | "All"> = ["All", ...relicCategories];

const FILTER_KEYS: Record<RelicCategory | "All", TranslationKey> = {
  All: "categoryAll",
  Shastars: "categoryShastars",
  Scriptures: "categoryScriptures",
  "Royal Edicts": "categoryRoyalEdicts",
  Artwork: "categoryArtwork",
};

export default function RelicsArchiveGrid({ relics }: { relics: Relic[] }) {
  const [activeFilter, setActiveFilter] = useState<RelicCategory | "All">(
    "All"
  );
  const [expanded, setExpanded] = useState<Relic | null>(null);
  const { language, t } = useLanguage();

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? relics
        : relics.filter((relic) => relic.category === activeFilter),
    [relics, activeFilter]
  );

  return (
    <section className="bg-navy-900 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                activeFilter === filter
                  ? "border-gold-500 bg-gold-500 text-navy-950"
                  : "border-cream-100/20 text-cream-100/80 hover:border-gold-400 hover:text-gold-300"
              }`}
            >
              {t(FILTER_KEYS[filter])}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((relic, index) => {
              const localized = localizeRelic(relic, language);
              return (
                <motion.div
                  key={relic.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                  className="flex flex-col overflow-hidden rounded-xl bg-navy-950/40 ring-1 ring-gold-400/20"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(relic)}
                    aria-label={`Expand ${relic.title}`}
                    className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-navy-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={relic.image}
                      alt={relic.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                      {localized.category}
                    </span>
                    <h2 className="mt-1 font-serif text-lg font-semibold text-cream-100">
                      {localized.title}
                    </h2>
                    <p className="mt-1 text-base font-medium text-cream-100/80">
                      {localized.associatedWith}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-cream-100/75">
                      {relic.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-cream-100/60">
              No relics found in this category.
            </p>
          )}
        </div>
      </div>

      <Lightbox
        src={expanded?.image ?? null}
        alt={expanded?.title ?? ""}
        onClose={() => setExpanded(null)}
      />
    </section>
  );
}
