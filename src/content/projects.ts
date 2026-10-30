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
  testimonial?: { quote: string; author: string };
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
  /** Interleave reels with the static posts in one grid instead of a separate block. */
  mixReels?: boolean;
  /** Lay the statics out as a strict grid (use when they all share one ratio). */
  staticsGrid?: boolean;
  /** Landscape 16:9 video clips (explanatory animations), shown in their own section. */
  clips?: ReelItem[];
  /** Static ad banners for product campaigns, shown in their own section after the social statics. */
  ads?: GalleryItem[];
  /** Full-width interface mockups (phone, desktop), shown after the identity board. */
  screens?: GalleryItem[];
  /** Interactive 3D product viewer, shown after the print pieces. */
  viewer3d?: "fleurane-jar";
  /** Pages of the delivered brand book: the first runs full width, the rest sit two by two. */
  brandbook?: GalleryItem[];
  /** Multi-slide social posts, shown slide by slide after the statics. */
  carousels?: Carousel[];
  /** Visual identity board shown on standard (non case-study) project pages. */
  moodboard?: GalleryItem;
  /** On-site photography, shown as its own titled section. */
  photos?: { title: string; images: GalleryItem[] };
  /** Vertical 9:16 stories, shown together in their own row. */
  stories?: GalleryItem[];
  /** Website hero banner, shown in a browser frame. */
  siteHero?: GalleryItem;
  /** Email newsletter designs, shown side by side in their own section. */
  newsletters?: GalleryItem[];
  /** Print pieces, each shown as a titled mockup. */
  print?: { title: string; image: GalleryItem }[];
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
      { key: "divaz-holiday-1", alt: "Divaz holiday nail trends carousel cover with pink boxes, baubles and ribbons" },
      { key: "divaz-holiday-2", alt: "Divaz holiday carousel slide showing Red Spark, Nude Perlato and Nude Sparkly nails" },
      { key: "divaz-nails", alt: "Divaz instant gel press-on nail boxes on blush pink" },
      { key: "divaz-galentine", alt: "Divaz Galentine's Day campaign with lipstick in a cocktail glass" },
      { key: "divaz-sale", alt: "Divaz 50% off makeup campaign with product box" },
      { key: "divaz-gloss35", alt: "Divaz lip gloss with berries and ice cream" },
      { key: "divaz-rosu", alt: "Divaz 'Roșu lucios' red press-on nails post" },
      { key: "divaz-blue", alt: "Divaz 'Stellar Blue' press-on nails post" },
      { key: "divaz-2026", alt: "Divaz 'Which nails will win 2026?' post" },
      { key: "divaz-lips", alt: "Divaz lip comparison post with model" },
      { key: "divaz-gloss14", alt: "Divaz lip gloss shade 14 with berries" },
      { key: "divaz-combo", alt: "Divaz budget lip combo carousel cover" },
    ],
    reels: [
      { key: "divaz-reel-1", title: "Instant gel nails, applied in seconds" },
      { key: "divaz-reel-2", title: "Glowing with Divaz" },
      { key: "divaz-reel-3", title: "No hashtags: the Divaz makeup haul" },
      { key: "divaz-reel-4", title: "Budget lip combo, step by step" },
    ],
    serviceSlugs: ["branding", "social-media-design", "content-creation"],
    staticsGrid: true,
    featured: true,
    caseStudy: {
      theme: "divaz",
      tagline: "A premium beauty look, accessible to everyone.",
      brief: [
        "Divaz needed complete branding plus the content strategy and social media presence to launch cosmetics and instant gel press-on nails.",
      ],
      direction: [
        { title: "Soft, edible colour", text: "Blush, rose and berry tones turn every product shot into something you want to taste, like gloss next to ice cream and fruit." },
        { title: "Packaging as hero", text: "The pink Divaz boxes become a recurring graphic device, anchoring campaigns and carousels." },
        { title: "Carousels that teach", text: "Informative carousels sit next to sale banners so the feed educates as well as sells." },
      ],
      process: [
        { key: "divaz-moodboard", alt: "Divaz moodboard: berry #5E0833, blush and rose swatches, the logo, the tagline, key words and product photography of the nail boxes and accessories" },
      ],
      results: [
        "A recognisable blush pink feed: followers can spot a Divaz post before they read the name.",
        "Reels became the best-performing format, with the instant nail application videos reaching the widest audience.",
        "Seasonal campaigns, from Galentine's Day to the holiday nail trends, gave the brand a steady rhythm of launches and offers.",
      ],
      testimonial: {
        quote:
          "Diana gave Divaz exactly the look we imagined: soft, feminine and premium, without feeling out of reach. Every post and every reel feels like us, and our customers keep telling us how much they love the feed.",
        author: "Administrator, Divaz",
      },
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
      { key: "kdt-workshop-loss", alt: "KDT post on blue: why are you losing money in the workshop? Moving boards by hand between machines costs profit, with a stack of wood and a call to try KDT automation" },
      { key: "kdt-smt-training", alt: "KDT post: advanced training for SMT dust extraction systems, with the team in the KDT showroom" },
      { key: "kdt-peak-season", alt: "KDT post on blue: 1 September, peak season starts, with a calendar and a KDT nesting CNC and a call to book a trial" },
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
    reels: [
      { key: "kdt-reel-1", title: "Skit: buying a machine in the showroom" },
      { key: "kdt-reel-2", title: "Skit: from a phone call to a finished board" },
      { key: "kdt-reel-3", title: "Q&A: why does edgebanding come off?" },
      { key: "kdt-reel-4", title: "Why KDT is the right partner" },
    ],
    photos: {
      title: "KDT at BIFE-SIM",
      images: [
        { key: "bife-team", alt: "The KDT Romania team on the KDT Machinery stand at BIFE-SIM" },
        { key: "bife-stand", alt: "A consultation at the KDT stand counter, under the backlit KDT logo" },
        { key: "bife-nesting", alt: "A KDT nesting CNC on display, with financing information on the stand behind" },
        { key: "bife-edgebander", alt: "A KDT edgebander running on the blue stand floor, with a KDT specialist beside it" },
        { key: "bife-consult", alt: "A KDT specialist going through a board with visitors at the stand" },
      ],
    },
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
        { key: "kdt-moodboard", alt: "KDT brand moodboard: the white KDT Woodworking Machinery logo on blue with the line Consultancy, Installation, Dedicated service, a blue panel Complete solutions for the woodworking industry, the KDT blue #2563EB palette with dark, light and ice blue, grays and white, Montserrat type, real photos from the BIFE-SIM stand with the nesting CNC, the Drill Tech sign, the edgebander and finished board edges, and flat business cards with the KDT logo" },
      ],
      results: [
        "A social media presence launched from zero on Facebook, Instagram, TikTok and YouTube.",
        "A consistent visual system for the Romanian branch, aligned with KDT's international pages.",
        "Campaigns for real moments, such as the open days at the new Bucharest-Ilfov showroom and machine installations across Romania.",
        "Coverage at the BIFE-SIM trade fair, creating content on site and photographing the KDT stand and machines.",
      ],
    },
  },
  {
    slug: "iq-fashion",
    name: "IQ Fashion",
    client: "IQ Fashion",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Fashion, premium boutique",
    services: ["Visual identity for social media", "Social media design", "Video editing", "Newsletter design", "Website hero", "Print design"],
    deliverables: ["Static posts", "Promotional banners", "Scripted & cinematic video edits", "Reels", "Newsletters", "Website hero", "A6 flyer with QR code"],
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
    moodboard: { key: "iq-moodboard", alt: "IQ Fashion visual identity: the gold IQ logo, gold #CDA456, black and cream swatches, Cormorant Garamond headlines and a close-up of a gold sequined evening gown" },
    reels: [
      { key: "iq-reel-1", title: "Fur-trimmed coats in the boutique" },
      { key: "iq-reel-2", title: "Trying on the little black dress" },
      { key: "iq-reel-3", title: "A golden evening gown in the old town" },
      { key: "iq-reel-4", title: "Sequin gown, cinematic edit" },
    ],
    siteHero: { key: "iq-site-hero", alt: "IQ Fashion Black Friday website hero: two models in white and golden fox fur jackets either side of the IQ logo, with up to 60% off, on black with gold confetti" },
    newsletters: [
      { key: "iq-newsletter", alt: "IQ Fashion newsletter in black and gold: the Alpaka Ami Beige coat at 32% off, 850 lei instead of 1,250 lei, with fit details, returns and a size guide" },
      { key: "iq-coming-soon", alt: "IQ Fashion coming soon announcement from 7 November: a model in a pearl-embellished black gown, gold serif headline on textured paper" },
      { key: "iq-newsletter-alcantara", alt: "IQ Fashion holiday newsletter: the Alcantara Ukraina Camel coat with arctic fox fur at up to 60% off, with gold baubles on black" },
    ],
    print: [
      {
        title: "A6 thank-you flyer with a QR code",
        image: { key: "iq-flyer-mockup", alt: "Two printed IQ Fashion A6 flyers on a dark surface with gold bokeh: a 50 lei gift voucher for scanning the QR code and leaving a review" },
      },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns", "newsletter", "printed-media"],
  },
  {
    slug: "caterina-tomasso",
    name: "Caterina Tomasso",
    client: "Caterina Tomasso",
    categories: ["Branding", "Social Media", "Ads & Campaigns", "Print"],
    industry: "Luxury sterling silver, online boutique",
    services: ["Brand identity", "Brand guidelines", "Social media design", "Static ad banners", "Reels", "Print design"],
    deliverables: ["Complete visual identity", "Brand book", "Social media posts", "Static ad banners for product campaigns", "Reels", "Letterhead, business cards and thank-you card"],
    summary: "A high-end visual world for sterling silver made to be given, kept and handed down.",
    description: [
      "Caterina Tomasso is an online boutique devoted to 925 sterling silver: cups, teapots, rattles and premium gifts made for christenings and other moments worth marking.",
      "I took over the brand's entire visual identity, from the ballerina symbol and wordmark to the palette, typography and the brand book that keeps every touchpoint consistent. On top of that I created the social media materials and the static ads that put each product in front of the right audience.",
      "The look is premium and high end by design: silver gradients, ballet nude, fine lines and plenty of negative space, so the silver does the talking and every post feels like a small piece of the brand's world.",
    ],
    cover: { key: "caterina-cover", alt: "Two polished gold-toned pieces, a lidded sugar bowl and a jug, on a wooden shelf in warm raking light" },
    brandbook: [
      { key: "caterina-brandbook-1", alt: "Caterina Tomasso brand book cover: the ballerina symbol and wordmark on ballet nude" },
      { key: "caterina-brandbook-2", alt: "Brand book page: our story, with a black and white photograph of a silver tea set and the brand values" },
      { key: "caterina-brandbook-3", alt: "Brand book page: logo clear space around the symbol and wordmark" },
      { key: "caterina-brandbook-4", alt: "Brand book page: the primary logo, the symbol and the wordmark" },
      { key: "caterina-brandbook-5", alt: "Brand book page: the logo in dark mode and white mode" },
      { key: "caterina-brandbook-6", alt: "Brand book page: colour palette with a silver gradient, black and white, and ballet nude #D4B5A0 and #F5ECE6" },
      { key: "caterina-brandbook-7", alt: "Brand book page: typography, Abramo for headings and Helvetica Light for body text" },
      { key: "caterina-brandbook-8", alt: "Brand book page: graphic elements and textures, with a metallic texture, negative space and fine lines" },
      { key: "caterina-brandbook-9", alt: "Brand book page: social media design templates with a silver teapot and a silver goblet" },
    ],
    gallery: [
      { key: "caterina-post-1", alt: "Caterina Tomasso post: a silver goblet held in a red glove, with the line about the art of timeless luxury" },
      { key: "caterina-post-2", alt: "Caterina Tomasso post: a silver christening cup with a teddy bear on lace, about a gift that measures appreciation, not only time" },
      { key: "caterina-post-3", alt: "Caterina Tomasso post: a silver baby fork and spoon with bear details on linen" },
      { key: "caterina-post-4", alt: "Caterina Tomasso post: close-up of a silver spoon with a teddy bear, 'their first gift of value'" },
      { key: "caterina-post-5", alt: "Caterina Tomasso post: two silver candlesticks with white roses, on the perfect table" },
      { key: "caterina-post-6", alt: "Caterina Tomasso post: a silver duck rattle on a silk ribbon, 'the most wanted christening gift'" },
      { key: "caterina-post-7", alt: "Caterina Tomasso post: a silver spoon on white linen, 'your morning ritual, redefined by silver'" },
      { key: "caterina-post-8", alt: "Caterina Tomasso post: a silver fruit bowl full of lemons, 'Italian tradition and refinement'" },
    ],
    ads: [
      { key: "caterina-ad-1", alt: "Caterina Tomasso ad banner: a sterling silver star rattle on blush" },
      { key: "caterina-ad-2", alt: "Caterina Tomasso ad banner: a sterling silver baby cup with a bear and a handle" },
      { key: "caterina-ad-3", alt: "Caterina Tomasso ad banner: two sterling silver rattles with mother-of-pearl rings, category banner" },
      { key: "caterina-ad-4", alt: "Caterina Tomasso ad banner: a silver-plated fruit bowl" },
      { key: "caterina-ad-5", alt: "Caterina Tomasso ad banner: two heart rattles with mother-of-pearl rings" },
      { key: "caterina-ad-6", alt: "Caterina Tomasso ad banner: a sterling silver champagne glass" },
      { key: "caterina-ad-7", alt: "Caterina Tomasso ad banner: a gift set with a silver cup and spoon in a white box" },
      { key: "caterina-ad-8", alt: "Caterina Tomasso ad banner: a silver-plated candlestick" },
    ],
    print: [
      { title: "Business cards", image: { key: "caterina-print-cards", alt: "Caterina Tomasso black business cards on a ballet nude surface: the front with the ballerina symbol and wordmark, and the back with contact details inside a fine silver frame" } },
      { title: "Letterhead", image: { key: "caterina-print-letterhead", alt: "Two sheets of Caterina Tomasso letterhead in ballet nude, with the symbol and wordmark at the top and contact details at the bottom" } },
      { title: "Thank-you card", image: { key: "caterina-print-thankyou", alt: "A Caterina Tomasso thank-you card with a ballerina watermark and a message of appreciation, next to a black business card" } },
    ],
    reels: [
      { key: "caterina-reel-1", title: "A gift that stays intact for the next generation" },
      { key: "caterina-reel-2", title: "Gift sets, unboxed" },
      { key: "caterina-reel-3", title: "Looking for the perfect gift for the next event?" },
      { key: "caterina-reel-4", title: "Simplicity is the height of refinement" },
    ],
    serviceSlugs: ["branding", "social-media-design", "ads-campaigns", "printed-media"],
    staticsGrid: true,
  },
  {
    slug: "dr-kurbe-clinic",
    name: "Dr. Kurbe Clinic",
    client: "Dr. Kurbe Clinic, Nada Kurbe & Mawada Kurbe",
    categories: ["Social Media", "Print"],
    industry: "Aesthetics & wellness",
    services: ["Visual identity for social media", "Social media design", "Video editing", "Print design"],
    deliverables: ["Informative & promotional banners", "Offer stories", "Carousels", "TikTok / Instagram reels", "Interview-style videos", "Discount vouchers"],
    summary: "Cohesive social content for a clinic and its founders' personal brands.",
    description: [
      "Dr. Kurbe Clinic is a modern aesthetic and wellness center focused on personalized care and natural results.",
      "For the clinic, as well as for Nada Kurbe and Mawada Kurbe's personal brands, I created a wide range of social media content: from informative and promotional banners to TikTok and Instagram reels showcasing treatments, behind-the-scenes moments, and interview-style videos.",
      "My work contributed to building a cohesive, engaging, and visually appealing online presence across all platforms.",
    ],
    cover: { key: "kurbe-clinic-cover", alt: "Woman with closed eyes receiving a facial laser treatment" },
    gallery: [
      { key: "kurbe-habits", alt: "Dr. Mawada Kurbe post: which habits harm dental health, from aggressive brushing to nail biting and teeth grinding" },
      { key: "kurbe-botox", alt: "Dr. Kurbe offer post: 4 botox areas for 1,000 lei instead of 1,700 lei, gold type on dark patterned background" },
      { key: "kurbe-2", alt: "Dr. Kurbe PRP therapy benefits post" },
    ],
    moodboard: { key: "kurbe-moodboard", alt: "Dr. Kurbe brand moodboard: gold script logo on black, palette, Playfair Display and Jost type, clinic photos, patterns and stationery" },
    stories: [
      { key: "kurbe-story-1", alt: "Dr. Kurbe IV drip offer story: Beach Body Boost, energy, detox and glow, 285 RON, with a smiling woman on a beach" },
      { key: "kurbe-story-2", alt: "Dr. Kurbe IV drip offer story: Gluta Goddess, glutathione drip for detox and radiance, 450 RON, with a woman in white against a golden sky" },
      { key: "kurbe-story-3", alt: "Dr. Kurbe IV drip offer story: Vitafusion, vitamin C, B and magnesium drip, 400 RON, with a woman in a sports top" },
      { key: "kurbe-story-4", alt: "Dr. Kurbe IV drip offer story: Bright Mind Drip, clarity and focus, 200 RON, with a woman meditating in a field" },
      { key: "kurbe-story-5", alt: "Dr. Kurbe IV drip offer story: The Glow Shot, vitamin C for glow and collagen, 150 RON, with a woman with glowing skin" },
      { key: "kurbe-story-6", alt: "Dr. Kurbe IV drip offer story: After Party Drip, clarity and focus, 275 RON, with a smiling woman with a cotton pad" },
      { key: "kurbe-story-7", alt: "Dr. Kurbe IV drip offer story: Pre-Game Drip, ready to party without regrets, 275 RON, with a woman in a sequin top" },
      { key: "kurbe-story-8", alt: "Dr. Kurbe IV drip offer story: Iron Revival, iron drip for energy and strength, 350 RON, with a woman stretching outdoors" },
    ],
    carousels: [
      {
        title: "How does vampire therapy (PRP) work?",
        slides: [
          { key: "kurbe-prp-1", alt: "Carousel cover: how does vampire therapy (PRP) work, gold serif type with a syringe on dark patterned background" },
          { key: "kurbe-prp-2", alt: "Carousel slide explaining PRP: blood is drawn, platelet-rich plasma is isolated and injected where the face needs revitalising" },
        ],
      },
      {
        title: "Cosmetic dental procedures at Dr. Kurbe",
        slides: [
          { key: "kurbe-dental-1", alt: "Carousel cover: cosmetic dental procedures available at Dr. Kurbe, gold type on white with dental instruments and implants" },
          { key: "kurbe-dental-2", alt: "Carousel slide listing whitening, replacing fillings or crowns, gum contouring, implants and braces" },
        ],
      },
      {
        title: "How to treat bleeding gums?",
        slides: [
          { key: "kurbe-gums-1", alt: "Dr. Mawada Kurbe carousel cover: how to treat bleeding gums, over a close-up of a smile" },
          { key: "kurbe-gums-2", alt: "Carousel slide: better oral hygiene, an antibacterial mouthwash and professional dental treatments" },
        ],
      },
      {
        title: "Retinol, retinal or tretinoin?",
        slides: [
          { key: "kurbe-retinoids-1", alt: "Nada Kurbe FAQ carousel cover: retinol, who is it recommended for?" },
          { key: "kurbe-retinoids-2", alt: "Carousel slide: not all retinoids are the same, with a dropper and serum" },
          { key: "kurbe-retinoids-3", alt: "Carousel slide: what retinoids are and what they do for the skin, with a golden serum dropper" },
          { key: "kurbe-retinoids-4", alt: "Carousel slide: retinol, the gentlest for the skin, with strength, use and expected results" },
          { key: "kurbe-retinoids-5", alt: "Carousel slide: retinal, stronger and faster than retinol but gentler than tretinoin" },
        ],
      },
    ],
    reels: [
      { key: "kurbe-reel-1", title: "Facial procedure, step by step" },
      { key: "kurbe-reel-2", title: "CO2 laser treatment" },
      { key: "kurbe-reel-3", title: "Instacast with Dr. Kurbe" },
      { key: "kurbe-reel-4", title: "Professional dental cleaning" },
      { key: "kurbe-reel-5", title: "Dr. Mawada Kurbe answers in the dental chair" },
      { key: "kurbe-reel-6", title: "PRP therapy in dentistry" },
      { key: "kurbe-reel-7", title: "A walk through the clinic" },
      { key: "kurbe-reel-8", title: "Before and after: new teeth, new confidence" },
    ],
    print: [
      {
        title: "Discount vouchers",
        image: { key: "kurbe-vouchers", alt: "Stacks of Dr. Kurbe discount vouchers in gold and black on a satin surface: up to 50% off, and a 250 RON dental spa offer with a free air flow" },
      },
    ],
    serviceSlugs: ["social-media-design", "content-creation", "printed-media"],
  },
  {
    slug: "mos-ilie",
    name: "Moș Ilie",
    client: "Moș Ilie",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Food, traditional pastries",
    services: ["Social media design", "Reels"],
    deliverables: ["Informative posts", "Seasonal promotional banners", "TikTok / Instagram reels", "Website banner"],
    summary: "Warm, nostalgic visuals for handcrafted Romanian pastries.",
    description: [
      "Ilie is a traditional Romanian brand known for its handcrafted pastries and homemade delicacies inspired by authentic family recipes.",
      "For the brand, I created a variety of social media visuals, including informative static posts, promotional banners highlighting seasonal and signature products, and TikTok/Instagram reels showcasing both individual items and the brand's story.",
      "My work helped strengthen Moș Ilie's online identity, bringing a warm, nostalgic, and engaging visual presence to their digital platforms.",
    ],
    cover: { key: "ilie-cover", alt: "Smiling baker in black gloves filling a paper bag with cookies from glass jars" },
    siteHero: { key: "ilie-site-banner", alt: "Moș Ilie Black Friday website banner: a jar labelled Black Friday on a wooden stand, with the line Moș Ilie puts its Black Friday discounts in a jar" },
    gallery: [
      { key: "ilie-5", alt: "Moș Ilie 'Tradition and good taste' cookies and jam post" },
      { key: "ilie-xmas-pastry", alt: "Moș Ilie Christmas post: sugar-dusted filled cookies stacked on a rustic table, festive pastry without the effort" },
      { key: "ilie-xmas-cozonac", alt: "Moș Ilie Christmas post: a braided cozonac on a wooden board, with the line the taste of Christmas in a single click, before a glowing tree" },
      { key: "ilie-1", alt: "Moș Ilie Black Friday hamper post" },
      { key: "ilie-2", alt: "Moș Ilie Black Friday jar post" },
      { key: "ilie-4", alt: "Moș Ilie pistachio spread product post" },
    ],
    reels: [
      { key: "ilie-reel-1", title: "Cherry sherbet and favourites, in the forest" },
      { key: "ilie-reel-2", title: "Jars lined up on the shelf, in every gift pack" },
      { key: "ilie-reel-3", title: "Black Friday: up to 40% off" },
      { key: "ilie-reel-4", title: "Apricot jam and nectar on the veranda" },
    ],
    print: [
      {
        title: "Two printed flyers with a QR code",
        image: { key: "ilie-flyers-mockup", alt: "Two printed Moș Ilie flyers on warm linen, both reading Tradiție și bun gust: one with tomato tagliatelle, raspberry vinegar and walnut fudge, the other with wildflower honey, cherry sherbet and walnut-shaped cookies, each with a QR code to mos-ilie.ro" },
      },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns", "printed-media"],
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
      { key: "farmex-2", alt: "Farmex giveaway post" },
      { key: "farmex-3", alt: "Farmex nail fungus information post" },
      { key: "farmex-5", alt: "Farmex Omron blood pressure monitor post" },
    ],
    reels: [
      { key: "farmex-reel-1", title: "System Kollagen 11000 Plus, for joints and skin" },
      { key: "farmex-reel-2", title: "Before and after: making a cream in the pharmacy lab" },
      { key: "farmex-reel-3", title: "Calmotusin honey syrup for the airways" },
      { key: "farmex-reel-4", title: "Special products made in our own lab" },
    ],
    staticsGrid: true,
    serviceSlugs: ["social-media-design"],
  },
  {
    slug: "art-innova",
    name: "Art Innova Dentalmed",
    client: "Art Innova Dentalmed",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Dentistry",
    services: ["Social media design", "Static ad banners", "Video editing"],
    deliverables: ["Social media posts", "Service carousels", "PPC ad banners", "Reels"],
    summary: "A fresh turquoise world that makes a dental clinic feel calm and approachable.",
    description: [
      "Art Innova Dentalmed is a dental clinic in Bolintin-Vale offering general dentistry, dental radiology, oral surgery, implantology and orthodontics.",
      "I designed the social media presence: friendly seasonal posts, a carousel for each service, short reels that introduce the team and the location, and PPC banners for first-visit offers. Everything follows one idea: soft turquoise waves, clean white space and crisp 3D tooth and implant visuals.",
      "The result is a clinic that explains what it does without frightening anyone, and a feed where every service is easy to understand at a glance.",
    ],
    cover: { key: "artinnova-cover", alt: "A dentist in blue gloves examining a smiling patient with a mirror and a probe" },
    gallery: [
      { key: "artinnova-1", alt: "Art Innova Easter greeting with dental tools, a stethoscope and a ribboned tooth in grass" },
      { key: "artinnova-2", alt: "Art Innova spring greeting with a hand holding a tooth tied with a red ribbon" },
      { key: "artinnova-3", alt: "Art Innova post: your smile is our mission, with a 3D tooth" },
    ],
    ads: [
      { key: "artinnova-ad-1", alt: "PPC banner: first visit to the dentist, 350 lei, with tools and a tooth" },
      { key: "artinnova-ad-2", alt: "PPC banner: first visit to the oral surgeon and implantologist, 300 lei, with a denture model" },
      { key: "artinnova-ad-3", alt: "PPC banner: first visit to the orthodontist, 200 lei, with a smile" },
    ],
    carousels: [
      {
        title: "General dentistry",
        slides: [
          { key: "artinnova-c1-1", alt: "Cover: Our services, general dentistry" },
          { key: "artinnova-c1-2", alt: "Check-ups, hygiene, cavities, root canals, gum care, extractions" },
          { key: "artinnova-c1-3", alt: "Cover with the Art Innova logo" },
        ],
      },
      {
        title: "Complete dental radiology",
        slides: [
          { key: "artinnova-c2-1", alt: "Cover: Our services, complete dental radiology" },
          { key: "artinnova-c2-2", alt: "2D and 3D X-rays for diagnosis and implant planning" },
          { key: "artinnova-c2-3", alt: "Closing slide" },
        ],
      },
      {
        title: "Surgery",
        slides: [
          { key: "artinnova-c3-1", alt: "Cover: Our services, surgery" },
          { key: "artinnova-c3-2", alt: "Dental surgery: extractions, implant surgery, periodontal and endodontic surgery" },
          { key: "artinnova-c3-3", alt: "Closing slide" },
        ],
      },
      {
        title: "Implantology",
        slides: [
          { key: "artinnova-c4-1", alt: "Cover: Our services, implantology" },
          { key: "artinnova-c4-2", alt: "Implantology: initial consultation, implant placement, post-operative care" },
          { key: "artinnova-c4-3", alt: "Closing slide" },
        ],
      },
      {
        title: "When is it time to book a check-up?",
        slides: [
          { key: "artinnova-c5-1", alt: "How do you know it is time to book a dental check-up?" },
          { key: "artinnova-c5-2", alt: "Persistent toothache, bleeding gums, sensitivity, difficulty chewing, no check-up in a year" },
        ],
      },
    ],
    reels: [
      { key: "artinnova-reel-1", title: "The team of Art Innova" },
      { key: "artinnova-reel-2", title: "Where to find us" },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns"],
  },
  {
    slug: "optica-tei",
    name: "Optica Tei",
    client: "Optica Tei",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Medical optics",
    services: ["Social media design", "Website banners", "Video editing"],
    deliverables: ["Educational and seasonal posts", "Carousels", "Website hero banner", "Reels"],
    summary: "Clear, friendly eye-care content in navy and green.",
    description: [
      "Optica Tei is a medical optics store that combines eye examinations with a wide range of frames and lenses.",
      "I created the social media content and the website banners. The posts explain things people genuinely wonder about, from how progressive lenses work to the difference between an ophthalmologist and an optometrist, alongside seasonal greetings and offers. The identity is built on the logo colours, a deep navy and a fresh green, with generous white space and friendly illustrations.",
      "I also edited the reels, including a walkthrough of the online shop on a phone.",
    ],
    cover: { key: "opticatei-cover", alt: "Black glasses lying on an eye chart of black letters on white" },
    gallery: [
      { key: "opticatei-1", alt: "Optica Tei post: how do progressive lenses work, with a lens diagram" },
      { key: "opticatei-2", alt: "Optica Tei Easter post with a pink bunny-ear egg wearing round glasses" },
      { key: "opticatei-3", alt: "Optica Tei post: did you know there are eye freckles?" },
      { key: "opticatei-4", alt: "Optica Tei post: a to-do list with the eye consultation" },
      { key: "opticatei-5", alt: "Optica Tei post on navy: the human eye adapts to light levels" },
      { key: "opticatei-6", alt: "Optica Tei Valentine post: discover frames among pink blossoms" },
      { key: "opticatei-7", alt: "Optica Tei post: the perfect place to find the perfect pair of glasses, in a heart" },
    ],
    carousels: [
      {
        title: "Ophthalmologist vs optometrist",
        slides: [
          { key: "opticatei-c1-1", alt: "Ophthalmologist versus optometrist" },
          { key: "opticatei-c1-2", alt: "The ophthalmologist: a medical specialist who treats eye diseases" },
          { key: "opticatei-c1-3", alt: "The optometrist: assesses vision and prescribes lenses" },
        ],
      },
    ],
    siteHero: { key: "opticatei-hero", alt: "Optica Tei website banner: choose the offer that suits you, glasses consultation 145 RON and frame consultation 245 RON, beside a close-up of black glasses" },
    reels: [
      { key: "opticatei-reel-1", title: "The Optica Tei online shop, on your phone" },
      { key: "opticatei-reel-2", title: "Frames and lenses at 50% off" },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns"],
  },
  {
    slug: "selfconsulting",
    name: "Selfconsulting",
    client: "Selfconsulting",
    categories: ["Social Media", "Art Direction"],
    industry: "Engineering & architecture",
    services: ["Social media design", "Content strategy"],
    deliverables: ["Educational carousels", "Portfolio posts"],
    summary: "Technical expertise explained clearly, in deep green and architectural photography.",
    description: [
      "Selfconsulting is an engineering and architecture company that designs and consults on construction projects.",
      "I designed its social media content to make a technical field easy to follow: carousels that explain feasibility studies, the difference between civil and industrial buildings, the roles of the designer and the architect, and what the new Urbanism Code changes, plus portfolio posts built around photographs of large construction sites.",
      "The look pairs a deep forest green and a fresh mint with grid lines, building silhouettes and black and white architecture, so the feed reads as serious, precise and contemporary.",
    ],
    cover: { key: "selfconsulting-p5", alt: "A large oval building clad in blue wavy panels under a blue sky, with the selfconsulting logo" },
    gallery: [],
    carousels: [
      {
        title: "Portfolio",
        slides: [
          { key: "selfconsulting-p1", alt: "Cover: discover the Selfconsulting portfolio" },
          { key: "selfconsulting-p2", alt: "Steel roof structure of a large hall under construction" },
          { key: "selfconsulting-p3", alt: "Interior of a large hall under construction, seen from the floor" },
          { key: "selfconsulting-p4", alt: "Concrete staircase and structure inside a building site" },
          { key: "selfconsulting-p5", alt: "Oval building with blue wavy façade panels" },
          { key: "selfconsulting-p6", alt: "Aerial view of the oval building next to the harbour" },
          { key: "selfconsulting-p7", alt: "Steel dome structure seen from below" },
          { key: "selfconsulting-p8", alt: "Large hall interior with ventilation ducts on the floor" },
        ],
      },
      {
        title: "The feasibility study",
        slides: [
          { key: "selfconsulting-a-1", alt: "What you should know about the feasibility study" },
          { key: "selfconsulting-a-2", alt: "The feasibility study is the technical and economic document that shows whether a company can carry out a project" },
          { key: "selfconsulting-a-3", alt: "What it covers: general data, project information and technical, economic and legal analysis" },
        ],
      },
      {
        title: "Civil vs industrial buildings",
        slides: [
          { key: "selfconsulting-b-1", alt: "Cover: civil versus industrial buildings" },
          { key: "selfconsulting-b-2", alt: "Characteristics of civil buildings" },
          { key: "selfconsulting-b-3", alt: "Characteristics of industrial buildings" },
        ],
      },
      {
        title: "The designer and the architect",
        slides: [
          { key: "selfconsulting-c-1", alt: "Frequently asked: what is the difference between a designer and an architect?" },
          { key: "selfconsulting-c-2", alt: "The designer" },
          { key: "selfconsulting-c-3", alt: "The architect" },
        ],
      },
      {
        title: "The Urbanism Code",
        slides: [
          { key: "selfconsulting-d-1", alt: "What the Urbanism Code brings in 2025" },
          { key: "selfconsulting-d-2", alt: "Key changes proposed by the code" },
        ],
      },
    ],
    serviceSlugs: ["social-media-design", "content-creation"],
  },
  {
    slug: "ths-organic",
    name: "THS Organic",
    client: "THS Organic",
    categories: ["Social Media", "Ads & Campaigns"],
    industry: "Natural wellness, honey-based products",
    services: ["Social media design", "Product ads", "Video editing"],
    deliverables: ["Product and benefit posts", "Comparison posts", "Reels"],
    summary: "Golden, warm content for honey-based products for immunity, hair and skin.",
    description: [
      "THS Organic is a Romanian wellness brand that makes honey-based products for three everyday needs: strengthening immunity with Immunity Gold, fighting hair loss with NewHair, and caring for acne-prone skin with LifeSkin.",
      "I designed the social media content that introduces the range. Each product has its own colour world: warm amber for Immunity Gold, deep black and brown for NewHair, and coral for LifeSkin, all tied together by the THS drop logo and macro honey photography. The posts show the product, list the benefits in a few clear lines and put the offer where the eye lands, and comparison posts set the natural formula next to store-bought alternatives.",
      "I also edited the reels, which mix unboxings, honey pours, lifestyle scenes and a TV appearance, with subtitles that follow the story.",
    ],
    cover: { key: "ths-cover", alt: "Close-up of golden honey dripping from a wooden honey dipper over a jar, on a black background" },
    gallery: [
      { key: "ths-post-1", alt: "THS Organic post: how NewHair compares with a store-bought hair product, in two columns" },
      { key: "ths-post-2", alt: "THS Organic NewHair post on black: strengthens the hair from the root, price 143 lei instead of 199" },
      { key: "ths-post-3", alt: "THS Organic Immunity Gold post: a product to strengthen the immune system, price 143 lei" },
      { key: "ths-post-4", alt: "THS Organic LifeSkin benefits post on coral, with a box and orange sachets" },
      { key: "ths-post-5", alt: "THS Organic NewHair benefits post on dark brown, with a sachet and honey" },
      { key: "ths-post-6", alt: "THS Organic Immunity Gold post: a honey jar inside a lens, with the box and sachets" },
    ],
    reels: [
      { key: "ths-reel-1", title: "One range for hair, skin and immunity" },
      { key: "ths-reel-2", title: "Immunity Gold in your tea" },
      { key: "ths-reel-3", title: "A daily routine with Immunity Gold and LifeSkin" },
      { key: "ths-reel-4", title: "NewHair and the whole THS Organic range" },
    ],
    serviceSlugs: ["social-media-design", "ads-campaigns", "content-creation"],
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
      { key: "kanoi-4", alt: "Kanoi St. Nicholas boots campaign" },
      { key: "kanoi-5", alt: "Kanoi boot cleaning winter post" },
    ],
    siteHero: { key: "kanoi-site-hero", alt: "Kanoi website hero: tan shearling boots dusted with snow beside the line Start the year with clean footwear and the Kanoi logo" },
    reels: [
      { key: "kanoi-reel-1", title: "Kanoi 365, now half price" },
      { key: "kanoi-reel-2", title: "Kanoi 365: you only worry about wearing them" },
      { key: "kanoi-reel-3", title: "Countdown to 7 November: change how you care for your shoes" },
      { key: "kanoi-reel-4", title: "Guess what comes next: 12 pairs, 1 subscription" },
    ],
    staticsGrid: true,
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
    slug: "nextlab-tech",
    name: "NEXTLAB.TECH",
    client: "NEXTLAB.TECH",
    categories: ["UX / UI", "Social Media", "Print"],
    industry: "EdTech, STEM education",
    services: ["UX / UI design", "Art direction", "2D animation", "Social media design", "Packaging design", "Print design"],
    deliverables: ["UX/UI for the content platform", "Visual direction for an educational project", "Explanatory 2D animations", "Social media posts", "Business cards", "Entry kit packaging"],
    summary: "Three years in house, shaping how a robotics and informatics learning platform looks, moves and speaks.",
    description: [
      "NEXTLAB.TECH is an educational technology company that builds learning labs and an online content platform for informatics and robotics, with its own STEM kits for beginners.",
      "I worked with the team in house for three years. I contributed significantly to the visual direction of a large project in partnership with EDULIB: creating informatics and robotics lessons, from the characters and the scenes to the explanatory 2D animations that carry each lesson.",
      "On the product side I worked on the UX/UI design of the content platform: courses, lessons, the learning assistant, articles and analytics, in the brand's indigo, navy and orange. Alongside, I designed the social media posts, the business cards and the packaging of the Entry starter kit.",
    ],
    cover: { key: "nextlab-cover", alt: "Gloved hands using a multimeter to test a computer motherboard in an electronics lab" },
    screens: [
      { key: "nextlab-desktop", alt: "Two desktop screens of the NEXTLAB.TECH content platform: the learner dashboard with the AI Platform course, and the learning analytics report" },
      { key: "nextlab-mobile", alt: "Five mobile screens of the platform: login, courses, a lesson, the virtual learning assistant and articles" },
    ],
    gallery: [
      { key: "nextlab-post-1", alt: "NEXTLAB.TECH post: Cybersecurity Laboratory, with a shield and a cloud" },
      { key: "nextlab-post-2", alt: "NEXTLAB.TECH post: platform with AI, with a laptop and a chatbot" },
      { key: "nextlab-post-3", alt: "NEXTLAB.TECH post: learning analytics, with a report and a team" },
      { key: "nextlab-post-4", alt: "NEXTLAB.TECH post: export with legacy platforms" },
      { key: "nextlab-post-5", alt: "NEXTLAB.TECH post: virtual learning assistant, with a robot" },
      { key: "nextlab-post-6", alt: "NEXTLAB.TECH post: export in SCORM, with file icons" },
    ],
    print: [
      { title: "Business cards", image: { key: "nextlab-print-cards", alt: "NEXTLAB.TECH business cards: the back with a QR code, the mascot and the website, and the front with contact details beside indigo and orange curves" } },
      { title: "Entry Starter Kit packaging", image: { key: "robotics-cover", alt: "Purple Entry Starter Kit boxes by NextLab.tech with a microcontroller board on acrylic risers" } },
    ],
    clips: [
      { key: "nextlab-clip-1", title: "Next-generation learning labs: presentation video" },
      { key: "nextlab-clip-2", title: "Algorithms, explained with a smoothie recipe" },
      { key: "nextlab-clip-3", title: "Variables and the memory of a computer" },
      { key: "nextlab-clip-4", title: "Peripheral devices: input and output" },
      { key: "nextlab-clip-5", title: "Problem solving: the steps of an algorithm" },
      { key: "nextlab-clip-6", title: "Python lists and indexing" },
      { key: "nextlab-clip-7", title: "Malware, antivirus and strong passwords" },
      { key: "nextlab-clip-8", title: "NEXTLAB.TECH presentation for the educational platform" },
    ],
    serviceSlugs: ["ux-ui-design", "2d-animation", "social-media-design", "printed-media"],
  },  {
    slug: "global-medical-health",
    name: "Global Medical Health",
    client: "Global Medical Health (GMH)",
    categories: ["Print", "Social Media"],
    industry: "Healthcare, diagnostic imaging",
    services: ["Print design", "Social media design", "Video editing"],
    deliverables: ["Flyers", "Brochures", "Promotional posters", "Discount coupons", "Social media posts", "Reels", "Backdrop and wall calendar"],
    summary: "High-end print communication for a diagnostic clinic.",
    description: [
      "Global Medical Health is a private diagnostic and medical imaging clinic known for quality medical services, modern equipment and top-level expertise.",
      "For GMH, I created a series of print promotional materials, from informative flyers and brochures to promotional posters aimed at highlighting the clinic's services, capabilities and seasonal campaigns.",
      "My designs helped communicate GMH's professional, high-end identity in a clear and visually appealing way, supporting their image as a trusted medical center combining advanced technology with compassionate care.",
      "Beyond print, I designed the clinic's social media: awareness-day and seasonal posts in a clean white and teal system, and subtitled reels where the doctors explain screening and early detection in plain language. I also designed an event backdrop and a wall calendar for the oncology centre.",
    ],
    cover: { key: "gmh-cover", alt: "Ultrasound machine control panel with transducer probes in a bright clinic" },
    gallery: [
      { key: "gmh-post-1", alt: "GMH post: Parkinson's Disease Awareness Day: stronger together, with a doctor and a patient" },
      { key: "gmh-post-2", alt: "GMH post: National Patients' Week: the patient at the centre of attention" },
      { key: "gmh-post-3", alt: "GMH post: Easter greeting with colourful eggs and tulips" },
      { key: "gmh-post-4", alt: "GMH post: Easter greeting with a stethoscope and blood pressure cuff" },
      { key: "gmh-post-5", alt: "GMH post: European Immunization Week: protection through prevention" },
      { key: "gmh-post-6", alt: "GMH post: World Malaria Day: information saves lives" },
    ],
    reels: [
      { key: "gmh-reel-1", title: "Mammography and breast ultrasound, explained by a GMH doctor" },
      { key: "gmh-reel-2", title: "Screening and early detection" },
      { key: "gmh-reel-3", title: "Detailed imaging of the cavities and the organs" },
      { key: "gmh-reel-4", title: "Early detection of cancer" },
    ],
    print: [
      { title: "Event backdrop", image: { key: "gmh-spider-mock", alt: "A step-and-repeat event backdrop with the GMH logo repeated across it and the addresses of the clinic and the hospital" } },
      { title: "Wall calendar 2025", image: { key: "gmh-calendar-mock", alt: "GMH wall calendar for 2025, four sheets of three months each, headed Centre of Excellence in Oncology" } },
      { title: "Discount coupon", image: { key: "gmh-coupon", alt: "GMH discount coupon for maternal ultrasound" } },
      { title: "Event poster", image: { key: "gmh-poster-mock", alt: "Three framed GMH event posters on a wall: second opinion with an international expert in general surgery, 18 June 2025" } },
    ],
    serviceSlugs: ["printed-media", "social-media-design"],
  },
  {
    slug: "floraria-mariei",
    name: "Florăria Mariei",
    client: "Mariei",
    categories: ["UX / UI"],
    industry: "E-commerce, florist",
    services: ["UX / UI design"],
    deliverables: ["Complete UX/UI for a responsive online shop", "UI kit: palette, typography, icons, components", "Desktop and mobile screens"],
    summary: "A warm, elegant online flower shop for desktop and mobile.",
    description: [
      "Mariei is a custom-built online flower shop designed to offer customers an elegant, seamless and emotionally engaging shopping experience. The platform showcases a wide variety of floral arrangements, gifts and occasion-based bouquets through a clean and intuitive interface.",
      "For this project, I created the complete UX/UI design, focusing on a modern aesthetic that blends warmth, sophistication and user-friendly navigation. The layout, color palette and visual elements were crafted to highlight the beauty of the floral products while ensuring a smooth browsing and purchasing experience across both desktop and mobile.",
    ],
    cover: { key: "mariei-cover", alt: "Florist in a black apron holding a large wrapped bouquet of roses, lisianthus and hydrangea" },
    gallery: [],
    moodboard: { key: "mariei-brand", alt: "Florăria Mariei UI kit: the rose mark and wordmark, app icons, the rose red, cherry, blush, petal, ink and leaf palette, Jost and Playfair Display typography, line icons and interface components" },
    screens: [
      { key: "mariei-desktop", alt: "Florăria Mariei desktop screens: the landing page with the lily hero and best-selling bouquets, and the Buchet Pasiune product page" },
      { key: "mariei-mobile", alt: "Five Florăria Mariei mobile screens: home, shop, product page, cart and sign in" },
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
    deliverables: ["Presentation website", "Landing page", "Product pages", "UI kit: palette, typography, icons, components", "Mobile screens"],
    summary: "A clean presentation website for a professional printing company.",
    description: [
      "Regata Print is a professional printing company offering high-quality services such as large format prints, posters, banners, and personalized promotional materials. To support their brand and improve client communication, I designed a clean and modern presentation website that highlights their services, expertise and technical capabilities.",
      "For this project, I created the full UX/UI design, focusing on clarity, easy navigation and a visually structured layout. The landing page introduces the company's mission and partnerships, while the product pages offer clear, accessible information about printing options, specifications and pricing details.",
    ],
    cover: { key: "regata-cover", alt: "Overhead view of two designers choosing colours from printed swatch cards over coffee" },
    gallery: [],
    moodboard: { key: "regata-brand", alt: "Regata Print UI kit: the wordmark on orange and charcoal, the halftone, registration mark and CMYK graphic motif, the orange, charcoal, white, fog, peach and slate palette, Montserrat typography, line icons and interface components" },
    screens: [
      { key: "regata-desktop", alt: "Regata Print desktop screens: the landing page with the Calitatea este pasiunea noastră hero, and the Afișe product page with technical details, accepted files and payment" },
      { key: "regata-mobile", alt: "Five Regata Print mobile screens: home, services, product page, quote request form and the menu" },
    ],
    serviceSlugs: ["ux-ui-design"],
  },
  {
    slug: "green-table",
    name: "Green Table",
    client: "Green Table",
    categories: ["UX / UI"],
    industry: "Healthy food delivery",
    services: ["UX / UI design", "Web design", "Visual identity", "Illustration"],
    deliverables: ["Website UX/UI", "UI kit: palette, typography, icons, components", "Desktop and mobile screens"],
    summary: "A fresh, playful web experience for an organic meal delivery brand.",
    description: [
      "Green Table is a healthy food delivery brand built around organic ingredients, weekly menus and meals that arrive fresh at the door.",
      "I designed the web experience from UX to UI: the structure of the site, the visual language, the illustrations and the components that make ordering feel easy. The look is built on a deep forest green and a bright lime, with rounded type and flat vegetable illustrations that keep the brand friendly and appetising.",
      "The same system carries across desktop and mobile, from the hero and the weekly menu to the contact form, the dish page and the order box.",
    ],
    cover: { key: "greentable-cover", alt: "Fresh healthy ingredients laid out on a white wooden table: salmon, avocado, asparagus, tomatoes, eggs, nuts and berries" },
    gallery: [],
    moodboard: { key: "greentable-brand", alt: "Green Table UI kit: the script logo on forest green and lime, the illustration kit, the forest, leaf, lime, sprout, paper and plate palette, Sniglet and Caveat typography, line icons and interface components" },
    screens: [
      { key: "greentable-desktop", alt: "Green Table desktop screens: the home page with the Fresh, Organic, Delivered to Your Door hero and weekly menu, and the Try, Them, Now section with the contact form" },
      { key: "greentable-mobile", alt: "Five Green Table mobile screens: home, menu, dish page, order box and log in" },
    ],
    serviceSlugs: ["ux-ui-design"],
  },
  {
    slug: "fleurane",
    name: "Fleurane",
    client: "Fleurane",
    categories: ["Print", "Branding"],
    industry: "Skincare & cosmetics",
    services: ["Packaging design", "Print design"],
    deliverables: ["Packaging for a new skincare range", "Labels for jars, tubes and bottles", "Packaging mockups"],
    summary: "Premium packaging for a new skincare range: white, periwinkle and gold.",
    description: [
      "Fleurane is a skincare brand that asked for premium packaging for a new range of face-care products: a cleansing foam with orange blossom, an eye and lip make-up remover, an eye cream and an anti-age day cream.",
      "This project is print only. I designed the labels and the packaging system for jars, tubes and bottles around a clean white base, soft periwinkle lids and gold detailing, with a fine molecular pattern that hints at active ingredients, and an arched frame that holds the logo on every pack.",
      "The result is a range that reads as one family on the shelf, with each product clearly named and a refined, high-end finish.",
    ],
    cover: { key: "fleurane-cover", alt: "Skincare products on a pink tiled surface: white jars, golden oil bottles, an amber dropper bottle and a white daisy on a mirror" },
    gallery: [],
    print: [
      { title: "Key ingredients", image: { key: "fleurane-ingredients", alt: "The Fleurane anti-age face cream, open, with the navy lid leaning on the jar, among illustrations of mandarin, bergamot, almonds and cornflowers" } },
      { title: "In the studio", image: { key: "fleurane-flatlay", alt: "The Fleurane range on terracotta stone slabs: the anti-age day cream and the eye cream in white jars with navy lids, and the orange blossom cleansing foam tube, on a warm cream background" } },
    ],
    viewer3d: "fleurane-jar",
    serviceSlugs: ["printed-media", "branding"],
  },
  {
    slug: "vibrary",
    name: "Vibrary",
    client: "Bachelor's thesis project",
    categories: ["UX / UI"],
    industry: "Digital library",
    services: ["UX / UI design", "Application development (.NET)", "Graphic design"],
    deliverables: ["A working application, built end to end", "Complete UX/UI system for mobile and desktop", "Graphics and visual identity", "UI mockups for mobile and desktop"],
    summary: "A calm, AI-assisted virtual library. My bachelor's thesis, built from the functionality to the last pixel.",
    description: [
      "Vibrary is my bachelor's thesis project: a virtual library platform developed in .NET and designed to offer users a seamless, intuitive reading experience. It lets people explore a digital book collection, generate their own stories, and receive personalized book recommendations powered by artificial intelligence.",
      "I did everything end to end: the functionality of the application, the design, the graphics and the UI design. The UX/UI system takes a minimalist, friendly approach, focused on clarity, accessibility and an enjoyable reading environment on both mobile and desktop.",
      "The identity rests on the diamond logo with its bookmark and a soft palette of sage green, peach cream and forest green. The icons, components and screens are all built from that base, from login and recommendations to the library and the story studio.",
    ],
    cover: { key: "vibrary-cover", alt: "Stack of red cloth-bound books with gold-embossed spines against a pale wall" },
    gallery: [],
    moodboard: { key: "vibrary-brand", alt: "Vibrary visual identity: the diamond logo in three colourways, the app icon, the sage, forest, mint, blush and peach palette, Outfit typography, the icon set and interface components" },
    screens: [
      { key: "vibrary-mobile", alt: "Five Vibrary mobile screens: login, home with recommendations, library, book detail and the story studio" },
      { key: "vibrary-desktop", alt: "Two Vibrary desktop screens: the personal library and the AI story studio" },
    ],
    serviceSlugs: ["ux-ui-design"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const publicProjects = projects.filter((p) => !p.draft);
export const allCategories: Category[] = ["Branding", "Social Media", "Ads & Campaigns", "Print", "UX / UI", "Art Direction"];
