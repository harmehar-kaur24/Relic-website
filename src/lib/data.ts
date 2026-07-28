export const custodian = {
  name: "Bhai Jaskaran Singh",
  village: "Bhai Rupa",
  lineageNote:
    "Of the family of Bhai Balvir Singh Ji, the 14th-generation descendants of Bhai Roop Chand Ji from village Bhai Roopa",
  instagram: "https://www.instagram.com/bhai_jaskaran_singh_g_official",
  youtube: "https://www.youtube.com/@BhaiJaskaransingh",
  /** Digits only, international format — used to build the wa.me link. */
  whatsapp: "917696670981",
  whatsappDisplay: "+91 76966 70981",
  email: "karan10cj@gmail.com",
};

export type TourStop = {
  city: string;
  region: string;
  venue: string;
  date: string;
  timings: string;
  status: "next" | "upcoming";
};

/**
 * No tour dates are currently announced. Leave this empty rather than
 * filling it with examples — the header banner, the homepage schedule
 * section and /schedule all show an 'awaiting announcement' state when
 * it is empty, and never advertise a date that does not exist.
 */
export const tourStops: TourStop[] = [];

export const relicCategories = [
  "Shastars",
  "Scriptures",
  "Royal Edicts",
  "Artwork",
  "Personal Articles",
] as const;

export type RelicCategory = (typeof relicCategories)[number];

export type Relic = {
  /** Stable unique key — titles alone collide (several Gurus share relic names). */
  id: string;
  title: string;
  associatedWith: string;
  category: RelicCategory;
  description: string;
  image: string;
};

export const relics: Relic[] = [
  {
    id: "kattar-sahib",
    title: "Kattar Sahib",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description:
      "A punch-dagger carried in the household of the sixth Guru, entrusted to the family and preserved as one of the earliest shastars in the collection.",
    image: "/relics/kattar-sahib.jpg",
  },
  {
    id: "shri-sahib",
    title: "Shri Sahib",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description:
      "This Sri Sahib was Sri Guru Hargobind Sahib Ji Maharaj's personal shastar, which they adorned daily. Following the Battle of Mehraaj, Guru Sahib blessed Bhai Roop Chand Ji with their sacred relic.",
    image: "/relics/shri-sahib.jpg",
  },
  {
    id: "puratan-teer",
    title: "Puratan Teer",
    associatedWith: "Arrows from Battle of Mehraj",
    category: "Shastars",
    description:
      "Historic arrows recovered from the Battle of Mehraj, standing as a rare physical link to the military history of the Guru's era.",
    image: "/relics/puratan-teer.jpg",
  },
  {
    id: "pothi-sahib",
    title: "Pothi Sahib",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Scriptures",
    description:
      "This Pothi Sahib belonged to Sri Guru Gobind Singh Ji Maharaj and was given to Bhai Roop Chand Ji's sons, Bhai Dharam Singh Ji and Bhai Param Singh Ji, at Takht Sri Hazur Sahib when they attained Guru Sahib's happiness.",
    image: "/relics/pothi-sahib.jpg",
  },
  {
    id: "hukamnama-sahib",
    title: "Hukamnama Sahib",
    associatedWith: "Banda Singh Bahadur",
    category: "Royal Edicts",
    description:
      "An original edict issued under Banda Singh Bahadur, documenting the family's recognized standing during a pivotal period of Sikh history.",
    image: "/relics/hukamnama-sahib.jpg",
  },
  {
    id: "farman",
    title: "Farman",
    associatedWith: "Maharaja Ranjit Singh Ji",
    category: "Royal Edicts",
    description:
      "A royal decree issued by Maharaja Ranjit Singh Ji, affirming the family's custodianship and standing within the Sikh Empire.",
    image: "/relics/farman.jpg",
  },
  {
    id: "puratan-painting",
    title: "Puratan Painting",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Artwork",
    description:
      "An early painting depicting the sixth Guru, held by the family as a rare artistic record alongside its collection of shastars and documents.",
    image: "/relics/puratan-painting.jpg",
  },
  {
    id: "ganga-sagar",
    title: "Ganga Sagar",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Personal Articles",
    description:
      "This sacred vessel bears the touch of the sixth Sovereign, Sri Guru Hargobind Sahib Ji. From 1610–1644 CE, at Sri Amritsar Sahib, Guru Sahib used this vessel to serve water to the sangat. It stands as a historic relic meant to give the sangat a message of humility and the spirit of seva.",
    image: "/relics/hargobind/ganga-sagar.jpg",
  },
  {
    id: "bata",
    title: "Bata",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Personal Articles",
    description:
      "This sacred bowl was used by the sixth Sovereign, Sri Guru Hargobind Sahib Ji, and stands as a symbol of his renunciation, heroic valour (bir-ras), and seva.",
    image: "/relics/hargobind/bata.jpg",
  },
  {
    // NOTE: a second Bata attributed to the sixth Guru. Wording from the red
    // caption on the source photo; the phone number printed alongside it is
    // deliberately not published here.
    id: "bata-2",
    title: "Bata",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Personal Articles",
    description:
      "Bata of the Sixth Sovereign (Patshahi Chhevin), in the keeping of the heir of Bhai Roop Chand Ji.",
    image: "/relics/hargobind/bata-2.jpg",
  },
  {
    id: "sheesha",
    title: "Sheesha",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Personal Articles",
    description:
      "When Sri Guru Hargobind Sahib Ji stayed at the home of Baba Bhai Roop Chand Ji, it was in this sheesha (mirror) that Guru Sahib would adorn their dastaar.",
    image: "/relics/hargobind/sheesha.jpg",
  },
  {
    id: "dhal",
    title: "Dhal",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description:
      "This dhal (shield) was used by Sri Guru Hargobind Sahib Ji in the Battle of Mehraj.",
    image: "/relics/hargobind/dhal.jpg",
  },
  {
    id: "baltohi",
    title: "Baltohi",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Personal Articles",
    description:
      "The historic baltohi (water-pot) of the sixth Sovereign, Sri Guru Hargobind Sahib Ji. This baltohi is accorded religious significance.",
    image: "/relics/hargobind/baltohi.jpg",
  },

  // --- Mata Sahiban (the Gurus' consorts) ---
  {
    id: "peerha-damodari",
    title: "Peerha Sahib",
    associatedWith: "Mata Damodari Ji",
    category: "Personal Articles",
    description:
      "The Peerha Sahib (low seat) of Mata Damodari Ji, consort of the sixth Sovereign, Sri Guru Hargobind Sahib Ji. It is preserved with the family of Bhai Roop Chand Ji at village Bhai Rupa, district Bathinda.",
    image: "/relics/more/peerha-damodari.jpg",
  },
  {
    id: "rath-ganga",
    title: "Rath Sahib",
    associatedWith: "Mata Ganga Ji",
    category: "Personal Articles",
    // The poster's heading is partly garbled; it reliably conveys only that this
    // is from Mata Ganga Ji's rath, not which part of it. Left at that.
    description:
      "From the rath (chariot) of Mata Ganga Ji, kept in the collection with respect and devotion.",
    image: "/relics/more/rath-ganga.jpg",
  },
  {
    id: "katar-sahib-deva",
    title: "Katar",
    associatedWith: "Mata Sahib Deva Ji",
    category: "Shastars",
    description:
      "The katar of Mata Sahib Deva Ji — a symbol of reverence and shakti.",
    image: "/relics/more/katar-sahib-deva.jpg",
  },

  // --- Sri Guru Angad Dev Ji ---
  {
    id: "akhari-35",
    title: "35 Akhari (Gurmukhi Alphabet)",
    associatedWith: "Sri Guru Angad Dev Ji",
    category: "Scriptures",
    description:
      "The sacred 35 Akhari — the Gurmukhi alphabet — written in the very hand of Sri Guru Angad Dev Ji, who gave the Gurmukhi script its birth.",
    image: "/relics/angad/akhari-35.jpg",
  },

  // --- Sri Guru Arjan Dev Ji ---
  {
    id: "simran-arjan",
    title: "Simran (Mala)",
    associatedWith: "Sri Guru Arjan Dev Ji",
    category: "Personal Articles",
    description:
      "The holy simran — the mala held in the hand of Sri Guru Arjan Dev Ji — kept in a gilded case within the collection. The sangat is invited to take its darshan and receive his gracious glance.",
    image: "/relics/arjan/simran.jpg",
  },

  // --- Sri Guru Gobind Singh Ji ---
  // Descriptions below are literal renderings of the family's own poster text.
  // Where a poster carried no legible explanatory note, description is left empty
  // rather than filled in from other sources.
  {
    id: "pothi-sahib-gold",
    title: "Pothi Sahib (Written in Gold)",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Scriptures",
    description:
      "This sacred Pothi Sahib belongs to Sri Guru Gobind Singh Ji, written in noble gold ink. Being highly pleased with the dedicated seva of Baba Bhai Rup Chand Ji, Guru Sahib Ji graciously blessed him with this sacred Pothi. It is more than 350 years old, believed to date to approximately 1675–1680 CE, and features intricate floral motifs and gold-leaf illumination.",
    image: "/relics/gobind/pothi-sahib-gold.jpg",
  },
  {
    id: "hukamnama-sahib-gobind",
    title: "Hukamnama Sahib",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Royal Edicts",
    description:
      "This historic Hukamnama Sahib is of Sri Guru Gobind Singh Ji. It carries special commands (adesh) for the sangat.",
    image: "/relics/gobind/hukamnama-sahib.jpg",
  },
  {
    id: "dhal-gobind",
    title: "Jangi Dhal (War Shield)",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Shastars",
    description:
      "This historical war shield is believed to be meticulously crafted from the incredibly tough hide of a seal. Its unique construction provides exceptional durability and protection. Once used by Sri Guru Gobind Singh Ji, it embodies a fusion of natural strength and spiritual warrior craft.",
    image: "/relics/gobind/dhal.jpg",
  },
  {
    id: "shri-sahib-gobind",
    title: "Shri Sahib (Small Kirpan)",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Shastars",
    description:
      "A profound heirloom and symbol of the Warrior-Saint tradition, this kirpan is attributed to the tenth Guru, exemplifying bravery, commitment to justice, and the Sikh spirit.",
    image: "/relics/gobind/shri-sahib.jpg",
  },
  {
    id: "jangi-chakkar",
    title: "Jangi Chakkar",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Shastars",
    description:
      "A glimpse of a historic chakar (war quoit) used in the Battle of Sri Chamkaur Sahib.",
    image: "/relics/gobind/jangi-chakkar.jpg",
  },
  {
    // Attribution confirmed by the family as the tenth Guru's, settling the
    // disagreement between the two posters supplied for this vessel.
    id: "karmandal",
    title: "Karmandal Sahib",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Personal Articles",
    description:
      "This ancient copper karmandal is an important symbol of Sikh history, recalling the time of the Tenth Sovereign, Sri Guru Gobind Singh Ji.",
    image: "/relics/gobind/karmandal.jpg",
  },
  {
    id: "chhota-khanda",
    title: "Chhota Khanda Sahib",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Shastars",
    description: "",
    image: "/relics/gobind/chhota-khanda.jpg",
  },
  // --- Added from the family's numbered list of loose photographs ---
  // Titles and attributions are literal renderings of that list. Where the list
  // gave only a name and no history, description is left empty rather than
  // invented. File-to-number mapping was inferred from folder order and needs
  // confirming; see the note against each dhal about possible duplicates.
  {
    id: "vaddi-sri-sahib",
    title: "Vaddi Sri Sahib",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description:
      "The Vaddi Sri Sahib — the large sword — of Sri Guru Hargobind Sahib Ji.",
    image: "/relics/hargobind/vaddi-sri-sahib.jpg",
  },
  {
    // Possible duplicate of `dhal` or `dhal-3`; awaiting confirmation.
    id: "dhal-hargobind-2",
    title: "Dhal",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description: "",
    image: "/relics/hargobind/dhal-2.jpg",
  },
  {
    // Possible duplicate of `dhal` or `dhal-2`; awaiting confirmation.
    id: "dhal-hargobind-3",
    title: "Dhal",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description: "",
    image: "/relics/hargobind/dhal-3.jpg",
  },
  {
    id: "katar-hargobind",
    title: "Katar",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description: "The katar of Sri Guru Hargobind Sahib Ji.",
    image: "/relics/hargobind/katar.jpg",
  },
  {
    // Possible duplicate of `dhal-gobind`; awaiting confirmation.
    id: "dhal-gobind-2",
    title: "Dhal",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Shastars",
    description: "",
    image: "/relics/gobind/dhal-2.jpg",
  },
  {
    id: "barchhe-gobind",
    title: "Barchhe (Spears)",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Shastars",
    description: "The barchhe (spears) of Sri Guru Gobind Singh Ji.",
    image: "/relics/gobind/barchhe.jpg",
  },
  {
    id: "pothi-sahib-puratan-hath",
    title: "Puratan Hath Pothi Sahib",
    associatedWith: "The Collection at Village Bhai Rupa",
    category: "Scriptures",
    description:
      "The puratan hath Pothi Sahib — ancient handwritten Pothi Sahib — kept wrapped in rumala within the family's collection.",
    image: "/relics/collection/pothi-sahib-puratan-hath.jpg",
  },
  {
    id: "pothi-sahib-8ft",
    title: "Eight-Foot Pothi Sahib",
    associatedWith: "The Collection at Village Bhai Rupa",
    category: "Scriptures",
    description: "A Pothi Sahib measuring eight feet in length.",
    image: "/relics/collection/pothi-sahib-8ft.jpg",
  },
  {
    id: "saroop-mani-singh",
    title: "Saroop of Adi Sri Guru Granth Sahib Ji",
    associatedWith: "Written by Bhai Mani Singh Ji",
    category: "Scriptures",
    description:
      "A saroop of Adi Sri Guru Granth Sahib Maharaj in the handwriting of Bhai Mani Singh Ji.",
    image: "/relics/collection/saroop-mani-singh.jpg",
  },
  {
    id: "sikka-ranjit-singh",
    title: "Coin bearing “Khalsa hai Akal Sahai”",
    associatedWith: "Maharaja Ranjit Singh Ji",
    category: "Royal Edicts",
    description:
      "A coin of Maharaja Ranjit Singh Ji bearing the inscription “Khalsa hai, Akal Sahai”.",
    image: "/relics/collection/sikka-ranjit-singh.jpg",
  },
  {
    id: "sikka-puratan",
    title: "Puratan Sikka (Ancient Coin)",
    associatedWith: "The Collection at Village Bhai Rupa",
    category: "Royal Edicts",
    description: "",
    image: "/relics/collection/sikka-puratan.jpg",
  },
  {
    id: "shahi-nishani",
    title: "Ink-Making Vessel",
    associatedWith: "The Collection at Village Bhai Rupa",
    category: "Personal Articles",
    description: "A puratan relic used for making shahi (ink).",
    image: "/relics/collection/shahi-nishani.jpg",
  },
];
