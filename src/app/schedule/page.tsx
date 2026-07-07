import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PlaceholderBox from "@/components/PlaceholderBox";
import Reveal from "@/components/Reveal";
import { tourStops } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tour Dates & Visitor Guide | The Sacred Relics Tour",
};

export default function SchedulePage() {
  return (
    <>
      <Header />
      <Breadcrumb current="Tour Dates & Visitor Guide" />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Tour Dates, Map &amp; Maryada
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            All Tour Dates &amp; Visitor Guide
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            Below is the full, current schedule of the tour. Stops are added
            regularly as new sangats and institutions come forward to host —
            check back for updates or reach out to request a visit.
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
          <PlaceholderBox
            label="[Map Placeholder: Interactive Tour Route Map]"
            aspect="aspect-[16/7]"
          />
        </Reveal>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy-950">
            Full Schedule
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
                          Next Stop
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
              Visitor Etiquette (Maryada)
            </h2>
            <p className="mt-3 text-sm text-navy-700">
              Out of respect for the sacred nature of these relics, all
              visitors are kindly asked to observe the following:
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-800">
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                Cover your head before entering the exhibition area.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                Remove shoes before entering, as per gurdwara maryada.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                Photography and video are permitted only in designated
                areas; flash photography is not permitted near the relics.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                Please maintain a respectful silence while viewing the
                relics, and follow the guidance of volunteers on site.
              </li>
              <li className="flex gap-2">
                <span className="text-gold-600">&bull;</span>
                Food, drink, and tobacco products are not permitted within
                the exhibition space.
              </li>
            </ul>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
