"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { custodian } from "@/lib/data";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-navy-700/20 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/custodian.jpg"
                alt={custodian.name}
                className="block h-auto w-full"
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
              {t("contactBody")}
            </p>

            {/*
              Direct WhatsApp and email links rather than a form. The site is
              statically hosted with no backend, so a form could not actually
              deliver anything — the previous one silently discarded every
              message. WhatsApp is also how most of the sangat will get in touch.
            */}
            <div className="mt-6 space-y-3">
              <a
                href={`https://wa.me/${custodian.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-5 w-5 flex-shrink-0"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.132-.132.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
                {t("contactWhatsApp")}
                <span className="ml-auto font-normal opacity-90">
                  {custodian.whatsappDisplay}
                </span>
              </a>

              <a
                href={`mailto:${custodian.email}`}
                className="flex items-center gap-3 rounded-md border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:border-gold-500 hover:text-gold-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="M3 6l9 7 9-7" strokeLinecap="round" />
                </svg>
                {t("contactEmail")}
                <span className="ml-auto break-all font-normal text-navy-500">
                  {custodian.email}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
