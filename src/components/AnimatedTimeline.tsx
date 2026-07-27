"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { custodian } from "@/lib/data";

export type TimelineMilestone = {
  era: string;
  title: string;
  imageLabel: string;
  description: string;
  /**
   * Shown as an explicit caveat when the source account gives no firm date,
   * or gives a range. Preferred over silently inventing a year.
   */
  dateNote?: string;
  /** The text this account is drawn from, where the source names one. */
  source?: string;
  /** Real photo, when one exists for this milestone. Falls back to imageLabel. */
  image?: string;
};

export const defaultMilestones: TimelineMilestone[] = [
  {
    era: "Era of Sri Guru Ramdas Ji",
    dateNote: "The source names no year for this.",
    title: "Baba Aakal Ji of Wadda Ghar Receives Sikhi",
    imageLabel: "[Photo Placeholder: Village Wadda Ghar, Moga]",
    description:
      "Wadda Ghar is a well-known village of district and tehsil Moga in Punjab, roughly 20 kilometres to the south-west of Moga town, and seven miles south-west of Dagru railway station. Baba Aakal Ji, a devoted lover of the Guru's house, was a resident of Wadda Ghar. Giani Kartar Singh Kalaswalia records that Baba Aakal Ji received the gift of Sikhi from Sri Guru Ramdas Ji, and that he had made his own home a centre of Sikhi.",
    source: "Giani Kartar Singh Kalaswalia, Sri Khadgosh Prakash",
  },
  {
    era: "Before Bibi Surti Ji's birth",
    dateNote: "The source gives no date for this.",
    title: "The Aakal-Waari and the Naming of Wadda Ghar",
    imageLabel: "[Photo Placeholder: Aakal-Waari site]",
    description:
      "Baba Aakal Ji had enclosed a very large yard outside the village, in which he kept a great many cows. He would gather their milk and find his joy in serving it to those in need. People commonly called this enclosure the 'Aakal-Waari'. Scholars hold that it is this same 'Aakal-Waari' whose name changed and became known as Wadda Ghar — the Great House. Some scholars hold instead that wandering saints and faqirs who came from outside, moved by Bhai Aakal Ji's spirit of seva, began calling the Aakal-Waari a 'Wadda Ghar'.",
  },
  {
    era: "Bikrami 1651–59 (c. 1594–1602 CE)",
    dateNote:
      "The source gives a range of years rather than a single date, and states it in the Bikrami calendar; the CE equivalent is approximate.",
    title: "The Birth of Bibi Surti Ji",
    imageLabel: "[Photo Placeholder: Wadda Ghar]",
    description:
      "A daughter was born in the home of Baba Aakal Ji, and Baba Ji gave her the name 'Surti'. Bhai Santokh Singh records the birth in Sri Gur Pratap Suraj Granth, noting that Baba Ji's own mind found its rest in Gurmat.",
    source: "Bhai Santokh Singh, Sri Gur Pratap Suraj Granth",
  },
  {
    era: "Era of Sri Guru Arjan Dev Ji",
    dateNote: "No specific years are given.",
    title: "Continuing Seva under Sri Guru Arjan Dev Ji",
    imageLabel: "[Photo Placeholder: Sri Harmandir Sahib]",
    description:
      "After Sri Guru Ramdas Ji, Baba Aakal Ji remained present in the seva of Sri Guru Arjan Dev Ji. From the earnings of his own honest labour he would carry offerings to the Guru with devotion, and receive the joys of the Guru's house.",
  },
  {
    era: "Her early years",
    dateNote: "No dates are given for this period.",
    title: "Bibi Surti Ji Becomes a Full Nitnemi",
    imageLabel: "[Photo Placeholder: Gurbani manuscript]",
    description:
      "That the household's atmosphere would shape the child's life was only natural. Bibi Surti Ji became a complete nitnemi, keeping the daily discipline of prayer. She had absorbed Gurmat thoroughly. She practised Gurbani at all times and kept striving to stay joined to the teachings of the Guru Sahibaan. Through that practice the values of Gurmat became firmly settled in her life, and she remained engaged in seva alongside her family according to Gurmat.",
  },
  {
    era: "Era of Sri Guru Hargobind Sahib Ji",
    dateNote: "The source names no year for this visit.",
    title: "Sri Guru Hargobind Sahib Ji Comes to Wadda Ghar",
    imageLabel: "[Photo Placeholder: Gurdwara Manji Sahib Patshahi Chhevin]",
    description:
      "Sri Guru Hargobind Sahib Ji set out from the village of Darauli, mounted on horseback together with his forces, and blessed the land of Wadda Ghar. The Guru stayed five days in this village and then went on into the Malwa region to preach Sikhi. The village chaudhary Rai Bhagmall and Baba Aakal Ji, together with the sangat, performed a great deal of seva for the Guru. In memory of the Guru's coming, Gurdwara Manji Sahib Patshahi Chhevin stands adorned there; the present handsome building of the Gurdwara Sahib was raised in 1927 CE.",
  },
  {
    era: "Before her wedding",
    dateNote: "No date is given.",
    title: "A Betrothal into a Sakhi Sarwar Household",
    imageLabel: "[Photo Placeholder: Village Tuklani]",
    description:
      "Judging his daughter to be of an age to marry, Baba Aakal Ji asked the family purohit to search out a match. The purohit settled the betrothal for Bibi Surti Ji with Bhai Sadhu Ji, grandson of Baba Sada and a resident of Tuklani. Baba Sada's family were followers of Sultan Sakhi Sarwar — a Muslim pir revered by both Hindus and Muslims, and known among his devotees by a great many names, each arising from some particular attribute.",
  },
  {
    era: "Before her wedding",
    dateNote: "No date is given.",
    title: "A Father's Concern, and His Counsel",
    imageLabel: "[Photo Placeholder: Sri Gur Pratap Suraj Granth]",
    description:
      "When Baba Aakal Ji learned that Bibi Surti's prospective in-laws were Sakhi Sarwarias, great anxiety entered his mind. He began to think about his daughter's future, and to make ardas before Akal Purakh for the firmness of his child's Sikhi. Bhai Santokh Singh records the counsel he gave her: that her in-laws' house is Sultani, that she must never accept it, and that she must hold to the Satguru with her mind fixed upon him. Giani Kartar Singh Kalaswalia records the same counsel — do everything together with them, but never let Sarwari worship make you forget Sikhi; keep the Satguru in your mind, and do not forget Gurbani.",
    source:
      "Bhai Santokh Singh, Sri Gur Pratap Suraj Granth; Giani Kartar Singh Kalaswalia, Sri Khadgosh Prakash",
  },
  {
    era: "On the appointed date",
    dateNote: "The source says only 'the appointed date'.",
    title: "The Wedding and the Doli's Departure",
    imageLabel: "[Photo Placeholder: Wadda Ghar to Tuklani route]",
    description:
      "On the appointed date, Bibi Surti Ji was married to Bhai Sadhu Ji, a resident of Tuklani. After the wedding, Bibi Surti Ji was seated in a doli and sent on her way from Wadda Ghar towards Tuklani.",
  },
  {
    era: "On the journey to Tuklani",
    title: "The Sound of Kirtan at Darauli",
    imageLabel: "[Photo Placeholder: Darauli Bhai Ki]",
    description:
      "As she travelled and the doli drew near the village of Darauli, the sweet sound of kirtan fell upon Bibi Surti Ji's ears. When she asked the kahaars — the palanquin bearers — to find out about it, it emerged that Sri Guru Hargobind Sahib Ji had come to Darauli to his brother-in-law Bhai Sain Das Ji, and had a diwan seated there; the melodious sound of kirtan was coming from that very place. Hearing it, Bibi Surti Ji's mind became joined to the Guru's feet.",
  },
  {
    era: "On the journey to Tuklani",
    title: "Her Bracelets Given for a Glimpse of the Guru",
    imageLabel: "[Photo Placeholder: Kangan]",
    description:
      "The wedding party had already gone on ahead, and the kahaars were carrying the doli forward slowly. Suddenly the thought came into Bibi Surti Ji's mind that once she reached her in-laws' home her whole life would have to pass among Sakhi Sarwarias — so why not take darshan of the Guru on the way. She asked the kahaars to stop the doli and requested them to take her for the Guru's darshan, but they would not agree. When she saw that they would not consent, she took off her own kangan and gave them to the kahaars; tempted, the kahaars agreed to carry her into the Guru's darbar.",
    source: "Giani Gian Singh, Itihaas Riyasat Bagarian",
  },
  {
    era: "At Darauli",
    title: "Darshan in the Guru's Diwan",
    imageLabel: "[Photo Placeholder: Gur Bilas Patshahi 6]",
    description:
      "Bibi Surti Ji stepped down from the doli and reached the place where Sri Guru Hargobind Sahib Ji's diwan was seated. Going into the diwan she bowed to the Guru and sat down close by. After the bhog of Asa Ki Var, the Guru asked Bhai Bipi Chand Ji about the newly-married girl seated in the diwan. Bhai Bipi Chand Ji told him that she was the daughter of Bhai Aakal Ji, an utterly devoted servant of the Guru's house — herself a devotee of the Guru's house and firmly settled in Gurmat. Still in her bridal clothes, Bibi Surti Ji came before the Guru, offered him the sweets she was carrying from her parents' home, and did matha tek. When the Guru asked, she told the whole account: that she was firmly settled in Gurmat, but that her in-laws' family were devotees of Sakhi Sarwar.",
    source: "Gur Bilas Patshahi 6",
  },
  {
    era: "At Darauli",
    title: "The Guru's Blessing",
    imageLabel: "[Photo Placeholder: Sri Gur Pratap Suraj Granth]",
    description:
      "Giving Bibi Surti Ji his blessing, the Guru praised her firmness in Gurmat. Bhai Santokh Singh records the Guru's words: that a new writ would now be written in her name; that her father was a Sikh, and by that she too would cross over; that she should fulfil her duties in her in-laws' home; that the gift of Sikhi was given to her by him; that many Sikh sons would be hers; and that her husband too would become a good Sikh and walk the path of Gursikhi.",
    source: "Bhai Santokh Singh, Sri Gur Pratap Suraj Granth",
  },
  {
    era: "At Darauli",
    title: "A Drawn Sword, and a Life Changed",
    imageLabel: "[Photo Placeholder: Darauli darbar site]",
    description:
      "When Bibi Surti Ji's doli did not rejoin the wedding party for a long while, her father-in-law Sada Ji and her husband Bhai Sadhu Ji came searching and arrived at the Guru's darbar. Both father and son were greatly troubled, fearing that so grave a disobedience would bring Sakhi Sarwar's wrath upon them, and Sada Ji instructed his son to bring his wife and reason with her. Bhai Sadhu Ji reached the darbar and saw Bibi Surti Ji seated at the Guru's feet, receiving his blessing. Anger took hold of him and he drew his sword from its scabbard to strike her down. But when Bhai Sadhu Ji's eyes met those of Sri Guru Hargobind Sahib Ji, he became calm in an instant. He let the scabbard fall, took hold of the Guru's lotus feet, and began to repent his error, pleading to receive the gift of Sikhi. The Guru bestowed the gift of Sikhi upon Bhai Sadhu Ji and made him a Sikh.",
    source:
      "Bhai Santokh Singh, Sri Gur Pratap Suraj Granth; Giani Gian Singh, Itihaas Riyasat Bagarian; Gur Bilas Patshahi 6",
  },
  {
    era: "That same night, at Tuklani",
    title: "The Shrine at Tuklani Pulled Down",
    imageLabel: "[Photo Placeholder: Village Tuklani]",
    description:
      "When Bhai Sadhu Ji reached the village of Tuklani with his wife, that very night he pulled down the shrine of Sakhi Sarwar. Giani Kartar Singh Kalaswalia records that deep in the night, when everything had fallen silent, he rose, watching for his moment, left the house without a word with a spade upon his shoulder, and pulled it down.",
    source: "Giani Kartar Singh Kalaswalia, Sri Khadgosh Prakash",
  },
  {
    era: "Era of Sri Guru Hargobind Sahib Ji",
    dateNote: "The source gives no year of birth.",
    title: "The Birth and Naming of Bhai Roop Chand Ji",
    imageLabel: "[Photo Placeholder: Sri Amritsar Sahib]",
    description:
      "Bibi Surti Ji and Bhai Sadhu Ji would go twice a year to the Guru's darbar, and by serving the sangat would receive spiritual bliss. A beautiful boy was born in their home. Bibi Surti Ji and her husband took the child to the darbar of Sri Guru Hargobind Sahib Ji at Sri Amritsar and expressed their joy at having received the gift of a son. Seeing the child's beauty, the Guru gave him the name Roop Chand. Coming to the Guru's house along with his parents, the child took on the influence of Gurmat; and this same Roop Chand, on growing up, became a very great preacher of Gurmat, and received from the Guru the title of 'Bhai' along with many blessings.",
  },
  {
    era: "Era of Sri Guru Hargobind Sahib Ji",
    dateNote: "No year is given.",
    title: "Village Bhai Rupa Founded, and the Karchha Bestowed",
    imageLabel: "[Photo Placeholder: Village Bhai Rupa]",
    description:
      "The Guru had the village of Bhai Rupa settled in his very name. The Guru also bestowed upon Bhai Roop Chand Ji a karchha — a ladle — for serving langar. These relics remain even today with his descendants at village Bagarian.",
  },
  {
    era: "1631",
    title: "The Arrows of Sovereignty",
    imageLabel: "[Photo Placeholder: Puratan Teer - Battle of Mehraj Arrows]",
    image: "/relics/puratan-teer.jpg",
    description:
      "During the decisive Battle of Mehraj fought by Guru Hargobind Sahib Ji against Mughal forces, sacred shastars and Puratan Teer (historical arrows) were used, and were later preserved by the family as symbols of Miri-Piri — temporal and spiritual authority.",
  },
  {
    era: "Preserved to this day",
    title: "The Relics Kept at Nagar Bhai Rupe",
    imageLabel: "[Photo Placeholder: Shastars at Nagar Bhai Rupe]",
    image: "/relics/shri-sahib.jpg",
    description:
      "All the remaining shastar and vastar that were bestowed are kept even today at Nagar Bhai Rupe — among them the small Sri Sahib of Guru Hargobind Sahib Ji; his large Sri Sahib, upon which 'Allah' is written; the Guru Sahib's dhals; and the vessels he used. All of these are preserved to this day with great reverence by the family at Nagar Bhai Rupe.",
  },
  {
    era: "The generations following",
    dateNote: "No dates are given.",
    title: "The Family Known as 'Bhai Kian'",
    imageLabel: "[Photo Placeholder: Family lineage]",
    description:
      "Going forward, the descendants of Bibi Surti Ji carried out great works within Sikhi, and this same family became renowned by the name 'Bhai Kian'.",
  },
  {
    era: "Era of Sri Guru Gobind Singh Ji",
    dateNote: "No specific years are given.",
    title: "His Sons Receive Khande di Pahul",
    imageLabel: "[Photo Placeholder: Sri Hazur Sahib, Nanded]",
    description:
      "Bhai Roop Chand Ji's sons, Bhai Param Singh Ji and Bhai Dharam Singh Ji, remained present in the seva of Sri Guru Gobind Singh Ji and received Khande di Pahul. Bhai Param Singh Ji passed away at Sri Hazur Sahib, Nanded, and Bhai Dharam Singh Ji took leave of Guru Sahib and returned to the village.",
  },
  {
    era: "Era of Sri Guru Gobind Singh Ji",
    dateNote: "No specific years are given.",
    title: "The Blessings of Sri Guru Gobind Singh Ji",
    imageLabel: "[Photo Placeholder: Pothi Sahib of Sri Guru Gobind Singh Ji]",
    image: "/relics/gobind/pothi-sahib-gold.jpg",
    description:
      "At the time of giving Bhai Param Singh Ji leave, Sri Guru Gobind Singh Ji bestowed a pothi of Gurbani, a kirpan, a small kirpan and a small khanda. Guru Gobind Singh Ji also bestowed the shastar of the dumala, and many other blessings besides. These are kept preserved even today in Nagar Bhai Rupe, while some relics — including Guru Gobind Singh Ji's own handwriting and the shastar of the dumala — are kept preserved at Bagarian Bhai Ke.",
  },
  {
    era: "Sawan Vadi 1, Sammat 1766 Bikrami (c. 1709 CE)",
    dateNote:
      "The source dates this in the Bikrami calendar; the CE equivalent is approximate.",
    title: "The Passing of Bhai Roop Chand Ji",
    imageLabel: "[Photo Placeholder: Bhai Ki Samadh]",
    description:
      "Bhai Roop Chand Ji departed this world on Sawan Vadi 1, Sammat 1766 Bikrami. At the place where his final rites were performed, a village by the name of 'Bhai Ki Samadh' came to be settled.",
  },
  {
    era: "Local tradition",
    dateNote:
      "Recorded as local tradition, with no date given; the account is placed here for narrative order only.",
    title: "'Gaddian da Dhani' — Master of the Carts",
    imageLabel: "[Photo Placeholder: Bullock carts / the Beas crossing]",
    description:
      "By local tradition it is commonly held that Bhai Roop Chand Ji would go twice a year to the Guru's darbar, carrying the offering of dasvandh from the Malwa. The road was one of extreme difficulty: several streams ran across the way, the Sutlej river also came in the path, and on the road to Sri Amritsar the Beas had to be crossed as well. Once, several carts were loaded with the offering and travelling to Sri Amritsar, and crossing the Beas on the way proved hard. Everyone made a request before Bhai Roop Chand Ji to remove this difficulty. Bhai Sahib Ji made ardas, set his own cart at the front, and told them all to come behind. All of them reached the Guru's darbar safe and sound with the offering. When someone recounted this to the Guru, he gave Bhai Roop Chand Ji, in the form of a blessing, the words \"Gaddian de Dhani\" — master of the carts. To this day the tradition holds in the area around village Bhai Rupa that before setting a cart, tractor or trolley in motion, it is first said: \"Mann utte beliya, Bhai Roop Chand Gaddian de Dhani nu\" — and only then is the vehicle started.",
    source: "Gi. Gurdit Singh",
  },
  {
    era: "Early 1700s",
    title: "Hukamnama of Baba Banda Singh Bahadur",
    imageLabel: "[Photo Placeholder: Authentic Hukamnama Sahib]",
    image: "/relics/hukamnama-sahib.jpg",
    description:
      "As Sikh sovereignty established itself across the Punjab, Baba Banda Singh Bahadur issued official Hukamnamas recognising the contributions and standing of the sangat and of this lineage.",
  },
  {
    era: "Early 1800s",
    title: "Royal Decree from Maharaja Ranjit Singh Ji",
    imageLabel: "[Photo Placeholder: Original Farman of Maharaja Ranjit Singh Ji]",
    image: "/relics/farman.jpg",
    description:
      "During the height of the Sikh Empire, Maharaja Ranjit Singh Ji issued an official royal decree — a Farman — acknowledging the historical reverence and custodianship of Bhai Roop Chand Ji's descendants.",
  },
  {
    era: "Present Day",
    title: "The Relics Today, and the Villages of the Lineage",
    imageLabel: `[Photo Placeholder: ${custodian.name} with Sacred Shastars]`,
    image: "/custodian.jpg",
    description: `The historic relics bestowed by the Guru Sahibaan and their households, in their pleasure at Bhai Roop Chand Ji's seva, are present today at village Bhai Rupe, district Bathinda, with his heirs, who have carried out their safekeeping generation after generation. ${custodian.name} now carries out the preservation of the relics and travels to countries abroad so that the sangat may take their darshan, while at Bagarian Bhai Ke, Bhai Jujhar Singh is carrying out the safekeeping. The descendants of Bibi Surti Ji and Bhai Roop Chand Ji are settled today in the villages of Bhai Rupa, Bhai Ki Samadh, Nehianwala Chhatti, Bhai Ki Bagarian and Bhai Ka Dialpura.`,
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

          {milestone.image ? (
            <div className="mt-4 overflow-hidden rounded-lg border border-navy-100 bg-cream-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={milestone.image}
                alt={milestone.title}
                className="max-h-72 w-full object-contain"
              />
            </div>
          ) : (
            <div className="mt-4 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-navy-700/25 bg-gradient-to-br from-cream-100 via-white to-navy-100 p-4 text-center text-xs font-medium text-navy-600">
              {milestone.imageLabel}
            </div>
          )}

          <h3 className="mt-4 font-serif text-xl font-semibold text-navy-950">
            {milestone.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-700">
            {milestone.description}
          </p>

          {milestone.dateNote && (
            <p className="mt-3 text-xs italic leading-relaxed text-navy-500">
              Note on dating: {milestone.dateNote}
            </p>
          )}
          {milestone.source && (
            <p className="mt-2 text-xs leading-relaxed text-navy-500">
              <span className="font-semibold">Source:</span> {milestone.source}
            </p>
          )}
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
