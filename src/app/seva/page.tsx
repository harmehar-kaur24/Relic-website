"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";

const sevaAreas = [
  {
    title: "Hospitality & Langar",
    description:
      "Help welcome visitors and coordinate langar or refreshments during exhibition hours.",
  },
  {
    title: "Setup & Logistics",
    description:
      "Assist with the careful setup, staffing, and breakdown of the exhibition space at each stop.",
  },
  {
    title: "Guided Storytelling",
    description:
      "Share the history of the relics and the lineage with visitors as a volunteer docent.",
  },
  {
    title: "Local Outreach",
    description:
      "Help spread the word in your local sangat and community ahead of a tour stop near you.",
  },
];

export default function SevaPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <Breadcrumb current="Volunteer / Seva" />
      <main className="flex-1">
        <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Volunteer &amp; Seva
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-950">
            Support the Tour Through Seva
          </h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">
            The tour relies on the generosity of local volunteers at every
            stop. Whether for an afternoon or across the full run of a
            visit, your seva helps make it possible for the sangat to
            experience this legacy safely and respectfully.
          </p>
        </Reveal>

        <section className="bg-cream-100 py-10">
          <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
            {sevaAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-950">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy-950">
            Sign Up to Volunteer
          </h2>

          {submitted ? (
            <div className="mt-6 rounded-md border border-gold-400/60 bg-gold-500/10 p-5 text-sm font-medium text-navy-800">
              Thank you for offering your seva. The local coordinator will
              reach out with details.
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800">
                    Area of Interest
                  </label>
                  <select className="mt-1 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500">
                    {sevaAreas.map((area) => (
                      <option key={area.title}>{area.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-cream-100 transition hover:bg-navy-800"
              >
                Sign Up
              </button>
            </form>
          )}
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
