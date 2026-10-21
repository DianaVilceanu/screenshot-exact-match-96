import type { ImgKey } from "./images";
import type { ReelKey } from "./reels";

/**
 * Portfolio content. Descriptions are taken from the original website.
 * Anything written in [SQUARE BRACKETS] is a placeholder Diana must replace
 * with verified information — it renders with a dashed "placeholder" frame.
 */

export type Category = "Branding" | "Social Media" | "Ads & Campaigns" | "Print" | "UX / UI" | "Art Direction";
export type Theme = "inklabs" | "divaz" | "kdt";

export type GalleryItem = { key: ImgKey; alt: string };
export type ReelItem = { key: ReelKey; title: string };
export type Carousel = { title: string; slides: GalleryItem[] };

export type BrandGuidelines = {
  overview: string;
  slogan: string;
  logo: GalleryItem;
  colors: { name: string; hex: string }[];
  fonts: { primary: string[]; secondary: string[] };
  photography: GalleryItem[];
  voice: string;
  pillars: { title: string; text: string; keywords: string[] }[];
};

export type CaseStudy = {
  theme: Theme;
  tagline: string;
  brief: string[];
  direction: { title: string; text: string }[];
  palette?: { name: string; className: string }[];
  /** Process material is never invented — leave empty to show a placeholder. */
  process: GalleryItem[];
  results: string[];
  testimonial: { quote: string; author: string };
  /** Brand guidelines delivered for the project, shown as their own section. */
  guidelines?: BrandGuidelines;
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  categories: Category[];
  industry: string;
  services: string[];
  deliverables: string[];
  summary: string;
  description: string[];
  cover?: GalleryItem;
  gallery: GalleryItem[];
  /** Vertical video reels, shown after the static deliverables. */
  reels?: ReelItem[];
  /** Multi-slide social posts, shown slide by slide after the statics. */
  carousels?: Carousel[];
  serviceSlugs: string[];
  featured?: boolean;
  /** Draft projects are hidden from search engines until real content is added. */
  draft?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "inklabs",
    name: "Inklabs",
    client: "Inklabs",
    categories: ["Branding", "Social Media", "Art Direction"],
    industry: "Beauty, semi-permanent tattoos",
    services: ["Brand identity", "Content strategy", "Social media design", "Reels"],
    deliverables: ["Complete branding", "Static posts", "Promotional banners", "TikTok / Instagram reels"],
    summary: "A loud, yellow-and-black identity proving tattoos don't have to be forever.",
    description: [
      "Inklabs is an innovative brand redefining self-expression through premium semi-permanent tattoos.",
      "For this brand, I developed the complete branding, alongside the entire content strategy and social media presence. I created a variety of social media visuals, including informative static posts, high-impact promotional banners, and engaging TikTok/Instagram reels showcasing both individual designs and the brand's unique story.",
      "My work helped build and strengthen Inklabs' bold online identity, bringing a dynamic, authentic, and highly engaging visual presence to their digital platforms, ultimately proving that tattoos don't have to be \"forever.\"",
    ],
    cover: { key: "inklabs-cover", alt: "Woman in a white top with a large bird tattoo on her upper arm, against a yellow background" },
    gallery: [
      { key: "inklabs-main", alt: "Inklabs social post: tattooed hand on black with 'Made for main character' headline" },
      { key: "inklabs-wrapped", alt: "Inklabs Wrapped 2025 yellow typographic post" },
      { key: "inklabs-stop", alt: "Inklabs 'Stop scrolling for tattoos' yellow ad with scorpion design" },
      { key: "inklabs-300-designs", alt: "Inklabs post on black: over 300 designs, with a winking bull mascot holding tattoo cards and a list of styles" },
      { key: "inklabs-launch", alt: "Inklabs launch calendar post listing European countries" },
      { key: "inklabs-forever", alt: "Inklabs infographic explaining the semi-permanent tattoo" },
      { key: "inklabs-offer", alt: "Inklabs bundle offer graphic on black with tattoo cards" },
      { key: "inklabs-returns", alt: "Inklabs Wrapped post: zero returns over a black-and-white tattoo photo" },
      { key: "inklabs-profit", alt: "Inklabs 'Profit from the offer' yellow and black post" },
      { key: "inklabs-clients", alt: "Inklabs Wrapped post: over 50,000 tattooed customers" },
      { key: "inklabs-soon", alt: "Inklabs 'Coming soon' launch dates post" },
      { key: "inklabs-notes", alt: "Inklabs Wrapped closing post on black with yellow halftone" },
    ],
    reels: [
      { key: "inklabs-reel-1", title: "The result: a deep, natural black" },
      { key: "inklabs-reel-2", title: "How Inklabs tattoos work" },
      { key: "inklabs-reel-3", title: "From stencil to compass tattoo" },
      { key: "inklabs-reel-4", title: "Tattoos in the riskiest spots" },
    ],
    serviceSlugs: ["branding", "social-media-design", "content-creation"],
    featured: true,
    caseStudy: {
      theme: "inklabs",
      tagline: "Tattoos don't have to be forever.",
      brief: [
        "Inklabs needed a complete brand and a social presence built from zero: branding, content strategy and the full stream of social content across Instagram and TikTok.",
      ],
      direction: [
        { title: "A two-colour system", text: "Electric yellow and deep black do all the work. The contrast makes posts recognisable in a feed within a fraction of a second." },
        { title: "Heavy, compact type", text: "Condensed, bold headlines speak with the confidence of the brand: short, direct and a little cheeky." },
        { title: "Real skin, real designs", text: "Photography of the tattoos on real hands and arms keeps the product honest and tangible." },
      ],
      process: [
        { key: "inklabs-moodboard", alt: "Inklabs moodboard: tattoo photography on real skin, the yellow #FFDF01, the wordmark, the slogan, tone-of-voice keywords and a product post" },
      ],
      results: [
        "Over 50,000 customers have tried Inklabs tattoos, as the brand shared in its Inklabs Wrapped year-in-review.",
        "Zero returns, highlighted in the same year-end recap.",
        "Launches in several European countries, announced on social media with the same yellow-and-black identity.",
      ],
      testimonial: {
        quote:
          "Diana got what we wanted to say right away. The yellow-and-black identity makes us instantly recognisable in the feed, and the content reached exactly the right people. Working together was easy, fast and always full of fresh ideas.",
        author: "Administrator, Inklabs",
      },
      guidelines: {
        overview:
          "Inklabs is a dynamic lifestyle brand dedicated to the art of self-expression through high-quality, semi-permanent tattoos. Bridging the gap between fleeting temporary stickers and permanent ink, the brand offers a realistic, pain-free alternative that lasts up to two weeks. Its identity is rooted in creativity, innovation and authenticity, with designs crafted by real artists that adapt to each wearer's style.",
        slogan: "Temporary tattoos that change your vibe.",
        logo: { key: "inklabs-logo-system", alt: "Inklabs logo system: the wordmark in white, black and yellow, and the diamond-dotted i icon in three colourways" },
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Yellow", hex: "#FFDF01" },
          { name: "Black", hex: "#000000" },
        ],
        fonts: { primary: ["Campton Black", "Poppins Black"], secondary: ["Oswald", "Poppins Regular"] },
        photography: [
          { key: "inklabs-photo-cross", alt: "Small black cross tattoo on a forearm in warm light" },
          { key: "inklabs-photo-birds", alt: "Flock of small birds tattooed across a collarbone" },
          { key: "inklabs-photo-compass", alt: "Compass and arrow tattoo along a forearm" },
          { key: "inklabs-photo-caduceus", alt: "Winged caduceus tattoo on a forearm" },
        ],
        voice:
          "The Inklabs voice is the perfect mix of artistic rebellion and modern reliability. It speaks like a trendsetting friend: someone who encourages you to take risks and express yourself, but is also honest, safe and professional when it comes to the details.",
        pillars: [
          {
            title: "Empowering & bold",
            text: "We don't just sell \"stickers\"; we provide a medium for self-discovery. Our language is high-energy and inspiring, focusing on the freedom to change your mind and your look.",
            keywords: ["Expression", "fearless", "canvas", "evolution", "vibe"],
          },
          {
            title: "Approachable & relatable",
            text: "We speak \"Gen Z/Millennial\" fluently but naturally. We avoid corporate jargon and formal stiffness. We use a \"you and us\" conversational style that feels personal and inclusive.",
            keywords: ["Real", "commitment-free", "effortless", "fresh", "mood"],
          },
          {
            title: "Transparent & trustworthy",
            text: "Because our product touches your skin, we switch to a clear, informative and reassuring tone when discussing safety and application. We are the experts, so we speak with calm confidence.",
            keywords: ["Skin-safe", "organic-based", "dermatologically tested", "precision"],
          },
        ],
      },
    },
  },
  {
    slug: "divaz",
    name: "Divaz",
    client: "Divaz",
    categories: ["Branding", "Social Media", "Art Direction"],
    industry: "Beauty, cosmetics & press-on nails",
    services: ["Brand identity", "Content strategy", "Social media design", "Reels"],
    deliverables: ["Complete branding", "Static carousels", "Sale campaign banners", "TikTok / Instagram reels"],
    summary: "A blush-pink beauty world that makes a premium look feel accessible.",
    description: [
      "Divaz is a modern beauty brand redefining personal style through accessible, high-quality cosmetics and instant gel press-on nails.",
      "For this brand, I developed the complete branding, alongside the entire content strategy and social media presence. I created a variety of engaging visual assets, including informative static carousels, high-impact promotional banners for sales campaigns, and captivating TikTok/Instagram reels.",
      "My work helped build and strengthen Divaz's bold online identity, bringing a dynamic, vibrant, and highly interactive visual presence to their digital platforms, ultimately proving that a premium beauty look can be accessible to everyone.",
    ],
    cover: { key: "divaz-cover", alt: "Pink Divaz instant-gel press-on nail boxes in a range of shades" },
    gallery: [
      { key: "divaz-nails", alt: "Divaz instant gel press-on nail boxes on blush pink" },
      { key: "divaz-galentine", alt: "Divaz Galentine's Day campaign with lipstick in a cocktail glass" },
      { key: "divaz-sale", alt: "Divaz 50% off makeup campaign with product box" },
      { key: "divaz-gloss35", alt: "Divaz lip gloss with berries and ice cream" },
      { key: "divaz-rosu", alt: "Divaz 'Roșu lucios' red press-on nails post" },
      { key: "divaz-blue", alt: "Divaz 'Stellar Blue' press-on nails post" },
      { key: "divaz-2026", alt: "Divaz 'Which nails will win 2026?' post" },
      { key: "divaz-lips", alt: "Divaz lip comparison post with model" },
      { key: "divaz-flavour", alt: "Divaz 'Choose your favourite flavour' lip gloss sale post" },
      { key: "divaz-gloss14", alt: "Divaz lip gloss shade 14 with berries" },
      { key: "divaz-combo", alt: "Divaz budget lip combo carousel cover" },
      { key: "divaz-feed-1", alt: "Divaz Instagram grid screenshot" },
      { key: "divaz-feed-2", alt: "Divaz Instagram grid screenshot with product posts" },
    ],
    serviceSlugs: ["branding", "social-media-design", "content-creation"],
    featured: true,
    caseStudy: {
      theme: "divaz",
      tagline: "A premium beauty look, accessible to everyone.",
      brief: [
        "Divaz needed complete branding plus the content strategy and social media presence to launch cosmetics and instant gel press-on nails.",
        "[ADD ORIGINAL CLIENT BRIEF: the client's exact request, audience and constraints]",
      ],
      direction: [
        { title: "Soft, edible colour", text: "Blush, rose and berry tones turn every product shot into something you want to taste, like gloss next to ice cream and fruit." },
        { title: "Packaging as hero", text: "The pink Divaz boxes become a recurring graphic device, anchoring campaigns and carousels." },
        { title: "Carousels that teach", text: "Informative carousels sit next to sale banners so the feed educates as well as sells." },
      ],
      palette: [
        { name: "Blush", className: "bg-background border border-border" },
        { name: "Rose", className: "bg-accent" },
        { name: "Berry", className: "bg-primary" },
      ],
      process: [],
      results: ["[ADD VERIFIED PROJECT OUTCOME]", "[ADD PERFORMANCE METRICS]"],
      testimonial: { quote: "[CLIENT TESTIMONIAL TO BE ADDED]", author: "[CLIENT NAME / ROLE]" },
    },
  },
  {
    slug: "kdt-romania",
    name: "KDT Romania",
    client: "KDT Romania",
    categories: ["Social Media", "Art Direction"],
    industry: "Industrial, woodworking machinery",
    services: ["Social media strategy", "Visual identity for social media", "Content creation", "Video scripting, filming and editing"],
    deliverables: ["Strategy for Facebook, Instagram, TikTok and YouTube", "Static posts", "Carousels", "Reels and YouTube videos", "Event campaigns"],
    summary: "Social media built from zero for the Romanian branch of an international machinery brand.",
    description: [
      "KDT Romania is the Romanian branch of KDT, an international brand of woodworking machinery for furniture makers, from CNC machines to edgebanders and drilling lines.",
      "When I started working with them, the Romanian branch had no social media and no visual identity of its own. I took on their whole presence from zero: the strategy for Facebook, Instagram, TikTok and YouTube, scripting, filming and editing video, and premium graphics for every post.",
      "Because KDT is a franchise, I studied how the brand shows up in other countries and built a local system on the same foundations, so KDT Romania looks like part of the global brand while speaking directly to Romanian furniture makers.",
    ],
    cover: { key: "kdt-cover", alt: "KDT Drill Tech machine on the KDT Global stand at a trade fair" },
    gallery: [
      { key: "kdt-perfect", alt: "KDT post: perfect from the first cut, over a close-up of an edgebanded board" },
      { key: "kdt-results", alt: "KDT post: we don't just sell machines, we deliver results, over stacked boards" },
      { key: "kdt-myth", alt: "KDT myth versus reality post about CNC machines, on KDT blue" },
      { key: "kdt-testimonial", alt: "KDT client testimonial post: productivity up 40%, five stars" },
      { key: "kdt-people", alt: "KDT post: people give technology its value, with technicians next to a machine" },
    ],
    carousels: [
      {
        title: "Open days at the new showroom",
        slides: [
          { key: "kdt-open-days-1", alt: "Carousel slide: KDT open days at the new Bucharest-Ilfov showroom, 12 to 13 June 2026" },
          { key: "kdt-open-days-2", alt: "Carousel slide: when and where, with the showroom address and opening hours" },
        ],
      },
      {
        title: "PUR edgebanding in Sighetu Marmației",
        slides: [
          { key: "kdt-pur-1", alt: "Carousel slide: flawless edgebanding, PUR technology brought to Sighetu Marmației" },
          { key: "kdt-pur-2", alt: "Carousel slide: the KDT KE-710BT installed by the technical team" },
          { key: "kdt-pur-3", alt: "Carousel slide: perfect finishes with PUR glue" },
        ],
      },
      {
        title: "Why KDT Romania?",
        slides: [
          { key: "kdt-why-1", alt: "Carousel slide: why KDT Romania, under the KDT sign" },
          { key: "kdt-why-2", alt: "Carousel slide: industrial technology built for heavy use" },
          { key: "kdt-why-3", alt: "Carousel slide: technical consulting at every step, in the KDT showroom" },
        ],
      },
    ],
    serviceSlugs: ["social-media-design", "content-creation"],
    featured: true,
    caseStudy: {
      theme: "kdt",
      tagline: "Results, not just machines.",
      brief: [
        "KDT Romania, the local branch of an international woodworking machinery brand, had no social media and no visual identity in Romania. They needed a presence built from zero on Facebook, Instagram, TikTok and YouTube that stayed true to the global brand and spoke clearly to Romanian furniture makers.",
      ],
      direction: [
        { title: "Global brand, local voice", text: "The KDT blue, the logo and clean layouts follow the brand's pages in other countries, so the Romanian channels feel part of the same family. The copy is written for Romanian workshops." },
        { title: "Real machines, real workshops", text: "Photos and videos from installations, the showroom and the team show the machines at work in Romanian factories, not just as catalogue images." },
        { title: "One clear message per post", text: "Short, bold headlines and a single benefit per post, from myth versus reality to open days, make technical topics easy to follow." },
      ],
      process: [
        { key: "kdt-moodboard", alt: "KDT moodboard: KDT blue #3F62AA, navy and white, the logo, a sample headline, key messages, and photos of the team, showroom and finished boards" },
      ],
      results: [
        "A social media presence launched from zero on Facebook, Instagram, TikTok and YouTube.",
        "A consistent visual system for the Romanian branch, aligned with KDT's international pages.",
        "Campaigns for real moments, such as the open days at the new Bucharest-Ilfov showroom and machine installations across Romania.",
      ],
      testimonial: { quote: "[CLIENT TESTIMONIAL TO BE ADDED]", author: "[CLIENT NAME / ROLE]" },
    },
  },
  {
    slug: "iq-fashion",
    name: "IQ Fashion",
    client: "IQ Fashion",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Fashion, premium boutique",
    services: ["Social media design", "Video editing"],
    deliverables: ["Static posts", "Promotional banners", "Scripted & cinematic video edits"],
    summary: "Refined, fashion-forward visuals for elegant dresses and luxurious furs.",
    description: [
      "IQ Fashion is a premium boutique brand offering elegant dresses, luxurious furs, and high-end fashion pieces designed for modern, confident women.",
      "For IQ Fashion, I created a variety of social media visuals, including stylish static posts and product-focused promotional banners. I also edited video content ranging from catchy, scripted promos to cinematic-style clips that highlight the quality and sophistication of their collections.",
      "My work contributed to elevating the brand's digital presence, bringing a refined, fashion-forward identity to their online platforms.",
    ],
    cover: { key: "iq-cover", alt: "Hands holding a blush shirt dress on a hanger beside a rail of terracotta clothes" },
    gallery: [
      { key: "iq-5", alt: "IQ Fashion Black Friday fur coat post with gold accents" },
      { key: "iq-1", alt: "IQ Fashion Alpaca coat holiday sale post" },
      { key: "iq-2", alt: "IQ Fashion parka holiday post" },
      { key: "iq-3", alt: "IQ Fashion Dalisa tunic product post" },
      { key: "iq-4", alt: "IQ Fashion beige alpaca coat post" },
      { key: "iq-6", alt: "IQ Fashion 'Elsa Silver' natural fur coat post" },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns"],
  },
  {
    slug: "dr-kurbe-clinic",
    name: "Dr. Kurbe Clinic",
    client: "Dr. Kurbe Clinic, Nada Kurbe & Mawada Kurbe",
    categories: ["Social Media"],
    industry: "Aesthetics & wellness",
    services: ["Social media design", "Video editing"],
    deliverables: ["Informative & promotional banners", "TikTok / Instagram reels", "Interview-style videos"],
    summary: "Cohesive social content for a clinic and its founders' personal brands.",
    description: [
      "Dr. Kurbe Clinic is a modern aesthetic and wellness center focused on personalized care and natural results.",
      "For the clinic, as well as for Nada Kurbe and Mawada Kurbe's personal brands, I created a wide range of social media content: from informative and promotional banners to TikTok and Instagram reels showcasing treatments, behind-the-scenes moments, and interview-style videos.",
      "My work contributed to building a cohesive, engaging, and visually appealing online presence across all platforms.",
    ],
    cover: { key: "kurbe-clinic-cover", alt: "Woman with closed eyes receiving a facial laser treatment" },
    gallery: [
      { key: "kurbe-2", alt: "Dr. Kurbe PRP therapy benefits post" },
      { key: "kurbe-1", alt: "Dr. Kurbe social posts shown on phone mockups" },
    ],
    serviceSlugs: ["social-media-design", "content-creation"],
  },
  {
    slug: "mos-ilie",
    name: "Moș Ilie",
    client: "Moș Ilie",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Food, traditional pastries",
    services: ["Social media design", "Reels"],
    deliverables: ["Informative posts", "Seasonal promotional banners", "TikTok / Instagram reels"],
    summary: "Warm, nostalgic visuals for handcrafted Romanian pastries.",
    description: [
      "Ilie is a traditional Romanian brand known for its handcrafted pastries and homemade delicacies inspired by authentic family recipes.",
      "For the brand, I created a variety of social media visuals, including informative static posts, promotional banners highlighting seasonal and signature products, and TikTok/Instagram reels showcasing both individual items and the brand's story.",
      "My work helped strengthen Moș Ilie's online identity, bringing a warm, nostalgic, and engaging visual presence to their digital platforms.",
    ],
    cover: { key: "ilie-cover", alt: "Smiling baker in black gloves filling a paper bag with cookies from glass jars" },
    gallery: [
      { key: "ilie-5", alt: "Moș Ilie 'Tradition and good taste' cookies and jam post" },
      { key: "ilie-1", alt: "Moș Ilie Black Friday hamper post" },
      { key: "ilie-2", alt: "Moș Ilie Black Friday jar post" },
      { key: "ilie-3", alt: "Moș Ilie holiday pastries post" },
      { key: "ilie-4", alt: "Moș Ilie pistachio spread product post" },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns"],
  },
  {
    slug: "farmacia-farmex",
    name: "Farmacia Farmex",
    client: "Farmacia Farmex",
    categories: ["Social Media"],
    industry: "Healthcare, pharmacy",
    services: ["Social media design", "Video"],
    deliverables: ["Product banners", "Informative health posts", "Promotional & educational video clips"],
    summary: "Clear, accessible health communication for a community pharmacy.",
    description: [
      "Farmacia Farmex is a trusted pharmaceutical brand dedicated to offering professional guidance, high-quality products, and accessible health solutions to its community.",
      "For Farmex, I developed a wide range of social media content, including promotional product banners, informative static posts about both health topics and specific treatments, as well as engaging video clips for product promotion and educational, pharmacy-related topics.",
      "Through these visuals, I helped strengthen the brand's digital presence and communicate essential health information in a clear, accessible, and visually engaging way.",
    ],
    cover: { key: "farmex-cover", alt: "Stethoscope beside blister packs and pills on a sage green background" },
    gallery: [
      { key: "farmex-4", alt: "Farmex green post with nutrition advice" },
      { key: "farmex-1", alt: "Farmex winter vitamins post" },
      { key: "farmex-2", alt: "Farmex giveaway post" },
      { key: "farmex-3", alt: "Farmex nail fungus information post" },
      { key: "farmex-5", alt: "Farmex Omron blood pressure monitor post" },
    ],
    serviceSlugs: ["social-media-design"],
  },
  {
    slug: "kanoi",
    name: "Kanoi",
    client: "Kanoi",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Shoe care & restoration services",
    services: ["Social media design"],
    deliverables: ["Service banners", "Subscription offers", "Seasonal campaigns", "Informative posts"],
    summary: "A clean, service-focused identity for premium shoe care.",
    description: [
      "Kanoi is a professional shoe-care and restoration brand offering premium cleaning services, subscription packages, and seasonal maintenance solutions.",
      "For Kanoi, I designed a wide range of static social media visuals, including promotional banners for their cleaning services, subscription offers, seasonal campaigns, and informative posts about footwear care.",
      "My work helped the brand establish a clean, consistent, and service-focused digital identity that clearly communicates value and expertise to its audience.",
    ],
    cover: { key: "kanoi-cover", alt: "Pink sneakers next to a shoe brush in soapy water and a cleaning bottle, on pale blue" },
    gallery: [
      { key: "kanoi-2", alt: "Kanoi 365 subscription Black Friday post" },
      { key: "kanoi-1", alt: "Kanoi sneaker cleaning post" },
      { key: "kanoi-3", alt: "Kanoi 7 November offer post" },
      { key: "kanoi-4", alt: "Kanoi St. Nicholas boots campaign" },
      { key: "kanoi-5", alt: "Kanoi boot cleaning winter post" },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns"],
  },
  {
    slug: "ads-campaigns-selection",
    name: "Ads & Campaigns",
    client: "Various brands",
    categories: ["Ads & Campaigns"],
    industry: "Retail, automotive, tech, gifts, health, energy",
    services: ["Campaign design", "Paid social creative"],
    deliverables: ["Black Friday campaigns", "Product ads", "Seasonal & gift ads"],
    summary: "A selection of campaign creative for fashion, auto, tech, gift and health brands.",
    description: [
      "A selection of advertising and campaign visuals created for a range of brands: fashion ads, automotive offers, tech products, personalised gifts, health products and energy services.",
    ],
    cover: { key: "ads-cover", alt: "Three story ads: a terracotta sofa with a curved promo banner, a silhouette framed by organic shapes and a gift guide" },
    gallery: [
      { key: "ads-blackfriday", alt: "Black Friday car offer ad with red and black layout" },
      { key: "ads-zaire", alt: "Zaire Black Friday fashion ad" },
      { key: "ads-cadenzza", alt: "Cadenzza casual shoes ad" },
      { key: "ads-astrid", alt: "Astrid new collection fur coat ad" },
      { key: "ads-meili", alt: "Meili Black Friday coat ad" },
      { key: "ads-ths", alt: "THS Organic immunity product ad" },
      { key: "ads-teno", alt: "Teno wireless controller ad on purple" },
      { key: "ads-alpacka", alt: "Alpacka Gift neon lamp ad" },
      { key: "ads-xauto", alt: "X Auto Black Friday car ad" },
      { key: "ads-canvas", alt: "Canvas Dreams personalised portrait ad" },
      { key: "ads-newhair", alt: "THS Organic NewHair product ad" },
      { key: "ads-solar", alt: "Solar lamp product ad" },
      { key: "ads-hyt", alt: "HYT Energy solar services ad" },
      { key: "ads-laoferta", alt: "La Oferta gadgets ad" },
      { key: "ads-lifeskin", alt: "THS LifeSkin benefits ad" },
      { key: "ads-lifepo", alt: "LiFePO4 battery Black Friday ad" },
      { key: "ads-lamp", alt: "3D reindeer lamp holiday ad" },
      { key: "ads-zaire-2", alt: "Zaire children's dress Black Friday ad" },
      { key: "ads-cadenzza-2", alt: "Cadenzza boots ad" },
      { key: "ads-renault", alt: "Renault Clio car offer ad" },
      { key: "ads-rca", alt: "Car insurance app ad" },
      { key: "ads-teno-2", alt: "Teno multifunctional speaker ad" },
    ],
    serviceSlugs: ["ads-campaigns"],
  },
  {
    slug: "entry-robotics-kit",
    name: "Entry Robotics Kit",
    client: "Entry Robotics Kit",
    categories: ["Print"],
    industry: "STEM education",
    services: ["Packaging design"],
    deliverables: ["Full box packaging: front, back, top, bottom and sides"],
    summary: "Clear, educational packaging for a beginner robotics kit.",
    description: [
      "The Entry Robotics Kit is an educational STEM set designed to introduce beginners to the basics of electronics, programming, and simple robotics. It offers students an accessible way to explore technology and develop problem-solving skills through hands-on experimentation.",
      "For this product, I created the full print packaging design for the box, including the front, back, top, bottom, and side panels. The design blends clean layouts, educational elements, and brand-consistent visuals to present the kit in a professional, engaging, and easy-to-understand way.",
    ],
    cover: { key: "robotics-cover", alt: "Purple Entry Starter Kit boxes by NextLab.tech with a microcontroller board on acrylic risers" },
    gallery: [
      { key: "robotics-mock", alt: "Entry Robotics Kit box packaging mockup" },
      { key: "robotics-flat", alt: "Entry Robotics Kit flat packaging panels" },
      { key: "robotics-box", alt: "Entry Robotics Kit box render" },
    ],
    serviceSlugs: ["printed-media"],
  },
  {
    slug: "global-medical-health",
    name: "Global Medical Health",
    client: "Global Medical Health (GMH)",
    categories: ["Print"],
    industry: "Healthcare, diagnostic imaging",
    services: ["Print design"],
    deliverables: ["Flyers", "Brochures", "Promotional posters", "Discount coupons"],
    summary: "High-end print communication for a diagnostic clinic.",
    description: [
      "Global Medical Health is a private diagnostic and medical imaging clinic known for quality medical services, modern equipment and top-level expertise.",
      "For GMH, I created a series of print promotional materials, from informative flyers and brochures to promotional posters aimed at highlighting the clinic's services, capabilities and seasonal campaigns.",
      "My designs helped communicate GMH's professional, high-end identity in a clear and visually appealing way, supporting their image as a trusted medical center combining advanced technology with compassionate care.",
    ],
    cover: { key: "gmh-cover", alt: "Ultrasound machine control panel with transducer probes in a bright clinic" },
    gallery: [
      { key: "gmh-coupon", alt: "GMH discount coupon for maternal ultrasound" },
      { key: "gmh-poster", alt: "GMH second opinion event poster" },
      { key: "gmh-flyer", alt: "Hand holding GMH flyer" },
      { key: "gmh-print", alt: "GMH coupon print layout" },
    ],
    serviceSlugs: ["printed-media"],
  },
  {
    slug: "dr-kurbe-dental",
    name: "Dr. Kurbe Dental & Aesthetic",
    client: "Dr. Kurbe Dental & Aesthetic Center",
    categories: ["Print"],
    industry: "Healthcare, dental & aesthetics",
    services: ["Print design"],
    deliverables: ["Discount vouchers", "Campaign print materials"],
    summary: "Elegant vouchers and campaign print for a dental and aesthetic center.",
    description: [
      "Dr. Kurbe Dental & Aesthetic Center is a modern clinic specializing in advanced dental care and aesthetic treatments, known for its high-quality services, state-of-the-art technology, and patient-centered approach.",
      "For Dr. Kurbe, I created a series of printed promotional materials, including discount vouchers and campaign-focused designs. The print concepts were developed to reflect the clinic's elegant and professional identity, ensuring a coherent visual presence across both promotional and patient-facing materials.",
    ],
    cover: { key: "kurbe-dental-cover", alt: "Dentist in blue gloves examining a smiling patient with a mirror and probe" },
    gallery: [
      { key: "kurbe-voucher", alt: "Dr. Kurbe gold and black discount vouchers" },
      { key: "kurbe-card", alt: "Dr. Kurbe business card mockup" },
    ],
    serviceSlugs: ["printed-media"],
  },
  {
    slug: "floraria-mariei",
    name: "Florăria Mariei",
    client: "Mariei",
    categories: ["UX / UI"],
    industry: "E-commerce, florist",
    services: ["UX / UI design"],
    deliverables: ["Complete UX/UI for a responsive online shop"],
    summary: "A warm, elegant online flower shop for desktop and mobile.",
    description: [
      "Mariei is a custom-built online flower shop designed to offer customers an elegant, seamless and emotionally engaging shopping experience. The platform showcases a wide variety of floral arrangements, gifts and occasion-based bouquets through a clean and intuitive interface.",
      "For this project, I created the complete UX/UI design, focusing on a modern aesthetic that blends warmth, sophistication and user-friendly navigation. The layout, color palette and visual elements were crafted to highlight the beauty of the floral products while ensuring a smooth browsing and purchasing experience across both desktop and mobile.",
    ],
    cover: { key: "mariei-cover", alt: "Florist in a black apron holding a large wrapped bouquet of roses, lisianthus and hydrangea" },
    gallery: [
      { key: "mariei", alt: "Florăria Mariei website on desktop and phone" },
      { key: "mariei-page", alt: "Florăria Mariei homepage design" },
      { key: "mariei-product", alt: "Florăria Mariei product page design" },
    ],
    serviceSlugs: ["ux-ui-design"],
  },
  {
    slug: "regata-print",
    name: "Regata Print",
    client: "Regata Print",
    categories: ["UX / UI"],
    industry: "Printing services",
    services: ["UX / UI design"],
    deliverables: ["Presentation website", "Landing page", "Product pages"],
    summary: "A clean presentation website for a professional printing company.",
    description: [
      "Regata Print is a professional printing company offering high-quality services such as large format prints, posters, banners, and personalized promotional materials. To support their brand and improve client communication, I designed a clean and modern presentation website that highlights their services, expertise and technical capabilities.",
      "For this project, I created the full UX/UI design, focusing on clarity, easy navigation and a visually structured layout. The landing page introduces the company's mission and partnerships, while the product pages offer clear, accessible information about printing options, specifications and pricing details.",
    ],
    cover: { key: "regata-cover", alt: "Overhead view of two designers choosing colours from printed swatch cards over coffee" },
    gallery: [
      { key: "regata-monitor", alt: "Regata Print website shown on a desktop monitor" },
      { key: "regata-page", alt: "Regata Print posters product page" },
      { key: "regata-partners", alt: "Regata Print about and partners section" },
    ],
    serviceSlugs: ["ux-ui-design"],
  },
  {
    slug: "vibrary",
    name: "Vibrary",
    client: "Bachelor's thesis project",
    categories: ["UX / UI"],
    industry: "Digital library",
    services: ["UX / UI design"],
    deliverables: ["Complete UX/UI system for mobile and desktop"],
    summary: "A calm, AI-assisted virtual library, built as my bachelor's thesis.",
    description: [
      "Vibrary is a virtual library platform created as my bachelor's thesis project, developed in .NET and designed to offer users a seamless, intuitive reading experience. The platform allows users to explore a digital book collection, generate their own stories, and receive personalized book recommendations powered by artificial intelligence.",
      "For this project, I designed the complete UX/UI system with a minimalist and user-friendly approach, focusing on clarity, accessibility, and an enjoyable reading environment across both mobile and desktop.",
    ],
    cover: { key: "vibrary-cover", alt: "Stack of red cloth-bound books with gold-embossed spines against a pale wall" },
    gallery: [{ key: "vibrary", alt: "Vibrary app screens on phone and desktop in sage and blush" }],
    serviceSlugs: ["ux-ui-design"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const publicProjects = projects.filter((p) => !p.draft);
export const allCategories: Category[] = ["Branding", "Social Media", "Ads & Campaigns", "Print", "UX / UI", "Art Direction"];
