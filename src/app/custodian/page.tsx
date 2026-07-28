import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { custodian } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Custodian | Baba Bhai Roop Chand Ji Collection Museum",
};

export default function CustodianPage() {
  return (
    <>
      <Header breadcrumb="The Custodian" />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
            <Reveal direction="left">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-navy-700/20 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/custodian.jpg"
                  alt={custodian.name}
                  className="block h-auto w-full"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
                The Touring Custodian
              </p>
              <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
                {custodian.name}
              </h1>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-gold-600">
                {custodian.lineageNote}
              </p>
              <p className="mt-5 text-base leading-relaxed text-navy-700">
                {custodian.name} carries forward a responsibility passed down
                across more than three hundred years — the safekeeping of the
                shastars, scriptures, and edicts entrusted to Bhai Roop Chand Ji
                by Sri Guru Hargobind Sahib Ji. Raised in the seva of village
                Bhai Roopa alongside the family of Bhai Balvir Singh Ji, he now
                travels with these relics so sangats far from Punjab can
                experience their darshan firsthand.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-700">
                Beyond the tour, {custodian.name} shares glimpses of the
                family&apos;s Puratan Virsa (ancient heritage), tour updates,
                and Gurbani reflections with the wider sangat online.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={custodian.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400"
                >
                  Follow on Instagram
                </a>
                <a
                  href={custodian.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-800 transition hover:border-gold-500 hover:text-gold-600"
                >
                  Watch on YouTube
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-navy-900 py-14 text-cream-100">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                Connect &amp; Support
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold">
                Scan to Follow or Support the Tour
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-100/75">
                Scan any of the codes below on the road, or use the links above
                from home.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <div className="flex flex-col items-center rounded-xl bg-navy-950/40 p-6 text-center ring-1 ring-gold-400/20">
                  <div className="w-40 overflow-hidden rounded-lg bg-white p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/qr-instagram.png"
                      alt="QR code to follow on Instagram"
                      className="aspect-square w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 font-serif text-lg font-semibold">
                    Instagram
                  </p>
                  <p className="mt-1 text-sm text-cream-100/70">
                    @bhai_jaskaran_singh_g_official
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-col items-center rounded-xl bg-navy-950/40 p-6 text-center ring-1 ring-gold-400/20">
                  <div className="w-40 overflow-hidden rounded-lg bg-white p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/qr-phonepe.png"
                      alt="QR code to support via PhonePe"
                      className="aspect-square w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 font-serif text-lg font-semibold">
                    PhonePe / UPI
                  </p>
                  <p className="mt-1 text-sm text-cream-100/70">
                    Support the tour&apos;s seva and travel
                  </p>
                </div>
              </Reveal>
            </div>

            {/*
              Direct contact alongside the codes, for anyone not scanning.
              Deliberately NOT wrapped in <Reveal>: these are the only ways to
              reach the custodian, and a stalled entrance animation must never
              be able to dim or hide them.
            */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href={`https://wa.me/${custodian.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366] px-5 py-4 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-5 w-5 flex-shrink-0"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.132-.132.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
                <span>
                  WhatsApp
                  <span className="block font-normal opacity-90">
                    {custodian.whatsappDisplay}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${custodian.email}`}
                className="flex items-center gap-3 rounded-xl border border-gold-400/30 bg-navy-950/40 px-5 py-4 text-sm font-semibold text-cream-100 transition hover:border-gold-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-5 w-5 flex-shrink-0 text-gold-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="M3 6l9 7 9-7" strokeLinecap="round" />
                </svg>
                <span className="min-w-0">
                  Email
                  <span className="block break-all font-normal text-cream-100/70">
                    {custodian.email}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
