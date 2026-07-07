export const custodian = {
  name: "Bhai Jaskaran Singh",
  village: "Bhai Rupa",
  lineageNote:
    "Of the family of Bhai Balvir Singh Ji, the 14th-generation descendants of Bhai Roop Chand Ji from village Bhai Roopa",
  instagram: "https://www.instagram.com/bhai_jaskaran_singh_g_official",
  youtube: "https://www.youtube.com/@BhaiJaskaransingh",
};

export type TourStop = {
  city: string;
  region: string;
  venue: string;
  date: string;
  timings: string;
  status: "next" | "upcoming";
};

export const tourStops: TourStop[] = [
  {
    city: "Fresno, CA",
    region: "Central Valley",
    venue: "Gurdwara Sahib Fresno",
    date: "July 12, 2026",
    timings: "10:00 AM – 6:00 PM",
    status: "next",
  },
  {
    city: "Yuba City, CA",
    region: "Sacramento Valley",
    venue: "Tierra Buena Gurdwara",
    date: "July 26, 2026",
    timings: "9:00 AM – 5:00 PM",
    status: "upcoming",
  },
  {
    city: "Bakersfield, CA",
    region: "Kern County",
    venue: "Guru Nanak Foundation Gurdwara",
    date: "August 9, 2026",
    timings: "10:00 AM – 6:00 PM",
    status: "upcoming",
  },
  {
    city: "Phoenix, AZ",
    region: "Maricopa County",
    venue: "Guru Nanak Dwara Ashram",
    date: "August 23, 2026",
    timings: "10:00 AM – 5:00 PM",
    status: "upcoming",
  },
  {
    city: "El Paso, TX",
    region: "West Texas",
    venue: "Sikh Center of El Paso",
    date: "September 6, 2026",
    timings: "9:00 AM – 4:00 PM",
    status: "upcoming",
  },
];

export const relicCategories = [
  "Shastars",
  "Scriptures",
  "Royal Edicts",
  "Artwork",
] as const;

export type RelicCategory = (typeof relicCategories)[number];

export type Relic = {
  title: string;
  associatedWith: string;
  category: RelicCategory;
  description: string;
  image: string;
};

export const relics: Relic[] = [
  {
    title: "Kattar Sahib",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description:
      "A punch-dagger carried in the household of the sixth Guru, entrusted to the family and preserved as one of the earliest shastars in the collection.",
    image: "/relics/kattar-sahib.jpg",
  },
  {
    title: "Shri Sahib",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Shastars",
    description:
      "A ceremonial sword bestowed by the sixth Guru, carried in processions and regarded as one of the most sacred items in the family's care.",
    image: "/relics/shri-sahib.jpg",
  },
  {
    title: "Puratan Teer",
    associatedWith: "Arrows from Battle of Mehraj",
    category: "Shastars",
    description:
      "Historic arrows recovered from the Battle of Mehraj, standing as a rare physical link to the military history of the Guru's era.",
    image: "/relics/puratan-teer.jpg",
  },
  {
    title: "Pothi Sahib",
    associatedWith: "Sri Guru Gobind Singh Ji",
    category: "Scriptures",
    description:
      "A handwritten devotional volume associated with the tenth Guru, passed down within the lineage as a cherished scripture.",
    image: "/relics/pothi-sahib.jpg",
  },
  {
    title: "Hukamnama Sahib",
    associatedWith: "Banda Singh Bahadur",
    category: "Royal Edicts",
    description:
      "An original edict issued under Banda Singh Bahadur, documenting the family's recognized standing during a pivotal period of Sikh history.",
    image: "/relics/hukamnama-sahib.jpg",
  },
  {
    title: "Farman",
    associatedWith: "Maharaja Ranjit Singh Ji",
    category: "Royal Edicts",
    description:
      "A royal decree issued by Maharaja Ranjit Singh Ji, affirming the family's custodianship and standing within the Sikh Empire.",
    image: "/relics/farman.jpg",
  },
  {
    title: "Puratan Painting",
    associatedWith: "Sri Guru Hargobind Sahib Ji",
    category: "Artwork",
    description:
      "An early painting depicting the sixth Guru, held by the family as a rare artistic record alongside its collection of shastars and documents.",
    image: "/relics/puratan-painting.jpg",
  },
];
