"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

/** Keys only — the copy itself lives in i18n so it follows the toggle. */
const SEVA_AREAS = [
  { title: "sevaArea1Title", body: "sevaArea1Body" },
  { title: "sevaArea2Title", body: "sevaArea2Body" },
  { title: "sevaArea3Title", body: "sevaArea3Body" },
  { title: "sevaArea4Title", body: "sevaArea4Body" },
] as const;

export default function SevaPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Header breadcrumb={t("menuVolunteerSeva")} />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("sevaEyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            {t("sevaHeading")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            {t("sevaBody")}
          </p>
        </Reveal>

        <section className="bg-cream-100 py-10">
          <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
            {SEVA_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={index * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-950">
                    {t(area.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {t(area.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy-950">
            {t("sevaSignUp")}
          </h2>

          {submitted ? (
            <div className="mt-6 rounded-md border border-gold-400/60 bg-gold-500/10 p-5 text-sm font-medium text-navy-800">
              {t("sevaThanks")}
            </div>
          ) : (
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    {t("fieldFullName")}
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    {t("fieldEmail")}
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    {t("fieldCityState")}
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    {t("fieldAreaOfInterest")}
                  </label>
                  <select className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500">
                    {SEVA_AREAS.map((area) => (
                      <option key={area.title}>{t(area.title)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:bg-navy-800"
              >
                {t("sevaSubmit")}
              </button>
            </form>
          )}
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
