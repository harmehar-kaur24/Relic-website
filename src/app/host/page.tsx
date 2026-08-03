"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export default function HostPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Header breadcrumb={t("menuHostVisit")} />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            {t("menuHostVisit")}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            {t("hostPageHeading")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            {t("hostPageBody")}
          </p>

          {submitted ? (
            <div className="mt-8 rounded-md border border-gold-400/60 bg-gold-500/10 p-5 text-sm font-medium text-navy-800">
              {t("hostThanks")}
            </div>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    {t("fieldOrganisation")}
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    {t("fieldContactName")}
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
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-800">
                  {t("fieldPreferredDates")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:bg-navy-800"
              >
                {t("hostSubmit")}
              </button>
            </form>
          )}
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
