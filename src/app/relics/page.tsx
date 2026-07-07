import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import RelicsArchiveGrid from "@/components/RelicsArchiveGrid";
import Reveal from "@/components/Reveal";
import { relics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Relic Archive | The Sacred Relics Tour",
};

export default function RelicsPage() {
  return (
    <>
      <Header />
      <Breadcrumb current="Relic Archive" />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Sacred Relics Archive
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            Shastars &amp; Artifacts of the Guru&apos;s Legacy
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            The relics carried on this tour are among the most treasured
            physical connections to Sri Guru Hargobind Sahib Ji still in
            existence. Bestowed upon Bhai Roop Chand Ji in recognition of his
            devotion and seva, they have been preserved, protected, and
            quietly passed down within a single family line for more than
            three hundred years — surviving migration, partition, and the
            passage of countless generations.
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            Each item below is presented with the historical context
            recorded and passed down by the custodian family. Descriptions
            are drawn from oral history and family record, and are shared in
            the spirit of preserving and honoring this legacy for the wider
            sangat.
          </p>
        </Reveal>

        <RelicsArchiveGrid relics={relics} />

        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy-950">
            Provenance &amp; Preservation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            The custodian family follows traditional practices of care
            passed down alongside the relics themselves — from the manner of
            storage and transport to the maryada observed whenever the items
            are displayed. Visitors on tour are invited to view these
            artifacts as living pieces of Sikh history, not museum objects,
            and to approach them with the same reverence shown by the family
            across ten generations.
          </p>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
