"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Relic } from "@/lib/data";
import Lightbox from "./Lightbox";
import { useLanguage } from "./LanguageProvider";
import { localizeRelic } from "@/lib/i18n";

export default function RelicsCarousel({ relics }: { relics: Relic[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState<Relic | null>(null);
  const { language } = useLanguage();

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  const handlePrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
  const handleNext = () =>
    scrollToIndex(Math.min(activeIndex + 1, relics.length - 1));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const scrollLeft = track.scrollLeft;
        let closest = 0;
        let closestDistance = Infinity;
        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = index;
          }
        });
        setActiveIndex(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="mt-12">
      <div className="relative">
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {relics.map((relic) => {
            const localized = localizeRelic(relic, language);
            return (
              <div
                key={relic.title}
                className="flex w-[82%] flex-shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm sm:w-[46%] lg:w-[31%]"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(relic)}
                  aria-label={`Expand ${relic.title}`}
                  className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={relic.image}
                    alt={relic.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {localized.category}
                  </span>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-navy-950">
                    {localized.title}
                  </h3>
                  <p className="mt-1 text-base font-medium text-navy-600">
                    {localized.associatedWith}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {relic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous relic"
          className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-navy-100 bg-white p-2 text-navy-800 shadow-md transition hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === relics.length - 1}
          aria-label="Next relic"
          className="absolute right-0 top-1/2 hidden translate-x-4 -translate-y-1/2 rounded-full border border-navy-100 bg-white p-2 text-navy-800 shadow-md transition hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {relics.map((relic, index) => (
          <button
            key={relic.title}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to ${relic.title}`}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "w-6 bg-gold-500" : "w-2 bg-navy-200"
            }`}
          />
        ))}
      </div>

      <Lightbox
        src={expanded?.image ?? null}
        alt={expanded?.title ?? ""}
        onClose={() => setExpanded(null)}
      />
    </div>
  );
}
