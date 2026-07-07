"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { tourStops } from "@/lib/data";

export default function ScheduleSection() {
  const upcoming = tourStops.slice(0, 3);
  const { t } = useLanguage();

  return (
    <section id="schedule" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("scheduleEyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-950 sm:text-4xl">
            {t("scheduleHeading")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {upcoming.map((stop, index) => (
            <Reveal key={stop.city} delay={index * 0.1}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                {stop.status === "next" && (
                  <span className="mb-3 inline-block rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950">
                    {t("nextStopBadge")}
                  </span>
                )}
                <h3 className="font-serif text-xl font-semibold text-navy-950">
                  {stop.city}
                </h3>
                <p className="mt-1 text-sm text-navy-600">{stop.venue}</p>
                <p className="mt-3 text-sm font-medium text-navy-800">
                  {stop.date}
                </p>
                <p className="text-sm text-navy-500">{stop.timings}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 rounded-xl border-2 border-gold-400/50 bg-gold-500/10 p-6 sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-navy-950">
            {t("maryadaHeading")}
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-navy-700 sm:grid-cols-3">
            <li>&bull; {t("maryadaHead")}</li>
            <li>&bull; {t("maryadaShoes")}</li>
            <li>&bull; {t("maryadaPhoto")}</li>
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/schedule"
            className="inline-block rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:bg-navy-800 sm:text-base"
          >
            {t("scheduleCta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
