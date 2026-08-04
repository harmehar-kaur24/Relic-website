"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { custodian } from "@/lib/data";
import { useLanguage } from "./LanguageProvider";

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
      'By local tradition it is commonly held that Bhai Roop Chand Ji would go twice a year to the Guru\'s darbar, carrying the offering of dasvandh from the Malwa. The road was one of extreme difficulty: several streams ran across the way, the Sutlej river also came in the path, and on the road to Sri Amritsar the Beas had to be crossed as well. Once, several carts were loaded with the offering and travelling to Sri Amritsar, and crossing the Beas on the way proved hard. Everyone made a request before Bhai Roop Chand Ji to remove this difficulty. Bhai Sahib Ji made ardas, set his own cart at the front, and told them all to come behind. All of them reached the Guru\'s darbar safe and sound with the offering. When someone recounted this to the Guru, he gave Bhai Roop Chand Ji, in the form of a blessing, the words "Gaddian de Dhani" — master of the carts. To this day the tradition holds in the area around village Bhai Rupa that before setting a cart, tractor or trolley in motion, it is first said: "Mann utte beliya, Bhai Roop Chand Gaddian de Dhani nu" — and only then is the vehicle started.',
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
    imageLabel:
      "[Photo Placeholder: Original Farman of Maharaja Ranjit Singh Ji]",
    image: "/relics/farman.jpg",
    description:
      "During the height of the Sikh Empire, Maharaja Ranjit Singh Ji issued an official royal decree — a Farman — acknowledging the historical reverence and custodianship of Bhai Roop Chand Ji's descendants.",
  },
  {
    era: "Twelfth generation",
    title: "Bhai Balvir Singh Ji",
    imageLabel: "[Photo Placeholder: Bhai Balvir Singh Ji]",
    image: "/lineage/bhai-balvir-singh.jpg",
    description:
      "Bhai Balvir Singh Ji, of the twelfth generation of Bhai Roop Chand Ji. His son Bhai Pal Singh Ji continued the safekeeping of the relics after him, and it is through this line that the trust passes to the present custodian.",
  },
  {
    era: "Present Day",
    title: "The Relics Today, and the Villages of the Lineage",
    imageLabel: `[Photo Placeholder: ${custodian.name} with Sacred Shastars]`,
    image: "/custodian.jpg",
    description: `The historic relics bestowed by the Guru Sahibaan and their households, in their pleasure at Bhai Roop Chand Ji's seva, are present today at village Bhai Rupe, district Bathinda, with his heirs, who have carried out their safekeeping generation after generation. ${custodian.name} now carries out the preservation of the relics and travels to countries abroad so that the sangat may take their darshan, while at Bagarian Bhai Ke, Bhai Jujhar Singh is carrying out the safekeeping. The descendants of Bibi Surti Ji and Bhai Roop Chand Ji are settled today in the villages of Bhai Rupa, Bhai Ki Samadh, Nehianwala Chhatti, Bhai Ki Bagarian and Bhai Ka Dialpura.`,
  },
];
/** Punjabi timeline. Wording follows the family's own Punjabi account
 *  rather than being translated back from the English above. */
export const milestonesPa: TimelineMilestone[] = [
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਵੱਡਾ ਘਰ ਦੇ ਬਾਬਾ ਆਕਲ ਜੀ ਨੂੰ ਸਿੱਖੀ ਦੀ ਦਾਤ",
    imageLabel: "[Photo Placeholder: Village Wadda Ghar, Moga]",
    description:
      "ਵੱਡਾ ਘਰ ਪੰਜਾਬ ਦੇ ਜ਼ਿਲ੍ਹਾ ਅਤੇ ਤਹਿਸੀਲ ਮੋਗਾ ਦਾ ਪ੍ਰਸਿੱਧ ਪਿੰਡ ਹੈ, ਮੋਗਾ ਨਗਰ ਤੋਂ ਲੱਗਭਗ ੨੦ ਕਿਲੋਮੀਟਰ ਦੱਖਣ-ਪੱਛਮ ਵੱਲ ਅਤੇ ਰੇਲਵੇ ਸਟੇਸ਼ਨ ਡਗਰੂ ਤੋਂ ਸੱਤ ਮੀਲ ਦੱਖਣ-ਪੱਛਮ ਵੱਲ। ਗੁਰੂ-ਘਰ ਦੇ ਪ੍ਰੇਮੀ ਬਾਬਾ ਆਕਲ ਜੀ ਇਸ ਪਿੰਡ ਦੇ ਵਸਨੀਕ ਸਨ। ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਕਲਾਸਵਾਲੀਆ ਦੱਸਦੇ ਹਨ ਕਿ ਬਾਬਾ ਆਕਲ ਜੀ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਤੋਂ ਸਿੱਖੀ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ ਅਤੇ ਆਪਣੇ ਘਰ ਨੂੰ ਸਿੱਖੀ ਦਾ ਕੇਂਦਰ ਬਣਾਇਆ ਹੋਇਆ ਸੀ।",
  },
  {
    era: "ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦੇ ਜਨਮ ਤੋਂ ਪਹਿਲਾਂ",
    title: "ਆਕਲ-ਵਾੜੀ ਅਤੇ ਵੱਡਾ ਘਰ ਦਾ ਨਾਮ",
    imageLabel: "[Photo Placeholder: Aakal-Waari site]",
    description:
      "ਬਾਬਾ ਆਕਲ ਜੀ ਨੇ ਪਿੰਡ ਦੇ ਬਾਹਰ ਇੱਕ ਬਹੁਤ ਵੱਡਾ ਵਾੜਾ ਵਲਿਆ ਹੋਇਆ ਸੀ, ਜਿਸ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਬਹੁਤ ਸਾਰੀਆਂ ਗਊਆਂ ਰੱਖੀਆਂ ਹੋਈਆਂ ਸਨ। ਉਹ ਇਨ੍ਹਾਂ ਦਾ ਦੁੱਧ ਇਕੱਠਾ ਕਰ ਕੇ ਲੋੜਵੰਦਾਂ ਨੂੰ ਛਕਾ ਕੇ ਖ਼ੁਸ਼ੀ ਪ੍ਰਾਪਤ ਕਰਦੇ ਸਨ। ਲੋਕ ਇਸ ਵਾੜੇ ਨੂੰ ‘ਆਕਲ-ਵਾੜੀ’ ਕਹਿੰਦੇ ਸਨ। ਵਿਦਵਾਨਾਂ ਦਾ ਵਿਚਾਰ ਹੈ ਕਿ ਇਸੇ ਆਕਲ-ਵਾੜੀ ਦਾ ਨਾਂ ਬਦਲ ਕੇ ਵੱਡਾ ਘਰ ਮਸ਼ਹੂਰ ਹੋਇਆ। ਕੁਝ ਵਿਦਵਾਨ ਮੰਨਦੇ ਹਨ ਕਿ ਬਾਹਰੋਂ ਆਏ ਸਾਧੂ-ਫਕੀਰਾਂ ਨੇ ਭਾਈ ਆਕਲ ਜੀ ਦੀ ਸੇਵਾ-ਭਾਵਨਾ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋ ਕੇ ਇਸ ਨੂੰ ‘ਵੱਡਾ ਘਰ’ ਕਹਿਣਾ ਸ਼ੁਰੂ ਕੀਤਾ।",
  },
  {
    era: "ਬਿਕ੍ਰਮੀ ੧੬੫੧–੫੯ (ਲੱਗਭਗ ੧੫੯੪–੧੬੦੨ ਈ:)",
    title: "ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦਾ ਜਨਮ",
    imageLabel: "[Photo Placeholder: Wadda Ghar]",
    description:
      "ਬਾਬਾ ਆਕਲ ਜੀ ਦੇ ਘਰ ਸੁੰਦਰ ਪੁੱਤਰੀ ਦਾ ਜਨਮ ਹੋਇਆ, ਤਾਂ ਬਾਬਾ ਜੀ ਨੇ ਉਸ ਦਾ ਨਾਂ ‘ਸੁਰਤੀ’ ਰੱਖਿਆ। ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ‘ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ’ ਵਿੱਚ ਇਸ ਜਨਮ ਦਾ ਜ਼ਿਕਰ ਕਰਦੇ ਹਨ, ਅਤੇ ਦੱਸਦੇ ਹਨ ਕਿ ਬਾਬਾ ਜੀ ਦੇ ਮਨ ਨੂੰ ਗੁਰਮਤਿ ਵਿੱਚ ਬਿਸਰਾਮ ਸੀ।",
  },
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ",
    imageLabel: "[Photo Placeholder: Sri Harmandir Sahib]",
    description:
      "ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਤੋਂ ਬਾਅਦ ਬਾਬਾ ਆਕਲ ਜੀ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਰਹੇ। ਬਾਬਾ ਜੀ ਦਸਾਂ ਨਹੁੰਆਂ ਦੀ ਕਿਰਤ ਕਮਾਈ ਵਿੱਚੋਂ ਗੁਰੂ ਜੀ ਪਾਸ ਸ਼ਰਧਾ ਨਾਲ ਭੇਟਾ ਲੈ ਕੇ ਜਾਂਦੇ ਅਤੇ ਗੁਰੂ-ਘਰ ਦੀਆਂ ਖ਼ੁਸ਼ੀਆਂ ਪ੍ਰਾਪਤ ਕਰਦੇ ਸਨ।",
  },
  {
    era: "ਉਨ੍ਹਾਂ ਦੇ ਮੁਢਲੇ ਸਾਲ",
    title: "ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਪੂਰਨ ਨਿੱਤਨੇਮੀ ਬਣੇ",
    imageLabel: "[Photo Placeholder: Gurbani manuscript]",
    description:
      "ਘਰੇਲੂ ਮਾਹੌਲ ਦਾ ਬੱਚੀ ਦੇ ਜੀਵਨ ‘ਤੇ ਪ੍ਰਭਾਵ ਪੈਣਾ ਸੁਭਾਵਿਕ ਹੀ ਸੀ। ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਪੂਰਨ ਨਿੱਤਨੇਮੀ ਬਣ ਗਏ ਅਤੇ ਗੁਰਮਤਿ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਧਾਰਨ ਕਰ ਲਿਆ। ਉਹ ਹਰ ਸਮੇਂ ਗੁਰਬਾਣੀ ਦਾ ਅਭਿਆਸ ਕਰਦੇ ਅਤੇ ਗੁਰੂ ਸਾਹਿਬਾਨ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ ਨਾਲ ਜੁੜਨ ਦਾ ਜਤਨ ਕਰਦੇ ਰਹਿੰਦੇ। ਇਸ ਅਭਿਆਸ ਨਾਲ ਗੁਰਮਤਿ ਦੇ ਸੰਸਕਾਰ ਉਨ੍ਹਾਂ ਦੇ ਜੀਵਨ ਵਿੱਚ ਪ੍ਰਪੱਕ ਹੋ ਗਏ ਅਤੇ ਉਹ ਪਰਿਵਾਰ ਨਾਲ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਸੇਵਾ ਵਿੱਚ ਰੁੱਝੇ ਰਹਿੰਦੇ ਸਨ।",
  },
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਵੱਡਾ ਘਰ ਆਮਦ",
    imageLabel: "[Photo Placeholder: Gurdwara Manji Sahib Patshahi Chhevin]",
    description:
      "ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਡਰੌਲੀ ਪਿੰਡ ਤੋਂ ਚੱਲ ਕੇ ਸੈਨਾ ਸਮੇਤ ਘੋੜੇ ‘ਤੇ ਸਵਾਰ ਹੋ ਕੇ ‘ਵੱਡਾ ਘਰ’ ਪਿੰਡ ਦੀ ਧਰਤੀ ਨੂੰ ਭਾਗ ਲਾਏ। ਗੁਰੂ ਜੀ ਨੇ ਇਸ ਪਿੰਡ ਵਿੱਚ ਪੰਜ ਦਿਨ ਨਿਵਾਸ ਕੀਤਾ ਅਤੇ ਫਿਰ ਮਾਲਵਾ ਖੇਤਰ ਵਿੱਚ ਸਿੱਖੀ ਦੇ ਪ੍ਰਚਾਰ ਲਈ ਗਏ। ਪਿੰਡ ਦੇ ਚੌਧਰੀ ਰਾਇ ਭਾਗਮੱਲ ਅਤੇ ਬਾਬਾ ਆਕਲ ਜੀ ਨੇ ਸੰਗਤ ਨਾਲ ਮਿਲ ਕੇ ਗੁਰੂ ਜੀ ਦੀ ਬਹੁਤ ਸੇਵਾ ਕੀਤੀ। ਗੁਰੂ ਜੀ ਦੀ ਆਮਦ ਦੀ ਯਾਦ ਵਿੱਚ ਗੁਰਦੁਆਰਾ ਮੰਜੀ ਸਾਹਿਬ ਪਾਤਸ਼ਾਹੀ ਛੇਵੀਂ ਸੁਸ਼ੋਭਿਤ ਹੈ; ਵਰਤਮਾਨ ਸੁੰਦਰ ਇਮਾਰਤ ਸੰਨ ੧੯੨੭ ਈ: ਵਿੱਚ ਉਸਾਰੀ ਗਈ।",
  },
  {
    era: "ਵਿਆਹ ਤੋਂ ਪਹਿਲਾਂ",
    title: "ਸਖ਼ੀ ਸਰਵਰੀਏ ਪਰਿਵਾਰ ਵਿੱਚ ਰਿਸ਼ਤਾ",
    imageLabel: "[Photo Placeholder: Village Tuklani]",
    description:
      "ਬਾਬਾ ਆਕਲ ਜੀ ਨੇ ਆਪਣੀ ਪੁੱਤਰੀ ਨੂੰ ਵਰ ਯੋਗ ਸਮਝ ਕੇ ਵਰ ਦੀ ਭਾਲ ਲਈ ਪ੍ਰੋਹਿਤ ਨੂੰ ਕਿਹਾ। ਪ੍ਰੋਹਿਤ ਨੇ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਲਈ ਤੁਕਲਾਨੀ ਦੇ ਵਸਨੀਕ ਬਾਬੇ ਸਾਦੇ ਦੇ ਪੋਤਰੇ ਭਾਈ ਸਾਧੂ ਜੀ ਨਾਲ ਰਿਸ਼ਤਾ ਪੱਕਾ ਕਰ ਦਿੱਤਾ। ਬਾਬੇ ਸਾਦੇ ਦਾ ਪਰਿਵਾਰ ਸੁਲਤਾਨ ਸਖ਼ੀ ਸਰਵਰ ਨੂੰ ਮੰਨਦਾ ਸੀ — ਇੱਕ ਮੁਸਲਮਾਨ ਪੀਰ, ਜਿਸ ਦਾ ਹਿੰਦੂ ਅਤੇ ਮੁਸਲਮਾਨ ਦੋਵੇਂ ਸਤਿਕਾਰ ਕਰਦੇ ਸਨ ਅਤੇ ਜਿਸ ਨੂੰ ਸੇਵਕ ਅਨੇਕਾਂ ਨਾਂਵਾਂ ਨਾਲ ਯਾਦ ਕਰਦੇ ਸਨ।",
  },
  {
    era: "ਵਿਆਹ ਤੋਂ ਪਹਿਲਾਂ",
    title: "ਪਿਤਾ ਦੀ ਚਿੰਤਾ ਅਤੇ ਸਿੱਖਿਆ",
    imageLabel: "[Photo Placeholder: Sri Gur Pratap Suraj Granth]",
    description:
      "ਜਦੋਂ ਬਾਬਾ ਆਕਲ ਜੀ ਨੂੰ ਪਤਾ ਲੱਗਾ ਕਿ ਬੀਬੀ ਸੁਰਤੀ ਦਾ ਹੋਣ ਵਾਲਾ ਸਹੁਰਾ ਪਰਿਵਾਰ ਸਖ਼ੀ ਸਰਵਰੀਆ ਹੈ, ਤਾਂ ਉਨ੍ਹਾਂ ਦੇ ਮਨ ਵਿੱਚ ਬਹੁਤ ਚਿੰਤਾ ਹੋਈ। ਉਹ ਆਪਣੀ ਬੱਚੀ ਦੇ ਸਿੱਖੀ ਸਿਦਕ ਦੀ ਦ੍ਰਿੜ੍ਹਤਾ ਲਈ ਅਕਾਲ ਪੁਰਖ ਅੱਗੇ ਅਰਦਾਸਾਂ ਕਰਨ ਲੱਗੇ। ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਲਿਖਦੇ ਹਨ ਕਿ ਉਨ੍ਹਾਂ ਨੇ ਧੀ ਨੂੰ ਸਮਝਾਇਆ — ਤੇਰਾ ਸਹੁਰਾ ਘਰ ਸੁਲਤਾਨੀ ਹੈ, ਤੂੰ ਉਸ ਨੂੰ ਕਦੇ ਨਾ ਮਾਨਣਾ, ਸਤਿਗੁਰੂ ਨੂੰ ਮਨ ਲਾ ਕੇ ਮਾਨਣਾ। ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਕਲਾਸਵਾਲੀਆ ਵੀ ਇਹੀ ਸਿੱਖਿਆ ਲਿਖਦੇ ਹਨ — ਸਭ ਕੁਝ ਉਨ੍ਹਾਂ ਨਾਲ ਮਿਲ ਕੇ ਕਰੀਂ, ਪਰ ਸਰਵਰੀ ਵਿੱਚ ਸਿੱਖੀ ਨਾ ਭੁਲਾਈਂ; ਸਤਿਗੁਰੂ ਦੀ ਯਾਦ ਚਿੱਤ ਅੰਦਰ ਰੱਖੀਂ, ਗੁਰਬਾਣੀ ਮਨੋਂ ਨਾ ਭੁਲਾਈਂ।",
  },
  {
    era: "ਨਿਸਚਿਤ ਮਿਤੀ ‘ਤੇ",
    title: "ਵਿਆਹ ਅਤੇ ਡੋਲੀ ਦੀ ਰਵਾਨਗੀ",
    imageLabel: "[Photo Placeholder: Wadda Ghar to Tuklani route]",
    description:
      "ਨਿਸਚਿਤ ਮਿਤੀ ‘ਤੇ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦਾ ਵਿਆਹ ਤੁਕਲਾਨੀ ਦੇ ਵਸਨੀਕ ਭਾਈ ਸਾਧੂ ਜੀ ਨਾਲ ਹੋ ਗਿਆ। ਵਿਆਹ ਤੋਂ ਉਪਰੰਤ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਨੂੰ ਡੋਲੀ ਵਿੱਚ ਬਿਠਾ ਕੇ ਵੱਡਾ ਘਰ ਤੋਂ ਤੁਕਲਾਨੀ ਲਈ ਰਵਾਨਾ ਕੀਤਾ ਗਿਆ।",
  },
  {
    era: "ਤੁਕਲਾਨੀ ਦੇ ਰਾਹ ਵਿੱਚ",
    title: "ਡਰੌਲੀ ਵਿਖੇ ਕੀਰਤਨ ਦੀ ਅਵਾਜ਼",
    imageLabel: "[Photo Placeholder: Darauli Bhai Ki]",
    description:
      "ਜਾਂਦੇ ਸਮੇਂ ਜਦੋਂ ਡੋਲੀ ਡਰੌਲੀ ਪਿੰਡ ਪਾਸ ਪਹੁੰਚੀ ਤਾਂ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦੇ ਕੰਨਾਂ ਵਿੱਚ ਕੀਰਤਨ ਦੀ ਮਿੱਠੀ ਅਵਾਜ਼ ਪਈ। ਬੀਬੀ ਜੀ ਨੇ ਕਹਾਰਾਂ ਨੂੰ ਇਸ ਬਾਰੇ ਪਤਾ ਕਰਨ ਲਈ ਕਿਹਾ ਤਾਂ ਪਤਾ ਲੱਗਾ ਕਿ ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਡਰੌਲੀ ਆਪਣੇ ਸਾਂਢੂ ਭਾਈ ਸਾਂਈ ਦਾਸ ਜੀ ਪਾਸ ਆਏ ਹੋਏ ਹਨ ਅਤੇ ਉੱਥੇ ਦੀਵਾਨ ਲਗਾਇਆ ਹੋਇਆ ਹੈ। ਕੀਰਤਨ ਦੀ ਅਵਾਜ਼ ਸੁਣ ਕੇ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦਾ ਮਨ ਗੁਰੂ-ਚਰਨਾਂ ਵਿੱਚ ਜੁੜ ਗਿਆ।",
  },
  {
    era: "ਤੁਕਲਾਨੀ ਦੇ ਰਾਹ ਵਿੱਚ",
    title: "ਦਰਸ਼ਨਾਂ ਲਈ ਕੰਗਣ ਦੇ ਦਿੱਤੇ",
    imageLabel: "[Photo Placeholder: Kangan]",
    description:
      "ਬਰਾਤ ਅੱਗੇ ਜਾ ਚੁੱਕੀ ਸੀ ਅਤੇ ਕਹਾਰ ਡੋਲੀ ਨੂੰ ਹੌਲੀ-ਹੌਲੀ ਅੱਗੇ ਲੈ ਜਾ ਰਹੇ ਸਨ। ਅਚਾਨਕ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦੇ ਮਨ ਵਿੱਚ ਖਿਆਲ ਆਇਆ ਕਿ ਸਹੁਰੇ ਘਰ ਜਾ ਕੇ ਤਾਂ ਸਾਰਾ ਜੀਵਨ ਸਖ਼ੀ ਸਰਵਰੀਆਂ ਵਿੱਚ ਹੀ ਗੁਜ਼ਰਨਾ ਹੈ, ਕਿਉਂ ਨਾ ਜਾਂਦੀ ਵਾਰੀ ਗੁਰੂ ਜੀ ਦੇ ਦਰਸ਼ਨ ਕਰਦੀ ਜਾਵਾਂ। ਉਨ੍ਹਾਂ ਨੇ ਕਹਾਰਾਂ ਨੂੰ ਡੋਲੀ ਰੋਕਣ ਅਤੇ ਦਰਸ਼ਨਾਂ ਨੂੰ ਲੈ ਜਾਣ ਦੀ ਬੇਨਤੀ ਕੀਤੀ, ਪਰ ਕਹਾਰਾਂ ਨੇ ਗੱਲ ਨਾ ਮੰਨੀ। ਜਦੋਂ ਉਨ੍ਹਾਂ ਨੇ ਦੇਖਿਆ ਕਿ ਕਹਾਰ ਨਹੀਂ ਮੰਨਣਗੇ, ਤਾਂ ਆਪਣੇ ਕੰਗਣ ਉਤਾਰ ਕੇ ਕਹਾਰਾਂ ਨੂੰ ਦੇ ਦਿੱਤੇ, ਅਤੇ ਕਹਾਰ ਲਾਲਚ ਵਿੱਚ ਆ ਕੇ ਗੁਰੂ ਜੀ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਲੈ ਜਾਣ ਲਈ ਮੰਨ ਗਏ।",
  },
  {
    era: "ਡਰੌਲੀ ਵਿਖੇ",
    title: "ਗੁਰੂ ਜੀ ਦੇ ਦੀਵਾਨ ਵਿੱਚ ਦਰਸ਼ਨ",
    imageLabel: "[Photo Placeholder: Gur Bilas Patshahi 6]",
    description:
      "ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਡੋਲੀ ਵਿੱਚੋਂ ਉਤਰ ਕੇ ਉਸ ਸਥਾਨ ‘ਤੇ ਪਹੁੰਚੇ ਜਿੱਥੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਦੀਵਾਨ ਲੱਗਾ ਹੋਇਆ ਸੀ। ਦੀਵਾਨ ਵਿੱਚ ਜਾ ਕੇ ਗੁਰੂ ਜੀ ਨੂੰ ਨਮਸਕਾਰ ਕਰ ਕੇ ਨੇੜੇ ਹੀ ਬੈਠ ਗਏ। ਆਸਾ ਕੀ ਵਾਰ ਦੇ ਭੋਗ ਤੋਂ ਬਾਅਦ ਗੁਰੂ ਜੀ ਨੇ ਭਾਈ ਬਿਪੀ ਚੰਦ ਜੀ ਨੂੰ ਦੀਵਾਨ ਵਿੱਚ ਬੈਠੀ ਨਵ-ਵਿਆਹੀ ਕੰਨਿਆ ਬਾਰੇ ਪੁੱਛਿਆ। ਭਾਈ ਬਿਪੀ ਚੰਦ ਜੀ ਨੇ ਦੱਸਿਆ ਕਿ ਇਹ ਗੁਰੂ-ਘਰ ਦੇ ਅਨਿੰਨ ਸੇਵਕ ਭਾਈ ਆਕਲ ਜੀ ਦੀ ਪੁੱਤਰੀ, ਗੁਰੂ-ਘਰ ਦੀ ਸ਼ਰਧਾਲੂ ਅਤੇ ਗੁਰਮਤਿ ਦੀ ਪੱਕੀ ਧਾਰਨੀ ਹੈ। ਬੀਬੀ ਜੀ ਨੇ ਨਵ-ਵਿਆਹੀ ਬਹੁਟੀ ਵਾਲੇ ਕੱਪੜਿਆਂ ਵਿੱਚ ਹੀ ਪੇਕਿਓਂ ਲਿਆਈ ਮਠਿਆਈ ਗੁਰੂ ਜੀ ਨੂੰ ਅਰਪਨ ਕਰ ਕੇ ਮੱਥਾ ਟੇਕਿਆ, ਅਤੇ ਪੁੱਛਣ ‘ਤੇ ਸਾਰੀ ਗੱਲ ਦੱਸ ਦਿੱਤੀ ਕਿ ਉਹ ਗੁਰਮਤਿ ਦੀ ਪੱਕੀ ਧਾਰਨੀ ਹੈ, ਪਰ ਸਹੁਰਾ ਪਰਿਵਾਰ ਸਖ਼ੀ ਸਰਵਰ ਦਾ ਭਗਤ ਹੈ।",
  },
  {
    era: "ਡਰੌਲੀ ਵਿਖੇ",
    title: "ਗੁਰੂ ਜੀ ਦੀ ਬਖ਼ਸ਼ਿਸ਼",
    imageLabel: "[Photo Placeholder: Sri Gur Pratap Suraj Granth]",
    description:
      "ਗੁਰੂ ਜੀ ਨੇ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਨੂੰ ਅਸ਼ੀਰਵਾਦ ਦਿੰਦਿਆਂ ਉਨ੍ਹਾਂ ਦੇ ਗੁਰਮਤਿ ਵਿੱਚ ਪੱਕਾ ਹੋਣ ਦੀ ਪ੍ਰਸ਼ੰਸਾ ਕੀਤੀ। ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ‘ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ’ ਵਿੱਚ ਗੁਰੂ ਜੀ ਦੇ ਬਚਨ ਲਿਖਦੇ ਹਨ — ਹੁਣ ਤੇਰੇ ਨਾਂ ਨਵੇਂ ਲੇਖ ਲਿਖੇ ਜਾਣਗੇ; ਤੇਰਾ ਪਿਤਾ ਸਿੱਖ ਹੈ, ਉਸੇ ਸਦਕਾ ਤੂੰ ਵੀ ਤਰ ਜਾਏਂਗੀ; ਸਹੁਰੇ ਘਰ ਆਪਣੇ ਕਰਤੱਵ ਨਿਭਾਈਂ; ਸਿੱਖੀ ਦਾ ਦਾਨ ਅਸੀਂ ਤੈਨੂੰ ਦਿੱਤਾ; ਤੇਰੇ ਅਨੇਕਾਂ ਸਿੱਖ ਪੁੱਤਰ ਹੋਣਗੇ; ਅਤੇ ਤੇਰਾ ਪਤੀ ਵੀ ਭਲਾ ਸਿੱਖ ਹੋ ਕੇ ਗੁਰਸਿੱਖੀ ਦੇ ਮਾਰਗ ‘ਤੇ ਚੱਲੇਗਾ।",
  },
  {
    era: "ਡਰੌਲੀ ਵਿਖੇ",
    title: "ਤਲਵਾਰ ਮਿਆਨੋਂ ਨਿਕਲੀ, ਅਤੇ ਜੀਵਨ ਬਦਲ ਗਿਆ",
    imageLabel: "[Photo Placeholder: Darauli darbar site]",
    description:
      "ਜਦੋਂ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦੀ ਡੋਲੀ ਕਾਫ਼ੀ ਦੇਰ ਬਰਾਤ ਨਾਲ ਨਾ ਰਲੀ, ਤਾਂ ਸਹੁਰਾ ਸਾਦਾ ਜੀ ਅਤੇ ਪਤੀ ਭਾਈ ਸਾਧੂ ਜੀ ਭਾਲ ਕਰਦੇ ਗੁਰੂ-ਦਰਬਾਰ ਪਾਸ ਆ ਗਏ। ਦੋਵੇਂ ਪਿਉ-ਪੁੱਤਰ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਸਨ ਕਿ ਇਸ ਅਵੱਗਿਆ ਕਾਰਨ ਉਨ੍ਹਾਂ ‘ਤੇ ਸਖ਼ੀ ਸਰਵਰ ਦਾ ਕ੍ਰੋਧ ਹੋ ਜਾਵੇਗਾ, ਅਤੇ ਸਾਦਾ ਜੀ ਨੇ ਪੁੱਤਰ ਨੂੰ ਪਤਨੀ ਨੂੰ ਲਿਆ ਕੇ ਸਮਝਾਉਣ ਲਈ ਕਿਹਾ। ਭਾਈ ਸਾਧੂ ਜੀ ਨੇ ਦਰਬਾਰ ਪਹੁੰਚ ਕੇ ਦੇਖਿਆ ਕਿ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਗੁਰੂ ਜੀ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਬੈਠੀ ਬਖ਼ਸ਼ਿਸ਼ ਪ੍ਰਾਪਤ ਕਰ ਰਹੀ ਹੈ। ਉਹ ਗੁੱਸੇ ਵਿੱਚ ਆ ਗਏ ਅਤੇ ਮਾਰਨ ਲਈ ਤਲਵਾਰ ਮਿਆਨ ਵਿੱਚੋਂ ਕੱਢ ਲਈ। ਪਰ ਜਦੋਂ ਭਾਈ ਸਾਧੂ ਜੀ ਦੀ ਨਜ਼ਰ ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਨਾਲ ਮਿਲੀ ਤਾਂ ਉਹ ਇੱਕਦਮ ਸ਼ਾਂਤ ਹੋ ਗਏ। ਮਿਆਨ ਛੱਡ ਕੇ ਗੁਰੂ ਜੀ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਢਹਿ ਪਏ, ਆਪਣੀ ਭੁੱਲ ਦਾ ਪਛਤਾਵਾ ਕਰਨ ਲੱਗੇ ਅਤੇ ਸਿੱਖੀ ਦੀ ਦਾਤ ਲਈ ਅਰਜੋਈ ਕੀਤੀ। ਗੁਰੂ ਜੀ ਨੇ ਭਾਈ ਸਾਧੂ ਜੀ ਨੂੰ ਸਿੱਖੀ ਦੀ ਦਾਤ ਬਖ਼ਸ਼ਿਸ਼ ਕਰ ਕੇ ਸਿੱਖ ਬਣਾ ਲਿਆ।",
  },
  {
    era: "ਉਸੇ ਰਾਤ, ਤੁਕਲਾਨੀ ਵਿਖੇ",
    title: "ਤੁਕਲਾਨੀ ਦੀ ਕਬਰ ਢਾਹ ਦਿੱਤੀ",
    imageLabel: "[Photo Placeholder: Village Tuklani]",
    description:
      "ਭਾਈ ਸਾਧੂ ਜੀ ਜਦੋਂ ਆਪਣੀ ਪਤਨੀ ਨਾਲ ਪਿੰਡ ਤੁਕਲਾਨੀ ਪਹੁੰਚੇ ਤਾਂ ਉਸੇ ਰਾਤ ਸਖ਼ੀ ਸਰਵਰ ਦੀ ਕਬਰ ਢਾਹ ਦਿੱਤੀ। ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਕਲਾਸਵਾਲੀਆ ‘ਸ੍ਰੀ ਖੜਗੋਸ਼ ਪ੍ਰਕਾਸ਼’ ਵਿੱਚ ਲਿਖਦੇ ਹਨ ਕਿ ਭਿੱਜੀ ਰਾਤ, ਜਦੋਂ ਸਾਰੇ ਚੁੱਪ-ਚਾਪ ਹੋ ਗਏ, ਉਹ ਵੇਲਾ ਤਕਾ ਕੇ ਉੱਠੇ ਅਤੇ ਚੁੱਪ-ਚਾਪ ਕਹੀ ਮੋਢੇ ‘ਤੇ ਰੱਖ ਕੇ ਘਰੋਂ ਨਿਕਲ ਗਏ।",
  },
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦਾ ਜਨਮ ਅਤੇ ਨਾਮਕਰਨ",
    imageLabel: "[Photo Placeholder: Sri Amritsar Sahib]",
    description:
      "ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਅਤੇ ਭਾਈ ਸਾਧੂ ਜੀ ਸਾਲ ਵਿੱਚ ਦੋ ਵਾਰ ਗੁਰੂ ਜੀ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਜਾਂਦੇ ਅਤੇ ਸੰਗਤ ਦੀ ਸੇਵਾ ਕਰ ਕੇ ਆਤਮਿਕ ਅਨੰਦ ਪ੍ਰਾਪਤ ਕਰਦੇ। ਇਨ੍ਹਾਂ ਦੇ ਘਰ ਇੱਕ ਸੁੰਦਰ ਬਾਲਕ ਨੇ ਜਨਮ ਲਿਆ। ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਆਪਣੇ ਪਤੀ ਨਾਲ ਬੱਚੇ ਨੂੰ ਲੈ ਕੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੇ ਦਰਬਾਰ ਪਹੁੰਚੇ ਅਤੇ ਪੁੱਤਰ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਹੋਣ ‘ਤੇ ਖ਼ੁਸ਼ੀ ਦਾ ਇਜ਼ਹਾਰ ਕੀਤਾ। ਗੁਰੂ ਜੀ ਨੇ ਬੱਚੇ ਦੀ ਸੁੰਦਰਤਾ ਵੇਖਦੇ ਹੋਏ ਉਸ ਦਾ ਨਾਂ ਰੂਪ ਚੰਦ ਰੱਖਿਆ। ਇਹੀ ਰੂਪ ਚੰਦ ਵੱਡੇ ਹੋ ਕੇ ਗੁਰਮਤਿ ਦੇ ਬਹੁਤ ਵੱਡੇ ਪ੍ਰਚਾਰਕ ਬਣੇ ਅਤੇ ਗੁਰੂ ਜੀ ਤੋਂ ‘ਭਾਈ’ ਦੀ ਉਪਾਧੀ ਨਾਲ ਅਨੇਕਾਂ ਬਖ਼ਸ਼ਿਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕੀਤੀਆਂ।",
  },
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਪਿੰਡ ਭਾਈ ਰੂਪਾ ਦੀ ਸਥਾਪਨਾ ਅਤੇ ਕੜਛੇ ਦੀ ਬਖ਼ਸ਼ਿਸ਼",
    imageLabel: "[Photo Placeholder: Village Bhai Rupa]",
    description:
      "ਗੁਰੂ ਜੀ ਨੇ ਇਨ੍ਹਾਂ ਦੇ ਨਾਂ ‘ਤੇ ਹੀ ਭਾਈ ਰੂਪਾ ਪਿੰਡ ਆਬਾਦ ਕਰਵਾਇਆ। ਗੁਰੂ ਜੀ ਨੇ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਨੂੰ ਲੰਗਰ ਵਰਤਾਉਣ ਲਈ ਇੱਕ ਕੜਛਾ ਬਖ਼ਸ਼ਿਸ਼ ਕੀਤਾ। ਇਹ ਨਿਸ਼ਾਨੀਆਂ ਅੱਜ ਵੀ ਇਨ੍ਹਾਂ ਦੇ ਵੰਸ਼ਜਾਂ ਪਾਸ ਪਿੰਡ ਬਾਗੜੀਆਂ ਵਿਖੇ ਮੌਜੂਦ ਹਨ।",
  },
  {
    era: "੧੬੩੧",
    title: "ਮਹਿਰਾਜ ਦੀ ਜੰਗ ਦੇ ਤੀਰ",
    imageLabel: "[Photo Placeholder: Puratan Teer - Battle of Mehraj Arrows]",
    description:
      "ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਵੱਲੋਂ ਮੁਗ਼ਲ ਫ਼ੌਜਾਂ ਵਿਰੁੱਧ ਲੜੀ ਗਈ ਮਹਿਰਾਜ ਦੀ ਨਿਰਣਾਇਕ ਜੰਗ ਦੌਰਾਨ ਪਵਿੱਤਰ ਸ਼ਸਤਰ ਅਤੇ ਪੁਰਾਤਨ ਤੀਰ ਵਰਤੇ ਗਏ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਪਰਿਵਾਰ ਨੇ ਮੀਰੀ-ਪੀਰੀ ਦੇ ਪ੍ਰਤੀਕ ਵਜੋਂ ਸੰਭਾਲਿਆ।",
  },
  {
    era: "ਅੱਜ ਤੱਕ ਸੰਭਾਲੀਆਂ",
    title: "ਨਗਰ ਭਾਈ ਰੂਪੇ ਵਿਖੇ ਸੰਭਾਲੀਆਂ ਨਿਸ਼ਾਨੀਆਂ",
    imageLabel: "[Photo Placeholder: Shastars at Nagar Bhai Rupe]",
    description:
      "ਬਾਕੀ ਸਾਰੇ ਬਖ਼ਸ਼ਿਸ਼ ਕੀਤੇ ਸ਼ਸਤਰ-ਵਸਤਰ ਅੱਜ ਵੀ ਨਗਰ ਭਾਈ ਰੂਪੇ ਵਿਖੇ ਸੰਭਾਲ ਕੇ ਰੱਖੇ ਹੋਏ ਹਨ — ਜਿਵੇਂ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਛੋਟੀ ਸ੍ਰੀ ਸਾਹਿਬ, ਉਨ੍ਹਾਂ ਦੀ ਵੱਡੀ ਸ੍ਰੀ ਸਾਹਿਬ ਜਿਸ ਉੱਪਰ ‘ਅੱਲਾ’ ਲਿਖਿਆ ਹੋਇਆ ਹੈ, ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਦੀਆਂ ਢਾਲਾਂ, ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਵਰਤਣ ਵਾਲੇ ਬਰਤਨ। ਇਹ ਸਭ ਅੱਜ ਵੀ ਪਰਿਵਾਰ ਕੋਲ ਬੜੇ ਸਤਿਕਾਰ ਨਾਲ ਸੰਭਾਲੀਆਂ ਹੋਈਆਂ ਹਨ।",
  },
  {
    era: "ਅਗਲੀਆਂ ਪੀੜ੍ਹੀਆਂ",
    title: "‘ਭਾਈ ਕਿਆਂ’ ਦੇ ਨਾਂ ਨਾਲ ਪ੍ਰਸਿੱਧ ਪਰਿਵਾਰ",
    imageLabel: "[Photo Placeholder: Family lineage]",
    description:
      "ਅੱਗੇ ਚੱਲ ਕੇ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਦੇ ਵੰਸ਼ਜਾਂ ਨੇ ਸਿੱਖੀ ਵਿੱਚ ਮਹਾਨ ਕਾਰਜ ਕੀਤੇ, ਅਤੇ ਇਹੀ ਪਰਿਵਾਰ ‘ਭਾਈ ਕਿਆਂ’ ਦੇ ਨਾਂ ਨਾਲ ਪ੍ਰਸਿੱਧ ਹੋਇਆ।",
  },
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਸਪੁੱਤਰਾਂ ਨੇ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਪ੍ਰਾਪਤ ਕੀਤੀ",
    imageLabel: "[Photo Placeholder: Sri Hazur Sahib, Nanded]",
    description:
      "ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦੇ ਪੁੱਤਰ ਭਾਈ ਪਰਮ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਧਰਮ ਸਿੰਘ ਜੀ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਰਹਿ ਕੇ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਪ੍ਰਾਪਤ ਕੀਤੀ। ਭਾਈ ਪਰਮ ਸਿੰਘ ਜੀ ਦਾ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਨੰਦੇੜ ਵਿਖੇ ਦਿਹਾਂਤ ਹੋ ਗਿਆ ਅਤੇ ਭਾਈ ਧਰਮ ਸਿੰਘ ਜੀ ਗੁਰੂ ਸਾਹਿਬ ਤੋਂ ਆਗਿਆ ਲੈ ਕੇ ਵਾਪਸ ਪਿੰਡ ਆ ਗਏ।",
  },
  {
    era: "ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦਾ ਸਮਾਂ",
    title: "ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀਆਂ ਬਖ਼ਸ਼ਿਸ਼ਾਂ",
    imageLabel: "[Photo Placeholder: Pothi Sahib of Sri Guru Gobind Singh Ji]",
    description:
      "ਭਾਈ ਪਰਮ ਸਿੰਘ ਜੀ ਨੂੰ ਵਿਦਾ ਕਰਨ ਵੇਲੇ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਬਾਣੀ ਦੀ ਪੋਥੀ, ਇੱਕ ਕਿਰਪਾਨ, ਇੱਕ ਛੋਟੀ ਕਿਰਪਾਨ ਅਤੇ ਇੱਕ ਛੋਟਾ ਖੰਡਾ ਬਖ਼ਸ਼ਿਸ਼ ਕੀਤਾ। ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਦੁਮਾਲੇ ਦੇ ਸ਼ਸਤਰ ਅਤੇ ਹੋਰ ਅਨੇਕਾਂ ਬਖ਼ਸ਼ਿਸ਼ਾਂ ਵੀ ਕੀਤੀਆਂ। ਇਹ ਅੱਜ ਵੀ ਨਗਰ ਭਾਈ ਰੂਪੇ ਵਿੱਚ ਸੰਭਾਲ ਕੇ ਰੱਖੀਆਂ ਹੋਈਆਂ ਹਨ, ਅਤੇ ਕੁਝ ਨਿਸ਼ਾਨੀਆਂ — ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਹਸਤ ਲਿਖਤ ਅਤੇ ਦੁਮਾਲੇ ਦੇ ਸ਼ਸਤਰ — ਬਾਗੜੀਆਂ ਭਾਈ ਕੇ ਵਿਖੇ ਸੰਭਾਲੀਆਂ ਹੋਈਆਂ ਹਨ।",
  },
  {
    era: "ਸਾਵਣ ਵਦੀ ੧, ਸੰਮਤ ੧੭੬੬ ਬਿਕ੍ਰਮੀ (ਲੱਗਭਗ ੧੭੦੯ ਈ:)",
    title: "ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦਾ ਅਕਾਲ ਚਲਾਣਾ",
    imageLabel: "[Photo Placeholder: Bhai Ki Samadh]",
    description:
      "ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਸਾਵਣ ਵਦੀ ੧, ਸੰਮਤ ੧੭੬੬ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸਵਰਗ ਸਿਧਾਰ ਗਏ। ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਦਾ ਅੰਤਿਮ ਸਸਕਾਰ ਕੀਤਾ ਗਿਆ, ਉੱਥੇ ‘ਭਾਈ ਕੀ ਸਮਾਧ’ ਨਾਂ ਦਾ ਪਿੰਡ ਆਬਾਦ ਹੋ ਗਿਆ।",
  },
  {
    era: "ਸਥਾਨਕ ਪਰੰਪਰਾ",
    title: "‘ਗੱਡੀਆਂ ਦਾ ਧਨੀ’",
    imageLabel: "[Photo Placeholder: Bullock carts / the Beas crossing]",
    description:
      "ਸਥਾਨਕ ਪਰੰਪਰਾ ਅਨੁਸਾਰ ਪ੍ਰਚਲਤ ਹੈ ਕਿ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਸਾਲ ਵਿੱਚ ਦੋ ਵਾਰ ਗੁਰੂ ਦਰਬਾਰ ਵਿਖੇ ਮਾਲਵੇ ਵਿੱਚੋਂ ਦਸਵੰਧ ਦੀ ਕਾਰ-ਭੇਟਾ ਲੈ ਕੇ ਜਾਇਆ ਕਰਦੇ ਸਨ। ਰਸਤਾ ਅਤੀ ਔਖਿਆਈ ਦਾ ਸੀ: ਵਿਚਕਾਰ ਕਈ ਚੋਏ ਵਗਦੇ ਸਨ, ਸਤਲੁਜ ਦਰਿਆ ਵੀ ਆਉਂਦਾ ਸੀ, ਅਤੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਰਾਹ ਵਿੱਚ ਬਿਆਸ ਵੀ ਲੰਘਣਾ ਪੈਂਦਾ ਸੀ। ਇੱਕ ਵਾਰ ਕਾਰ-ਭੇਟ ਦੇ ਕਈ ਗੱਡੇ ਲੱਦ ਕੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਜਾ ਰਹੇ ਸਨ ਅਤੇ ਰਸਤੇ ਵਿੱਚ ਬਿਆਸ ਪਾਰ ਕਰਨਾ ਕਠਿਨ ਸੀ। ਸਾਰਿਆਂ ਨੇ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਅੱਗੇ ਬੇਨਤੀ ਕੀਤੀ। ਭਾਈ ਸਾਹਿਬ ਜੀ ਨੇ ਅਰਦਾਸ ਕਰ ਕੇ ਆਪਣਾ ਗੱਡਾ ਅੱਗੇ ਲਾ ਕੇ ਸਭ ਨੂੰ ਪਿੱਛੇ ਆਉਣ ਲਈ ਕਿਹਾ, ਅਤੇ ਸਾਰੇ ਸਹੀ-ਸਲਾਮਤ ਕਾਰ-ਭੇਟਾ ਲੈ ਕੇ ਗੁਰੂ ਦਰਬਾਰ ਪੁੱਜੇ। ਜਦੋਂ ਕਿਸੇ ਨੇ ਇਹ ਵਾਰਤਾ ਗੁਰੂ ਜੀ ਨੂੰ ਸੁਣਾਈ ਤਾਂ ਉਨ੍ਹਾਂ ਨੇ ਅਸੀਸ ਦੇ ਰੂਪ ਵਿੱਚ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਨੂੰ ‘ਗੱਡੀਆਂ ਦੇ ਧਨੀ’ ਕਿਹਾ। ਅੱਜ ਤੱਕ ਭਾਈ ਰੂਪਾ ਦੇ ਆਸ-ਪਾਸ ਦੇ ਇਲਾਕੇ ਵਿੱਚ ਪਰੰਪਰਾ ਹੈ ਕਿ ਗੱਡਾ, ਟਰੈਕਟਰ ਜਾਂ ਟਰਾਲੀ ਤੋਰਨ ਤੋਂ ਪਹਿਲਾਂ ਕਿਹਾ ਜਾਂਦਾ ਹੈ — “ਮੰਨ ਉੱਤੇ ਬੇਲੀਆ ਭਾਈ ਰੂਪ ਚੰਦ ਗੱਡੀਆਂ ਦੇ ਧਨੀ ਨੂੰ” — ਫਿਰ ਹੀ ਵਾਹਨ ਤੋਰਿਆ ਜਾਂਦਾ ਹੈ।",
  },
  {
    era: "੧੮ਵੀਂ ਸਦੀ ਦੇ ਸ਼ੁਰੂ",
    title: "ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦੁਰ ਦਾ ਹੁਕਮਨਾਮਾ",
    imageLabel: "[Photo Placeholder: Authentic Hukamnama Sahib]",
    description:
      "ਜਿਵੇਂ-ਜਿਵੇਂ ਪੰਜਾਬ ਵਿੱਚ ਸਿੱਖ ਰਾਜ ਸਥਾਪਿਤ ਹੋਇਆ, ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦੁਰ ਨੇ ਸੰਗਤ ਅਤੇ ਇਸ ਵੰਸ਼ ਦੇ ਯੋਗਦਾਨ ਅਤੇ ਮਾਣ ਨੂੰ ਮਾਨਤਾ ਦਿੰਦੇ ਸਰਕਾਰੀ ਹੁਕਮਨਾਮੇ ਜਾਰੀ ਕੀਤੇ।",
  },
  {
    era: "੧੯ਵੀਂ ਸਦੀ ਦੇ ਸ਼ੁਰੂ",
    title: "ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਦਾ ਸ਼ਾਹੀ ਫੁਰਮਾਨ",
    imageLabel:
      "[Photo Placeholder: Original Farman of Maharaja Ranjit Singh Ji]",
    description:
      "ਸਿੱਖ ਰਾਜ ਦੇ ਸਿਖਰ ਦੌਰਾਨ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਨੇ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦੇ ਵੰਸ਼ਜਾਂ ਦੇ ਇਤਿਹਾਸਕ ਸਤਿਕਾਰ ਅਤੇ ਸੇਵਾਦਾਰੀ ਨੂੰ ਮਾਨਤਾ ਦਿੰਦਾ ਸ਼ਾਹੀ ਫੁਰਮਾਨ ਜਾਰੀ ਕੀਤਾ।",
  },
  {
    era: "ਬਾਰਵੀਂ ਪੀੜ੍ਹੀ",
    title: "ਭਾਈ ਬਲਵੀਰ ਸਿੰਘ ਜੀ",
    imageLabel: "[Photo Placeholder: ਭਾਈ ਬਲਵੀਰ ਸਿੰਘ ਜੀ]",
    image: "/lineage/bhai-balvir-singh.jpg",
    description:
      "ਭਾਈ ਬਲਵੀਰ ਸਿੰਘ ਜੀ, ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦੀ ਬਾਰਵੀਂ ਪੀੜ੍ਹੀ। ਇਨ੍ਹਾਂ ਤੋਂ ਬਾਅਦ ਇਨ੍ਹਾਂ ਦੇ ਸਪੁੱਤਰ ਭਾਈ ਪਾਲ ਸਿੰਘ ਜੀ ਨੇ ਨਿਸ਼ਾਨੀਆਂ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਜਾਰੀ ਰੱਖੀ, ਅਤੇ ਇਸੇ ਵੰਸ਼ ਰਾਹੀਂ ਇਹ ਅਮਾਨਤ ਮੌਜੂਦਾ ਸੇਵਾਦਾਰ ਤੱਕ ਪਹੁੰਚਦੀ ਹੈ।",
  },
  {
    era: "ਅੱਜ",
    title: "ਅੱਜ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ ਅਤੇ ਵੰਸ਼ ਦੇ ਪਿੰਡ",
    imageLabel: `[Photo Placeholder: ${custodian.name} with Sacred Shastars]`,
    image: "/custodian.jpg",
    description:
      "ਅੱਜਕਲ ਬੀਬੀ ਸੁਰਤੀ ਜੀ ਅਤੇ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦੇ ਵੰਸ਼ਜ ਪਿੰਡ ਭਾਈ ਰੂਪਾ, ਭਾਈ ਕੀ ਸਮਾਧ, ਨੇਹੀਆਂਵਲਾ ਛੱਟੀ, ਭਾਈ ਕੀ ਬਾਗੜੀਆਂ ਅਤੇ ਭਾਈ ਕਾ ਦਿਆਲਪੁਰਾ ਆਦਿ ਪਿੰਡਾਂ ਵਿੱਚ ਆਬਾਦ ਹਨ। ਨਿਸ਼ਾਨੀਆਂ ਪਿੰਡ ਭਾਈ ਰੂਪੇ, ਜ਼ਿਲ੍ਹਾ ਬਠਿੰਡਾ ਵਿਖੇ ਭਾਈ ਰੂਪ ਚੰਦ ਜੀ ਦੇ ਵਾਰਸਾਂ ਪਾਸ ਮੌਜੂਦ ਹਨ, ਜੋ ਪੀੜ੍ਹੀ-ਦਰ-ਪੀੜ੍ਹੀ ਇਨ੍ਹਾਂ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਕਰ ਰਹੇ ਹਨ। ਹੁਣ ਭਾਈ ਜਸਕਰਨ ਸਿੰਘ ਨਿਸ਼ਾਨੀਆਂ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਕਰ ਰਹੇ ਹਨ ਅਤੇ ਦੇਸ਼ਾਂ-ਵਿਦੇਸ਼ਾਂ ਵਿੱਚ ਜਾ ਕੇ ਸੰਗਤ ਨੂੰ ਦਰਸ਼ਨ ਕਰਵਾ ਰਹੇ ਹਨ; ਬਾਗੜੀਆਂ ਭਾਈ ਕੇ ਵਿਖੇ ਭਾਈ ਜੁਝਾਰ ਸਿੰਘ ਸਾਂਭ-ਸੰਭਾਲ ਕਰ ਰਹੇ ਹਨ।",
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
      {/*
        Plain span, not motion.span. These were framer-motion with
        initial={{ scale: 0 }} + whileInView, and on mobile the trigger never
        fired for a 16px absolutely-positioned dot (viewport amount 0.6 is not
        reachable for it), so every dot stayed at scale(0) and the timeline rail
        appeared to have no markers at all. A dot that only exists if an
        animation fires is not worth the risk.
      */}
      <span
        className="absolute left-6 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-cream-50 bg-gold-500 shadow-[0_0_0_5px_rgba(201,162,39,0.2)] sm:left-1/2"
      />

      <div
        className={`pl-14 sm:flex sm:pl-0 ${
          isRight ? "sm:flex-row-reverse" : ""
        }`}
      >
        {/*
          Plain div with a CSS entrance, not motion.div.

          This was framer-motion with initial={{ x: ±48 }} + whileInView. The
          trigger never fired, so all 28 cards sat permanently at
          translateX(48px) — which on a 375px screen pushed them to x=407 and
          gave the page 32px of horizontal scroll, letting you drag sideways
          onto bare background. Clipping the overflow only hid the symptom.

          The replacement animates opacity and translateY only. Vertical motion
          cannot widen the page, so this class of bug cannot come back, and the
          CSS runs whether or not any observer fires.
        */}
        <div
          style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
          className="timeline-card w-full rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-xl sm:w-[calc(50%-2.5rem)] sm:p-6"
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
        </div>
      </div>
    </div>
  );
}

export default function AnimatedTimeline({
  milestones,
}: {
  milestones?: TimelineMilestone[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // An explicit `milestones` prop wins; otherwise follow the language toggle.
  const list =
    milestones ?? (language === "pa" ? milestonesPa : defaultMilestones);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-5xl px-4 py-4 sm:px-6"
    >
      <div className="absolute left-10 top-0 h-full w-px bg-navy-100 sm:left-1/2 sm:-translate-x-1/2" />
      <motion.div
        className="absolute left-10 top-0 w-px origin-top bg-gradient-to-b from-gold-400 to-gold-600 sm:left-1/2 sm:-translate-x-1/2"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />

      <div className="space-y-12">
        {list.map((milestone, index) => (
          <TimelineCard
            key={milestone.title}
            milestone={milestone}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
