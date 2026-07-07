"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { custodian } from "@/lib/data";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-navy-700/20 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/custodian.png"
                alt={custodian.name}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="mx-auto mt-6 max-w-sm text-center lg:text-left">
              <p className="font-serif text-lg font-semibold text-navy-950">
                {custodian.name}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-600">
                {custodian.lineageNote}
              </p>
              <div className="mt-5 flex justify-center lg:justify-start">
                <Link
                  href="/custodian"
                  className="text-sm font-semibold text-gold-600 transition hover:text-gold-500 hover:underline"
                >
                  {t("contactCtaCustodian")} &rarr;
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t("contactEyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-950 sm:text-4xl">
              {t("contactHeading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-700">
              Have a question, an invitation, or a message of support? Reach
              out below and we will respond as soon as possible during the
              tour.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-md border border-gold-400/60 bg-gold-500/10 p-4 text-sm font-medium text-navy-800">
                Thank you for your message. We will be in touch soon.
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-navy-800"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-navy-800"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:bg-navy-800"
                >
                  Send Message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
