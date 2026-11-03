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
    publishedAt: "2026-05-12",
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
    publishedAt: "2026-06-02",
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
    publishedAt: "2026-06-23",
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
    publishedAt: "2026-07-14",
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
    publishedAt: "2026-09-08",
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
    publishedAt: "2026-10-13",
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
  {
    id: "how-much-does-a-brand-identity-cost",
    slug: "how-much-does-a-brand-identity-cost",
    title: "How Much Does a Brand Identity Cost? What You Actually Pay For",
    seoTitle: "How Much Does a Brand Identity Cost?",
    description: "Brand identity prices vary a lot. Here is what drives the cost, what a fair quote includes and how to compare designers without guessing.",
    category: "graphic-design",
    publishedAt: "2026-10-20",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "Ask three designers what a brand identity costs and you will get three very different answers. That is not because someone is lying. It is because 'brand identity' can mean a logo and two colours, or a full system with guidelines, templates and packaging. This guide explains what moves the price, so you can compare quotes properly.",
    sections: [
      {
        id: "what-you-are-buying",
        heading: "What you are actually buying",
        blocks: [
          p("A logo is one file. A brand identity is a set of decisions that lets you look the same everywhere: on Instagram, on a box, on a business card, on a website. The more of those decisions are made for you, and the more situations they are tested in, the more work sits behind the final price."),
          p("When I built the identity for Caterina Tomasso, an online boutique for sterling silver, the logo was the smallest part. Most of the work went into the palette, the typography, the rules for photography and a brand book that makes sure every future post and package still feels like the same brand."),
        ],
      },
      {
        id: "what-drives-the-price",
        heading: "The five things that drive the price",
        blocks: [
          ol("Scope: logo only, logo plus colours and fonts, or a complete system with templates and guidelines.", "Research: talking to you, looking at competitors and defining a position takes real time, and it is what separates a brand from a pretty picture.", "Number of rounds: two rounds of revisions and unlimited revisions are very different promises.", "Usage: a brand that only lives on social media is cheaper to design than one that also needs packaging, print and signage.", "Experience: a designer who has solved your kind of problem before works faster and makes fewer expensive mistakes."),
          p("Notice that none of these are about how long the logo took to draw. Clients often assume they are paying for the drawing. They are paying for the thinking that makes the drawing correct."),
        ],
      },
      {
        id: "what-a-fair-quote-includes",
        heading: "What a fair quote should include",
        blocks: [
          p("A serious quote is itemised. If you receive a single number and one line of description, ask for more detail before you say yes. At minimum you should see:"),
          ul("The deliverables listed one by one (primary logo, secondary logo, icon, colour palette, fonts, brand guidelines, templates).", "The file formats you will receive, including vector files you can scale to any size.", "How many concepts you will see and how many revision rounds are included.", "The timeline, and what happens if feedback arrives late.", "Who owns the final files and what usage rights you get."),
        ],
      },
      {
        id: "cheap-vs-expensive",
        heading: "Why the cheap option often costs more later",
        blocks: [
          p("A very low price usually means a template logo, no strategy and files you cannot properly use. Then you spend money redesigning it a year later, or you live with an identity that never quite works on a phone screen or a printed box."),
          p("The opposite is also true: expensive does not automatically mean right for you. A small local business rarely needs a forty-page brand book. It needs a clear logo, two or three colours, two fonts and a few templates it can really use every week."),
        ],
      },
      {
        id: "how-to-compare-quotes",
        heading: "How to compare quotes without getting lost",
        blocks: [
          p("Write down what you need the identity to do over the next two years. Will it appear on packaging? On a website? On vans? Then ask every designer to quote for exactly that list. Quotes become comparable only when they answer the same question."),
          p("Look at the portfolio for work that solves a similar problem, not just work that looks nice. Read how the designer talks about their projects. If every case study is just a gallery of images with no explanation of the thinking, you are buying luck."),
        ],
      },
      {
        id: "what-is-usually-included",
        heading: "What a typical project looks like",
        blocks: [
          p("Most identity projects follow the same path. First comes a discovery stage, where we talk about the business, the audience and the competition. Then come the concepts: directions for logo, colour and typography. After you pick a direction, it is refined, applied to a few real examples and finally packaged into files and, if needed, guidelines."),
          p("A project for a small business can be done in a few weeks. A brand that needs packaging, a full social media system and print materials takes longer, because each application has to be designed and tested. Fast and good are possible together; cheap, fast and thorough are not."),
        ],
      },
      {
        id: "get-more-from-the-budget",
        heading: "How to get more from your budget",
        blocks: [
          ul("Prepare a short brief before the first call: who you sell to, three brands you admire and three you do not like.", "Collect real examples of where the brand will appear, so the designer tests the identity in the right places.", "Ask for a phased plan: core identity first, extra applications later when the business grows.", "Give feedback in one consolidated message per round instead of piecemeal. It saves hours on both sides."),
          p("If you want to see what a complete identity process looks like in practice, have a look at my branding service and the projects linked below. And if you are not sure what you need yet, that is a perfectly good starting point for a conversation."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long does a brand identity take?"),
          p("For a small business, a core identity usually takes a few weeks, depending on how quickly feedback comes back. Larger systems with packaging, print and templates take longer."),
          h3("Can I pay in stages?"),
          p("Yes, and it is common. A typical split is a deposit before starting and the rest on delivery, or in steps tied to milestones. Agree this in writing."),
          h3("Do I need a logo before a website or social media?"),
          p("You need at least a simple identity first. Building a website or a feed on a temporary logo means redoing a lot of work later."),
          h3("Who owns the logo after the project?"),
          p("This should be written in the contract. In most cases the client receives full rights to the final files once the project is paid in full."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "fleurane"], services: ["branding"] },
  },
  {
    id: "logo-vs-brand-identity-vs-branding",
    slug: "logo-vs-brand-identity-vs-branding",
    title: "Logo vs Brand Identity vs Branding: What Is the Difference?",
    seoTitle: "Logo vs Brand Identity vs Branding",
    description: "Logo, brand identity and branding are not the same thing. A plain-language explanation of each, with examples, and which one your business needs first.",
    category: "graphic-design",
    publishedAt: "2026-10-21",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "People use 'logo', 'brand identity' and 'branding' as if they were the same word. They are not, and mixing them up leads to briefs that miss the point and budgets that go to the wrong place. Here is a simple way to tell them apart.",
    sections: [
      {
        id: "the-logo",
        heading: "The logo: one piece of the puzzle",
        blocks: [
          p("A logo is a mark that identifies a business. It can be a wordmark (just the name in a certain typeface), a symbol, or both together. Its job is recognition: when someone sees it, they know who is speaking."),
          p("A logo on its own does not make a brand. A good logo placed on top of random colours, random fonts and random photos still produces a messy feed."),
        ],
      },
      {
        id: "the-brand-identity",
        heading: "Brand identity: the visual system",
        blocks: [
          p("Brand identity is everything you can see: the logo, the colour palette, the typefaces, the style of photography and illustration, the shapes and patterns, the way layouts are built. It is the visible half of the brand, designed so that it looks consistent in every place it appears."),
          p("Inklabs is a good example. Its identity is built from yellow, black and a very direct typographic voice. You could remove the logo from a post and still recognise it as Inklabs, and that is the real test of an identity."),
          ul("Logo and logo variations", "Colour palette and how colours are used together", "Typography: headline and text fonts", "Imagery: photography, illustration, icons", "Graphic elements: patterns, frames, stickers", "Layout rules and templates"),
        ],
      },
      {
        id: "branding",
        heading: "Branding: the whole picture",
        blocks: [
          p("Branding is the broader process and practice of building how people think and feel about a business. It includes the visual identity, but also the name, the tone of voice, the way customers are treated, the quality of the product and the promise the company makes."),
          p("Branding is never finished. Identity can be delivered as a set of files. Branding keeps happening every time a customer interacts with you."),
        ],
      },
      {
        id: "a-simple-way-to-remember",
        heading: "A simple way to remember it",
        blocks: [
          p("Think of a person. The logo is their signature. The brand identity is their clothes, haircut and posture. Branding is their reputation: what people say about them when they leave the room."),
        ],
      },
      {
        id: "common-mix-ups",
        heading: "Three common mix-ups",
        blocks: [
          ul("'We need a new brand' often means 'we need a new logo'. Check what is really wrong before changing everything.", "A beautiful logo with no rules behind it creates an inconsistent feed, because every designer interprets it differently.", "A rebrand is not always necessary. Sometimes a clear set of guidelines for the existing identity solves the problem."),
          p("If you are unsure which of these applies to you, look at your last ten posts side by side. If they look like they belong together, you probably have an identity. If they look like they came from five different places, you have a logo and some habits."),
        ],
      },
      {
        id: "which-one-do-you-need-first",
        heading: "Which one do you need first?",
        blocks: [
          p("If you are just starting, resist the urge to begin with the logo. Start with two questions: who is this for, and what do we want them to feel? Those answers shape the identity, and the identity then makes the logo easy to design."),
          ul("Brand-new business: a small identity (logo, palette, two fonts) and a few templates.", "Business with a logo but an inconsistent look: a proper identity system and guidelines.", "Established business that feels outdated: a refresh, keeping what people already recognise.", "Business that is growing into new channels: extend the system to packaging, print and social media."),
          p("If you are not sure which of these sounds like you, my branding page explains how I usually approach each case."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Is a logo enough for a small business?"),
          p("To begin with, a clear logo plus two colours and a font can be enough. As soon as you post regularly or print anything, you will want a little more structure."),
          h3("What is the difference between brand identity and brand guidelines?"),
          p("The identity is the set of visual elements. The guidelines are the document that explains how to use them correctly."),
          h3("Can I do branding without a designer?"),
          p("You can do parts of it, such as defining your audience and tone of voice. The visual identity is where a designer saves the most time and avoids costly mistakes."),
        ],
      },
    ],
    related: { projects: ["inklabs", "divaz"], services: ["branding"] },
  },
  {
    id: "how-to-choose-brand-colours",
    slug: "how-to-choose-brand-colours",
    title: "How to Choose Brand Colours That Fit Your Business (Without the Clichés)",
    seoTitle: "How to Choose Brand Colours",
    description: "Choosing brand colours is about more than taste. A practical method for picking a palette that suits your audience, works everywhere and stays recognisable.",
    category: "graphic-design",
    publishedAt: "2026-10-22",
    cover: { key: "divaz-cover", alt: "Pink Divaz instant-gel press-on nail boxes in a range of shades" },
    intro: "Most advice on brand colours says blue means trust and red means energy. It is not wrong, but it is not very helpful either. Colour works in context, in combination and through repetition. Here is the method I use when I build a palette for a brand.",
    sections: [
      {
        id: "start-with-the-feeling",
        heading: "Start with the feeling, not the colour",
        blocks: [
          p("Before opening a colour picker, write down three words for how people should feel when they see the brand. For Divaz, a beauty brand for press-on nails, the words were soft, glossy and accessible. Those words quickly pointed to blush, rose and a deep berry for contrast."),
          p("If you start from a colour you like, you end up defending a personal preference. If you start from a feeling, you can test every option against it."),
        ],
      },
      {
        id: "look-at-the-market",
        heading: "Look at the market, then choose your gap",
        blocks: [
          p("Collect ten competitors and see which colours repeat. If every pharmacy uses the same green and every dental clinic uses the same blue, you have two choices: fit in and look trustworthy, or stand out in a way that still feels credible."),
          p("For Art Innova Dentalmed I kept a calm turquoise, which still signals cleanliness, but used soft waves and generous white space so it feels friendlier than the typical clinical blue."),
        ],
      },
      {
        id: "build-a-small-palette",
        heading: "Build a small palette that can actually be used",
        blocks: [
          p("A palette of eight colours looks great in a presentation and falls apart in real life. Most brands work best with this structure:"),
          ul("One dominant colour that people will associate with you.", "One supporting colour that adds contrast or warmth.", "One accent that you use sparingly for buttons, prices and highlights.", "One or two neutrals for backgrounds and text, because pure black and pure white rarely look refined."),
          p("Use the dominant colour on more than half of what you publish. That repetition is what builds recognition."),
        ],
      },
      {
        id: "test-in-real-conditions",
        heading: "Test it in real conditions",
        blocks: [
          p("A colour that looks good on a monitor can behave differently elsewhere. Before you commit, check the palette in these situations:"),
          ul("On a phone screen, at low brightness and outdoors.", "Printed on paper and on a box, where colours often turn duller.", "As text on a coloured background, to check contrast and readability.", "Next to real photos of your product."),
          p("Contrast matters more than people think. If your accent colour cannot be read on your background, you will hide the very thing you want people to notice, such as the price or the button."),
        ],
      },
      {
        id: "common-colour-mistakes",
        heading: "Colour mistakes I see most often",
        blocks: [
          ul("Choosing a colour because it is trending, then having to change it next year.", "Using a different shade of the same colour in each place.", "Putting light text on a light background because it looks elegant.", "Using too many accent colours, so nothing stands out.", "Never checking how the colour looks in dark mode or on a cheap monitor."),
          p("Most of these are fixed by the same habit: write the palette down once and use only what is written."),
        ],
      },
      {
        id: "write-the-rules-down",
        heading: "Write the rules down",
        blocks: [
          p("Give every colour a name and its codes (HEX for screens, CMYK for print). Then add two simple rules: which colour is used for backgrounds, and which for highlights. THS Organic uses a different colour world for each product, amber for the immunity range, black and brown for hair and coral for skin, tied together by one logo. Rules like these keep a range coherent as it grows."),
          p("Finally, give it time. A palette becomes a brand colour through repetition, not through the first design. If you want help turning a palette into a complete identity, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many colours should a brand have?"),
          p("Usually three to five: one dominant, one supporting, one accent and one or two neutrals."),
          h3("Should I use black in my palette?"),
          p("Often yes, as a neutral for text. For backgrounds, a very dark navy or brown can look softer and more refined than pure black."),
          h3("Do I need Pantone colours?"),
          p("They matter when exact colour reproduction is critical, such as packaging. For most social media and web use, HEX and CMYK values are enough."),
        ],
      },
    ],
    related: { projects: ["divaz", "ths-organic"], services: ["branding"] },
  },
  {
    id: "what-is-a-brand-book-and-do-you-need-one",
    slug: "what-is-a-brand-book-and-do-you-need-one",
    title: "What Is a Brand Book (Brand Guidelines) and Does Your Business Need One?",
    seoTitle: "What Is a Brand Book?",
    description: "A brand book keeps your logo, colours and fonts consistent. Learn what goes inside brand guidelines and how small businesses can use them in practice.",
    category: "graphic-design",
    publishedAt: "2026-10-23",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "A brand book sounds like something only big companies have. In reality, it is the most practical thing you can receive after a branding project, because it turns a nice design into something you and your team can keep using correctly. This article explains what goes into one and what it can look like for a small brand.",
    sections: [
      {
        id: "what-it-is",
        heading: "What a brand book is",
        blocks: [
          p("A brand book, also called brand guidelines, is a document that explains how a brand looks and sounds. It answers questions before someone asks them: which colours do we use, where does the logo go, what do photos look like, how do we write a caption."),
          p("The aim is not to limit creativity. It is to make sure that when a freelancer, an employee or a printer works with your brand, they do not have to guess."),
        ],
      },
      {
        id: "what-goes-inside",
        heading: "What goes inside",
        blocks: [
          ul("Brand story and positioning, in a few honest sentences.", "The logo, its variations and the clear space around it.", "What not to do with the logo: stretching, recolouring, placing it on busy images.", "Colour palette with HEX, RGB and CMYK values.", "Typography: which fonts, for what, and in which sizes.", "Photography and illustration style, with good and bad examples.", "Graphic elements such as patterns, icons and frames.", "Examples of real applications: social posts, business cards, packaging.", "Tone of voice, with a few sample phrases."),
          p("The brand book I designed for Caterina Tomasso covers exactly this: the ballerina symbol and wordmark, the silver and ballet-nude palette, the typography, the textures and the social media templates. It is nine pages, because that is all the brand needs."),
        ],
      },
      {
        id: "who-needs-one",
        heading: "Who really needs one",
        blocks: [
          p("If more than one person creates content for the brand, you need guidelines. The same is true if you work with outside designers, printers or agencies. It is also useful if you plan to grow into new channels, because it stops the brand from drifting every time something new is added."),
          p("A solo founder who posts everything personally can start with a lighter version: a one-page sheet with the logo, colours, fonts and two or three layout examples."),
        ],
      },
      {
        id: "make-it-usable",
        heading: "How to make it usable, not decorative",
        blocks: [
          ul("Keep it short. A guideline nobody reads is worse than a short one people follow.", "Show, do not only tell. One real example is worth a paragraph of rules.", "Include the downloadable assets: logo files, fonts and templates.", "Write it in plain language, as if a new colleague will read it on their first day.", "Update it when the brand changes, and date each version."),
        ],
      },
      {
        id: "a-small-example",
        heading: "A small example of a useful guideline",
        blocks: [
          p("A good rule is specific. 'Use the logo with respect' says nothing. 'Keep a clear space around the logo equal to the height of the letter M, and never place it on photos where it drops below readable contrast' is something a person can follow."),
          p("Specific rules are also easier to check. When a new post goes out, anyone can compare it to the guideline and see if it belongs."),
        ],
      },
      {
        id: "tips-for-using-it",
        heading: "Using it after the project ends",
        blocks: [
          p("Send the brand book to everyone who touches the brand and mention it in onboarding. Keep a copy of the editable templates in a shared folder. Once a quarter, put your latest ten posts next to the guidelines and check whether they still match."),
          p("If you are planning a new identity, ask for guidelines as part of the deliverables. I include them in my branding projects, scaled to what each brand actually needs."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long should a brand book be?"),
          p("As long as it needs to be and no longer. For a small business, five to fifteen pages is usually plenty."),
          h3("What format is best?"),
          p("A PDF is the most common. For teams, an online page or a shared design file can be easier to update."),
          h3("Is a brand book the same as a style guide?"),
          p("The terms overlap. A style guide often focuses on visual rules, while a brand book may also include story, values and voice."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "inklabs"], services: ["branding"] },
  },
  {
    id: "packaging-design-premium-look",
    slug: "packaging-design-how-to-make-a-product-look-premium",
    title: "Packaging Design: How to Make a Product Look Premium",
    seoTitle: "Premium Packaging Design Tips",
    description: "Premium packaging is a set of small, disciplined choices. Here are the details that make skincare, gifts and food products look worth more than they cost.",
    category: "graphic-design",
    publishedAt: "2026-10-24",
    cover: { key: "caterina-cover", alt: "Two polished gold-toned pieces, a lidded sugar bowl and a jug, on a wooden shelf in warm raking light" },
    intro: "Packaging is often the first thing a customer actually touches, and it decides in seconds whether your product feels ordinary or special. The good news: premium does not mean expensive materials or loud design. It usually comes from a handful of disciplined choices. Here is how I approach them on projects like the Fleurane skincare range.",
    sections: [
      {
        id: "start-with-the-shelf",
        heading: "Start with where it will be seen",
        blocks: [
          p("Packaging lives in different places: a shelf, a web shop photo, a courier box, a gift bag. Each one needs a different level of detail. A product sold online has to read clearly as a thumbnail. A product on a shelf competes with dozens of others at arm's length."),
          p("Before designing, write down the three situations where people will meet the pack, and test every decision against them."),
        ],
      },
      {
        id: "restraint",
        heading: "Restraint is what looks expensive",
        blocks: [
          p("Premium packaging almost always uses fewer elements: one clear name, one benefit line, a lot of empty space. The more claims, badges and icons you add, the more the pack feels like a discount product."),
          p("For Fleurane's face-care range, the label is built around an arched frame holding the logo, a fine molecular pattern in gold that hints at the active ingredients, and clear product names. Everything else stays quiet."),
        ],
      },
      {
        id: "colour-and-materials",
        heading: "Colour and finishes",
        blocks: [
          ul("Use two or three colours, and keep them consistent across every product in the range.", "Metallic details, such as gold foil on a label, add value, but use them on small elements: a line, a logo, a pattern.", "A matt finish usually feels more refined than a very glossy one.", "A coloured lid or cap is an inexpensive way to give a whole range its signature."),
          p("Always ask your printer about the finishes they really offer before you design with them in mind. A beautiful effect you cannot produce is just a disappointment."),
        ],
      },
      {
        id: "typography",
        heading: "Typography does half of the work",
        blocks: [
          p("On a small label, type has to carry the brand. Choose one serif or sans-serif with character for the product name, and a very clear, simple one for ingredients and instructions. Give the name room to breathe, and never let legal text compete with it."),
          p("Remember that regulatory information is not optional on cosmetics and food: INCI lists, weights, usage instructions, batch and barcode. Design the layout for it from the start, rather than squeezing it in at the end."),
        ],
      },
      {
        id: "a-range-not-a-product",
        heading: "Design a range, not a single product",
        blocks: [
          p("If you plan to sell more than one product, design the system first. Decide what is the same on every pack (frame, logo position, typography) and what changes (colour, name, a small icon). That way, a customer who likes your first product recognises the second immediately."),
          p("The same thinking helped on the Caterina Tomasso project, where every silver piece, box and card follows the same palette and structure."),
        ],
      },
      {
        id: "mistakes-to-avoid",
        heading: "Packaging mistakes that cheapen a product",
        blocks: [
          ul("Too many fonts and too many colours on one label.", "Text so small it cannot be read at a glance.", "Low-resolution logos and images that print blurry.", "Ignoring the back of the pack, where customers look next.", "Choosing a finish without seeing a physical sample."),
          p("Notice that none of them require a bigger budget to fix. They need discipline and a test print."),
        ],
      },
      {
        id: "prototype",
        heading: "Always prototype before you print",
        blocks: [
          ol("Print the label on normal paper and wrap it on a real container.", "Check the size of the smallest text at arm's length.", "Look at the pack next to your competitors on a table or shelf.", "Photograph it the way you will in your web shop.", "Only then send files to the printer, with bleed and the correct colour profile."),
          p("If you are working on packaging for a new range, take a look at my print and packaging work, and feel free to get in touch."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How much does packaging design cost?"),
          p("It depends on the number of products, the structure of the pack and how many versions are needed. A single label is far simpler than a full box with several panels."),
          h3("What files does a printer need?"),
          p("Usually a print-ready PDF with bleed, crop marks, correct colour mode and embedded or outlined fonts. Ask for the printer's technical sheet before you start."),
          h3("Can I change packaging later?"),
          p("Yes, but changing a system is much harder than extending one. Designing a flexible structure from the start saves effort when the range grows."),
        ],
      },
    ],
    related: { projects: ["fleurane", "caterina-tomasso"], services: ["printed-media", "branding"] },
  },
  {
    id: "instagram-carousel-design-tips",
    slug: "instagram-carousel-design-tips",
    title: "Instagram Carousel Design: 9 Tips for Slides People Actually Swipe",
    seoTitle: "Instagram Carousel Design: 9 Tips",
    description: "Practical tips for designing Instagram carousels: the cover slide, text size, slide order and the last call to action, with real examples.",
    category: "social-media",
    publishedAt: "2026-10-25",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "A carousel gives you something a single post cannot: room to explain. It is the format I use most for services, tutorials and anything that needs a bit of reasoning. But a carousel only works if people swipe, so every slide has to earn the next one. These are the nine rules I come back to on every project.",
    sections: [
      {
        id: "the-cover-slide",
        heading: "1. Treat the first slide as an ad",
        blocks: [
          p("Most people will only ever see slide one. It has to promise something specific: a question, a number, a surprising statement. For Art Innova Dentalmed, the cover of one carousel simply asks 'How do you know it is time to book a check-up?'. It sets up the answer without giving it away."),
          p("Put your logo small and keep the headline large. If the cover is not readable at thumbnail size, rework it."),
        ],
      },
      {
        id: "one-idea-per-slide",
        heading: "2. One idea per slide",
        blocks: [
          p("When a slide tries to say three things, the reader says none of them. Split the content until each slide has one point. It is better to have eight light slides than five heavy ones."),
        ],
      },
      {
        id: "text-size",
        heading: "3. Write for a phone held at arm's length",
        blocks: [
          ul("Headlines: as big as the layout allows.", "Body text: never smaller than you can read on a phone without zooming.", "Maximum of around 30 to 40 words per slide.", "Strong contrast between text and background, especially over photos."),
        ],
      },
      {
        id: "a-clear-visual-system",
        heading: "4. Use a repeatable visual system",
        blocks: [
          p("A consistent template makes the carousel feel like one object. For the Selfconsulting engineering and architecture account, the carousels share a deep green background, a mint highlight colour, thin line graphics and the logo in the same corner. Readers feel the series before they read it."),
        ],
      },
      {
        id: "guide-the-swipe",
        heading: "5. Give people a reason to swipe",
        blocks: [
          p("Visual cues help: an arrow, a slide counter, an element that runs across two slides, or a line of text that is clearly unfinished at the edge. Art Innova's service carousels use three small arrows on the cover for exactly this reason."),
        ],
      },
      {
        id: "make-it-scannable",
        heading: "6. Make every slide scannable",
        blocks: [
          p("Use lists with short items, bold the key words and keep alignment consistent. Someone should understand the slide in two seconds, and enjoy it more if they read it fully."),
        ],
      },
      {
        id: "order-the-story",
        heading: "7. Order the slides like a story",
        blocks: [
          ol("Cover: the question or promise.", "Context: why this matters.", "The main points, one per slide.", "A summary or example.", "A closing slide with a single call to action."),
        ],
      },
      {
        id: "last-slide",
        heading: "8. Finish with one action",
        blocks: [
          p("The last slide is where people decide what to do next. Choose one action: save, share, book, visit the site. Asking for five things gets you none."),
        ],
      },
      {
        id: "carousel-ideas",
        heading: "Carousel ideas that work for most brands",
        blocks: [
          ul("A myth versus reality slide series, as used on the KDT Romania account.", "A step-by-step guide to a process your customers find confusing.", "A list of questions to ask before buying your product or service.", "A 'what is the difference between X and Y' explainer.", "A before and after, or a checklist people will want to save."),
          p("Pick a topic you have already answered in messages from customers. That is proof that people want it."),
        ],
      },
      {
        id: "test-and-learn",
        heading: "9. Check what works, then repeat it",
        blocks: [
          p("Look at which carousels get saved and shared, not just liked. Saves usually mean useful content. Then repeat that structure with a new topic. If you want carousels designed as a system for your brand, have a look at my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What size should an Instagram carousel be?"),
          p("The 4:5 portrait format, 1080 by 1350 pixels, takes the most space in the feed and usually performs well. Square 1080 by 1080 also works."),
          h3("How many slides should a carousel have?"),
          p("As many as the idea needs. Most useful carousels have between five and ten slides. Do not pad."),
          h3("Should text be in the image or in the caption?"),
          p("Put the main content in the slides and use the caption for context, keywords and a call to action."),
        ],
      },
    ],
    related: { projects: ["art-innova", "selfconsulting"], services: ["social-media-design"] },
  },
  {
    id: "instagram-reels-for-small-businesses",
    slug: "instagram-reels-for-small-businesses",
    title: "Instagram Reels for Small Businesses: How to Plan, Shoot and Edit Them",
    seoTitle: "Instagram Reels for Small Business",
    description: "A simple workflow for Instagram Reels: pick an idea, write a hook, shoot vertical, add subtitles and keep a rhythm. With examples from real brands.",
    category: "social-media",
    publishedAt: "2026-10-26",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "Reels are the easiest way for a small brand to reach people who do not follow it yet, and the format many owners find most intimidating. The trick is to stop thinking of them as productions and start treating them as short, repeatable ideas. Here is the workflow I use when I edit reels for brands like Farmacia Farmex and THS Organic.",
    sections: [
      {
        id: "pick-one-idea",
        heading: "Pick one idea per reel",
        blocks: [
          p("A reel works when it answers a single question or shows a single thing. A pharmacy can show how a product is used. A food or wellness brand can show the pour, the unboxing or the morning routine. Avoid trying to explain the entire brand in thirty seconds."),
          p("Keep a running list of questions your customers really ask. Each one is a reel."),
        ],
      },
      {
        id: "the-hook",
        heading: "Write the first three seconds first",
        blocks: [
          p("Most people decide whether to stay almost instantly. Start with the interesting part: the result, the surprising moment, the question. Not the logo, not 'hi everyone'."),
          ul("Show the finished result, then how you got there.", "Open with a clear question your audience has.", "Start in the middle of the action.", "Put the main message on screen as large text."),
        ],
      },
      {
        id: "shoot-vertical",
        heading: "Shoot vertical and keep it simple",
        blocks: [
          ul("Film in 9:16 at 1080 by 1920 so nothing has to be cropped later.", "Use natural light near a window whenever you can.", "Hold the phone steady: a small tripod beats any filter.", "Film every shot a bit longer than you need, so the editor has room.", "Capture clean audio: speak close to the microphone and avoid noisy places."),
        ],
      },
      {
        id: "subtitles",
        heading: "Subtitles are not optional",
        blocks: [
          p("Many people watch with the sound off. Subtitles keep them with you, and they also help those who prefer reading. Highlight the key word of each line in a brand colour, as I do on the THS Organic reels, so the eyes follow the message."),
          p("Place subtitles away from the very bottom, where the interface covers them, and keep two lines at most."),
        ],
      },
      {
        id: "rhythm",
        heading: "Edit for rhythm",
        blocks: [
          p("Cut on movement, remove every pause that does not add meaning and change the shot every two to four seconds. Add a short piece of music or a sound that supports the mood, and keep the voice clearly above it."),
          p("Look at your reel on a phone, once with sound and once without. If the story still works both ways, you have a good one."),
        ],
      },
      {
        id: "ideas-to-start-with",
        heading: "Reel ideas to start with",
        blocks: [
          ul("Answer a customer question in under thirty seconds.", "Show how the product is made, packed or used.", "Introduce a person on the team and what they do.", "Compare two options honestly, and say which suits whom.", "Show the result of a small experiment, such as honey in tea or a routine over a week."),
          p("If you are short on ideas, scroll through your messages and comments. People tell you what they want to know."),
        ],
      },
      {
        id: "make-it-a-series",
        heading: "Turn single reels into a series",
        blocks: [
          p("The same opening graphic, the same type of subtitles and the same end frame make your reels recognisable as one family. It also makes the next one faster to produce. If you would like help with editing and a consistent look for your reels, take a look at my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long should a Reel be?"),
          p("As long as the idea needs. Many strong Reels are between fifteen and forty-five seconds. Cut anything that does not add meaning."),
          h3("Do I need a professional camera?"),
          p("No. A modern phone, good light and steady hands are enough. Sound quality and editing matter more than the camera."),
          h3("How often should I post Reels?"),
          p("Once or twice a week is a good, sustainable rhythm for a small business."),
        ],
      },
    ],
    related: { projects: ["ths-organic", "farmacia-farmex"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "social-media-content-calendar",
    slug: "how-to-plan-a-social-media-content-calendar",
    title: "How to Plan a Social Media Content Calendar That You Can Really Keep",
    seoTitle: "Social Media Content Calendar Guide",
    description: "A content calendar that survives real life: content pillars, a weekly rhythm, a monthly planning routine and how to leave room for what is happening.",
    category: "social-media",
    publishedAt: "2026-10-27",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Most content calendars die in week three. They are too ambitious, too rigid or too complicated. A good calendar is a small system you can maintain on a busy day. This is the approach I use when planning content for brands with monthly campaigns, such as Divaz and Kanoi.",
    sections: [
      {
        id: "start-with-pillars",
        heading: "Start with three or four content pillars",
        blocks: [
          p("A pillar is a type of content that serves a goal. For a beauty brand, it might be products, tutorials, offers and behind the scenes. For a service business, it might be educational posts, proof, offers and team."),
          p("Pillars stop you from asking 'what should we post today?' every morning. The question becomes 'which pillar is next?'."),
        ],
      },
      {
        id: "choose-a-rhythm",
        heading: "Choose a rhythm you can keep",
        blocks: [
          p("Three solid posts a week beat seven rushed ones. Decide how many feed posts, stories and reels you can honestly produce, and put it in writing. It is easy to add later; it is demoralising to fall behind."),
          ul("Beginner: 2 to 3 feed posts and a few stories a week.", "Growing: 3 to 4 feed posts, 1 to 2 reels and daily stories.", "Campaign weeks: add a short burst of extra content, then return to the normal rhythm."),
        ],
      },
      {
        id: "plan-the-month",
        heading: "Plan the month in one sitting",
        blocks: [
          ol("List the dates that matter: holidays, sales, launches, awareness days relevant to you.", "Place the biggest campaign or offer first.", "Fill the remaining slots by rotating through your pillars.", "Write a short working title for each post, not the whole caption.", "Mark which posts need a photo shoot, a design or a video."),
          p("The seasonal campaigns for Divaz, from Galentine's Day to holiday nail trends, work because they were placed in the calendar weeks before they were needed."),
        ],
      },
      {
        id: "batch-the-work",
        heading: "Batch the work",
        blocks: [
          p("Designing ten posts in one afternoon is far quicker than designing one every day, because your head stays in the same template and the same visual world. Do the same with photos and videos: shoot for the whole month in one session."),
        ],
      },
      {
        id: "leave-space",
        heading: "Leave space for what is happening",
        blocks: [
          p("Keep about a fifth of the calendar free for news, reactions, customer questions and things that go well. A calendar that cannot bend will be abandoned the first time something unexpected happens."),
        ],
      },
      {
        id: "tools",
        heading: "Tools you can use",
        blocks: [
          p("A calendar does not need special software. A shared spreadsheet or a simple board with columns for idea, in progress, ready and published is enough. Add columns for the pillar, the format, the date and who is responsible."),
          p("The best tool is the one your team will really open every week. If a tool adds friction, switch to something simpler."),
        ],
      },
      {
        id: "review",
        heading: "Review once a month",
        blocks: [
          p("At the end of the month, note which posts were saved, shared or led to messages, and which were ignored. Move the winning types earlier and thin out the rest. A calendar is a draft you keep improving. If you would like a content system and designs built around it, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How far ahead should I plan?"),
          p("A month is a good horizon. Plan the big campaigns a few weeks earlier so that design and production are not rushed."),
          h3("What if I have no time to post every day?"),
          p("Post less, but keep the rhythm. Consistency matters more than volume."),
          h3("Should I schedule posts in advance?"),
          p("Yes, when you can. Scheduling lets you batch the work and still keep a steady rhythm, but check the account regularly for comments."),
        ],
      },
    ],
    related: { projects: ["divaz", "kanoi"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "social-media-for-clinics-and-dental-practices",
    slug: "social-media-for-dental-clinics-and-medical-practices",
    title: "Social Media for Dental Clinics and Medical Practices: A Practical Guide",
    seoTitle: "Social Media for Dental Clinics",
    description: "How clinics, dental practices and opticians can use social media to build trust: what to post, how to design it and which mistakes to avoid.",
    category: "social-media",
    publishedAt: "2026-10-28",
    cover: { key: "artinnova-cover", alt: "A dentist in blue gloves examining a smiling patient with a mirror and a probe" },
    intro: "Patients choose a clinic with their eyes long before they walk in. A calm, clear and consistent social media presence tells them they will be in good hands. But healthcare is a sensitive field, so what works for a sneaker brand does not work here. These are the principles I follow on projects for Art Innova Dentalmed, Global Medical Health, Optica Tei and Dr. Kurbe Clinic.",
    sections: [
      {
        id: "trust-before-sales",
        heading: "Build trust before you sell",
        blocks: [
          p("People are anxious about their health. Posts that explain, reassure and show the team do more than constant promotions. For Art Innova, a series of carousels explains each service in plain words, from general dentistry to implantology, so a patient knows what to expect before booking."),
        ],
      },
      {
        id: "what-to-post",
        heading: "What to post",
        blocks: [
          ul("Educational posts that answer real questions, such as how progressive lenses work or when to see a dentist.", "Introductions of the doctors and the team, ideally in short videos.", "Explanations of procedures and technology, simply put.", "Awareness days and seasonal greetings, which show that the clinic is human.", "Clear offers, such as a first-visit price, with exactly what is included."),
          p("Optica Tei's explainer about the difference between an ophthalmologist and an optometrist is a good model: a question people genuinely have, answered in a few friendly slides."),
        ],
      },
      {
        id: "design-for-calm",
        heading: "Design for calm and clarity",
        blocks: [
          p("Healthcare design should feel clean and organised. Use plenty of white space, a restrained palette and large, legible type. Art Innova's turquoise waves and Global Medical Health's white and teal system keep a clinical subject feeling approachable, without being cold."),
          p("Pick photography carefully. Stock images of overly perfect smiles often feel fake. Real photos of the clinic, the equipment and the team build more trust, and good 3D visuals or illustrations can fill the gaps."),
        ],
      },
      {
        id: "videos-that-help",
        heading: "Let the doctors talk",
        blocks: [
          p("Short videos where a doctor explains one topic are among the most valuable things a clinic can publish. They show expertise and personality at once. With Global Medical Health, subtitled reels let doctors explain screening and early detection in simple language, which works even when the sound is off."),
        ],
      },
      {
        id: "be-careful",
        heading: "Be careful with claims and privacy",
        blocks: [
          ul("Never publish patient photos or stories without written consent.", "Avoid promising results or guaranteeing outcomes.", "Check the rules of your professional body and local regulations for medical advertising.", "Make clear that online information does not replace a consultation."),
        ],
      },
      {
        id: "example-structure",
        heading: "A simple monthly structure for a clinic",
        blocks: [
          ol("One educational carousel about a service.", "One short video with a doctor answering a question.", "One post introducing a person on the team.", "One seasonal or awareness-day post.", "One clear offer, with the price and what it includes.", "Stories showing the clinic, the equipment and everyday life."),
          p("This is enough to keep the account active, useful and trustworthy without overwhelming a busy team."),
        ],
      },
      {
        id: "keep-it-consistent",
        heading: "Keep it consistent and easy to book",
        blocks: [
          p("Always make the next step obvious: a phone number, an address, a booking link. GMH's posts end with the clinic and hospital addresses and a phone number in the same place every time. Consistency is a sign of reliability, which is exactly what patients are looking for. If you would like a social media look for your practice, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can a clinic show before and after photos?"),
          p("Only with written consent from the patient, and within the rules of your professional body. Many clinics prefer educational content that avoids the issue."),
          h3("Is Instagram or Facebook better for a medical practice?"),
          p("It depends on your patients. Many clinics use both, with Facebook reaching older audiences and Instagram a younger one."),
          h3("How do I handle negative comments?"),
          p("Reply politely and invite the person to continue privately. Never share patient details in public."),
        ],
      },
    ],
    related: { projects: ["art-innova", "global-medical-health"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "how-to-write-a-design-brief",
    slug: "how-to-write-a-design-brief-for-a-graphic-designer",
    title: "How to Write a Design Brief That Gets You Better Work From a Graphic Designer",
    seoTitle: "How to Write a Design Brief",
    description: "A good brief saves time and money. Here are the questions to answer, a simple template and the mistakes that lead to endless revisions.",
    category: "content-creation",
    publishedAt: "2026-10-29",
    cover: { key: "farmex-cover", alt: "Stethoscope beside blister packs and pills on a sage green background" },
    intro: "When a project goes wrong, the reason is rarely the design. It is usually a brief that was too vague, or one that changed halfway through. A clear brief takes an hour to write and can save weeks of revisions. This is the structure I ask clients to follow, and the one I use myself when I write briefs for my own work.",
    sections: [
      {
        id: "why-a-brief",
        heading: "Why a brief matters",
        blocks: [
          p("A brief is a shared agreement about what the work must achieve. It lets the designer solve your problem rather than guess it, and it gives you something to measure the result against. 'I will know it when I see it' is the most expensive sentence in design."),
        ],
      },
      {
        id: "the-questions",
        heading: "The questions to answer",
        blocks: [
          ol("Who are you, and what do you sell? Two sentences, plain language.", "Who is this for? Describe the person, not just a demographic.", "What is the goal? More enquiries, a launch, a rebrand, recognition at a trade fair?", "Where will it be used? Social media, print, packaging, a website?", "What should people think or feel when they see it?", "What must be included? Logo, text, prices, legal information.", "What do you like and dislike? Three examples of each, with reasons.", "What is the timeline and the budget?"),
          p("For a company like KDT Romania, which sells woodworking machinery, a good brief would say who the buyers are, what proof matters to them (results, trade fair presence, training) and where the posts will appear. That immediately shapes the tone and the layout."),
        ],
      },
      {
        id: "be-specific",
        heading: "Be specific about the problem, not the solution",
        blocks: [
          p("'Make the logo bigger' is a solution. 'People cannot read the brand name on mobile' is a problem. Describe the problem and let the designer propose the fix, because they may know a better one."),
        ],
      },
      {
        id: "references",
        heading: "Bring references, with explanations",
        blocks: [
          p("Examples are very useful, but only if you explain what you like about them. 'I like the colours', 'I like how much white space there is' or 'I like how direct the headline is' tells a designer far more than a folder of random images."),
        ],
      },
      {
        id: "feedback",
        heading: "Plan how feedback will work",
        blocks: [
          ul("Decide who has the final say, and collect opinions into one message.", "Give feedback on the goal ('this does not feel premium enough') as well as on details.", "Say what is working, so it does not get changed by accident.", "Agree on the number of revision rounds up front."),
        ],
      },
      {
        id: "brief-mistakes",
        heading: "Mistakes that lead to endless revisions",
        blocks: [
          ul("Changing the goal halfway through the project.", "Sending feedback from five people in five separate messages.", "Asking for 'something modern' without saying what that means.", "Skipping the audience, so decisions are made on personal taste.", "Leaving out essential content, such as prices or legal text, until the last round."),
          p("Most revision cycles are not about design quality. They are about information that arrived too late."),
        ],
      },
      {
        id: "template",
        heading: "A short template you can copy",
        blocks: [
          p("About us: two sentences. Audience: one paragraph. Goal: one sentence. Deliverables and formats: a list. Tone: three adjectives. Must include and must avoid: two short lists. Deadline and budget: one line each. If you can fill those in, you already have a better brief than most. If you would like to talk through yours, I am always happy to help."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long should a design brief be?"),
          p("One or two pages is enough for most projects. Clarity matters more than length."),
          h3("What if I do not know what I want?"),
          p("Say so, and describe the problem instead. A good designer will help you define the direction, but a short discovery call helps a lot."),
          h3("Should I include a budget in the brief?"),
          p("Yes. It lets the designer propose the right scope instead of guessing. A range is fine."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "iq-fashion"], services: ["branding", "content-creation"] },
  },
  {
    id: "canva-vs-hiring-a-graphic-designer",
    slug: "canva-vs-hiring-a-graphic-designer",
    title: "Canva vs Hiring a Graphic Designer: When Each One Makes Sense",
    seoTitle: "Canva vs Hiring a Graphic Designer",
    description: "Canva is great for some jobs and a risk for others. An honest comparison of Canva and a professional designer, and when it pays to switch.",
    category: "content-creation",
    publishedAt: "2026-10-30",
    cover: { key: "iq-cover", alt: "Hands holding a blush shirt dress on a hanger beside a rail of terracotta clothes" },
    intro: "I am a designer, so you might expect me to say never use Canva. I will not, because it is genuinely useful. The real question is what job you need done. For some tasks Canva is exactly right, for others it quietly costs you customers. Here is how to decide.",
    sections: [
      {
        id: "what-canva-does-well",
        heading: "What Canva does well",
        blocks: [
          ul("Quick one-off graphics, such as an event poster or a simple announcement.", "Internal presentations and documents.", "Adapting an existing design into new sizes.", "Edits made by a team that needs to change text and dates without a designer."),
          p("If you have a good set of templates, Canva is an excellent tool for using them every week."),
        ],
      },
      {
        id: "where-it-falls-short",
        heading: "Where it falls short",
        blocks: [
          p("Canva gives you thousands of ready-made layouts, and so do thousands of other businesses. Using the same templates as your competitors makes you look like your competitors. A template cannot decide who you are, what makes you different, or how a whole feed should feel."),
          ul("It does not create a brand strategy or a distinctive identity.", "Logos built from stock elements are often not exclusive, and may be hard to protect.", "Colours, fonts and spacing drift over time without clear rules.", "Complex projects like packaging, print files and large systems need professional tools and know-how."),
        ],
      },
      {
        id: "when-to-hire",
        heading: "When it is time to hire a designer",
        blocks: [
          ol("You are launching a brand and need an identity that is really yours.", "You want a consistent feed rather than good single posts.", "You are printing something, where file preparation matters.", "Your marketing is growing and the look is starting to drift.", "You compete in a market where design signals quality, such as fashion or beauty."),
          p("For IQ Fashion, a premium fashion boutique, the visual language needed to feel refined and consistent across posts, banners and newsletters. That is a design system, not a template."),
        ],
      },
      {
        id: "a-hybrid",
        heading: "A hybrid that works well",
        blocks: [
          p("Many brands use both. A designer creates the identity, the key templates and the brand rules. The team then uses Canva or a similar tool to produce everyday content inside those limits. This keeps costs low and the look consistent."),
          p("If you go this way, ask for the templates to be delivered in the tool your team uses, along with a short guide on what can be changed and what cannot."),
        ],
      },
      {
        id: "questions-to-ask",
        heading: "Questions to ask yourself before you decide",
        blocks: [
          ul("Will this be seen by customers, or only internally?", "Do I need it to last for years, or for one week?", "Do I already have an identity and templates to work from?", "Is the cost of looking generic higher than the cost of a designer?", "Will I need print files or packaging?"),
          p("Your answers will usually point clearly in one direction."),
        ],
      },
      {
        id: "how-to-decide",
        heading: "How to decide",
        blocks: [
          p("Ask yourself: if a customer saw this next to three competitors, would they still know it was us? If the honest answer is no, it is time to invest in design. If the task is short-lived and internal, Canva will do. Whatever you choose, be consistent. You can see how I approach identity and social media in my services."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can I use Canva for my logo?"),
          p("You can, but logos built from stock elements may not be unique to you, and the files may be limited. For a brand you plan to grow, a custom logo is a safer choice."),
          h3("Is Canva good for social media?"),
          p("Yes, for producing everyday posts from a set of templates. It is less suited to creating the visual system itself."),
          h3("How much does a designer cost compared with Canva?"),
          p("Canva costs a small subscription, while a designer is a project cost. The comparison is fairer when you count the time you spend and the consistency you gain."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "kanoi"], services: ["branding", "social-media-design"] },
  },
  {
    id: "food-and-wellness-brand-design",
    slug: "design-and-content-ideas-for-food-and-wellness-brands",
    title: "Design and Content Ideas for Food and Wellness Brands",
    seoTitle: "Design for Food and Wellness Brands",
    description: "How food, healthy meal and wellness brands can look appetising and trustworthy online: colour, photography, product shots and content that sells.",
    category: "content-creation",
    publishedAt: "2026-10-31",
    cover: { key: "ilie-cover", alt: "Smiling baker in black gloves filling a paper bag with cookies from glass jars" },
    intro: "Food and wellness brands live or die by appetite and trust. People need to want the product and believe in it, often before they have tasted or tried it. That is a design problem and a content problem at once. These are the ideas I come back to when working with Moș Ilie, THS Organic and Green Table.",
    sections: [
      {
        id: "give-it-a-personality",
        heading: "Give the brand a personality that tastes like the product",
        blocks: [
          p("A traditional pastry brand should feel warm and nostalgic, which is how Moș Ilie's visuals around handcrafted Romanian pastries are built. A healthy meal delivery brand should feel fresh and cheerful, which is why Green Table uses deep green with bright lime and friendly rounded type. Colour and type are the first flavour people taste."),
        ],
      },
      {
        id: "photography",
        heading: "Photography is half the sale",
        blocks: [
          ul("Use natural, warm light and avoid harsh flash.", "Shoot close: texture, steam, drips and crumbs communicate more than a distant plate.", "Show the product being used: honey pouring into tea, a sachet being opened, a box on a kitchen table.", "Keep backgrounds simple so the product stays the hero.", "Retouch lightly. Overprocessed food looks artificial."),
          p("In the THS Organic content, macro shots of honey do much of the work before any text appears."),
        ],
      },
      {
        id: "explain-the-benefit",
        heading: "Explain the benefit in one line",
        blocks: [
          p("Wellness brands often over-explain. Choose one clear promise per product, such as strengthening immunity, caring for hair or calming skin, and make it the headline. Then support it with two or three short points, not a paragraph."),
        ],
      },
      {
        id: "trust-signals",
        heading: "Show trust signals honestly",
        blocks: [
          ul("Ingredients and where they come from.", "Clear packaging that lists what the product is and is not.", "Real people using the product, with their permission.", "Comparisons that are fair and factual rather than aggressive.", "Certifications you really hold, never invented ones."),
        ],
      },
      {
        id: "content-that-sells",
        heading: "Content that works for this niche",
        blocks: [
          ol("Recipes and ways to use the product.", "Behind the scenes: where it is made and by whom.", "Before and after routines, presented realistically.", "Short reels of unboxing and tasting.", "Seasonal offers and bundles."),
        ],
      },
      {
        id: "labels-and-claims",
        heading: "Labels and claims: keep them honest",
        blocks: [
          p("Food and wellness are regulated areas. Health claims need to be supported and worded carefully, and ingredient lists must be accurate. Design the pack and the posts so that required information is easy to read, and ask a specialist if you are unsure about wording."),
          p("Honest language also wins trust. 'Made with honey and plant extracts' is better than a vague promise nobody can check."),
        ],
      },
      {
        id: "keep-the-range-coherent",
        heading: "Keep a growing range coherent",
        blocks: [
          p("If you add products, give each one a space in the system, such as its own accent colour, while keeping the logo, layout and photography style the same. That is how a brand can grow from one product to five without becoming confusing. If you are building a food or wellness brand, have a look at my work for these clients."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What colours work for a food brand?"),
          p("Warm tones such as amber, red and orange stimulate appetite, while greens suggest freshness and health. The right choice depends on the product and the audience."),
          h3("Do I need professional food photography?"),
          p("It makes a big difference, but a clean phone setup with natural light can work well for social media. For packaging and your website, professional photos are worth it."),
          h3("How often should a food brand post?"),
          p("Three to four times a week, mixing recipes, product shots, reels and offers, is a realistic rhythm."),
        ],
      },
    ],
    related: { projects: ["mos-ilie", "ths-organic", "green-table"], services: ["content-creation", "social-media-design"] },
  },
  {
    id: "what-a-small-business-website-needs",
    slug: "what-a-landing-page-needs-to-convert-visitors",
    title: "What a Landing Page Needs to Turn Visitors Into Customers",
    seoTitle: "What a Landing Page Needs to Convert",
    description: "Seven things every landing page needs: a clear promise, proof, a visible call to action, fast mobile design and more, with lessons from real UX/UI projects.",
    category: "graphic-design",
    publishedAt: "2026-11-01",
    cover: { key: "greentable-cover", alt: "Fresh healthy ingredients laid out on a white wooden table: salmon, avocado, asparagus, tomatoes, eggs, nuts and berries" },
    intro: "A landing page has one job: to make it easy for the right person to take the next step. Most underperforming pages are not ugly. They are confusing. After designing interfaces for an online florist, a printing company, a healthy meal brand and an education platform, I keep seeing the same seven things separate pages that work from pages that do not.",
    sections: [
      {
        id: "a-clear-promise",
        heading: "1. A promise people understand in five seconds",
        blocks: [
          p("The first screen must answer three questions: what is this, who is it for and why should I care. Green Table's home page opens with 'Fresh, Organic, Delivered to Your Door'. No one needs to scroll to understand the offer."),
        ],
      },
      {
        id: "one-main-action",
        heading: "2. One main action",
        blocks: [
          p("Choose the most important step, such as buy, book, request a quote or try, and make it the strongest element on the page. Secondary actions should look clearly secondary. On Green Table's home page the filled 'Try it' button leads, while 'Contact Sales' sits beside it as a quieter outline."),
        ],
      },
      {
        id: "proof",
        heading: "3. Proof that you are real",
        blocks: [
          ul("Reviews and ratings, with real names when possible.", "Logos of clients or partners.", "Photos of the team, the product or the workshop.", "Short case studies or results.", "Guarantees, delivery and return terms, stated plainly."),
        ],
      },
      {
        id: "clarity-of-information",
        heading: "4. The practical details, easy to find",
        blocks: [
          p("Price, delivery, sizes, what is included, how long it takes: these decide purchases. Regata's product pages list technical details, accepted file formats and payment options in clear blocks, because that is exactly what a print customer wants to know before ordering."),
        ],
      },
      {
        id: "mobile-first",
        heading: "5. Designed for the phone first",
        blocks: [
          p("Most visitors will arrive on a phone. Use large tap areas, readable text without zooming, a short menu and forms with as few fields as possible. Check the page with one hand, standing up, on a slow connection."),
        ],
      },
      {
        id: "speed-and-simplicity",
        heading: "6. Fast, simple and calm",
        blocks: [
          ul("Compress images and avoid auto-playing heavy videos.", "Limit fonts to two families.", "Use plenty of white space so the main action stands out.", "Remove anything that does not help the visitor decide."),
        ],
      },
      {
        id: "quick-test",
        heading: "A five-second test",
        blocks: [
          p("Show your page to someone for five seconds, then hide it and ask three questions: what is this, who is it for, what would you do next? If they hesitate on any of them, the page needs work. It costs nothing and it is the quickest way to see your own page with new eyes."),
        ],
      },
      {
        id: "accessibility",
        heading: "7. Accessible to everyone",
        blocks: [
          p("Enough contrast, clear labels, meaningful button text and good focus states help every visitor, not only those with disabilities. They also tend to help search engines understand your page."),
          p("If you would like a website or app interface designed with these principles, see my UX/UI design service and the projects below."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What is the difference between a landing page and a website?"),
          p("A landing page has one goal and one call to action. A website has many pages and serves many goals."),
          h3("How long should a landing page be?"),
          p("As long as it takes to answer the visitor's questions, and no longer. For simple offers a short page works. For expensive or complex decisions, a longer page with proof and details performs better."),
          h3("Do I need a designer for a landing page?"),
          p("A designer helps most when the page needs to build trust and guide choices. For a simple page, a good template with careful copy can be enough."),
        ],
      },
    ],
    related: { projects: ["green-table", "regata-print", "floraria-mariei"], services: ["ux-ui-design"] },
  },
  {
    id: "how-to-prepare-files-for-print",
    slug: "how-to-prepare-files-for-print-bleed-cmyk-resolution",
    title: "How to Prepare Files for Print: Bleed, CMYK and Resolution Explained",
    seoTitle: "How to Prepare Files for Print",
    description: "Print files fail for the same few reasons. Learn what bleed, CMYK, resolution and fonts mean, and how to check a file before sending it to the printer.",
    category: "graphic-design",
    publishedAt: "2026-11-02",
    cover: { key: "regata-cover", alt: "Overhead view of two designers choosing colours from printed swatch cards over coffee" },
    intro: "Nothing is more frustrating than a design that looks perfect on screen and arrives from the printer with white edges, dull colours or blurry text. Almost all print problems come from the same handful of issues, and every one of them can be avoided. This is the checklist I use before sending business cards, vouchers, flyers and calendars to print.",
    sections: [
      {
        id: "start-with-the-right-size",
        heading: "Start with the exact size",
        blocks: [
          p("Set the document to the final size from the first minute: A4, A6, a business card, a poster. Resizing later leads to blurry images and awkward margins. Ask the printer for their template if they offer one."),
        ],
      },
      {
        id: "bleed",
        heading: "Bleed: the extra edge that prevents white lines",
        blocks: [
          p("Paper is cut with a small margin of error. If your background stops exactly at the edge, a thin white line can appear. Bleed solves this by extending the background and images beyond the final size, usually by 3 mm on every side."),
          ul("Add 3 mm of bleed unless your printer says otherwise.", "Extend backgrounds and photos all the way to the bleed edge.", "Keep important text and logos inside a safe margin, around 4 to 5 mm from the cut."),
          p("The GMH wall calendar I designed was delivered with bleed and crop marks, so the printer could trim it cleanly."),
        ],
      },
      {
        id: "colour-mode",
        heading: "CMYK vs RGB",
        blocks: [
          p("Screens mix light (RGB). Printers mix ink (CMYK). Very bright colours on screen, especially vivid blues, greens and neons, cannot always be reproduced in ink. If you design in RGB and convert at the end, colours may look duller."),
          ul("Create print projects in CMYK from the start.", "Ask the printer which colour profile they use.", "For brand colours, define a CMYK or Pantone value in the brand guidelines.", "Print a proof if colour accuracy matters, for example with packaging or a logo."),
        ],
      },
      {
        id: "resolution",
        heading: "Resolution: 300 dpi at real size",
        blocks: [
          p("Images need around 300 dpi at the size they are printed. A photo that looks sharp at 1000 pixels wide on screen will be too small for an A4 flyer. Do not simply enlarge a small image: it will look soft. Look for a bigger original instead."),
        ],
      },
      {
        id: "fonts-and-text",
        heading: "Fonts, text and black",
        blocks: [
          ul("Convert text to outlines or embed fonts when exporting a PDF.", "Avoid text smaller than about 6 pt, and be careful with light text on dark backgrounds.", "For black text, use pure black (K only) rather than a mix of four inks.", "Use rich black only for large black areas, and ask the printer for their recommended values."),
        ],
      },
      {
        id: "before-you-send",
        heading: "A last checklist before you send",
        blocks: [
          ul("Final size and orientation are correct.", "Bleed and crop marks are included if requested.", "All images are 300 dpi at real size.", "Colours are in CMYK, and black text is pure black.", "Fonts are embedded or outlined.", "QR codes, phone numbers and spelling have been checked.", "You have the printer's confirmation of format and quantity."),
          p("If you are printing something important, order a single proof first. It costs little compared with a full run that has a mistake."),
        ],
      },
      {
        id: "export",
        heading: "Export and check",
        blocks: [
          ol("Export a PDF in the printer's preset, such as PDF/X-4 or the one they give you.", "Include crop marks and bleed if requested.", "Open the PDF and zoom in to check text, edges and images.", "Check spelling, phone numbers and QR codes. Scan the QR code with a phone."),
          p("Do this once and keep the setup as a template. If you need help preparing print files or designing printed materials, see my print design work."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What does bleed mean in printing?"),
          p("Bleed is the extra area of background that extends past the cut line, so that no white edge appears after trimming."),
          h3("Why do my printed colours look different from the screen?"),
          p("Screens use light and printers use ink, so bright colours can look duller in print. Designing in CMYK and ordering a proof helps."),
          h3("What resolution do I need for print?"),
          p("About 300 dpi at the final printed size. Lower resolution looks soft or pixelated."),
        ],
      },
    ],
    related: { projects: ["global-medical-health", "caterina-tomasso"], services: ["printed-media"] },
  },
  {
    id: "explainer-animation-for-business-and-education",
    slug: "2d-explainer-animation-for-business-and-education",
    title: "2D Explainer Animation for Business and Education: When It Works and How to Plan It",
    seoTitle: "2D Explainer Animation Guide",
    description: "Explainer animations make complex ideas simple. Learn when 2D animation is the right format, how to write the script and how to plan the production.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "nextlab-cover", alt: "Gloved hands using a multimeter to test a computer motherboard in an electronics lab" },
    intro: "Some ideas are hard to explain in a paragraph: how an algorithm works, what a feasibility study includes, why a platform saves teachers time. A short 2D animation can make them clear in a minute. For three years I worked in house at NEXTLAB.TECH, where animations carried the lessons of an informatics and robotics learning project. This is what I learned about when the format works and how to plan it.",
    sections: [
      {
        id: "when-it-works",
        heading: "When 2D animation is the right choice",
        blocks: [
          ul("The topic is abstract or invisible, such as software, data, processes or memory.", "You need to explain the same thing to many people, again and again.", "Filming is impractical or expensive.", "You want a friendly tone, with characters and humour.", "The audience is learning, so clarity matters more than spectacle."),
          p("For education it is particularly good: a character who speaks to the student, a scene that shows an everyday example and a simple diagram can turn a difficult concept into something familiar."),
        ],
      },
      {
        id: "one-message",
        heading: "Start with one message",
        blocks: [
          p("Decide the single thing the viewer should understand or do at the end. One animation should have one idea. If you have five, make five short videos. In our lessons, a clip about algorithms uses a smoothie recipe as the example: everyone understands steps in a recipe, so the idea of an algorithm arrives without effort."),
        ],
      },
      {
        id: "write-the-script",
        heading: "Write the script for the ear",
        blocks: [
          ul("Use short sentences and plain words.", "Open with a question or a familiar situation.", "Give one example before the definition.", "End with a short summary, such as 'Deci reține!' in our Romanian lessons.", "Read it aloud and cut everything that sounds like a textbook."),
          p("A minute of speech is roughly 130 to 150 words. Keep to that and you will not need to rush the visuals."),
        ],
      },
      {
        id: "storyboard",
        heading: "Storyboard before you animate",
        blocks: [
          p("A storyboard is a row of simple frames that shows what is on screen for each sentence. It is the cheapest place to find mistakes. Mark where text appears, where characters enter and what changes from scene to scene."),
        ],
      },
      {
        id: "design-and-animation",
        heading: "Keep the design simple and consistent",
        blocks: [
          ol("Choose a small set of characters and a clear colour palette.", "Use a consistent illustration style across all scenes.", "Animate only what supports the message: a highlight, a transition, a drawn arrow.", "Keep text large and on screen long enough to be read twice.", "Add subtitles, so the video works with the sound off and in noisy classrooms."),
        ],
      },
      {
        id: "what-it-costs-in-time",
        heading: "What affects the time and effort",
        blocks: [
          ul("The length of the video.", "The number of characters and scenes.", "The amount of custom illustration needed.", "The complexity of the movement.", "How quickly feedback and the script are approved."),
          p("A short, well-planned animation can be made far faster than a long one with changing ideas. The script and storyboard are where you save the most time."),
        ],
      },
      {
        id: "sound-and-review",
        heading: "Sound and review",
        blocks: [
          p("Clear voice-over matters more than music. Keep music low and simple, and leave short pauses after important lines. Test the video with someone who knows nothing about the topic. If they can explain it back to you, it works."),
          p("You can see examples of explainer animations on the 2D animation service page and in the NEXTLAB.TECH project."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long should an explainer video be?"),
          p("One to two minutes works for most topics. Longer lessons are better split into several short parts."),
          h3("Do I need a voice-over?"),
          p("A clear voice-over helps comprehension, especially for education. Subtitles let the video work without sound."),
          h3("Can animation be used for lessons in languages other than English?"),
          p("Yes. Keep text on screen separate from the illustration, so it is easy to translate, as we did for lessons in Romanian."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech"], services: ["2d-animation", "content-creation"] },
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
