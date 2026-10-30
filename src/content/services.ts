import type { ImgKey } from "./images";
import type { ReelItem } from "./projects";

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
  /** Floating device mockup shown in place of the image grid (transparent, shadow baked in). */
  mock?: { key: ImgKey; alt: string };
  /** Animated 2D scene shown instead of images (drawn in code, no media file). */
  anim?: "dog";
  /** Vertical animation clips, shown in a grid under the scene. */
  reels?: ReelItem[];
  /** Landscape explanatory animations shown below the reels. */
  clips?: ReelItem[];
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
    projectSlugs: ["inklabs", "divaz", "caterina-tomasso", "fleurane"],
    mock: { key: "service-brand", alt: "Two tablets floating side by side, showing the KDT visual identity board and the Caterina Tomasso brand book cover" },
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
    projectSlugs: ["inklabs", "divaz", "iq-fashion", "caterina-tomasso", "farmacia-farmex", "kanoi", "mos-ilie", "dr-kurbe-clinic", "art-innova", "optica-tei", "selfconsulting", "ths-organic"],
    mock: { key: "service-social", alt: "Two phones floating side by side: an Instagram feed post for Divaz and a Farmex story" },
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
    projectSlugs: ["inklabs", "divaz", "iq-fashion", "dr-kurbe-clinic", "selfconsulting", "ths-organic"],
    mock: { key: "service-content", alt: "A laptop showing the Dr. Kurbe visual identity with a phone in front of it showing an Inklabs Instagram post" },
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
    projectSlugs: ["ads-campaigns-selection", "iq-fashion", "caterina-tomasso", "kanoi", "mos-ilie", "art-innova", "optica-tei", "ths-organic"],
    mock: { key: "service-ads", alt: "Three Meta feed ads side by side: a Canvas Dreams Black Friday portrait ad, a Teno wireless controller ad and an Alpacka Gift lamp ad" },
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
    projectSlugs: ["nextlab-tech", "global-medical-health", "dr-kurbe-clinic", "fleurane"],
    mock: { key: "service-print", alt: "Printed pieces in situ: Moș Ilie flyers, IQ Fashion thank-you flyers with a QR code and Dr. Kurbe discount vouchers" },
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
    mock: { key: "service-newsletter", alt: "Two laptops showing email newsletters in an inbox: IQ Fashion and Tapet Autoadeziv by Canvas Dreams" },
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
    mock: { key: "service-uxui", alt: "A laptop showing the Green Table website and a phone showing the Vibrary app" },
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
    anim: "dog",
    reels: [
      { key: "anim-reel-1", title: "Customize your workspace: a toggle animation for Fuse Digital" },
      { key: "anim-reel-2", title: "Track the time you dedicate to a project: an animated chart" },
      { key: "anim-reel-3", title: "How can you tell if you had a great day at work?" },
      { key: "anim-reel-4", title: "Are you ready to boost your business performance?" },
    ],
    clips: [
      { key: "nextlab-clip-2", title: "Algorithms, explained with a smoothie recipe" },
      { key: "nextlab-clip-3", title: "Variables and the memory of a computer" },
      { key: "nextlab-clip-4", title: "Peripheral devices: input and output" },
      { key: "nextlab-clip-6", title: "Python lists and indexing" },
      { key: "nextlab-clip-7", title: "Malware, antivirus and strong passwords" },
      { key: "nextlab-clip-8", title: "NEXTLAB.TECH presentation for the educational platform" },
    ],
    images: [],
    articleSlugs: ["how-to-make-your-social-media-design-stand-out"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
