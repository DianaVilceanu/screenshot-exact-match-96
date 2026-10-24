import type { ImgKey } from "./images";

/**
 * Services. The three "core" categories lead the page; every service from the
 * original website (Social Media, Ads & Campaigns, Printed Media, Newsletter,
 * UX/UI Design, 2D Animation) is kept as its own page.
 */
export type Service = {
  id?: string;
  slug: string;
  number: string;
  title: string;
  group: "core" | "specialist";
  short: string;
  intro: string;
  value: string[];
  offerings: string[];
  projectSlugs: string[];
  images: { key: ImgKey; alt: string }[];
  /** Shown as a dashed placeholder when examples still need to be supplied. */
  missing?: string;
  articleSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "branding",
    number: "01",
    title: "Branding & Visual Identity",
    group: "core",
    short: "Complete brand worlds, from the first mark to the way every post looks.",
    intro: "A brand is what people recognise before they read a single word. I build complete visual identities that carry from packaging to feed, as I did for Inklabs and Divaz.",
    value: [
      "A recognisable look that stays consistent across every channel.",
      "A visual system you can keep using, not a one-off logo.",
      "Branding planned together with how it will live on social media.",
    ],
    offerings: ["Complete branding", "Colour and typography direction", "Brand applications for social media"],
    projectSlugs: ["inklabs", "divaz", "caterina-tomasso"],
    images: [
      { key: "inklabs-wrapped", alt: "Inklabs Wrapped 2025 typographic post" },
      { key: "divaz-nails", alt: "Divaz press-on nail packaging" },
    ],
    articleSlugs: ["how-to-build-a-strong-visual-identity", "what-makes-a-brand-look-premium"],
  },
  {
    slug: "social-media-design",
    number: "02",
    title: "Social Media Design",
    group: "core",
    short: "Posts, carousels, banners and reels that make a feed feel like a brand.",
    intro: "Social media is where most of my recent work lives: static posts, informative carousels, sale banners and reels for brands in beauty, fashion, food, health and services.",
    value: [
      "A feed that looks intentional and is easy to recognise.",
      "Content that informs as well as sells.",
      "Formats designed for how Instagram and TikTok are actually used.",
    ],
    offerings: ["Static posts", "Informative carousels", "Promotional banners", "TikTok / Instagram reels"],
    projectSlugs: ["inklabs", "divaz", "iq-fashion", "caterina-tomasso", "farmacia-farmex", "kanoi", "mos-ilie", "dr-kurbe-clinic"],
    images: [
      { key: "divaz-galentine", alt: "Divaz Galentine's Day post" },
      { key: "farmex-4", alt: "Farmex nutrition post" },
      { key: "kanoi-2", alt: "Kanoi subscription post" },
    ],
    articleSlugs: ["how-to-create-a-consistent-instagram-feed", "how-to-make-your-social-media-design-stand-out"],
  },
  {
    slug: "content-creation",
    number: "03",
    title: "Content Creation & Art Direction",
    group: "core",
    short: "Content strategy, visual direction and video that tell the brand's story.",
    intro: "For Inklabs and Divaz I shaped the entire content strategy, not only the visuals. I also edit video, from scripted promos to cinematic clips and interview-style reels.",
    value: [
      "A clear visual direction that every piece of content follows.",
      "Content planned around the brand's story, not random trends.",
      "Video and static content that feel like one voice.",
    ],
    offerings: ["Content strategy", "Visual direction", "Video editing: promos, cinematic clips, interviews", "Reels"],
    projectSlugs: ["inklabs", "divaz", "iq-fashion", "dr-kurbe-clinic"],
    images: [
      { key: "iq-6", alt: "IQ Fashion fur coat post" },
      { key: "kurbe-1", alt: "Dr. Kurbe social content on phones" },
    ],
    articleSlugs: ["how-to-make-your-social-media-design-stand-out", "how-to-build-a-strong-visual-identity"],
  },
  {
    slug: "ads-campaigns",
    number: "04",
    title: "Ads & Campaigns",
    group: "specialist",
    short: "Campaign creative for Black Friday, launches and seasonal moments.",
    intro: "High-impact advertising visuals for fashion, automotive, tech, gift, health and energy brands, designed to stop the scroll and make the offer clear.",
    value: ["Offers that read in a second.", "Campaign sets that stay consistent across formats.", "Visual drama without losing the product."],
    offerings: ["Black Friday & sale campaigns", "Product ads", "Seasonal and gift campaigns"],
    projectSlugs: ["ads-campaigns-selection", "iq-fashion", "caterina-tomasso", "kanoi", "mos-ilie"],
    images: [
      { key: "ads-blackfriday", alt: "Black Friday car ad" },
      { key: "ads-teno", alt: "Teno controller ad" },
      { key: "ads-alpacka", alt: "Alpacka Gift lamp ad" },
    ],
    articleSlugs: ["how-to-make-your-social-media-design-stand-out"],
  },
  {
    slug: "printed-media",
    number: "05",
    title: "Printed Media",
    group: "specialist",
    short: "Packaging, flyers, brochures, posters and vouchers.",
    intro: "Print still matters, especially for clinics and products. I design packaging and promotional print that keeps the same identity as the brand's digital presence.",
    value: ["Print that matches the brand online.", "Clear information hierarchy for patients and customers.", "Production-ready layouts."],
    offerings: ["Packaging design", "Flyers & brochures", "Posters", "Vouchers & coupons"],
    projectSlugs: ["entry-robotics-kit", "global-medical-health", "dr-kurbe-clinic"],
    images: [
      { key: "robotics-mock", alt: "Entry Robotics Kit packaging" },
      { key: "kurbe-voucher", alt: "Dr. Kurbe vouchers" },
    ],
    articleSlugs: ["7-branding-mistakes-that-make-a-business-look-unprofessional"],
  },
  {
    slug: "newsletter",
    number: "06",
    title: "Newsletter",
    group: "specialist",
    short: "Email newsletters designed like small editorial pieces.",
    intro: "Newsletter layouts that carry offers and stories into the inbox with the same care as the rest of the brand.",
    value: ["Readable on any phone.", "Offers and products presented clearly.", "Consistent with the brand's campaigns."],
    offerings: ["Newsletter design"],
    projectSlugs: ["iq-fashion"],
    images: [
      { key: "newsletter-1", alt: "Fashion newsletter design" },
      { key: "newsletter-2", alt: "Promotional newsletter design" },
    ],
    articleSlugs: ["what-makes-a-brand-look-premium"],
  },
  {
    slug: "ux-ui-design",
    number: "07",
    title: "UX / UI Design",
    group: "specialist",
    short: "Clear, easy-to-use websites and apps for desktop and mobile.",
    intro: "My studies in Economic Informatics give me a technical foundation for interface work: online shops, presentation websites and app systems.",
    value: ["Clear navigation people understand.", "Designs that work on desktop and mobile.", "Interfaces that still feel like the brand."],
    offerings: ["Website UX/UI", "Online shop design", "App UI systems"],
    projectSlugs: ["floraria-mariei", "regata-print", "green-table", "vibrary"],
    images: [
      { key: "mariei", alt: "Florăria Mariei website" },
      { key: "vibrary", alt: "Vibrary app" },
    ],
    articleSlugs: ["how-to-build-a-strong-visual-identity"],
  },
  {
    slug: "2d-animation",
    number: "08",
    title: "2D Animation",
    group: "specialist",
    short: "Motion that brings static designs to life.",
    intro: "Animation has been part of my work since I expanded from illustration and branding into video editing and motion.",
    value: ["Movement that draws attention in a feed.", "Animation consistent with the brand's static design."],
    offerings: ["2D animation"],
    projectSlugs: [],
    images: [],
    missing: "[ADD 2D ANIMATION EXAMPLES. The animations on the current site are videos that need to be re-uploaded]",
    articleSlugs: ["how-to-make-your-social-media-design-stand-out"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
