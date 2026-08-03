"use client";

import Header from "@/components/Header";
import PlaceholderBox from "@/components/PlaceholderBox";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { tourStops } from "@/lib/data";

/** Client body so the copy follows the language toggle; see RelicsPageBody. */
export default function SchedulePageBody() {
  const { t } = useLanguage();
  return (
    <>
      <Header breadcrumb={t("menuTourSchedule")} />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("scheduleEyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            {t("schedulePageHeading")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            {tourStops.length === 0
              ? t("schedulePageIntroEmpty")
              : t("schedulePageIntroFull")}
          </p>
        </Reveal>

        {tourStops.length > 0 && (
          <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
            <PlaceholderBox
              label="[Map Placeholder: Interactive Tour Route Map]"
              aspect="aspect-[16/7]"
            />
          </Reveal>
        )}

        <section
          className={
            tourStops.length === 0
              ? "hidden"
              : "mx-auto max-w-4xl px-4 py-12 sm:px-6"
          }
        >
          <h2 className="font-serif text-2xl font-semibold text-navy-950">
            {t("scheduleFullHeading")}
          </h2>
          <div className="mt-6 divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
            {tourStops.map((stop, index) => (
              <Reveal key={stop.city} delay={index * 0.06}>
                <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-semibold text-navy-950">
                        {stop.city}
                      </h3>
                      {stop.status === "next" && (
                        <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-xs font-semibold text-navy-950">
                          {t("nextStopBadge")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-navy-600">
                      {stop.venue} &middot; {stop.region}
                    </p>
                  </div>
                  <div className="text-sm text-navy-700 sm:text-right">
                    <p className="font-medium">{stop.date}</p>
                    <p className="text-navy-500">{stop.timings}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-gold-500/10 py-12">
          <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold text-navy-950">
              {t("maryadaHeading")}
            </h2>
            <p className="mt-3 text-sm text-navy-700">{t("maryadaIntro")}</p>
            <ul className="mt-5 space-y-3 text-sm text-navy-800">
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                {t("maryadaFull1")}
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                {t("maryadaFull2")}
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                {t("maryadaFull3")}
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                {t("maryadaFull4")}
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                {t("maryadaFull5")}
              </li>
            </ul>
          </Reveal>
        </section>
      </main>
    </>
  );
}
