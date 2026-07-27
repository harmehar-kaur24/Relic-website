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
                  src="/custodian.png"
                  alt={custodian.name}
                  className="aspect-[4/5] w-full object-cover object-top"
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
                shastars, scriptures, and edicts entrusted to Bhai Roop Chand
                Ji by Sri Guru Hargobind Sahib Ji. Raised in the seva of
                village Bhai Roopa alongside the family of Bhai Balvir Singh
                Ji, he now travels with these relics so sangats far from
                Punjab can experience their darshan firsthand.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-700">
                Beyond the tour, {custodian.name}{" "}
                shares glimpses of the family&apos;s Puratan Virsa (ancient
                heritage), tour updates, and Gurbani reflections with the
                wider sangat online.
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
                Scan any of the codes below on the road, or use the links
                above from home.
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
