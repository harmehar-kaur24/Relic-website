"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { custodian } from "@/lib/data";

export type TimelineMilestone = {
  era: string;
  title: string;
  imageLabel: string;
  description: string;
};

export const defaultMilestones: TimelineMilestone[] = [
  {
    era: "1613",
    title: "Bibi Surat Ji's Meeting with the Guru",
    imageLabel: "[Photo Placeholder: Village Bhai Roopa / Family Origins]",
    description:
      "At her own wedding, Bibi Surat Ji — daughter of a disciple of Guru Ramdas Ji and Guru Arjan Dev Ji — meets Sri Guru Hargobind Sahib Ji and asks him to bless her husband's household with Sikhi. The Guru blesses her, foretelling the birth of a son who would be honoured by all.",
  },
  {
    era: "c. 1614",
    title: "Birth of Bhai Roop Chand Ji",
    imageLabel: "[Photo Placeholder: Jand Tree Devotion Site]",
    description:
      "A son is born to Bibi Surat Ji, and Sri Guru Hargobind Sahib Ji himself names the child Roop Chand. Years later, the father and son's devotion at a Jand tree earns them the Guru's robe, sword, and horse, kept in trust ever since.",
  },
  {
    era: "Early 1600s",
    title: "The Blessing of Sri Guru Hargobind Sahib Ji",
    imageLabel: "[Photo Placeholder: Kattar Sahib & Shri Sahib of the 6th Guru]",
    description:
      "Bhai Roop Chand Ji's profound devotion earns the blessings of Sri Guru Hargobind Sahib Ji. The Guru bestows sacred shastars (including the revered Kattar Sahib and Shri Sahib) and lays the foundation of village Bhai Roopa, establishing a lineage of spiritual custodianship.",
  },
  {
    era: "1631",
    title: "The Arrows of Sovereignty",
    imageLabel: "[Photo Placeholder: Puratan Teer - Battle of Mehraj Arrows]",
    description:
      "During the decisive Battle of Mehraj fought by Guru Hargobind Sahib Ji against Mughal forces, sacred shastars and Puratan Teer (historical arrows) are utilized and later preserved by the family as symbols of Miri-Piri (temporal and spiritual authority).",
  },
  {
    era: "Late 1600s to 1708",
    title: "Scriptural Heritage of Sri Guru Gobind Singh Ji",
    imageLabel: "[Photo Placeholder: Pothi Sahib of Sri Guru Gobind Singh Ji]",
    description:
      "The lineage's service and dedication continue through the era of the 10th Guru. The family is entrusted with sacred scriptural manuscripts, including the revered Pothi Sahib of Sri Guru Gobind Singh Ji.",
  },
  {
    era: "Early 1700s",
    title: "Hukamnama of Baba Banda Singh Bahadur",
    imageLabel: "[Photo Placeholder: Authentic Hukamnama Sahib]",
    description:
      "As Sikh sovereignty establishes itself across the Punjab, legendary general Baba Banda Singh Bahadur issues official Hukamnamas (edicts) recognizing the vital contributions and standing of the sangat and this prominent lineage.",
  },
  {
    era: "Early 1800s",
    title: "Royal Decree from Maharaja Ranjit Singh Ji",
    imageLabel: "[Photo Placeholder: Original Farman of Maharaja Ranjit Singh Ji]",
    description:
      "During the height of the Sikh Empire, the Lion of the Punjab, Maharaja Ranjit Singh Ji, issues an official royal decree (Farman) acknowledging the historical reverence and custodianship of Bhai Roop Chand Ji's descendants.",
  },
  {
    era: "Present Day",
    title: "Sharing the Legacy with the Global Sangat",
    imageLabel: `[Photo Placeholder: ${custodian.name} with Sacred Shastars]`,
    description: `Today, ${custodian.name}, of the family of Bhai Balvir Singh Ji — the 14th-generation descendants of Bhai Roop Chand Ji from village Bhai Roopa — carries this 300-year-old responsibility forward, traveling internationally with these preserved relics so the global community can experience darshan and connect with their Puratan Virsa (ancient heritage).`,
  },
];

function TimelineCard({
  milestone,
  index,
}: {
  milestone: TimelineMilestone;
  index: number;
}) {
  const isRight = index % 2 === 1;

  return (
    <div className="relative">
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-6 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-cream-50 bg-gold-500 shadow-[0_0_0_5px_rgba(201,162,39,0.2)] sm:left-1/2"
      />

      <div
        className={`pl-14 sm:flex sm:pl-0 ${
          isRight ? "sm:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isRight ? 48 : -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-xl sm:w-[calc(50%-2.5rem)] sm:p-6"
        >
          <span className="inline-block rounded-full bg-gold-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-navy-950">
            {milestone.era}
          </span>

          <div className="mt-4 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-navy-700/25 bg-gradient-to-br from-cream-100 via-white to-navy-100 p-4 text-center text-xs font-medium text-navy-600">
            {milestone.imageLabel}
          </div>

          <h3 className="mt-4 font-serif text-xl font-semibold text-navy-950">
            {milestone.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-700">
            {milestone.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function AnimatedTimeline({
  milestones = defaultMilestones,
}: {
  milestones?: TimelineMilestone[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl px-4 py-4 sm:px-6">
      <div className="absolute left-6 top-0 h-full w-px bg-navy-100 sm:left-1/2 sm:-translate-x-1/2" />
      <motion.div
        className="absolute left-6 top-0 w-px origin-top bg-gradient-to-b from-gold-400 to-gold-600 sm:left-1/2 sm:-translate-x-1/2"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <TimelineCard key={milestone.title} milestone={milestone} index={index} />
        ))}
      </div>
    </div>
  );
}
