/**
 * Niches: five broad worlds the projects are grouped into, so visitors can browse by the kind of
 * business instead of by service. A project can belong to more than one niche. New projects only
 * need a line in NICHE_OF; the filters and the home page pick them up.
 */
export type NicheId = "food" | "health" | "beauty" | "lifestyle" | "tech";

export const nicheIds: NicheId[] = ["food", "health", "beauty", "lifestyle", "tech"];

export const NICHE_OF: Record<string, NicheId[]> = {
  "mos-ilie": ["food"],
  "green-table": ["food"],
  "farmacia-farmex": ["health"],
  "global-medical-health": ["health"],
  "dr-kurbe-clinic": ["health", "beauty"],
  "art-innova": ["health"],
  "optica-tei": ["health"],
  divaz: ["beauty"],
  inklabs: ["beauty"],
  fleurane: ["beauty"],
  "iq-fashion": ["lifestyle"],
  "caterina-tomasso": ["lifestyle"],
  kanoi: ["lifestyle"],
  "floraria-mariei": ["lifestyle"],
  "ads-campaigns-selection": ["lifestyle"],
  "kdt-romania": ["tech"],
  selfconsulting: ["tech"],
  "regata-print": ["tech"],
  "nextlab-tech": ["tech"],
  vibrary: ["tech"],
};

export const nichesOf = (slug: string): NicheId[] => NICHE_OF[slug] ?? [];

type Copy = {
  eyebrow: string;
  h1: string;
  h2: string;
  lede: string;
  all: string;
  filterAria: string;
  browse: string;
  count: (n: number) => string;
  names: Record<NicheId, string>;
  blurbs: Record<NicheId, string>;
};

export const nicheCopy: Record<"en" | "ro", Copy> = {
  en: {
    eyebrow: "Niches",
    h1: "Worlds I ",
    h2: "design for.",
    lede: "Different businesses, one way of working: a clear identity and content that looks like the brand. Pick a world to see the projects.",
    all: "All niches",
    filterAria: "Filter projects by niche",
    browse: "Browse by niche",
    count: (n) => `${n} ${n === 1 ? "project" : "projects"}`,
    names: { food: "Food & Drink", health: "Health & Care", beauty: "Beauty & Skincare", lifestyle: "Fashion & Lifestyle", tech: "Industry & Tech" },
    blurbs: {
      food: "Traditional pastries and healthy meals that look as good as they taste.",
      health: "Clinics, dental practices, opticians and pharmacies that need to feel clear and trustworthy.",
      beauty: "Cosmetics, tattoos and skincare with a polished, desirable finish.",
      lifestyle: "Fashion, silver, flowers and shoe care: boutiques and brands built on taste.",
      tech: "Machines, engineering, printing, education and software, explained without the jargon.",
    },
  },
  ro: {
    eyebrow: "Nișe",
    h1: "Lumile pentru care ",
    h2: "creez.",
    lede: "Afaceri diferite, un singur mod de lucru: o identitate clară și conținut care arată ca brandul. Alege o lume ca să vezi proiectele.",
    all: "Toate nișele",
    filterAria: "Filtrează proiectele după nișă",
    browse: "Explorează pe nișe",
    count: (n) => `${n} ${n === 1 ? "proiect" : "proiecte"}`,
    names: { food: "Mâncare & băuturi", health: "Sănătate & îngrijire", beauty: "Beauty & skincare", lifestyle: "Fashion & lifestyle", tech: "Industrie & tehnologie" },
    blurbs: {
      food: "Produse de patiserie tradiționale și mese sănătoase care arată pe atât de bine pe cât sunt de bune.",
      health: "Clinici, cabinete stomatologice, optici și farmacii care trebuie să transmită claritate și încredere.",
      beauty: "Cosmetice, tatuaje și skincare cu un aspect șlefuit și dorit.",
      lifestyle: "Modă, argint, flori și îngrijirea încălțămintei: boutique-uri și branduri construite pe gust.",
      tech: "Utilaje, inginerie, tipar, educație și software, explicate fără jargon.",
    },
  },
};
