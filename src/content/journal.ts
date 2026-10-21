import type { ImgKey } from "./images";

/**
 * Journal. Add a category by appending to `categories`; add an article by
 * appending to `articles`. Articles with `publishedAt: null` are drafts:
 * they are visible on the site with a "Draft" label but are hidden from
 * search engines and the sitemap until a real publication date is set.
 */

export type Category = { id?: string; slug: string; name: string; description: string };

export const categories: Category[] = [
  { slug: "graphic-design", name: "Graphic Design & Branding", description: "Identity, typography and the craft of making brands recognisable." },
  { slug: "social-media", name: "Social Media Design & Strategy", description: "Feeds, carousels, campaigns and designing for the scroll." },
  { slug: "content-creation", name: "Content Creation & Art Direction", description: "Concepts, visual direction and content that tells a story." },
];

type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Section = { id: string; heading: string; blocks: Block[] };

export type Article = {
  id?: string;
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  publishedAt: string | null;
  updatedAt?: string | null;
  cover: { key: ImgKey; alt: string };
  intro: string;
  sections: Section[];
  related: { projects: string[]; services: string[] };
};

const p = (text: string): Block => ({ type: "p", text });
const h3 = (text: string): Block => ({ type: "h3", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });
const ol = (...items: string[]): Block => ({ type: "ol", items });

export const articles: Article[] = [
  {
    slug: "how-to-build-a-strong-visual-identity",
    title: "How to Build a Strong Visual Identity for Your Brand",
    description: "A practical guide to the parts of a visual identity that matter, and how to keep them consistent once you start posting.",
    category: "graphic-design",
    publishedAt: null,
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "A visual identity is more than a logo. It is the set of decisions that makes people recognise you before they read your name. In this guide you'll learn which decisions come first, how to turn them into a system, and how to protect that system once content starts flowing.",
    sections: [
      {
        id: "start-with-a-position",
        heading: "Start with a position, not a palette",
        blocks: [
          p("Before choosing colours, write one sentence about what the brand stands for and who it is talking to. Every later decision should be checked against it. A brand for confident, playful customers will need different shapes and words than one built on calm expertise."),
          p("Inklabs is a good example: its whole identity hangs on one idea: tattoos don't have to be forever. That idea gives permission to be loud, direct and a bit cheeky."),
        ],
      },
      {
        id: "the-core-elements",
        heading: "The core elements of an identity",
        blocks: [
          h3("Colour"),
          p("Fewer colours are easier to recognise. Pick one dominant colour, one supporting colour and a neutral. Use the dominant colour often enough that people start to associate it with you."),
          h3("Typography"),
          p("Choose a headline typeface with character and a text typeface that is easy to read on a phone. Two families are usually enough."),
          h3("Imagery"),
          p("Decide how photos should look: lighting, backgrounds, crop, how people appear. Consistent imagery does as much for recognition as a logo."),
          h3("Graphic devices"),
          p("Recurring shapes, frames, stickers or packaging shots give you something to build every layout around."),
        ],
      },
      {
        id: "turn-it-into-a-system",
        heading: "Turn decisions into a system",
        blocks: [
          p("A system means anyone can make a new post and it still looks like the brand. Write the rules down and build a few templates:"),
          ul("Two or three layout grids for posts and stories", "Rules for headline length and size", "Where the logo goes, and where it never goes", "Examples of right and wrong use"),
        ],
      },
      {
        id: "keep-it-consistent",
        heading: "Keep it consistent as you grow",
        blocks: [
          p("The biggest threat to an identity is not a bad design; it is a hundred slightly different ones. Review your feed every month, retire layouts that drift, and update the system instead of making exceptions."),
          p("If you'd like help building an identity that lives well on social media, see my branding service."),
        ],
      },
    ],
    related: { projects: ["inklabs", "divaz"], services: ["branding"] },
  },
  {
    slug: "why-some-fonts-make-a-brand-look-more-expensive",
    title: "Why Some Fonts Make a Brand Look More Expensive",
    description: "Contrast, spacing and restraint: the typographic details that make a brand feel premium, and the ones that cheapen it.",
    category: "graphic-design",
    publishedAt: null,
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "People judge the price of a product by its typography long before they see a price tag. This article explains which typographic qualities read as premium, why, and how to apply them without making your brand feel cold.",
    sections: [
      {
        id: "contrast",
        heading: "Contrast signals craft",
        blocks: [
          p("High-contrast serifs, with thick and thin strokes side by side, come from a long tradition of fashion and editorial printing. Our eyes link them to magazines, luxury packaging and care."),
          p("You don't need a serif to look premium, but you do need contrast somewhere: between sizes, weights, or between type and empty space."),
        ],
      },
      {
        id: "space",
        heading: "Space is the real luxury",
        blocks: [
          p("Generous letter spacing on small uppercase labels, large margins and fewer words per layout all say: we don't need to shout. Crowded layouts feel like discount flyers, whatever font they use."),
        ],
      },
      {
        id: "restraint",
        heading: "Restraint beats decoration",
        blocks: [
          ul("Use one or two families, not five", "Limit weights: regular and one bold is often enough", "Avoid effects like outlines, heavy shadows and gradients on text", "Keep headlines short"),
        ],
      },
      {
        id: "when-not-to",
        heading: "When premium isn't the goal",
        blocks: [
          p("Not every brand should look expensive. A playful, accessible brand may lose its warmth with a thin, distant serif. Choose type for the feeling you want, then apply the same principles of contrast and space."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "divaz"], services: ["branding"] },
  },
  {
    slug: "how-to-create-a-consistent-instagram-feed",
    title: "How to Create a Consistent Instagram Feed for Your Brand",
    description: "Templates, colour rhythm and content pillars: a simple method to make your Instagram grid look intentional.",
    category: "social-media",
    publishedAt: null,
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "A consistent feed helps people recognise your posts before they see your name. You'll learn how to plan content pillars, build templates and use colour rhythm so your grid looks intentional without becoming repetitive.",
    sections: [
      {
        id: "content-pillars",
        heading: "Plan content pillars first",
        blocks: [
          p("Decide on three to five types of content you'll post regularly, for example product, education, behind the scenes, offers. Each pillar gets its own template, so people learn to read your posts instantly."),
        ],
      },
      {
        id: "templates",
        heading: "Build templates, not one-offs",
        blocks: [
          p("Templates are what make consistency realistic. Fix the grid, the type sizes and the logo position for each pillar. Change the content, not the structure."),
        ],
      },
      {
        id: "colour-rhythm",
        heading: "Use colour rhythm",
        blocks: [
          p("Alternating a strong colour with lighter or photographic posts creates a pattern across the grid. Divaz alternates blush product shots with deeper berry tones; the grid reads as one brand even when topics change."),
        ],
      },
      {
        id: "review",
        heading: "Review the grid before you post",
        blocks: [
          ol("Preview the next nine posts together", "Check that no two similar templates sit side by side", "Make sure the dominant colour appears at least every few posts"),
        ],
      },
    ],
    related: { projects: ["divaz", "inklabs"], services: ["social-media-design"] },
  },
  {
    slug: "7-branding-mistakes-that-make-a-business-look-unprofessional",
    title: "7 Branding Mistakes That Make a Business Look Unprofessional",
    description: "Seven common branding mistakes small businesses make, and simple ways to fix each one.",
    category: "graphic-design",
    publishedAt: null,
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "Most brands don't look unprofessional because of one bad decision but because of small inconsistencies that add up. Here are seven of the most common ones and how to fix them.",
    sections: [
      {
        id: "the-mistakes",
        heading: "The seven mistakes",
        blocks: [
          h3("1. Too many fonts"),
          p("Each new font weakens recognition. Pick two and stick to them."),
          h3("2. A logo that changes every time"),
          p("Different colours, crops and stretched versions make a brand look improvised. Keep approved versions in one folder."),
          h3("3. No hierarchy"),
          p("If everything is big, nothing is. Decide what the viewer should read first."),
          h3("4. Low-quality images"),
          p("Blurry or pixelated photos cheapen even a good layout."),
          h3("5. Inconsistent tone"),
          p("Visuals and words should sound like the same person."),
          h3("6. Print and digital that don't match"),
          p("A flyer should feel like the same brand as the Instagram feed."),
          h3("7. Following every trend"),
          p("Trends date quickly. Adapt them to your system or skip them."),
        ],
      },
      {
        id: "how-to-fix",
        heading: "How to fix them",
        blocks: [p("Most of these problems disappear with a simple brand system: a few rules, approved assets and templates. Start there before redesigning anything.")],
      },
    ],
    related: { projects: ["kanoi", "global-medical-health"], services: ["branding", "printed-media"] },
  },
  {
    slug: "how-to-make-your-social-media-design-stand-out",
    title: "How to Make Your Social Media Design Stand Out",
    description: "Practical techniques for social posts that stop the scroll: contrast, a single message, motion and recognisable devices.",
    category: "social-media",
    publishedAt: null,
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "On social media, your design has about a second to earn attention. This article covers the techniques that help a post stand out, and why they work.",
    sections: [
      {
        id: "one-message",
        heading: "One post, one message",
        blocks: [p("Posts that try to say everything say nothing. Pick one idea per post and make it impossible to miss. Put the details in the caption or in a carousel.")],
      },
      {
        id: "contrast",
        heading: "Use contrast deliberately",
        blocks: [p("Strong colour contrast, large type and simple backgrounds make a post visible at thumbnail size. Inklabs' yellow-and-black posts are readable even when they are tiny in a feed.")],
      },
      {
        id: "talk-to-the-viewer",
        heading: "Talk to the viewer",
        blocks: [p("Headlines that speak directly, through a question, a challenge or a playful command, feel like conversation rather than advertising.")],
      },
      {
        id: "add-motion",
        heading: "Add motion where it helps",
        blocks: [p("Short reels and subtle animation catch the eye. Keep motion consistent with the static design so it feels like the same brand.")],
      },
    ],
    related: { projects: ["inklabs", "ads-campaigns-selection"], services: ["social-media-design", "ads-campaigns"] },
  },
  {
    slug: "what-makes-a-brand-look-premium",
    title: "What Makes a Brand Look Premium?",
    description: "Photography, restraint, material and consistency: the visual signals that make a brand feel premium.",
    category: "content-creation",
    publishedAt: null,
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Premium is a feeling built from many small signals. You'll learn what those signals are and how to bring them into your photos, layouts and content, even on a modest budget.",
    sections: [
      {
        id: "art-direction",
        heading: "Art-directed photography",
        blocks: [p("Premium brands rarely show a product on a plain table. They give it a world: a material, a mood, props that tell a story. Divaz pairs gloss with fruit and ice cream so the product feels indulgent.")],
      },
      {
        id: "material",
        heading: "Material and texture",
        blocks: [p("Silk, paper, glass, metal. Textures that look good to touch make the brand feel tangible and considered.")],
      },
      {
        id: "restraint",
        heading: "Restraint in layout",
        blocks: [p("Fewer elements, more space, and confident type. Remove anything that doesn't support the message.")],
      },
      {
        id: "consistency",
        heading: "Consistency over time",
        blocks: [p("A premium look is earned by repetition. When every post, package and newsletter follows the same rules, people trust the brand more.")],
      },
    ],
    related: { projects: ["divaz", "iq-fashion"], services: ["content-creation", "branding"] },
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const isPublished = (a: Article) => !!a.publishedAt;

export function readingTime(a: Article) {
  const text = [a.intro, ...a.sections.flatMap((s) => [s.heading, ...s.blocks.map((b) => ("text" in b ? b.text : b.items.join(" ")))])].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
