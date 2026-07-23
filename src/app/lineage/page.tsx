import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlaceholderBox from "@/components/PlaceholderBox";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Lineage & History | The Sacred Relics Tour",
};

export default function LineagePage() {
  return (
    <>
      <Header breadcrumb="Lineage & History" />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Lineage &amp; History
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            Three Centuries of Devotion and Custodianship
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            The story of this family begins not with Bhai Roop Chand Ji
            himself, but with his mother, Bibi Surat Ji, whose faith at her
            own wedding brought a blessing from Sri Guru Hargobind Sahib Ji.
            That blessing became the foundation for a legacy that continues
            today — from a son named by the Guru, to a village founded in
            his honour, to a multi-generational responsibility for the
            safekeeping of sacred relics.
          </p>
        </Reveal>

        <section className="bg-cream-100 py-4">
          <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
            <PlaceholderBox label="[Image Placeholder: Lineage Family Tree / Village Bhai Roopa]" aspect="aspect-[16/7]" />
          </Reveal>
        </section>

        <section className="py-12 sm:py-16">
          <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              A Living Timeline
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-950">
              From Bibi Surat Ji to the Present Day
            </h2>
          </Reveal>
          <AnimatedTimeline />
        </section>
      </main>
      <Footer />
    </>
  );
}
