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
  {
    id: "how-to-pair-fonts-for-a-brand",
    slug: "how-to-pair-fonts-for-a-brand",
    title: "How to Pair Fonts for a Brand: A Simple System That Always Works",
    seoTitle: "How to Pair Fonts for a Brand",
    description: "Font pairing without guesswork: how many fonts to use, which combinations work, and how to test them on real layouts and on a phone.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "Choosing fonts is one of those jobs that looks easy until you try it. Two fonts that each look great on their own can fight each other on the same page. The good news is that font pairing follows a few simple rules, and once you know them you can pair type for almost any brand in minutes.",
    sections: [
      {
        id: "start-with-the-role",
        heading: "Start with the job each font has to do",
        blocks: [
          p("Before you browse a font library, decide what each typeface is for. A brand usually needs one font that speaks (headlines, the logo, big statements) and one that works quietly (paragraphs, captions, prices, legal text). A single family with several weights can do both, and that is often the safest start."),
          p("On the Green Table web design I paired a rounded, friendly display face for headlines with a plain, highly readable sans-serif for everything functional. The display font carries the personality, the second one just gets out of the way."),
        ],
      },
      {
        id: "how-many",
        heading: "How many fonts is enough",
        blocks: [
          p("Two is the number that works for almost everyone. Three is the limit, and only if the third has a very specific role, such as a handwritten accent used once per layout. More than three and the brand starts to look like a ransom note."),
          ul("One headline font with character.", "One text font that stays readable at small sizes on a phone.", "Optionally, one accent font used rarely."),
        ],
      },
      {
        id: "pairing-rules",
        heading: "Four pairings that rarely fail",
        blocks: [
          ol("Serif headline with a clean sans-serif text. A classic, elegant combination, used for Caterina Tomasso with a refined headline face and a simple body font.", "Sans-serif headline with a serif text, for a more editorial feel.", "One family in two weights, such as bold for headlines and regular for text. Impossible to get wrong.", "A geometric sans with a humanist sans: they share structure but differ in warmth."),
          p("The common thread is contrast with a reason. If two fonts are almost the same but not quite, the difference looks like a mistake. Make them clearly different or clearly the same family."),
        ],
      },
      {
        id: "test-it",
        heading: "Test the pair where it will live",
        blocks: [
          ul("Set a real headline, a paragraph, a price and a caption, not placeholder text.", "Look at it on a phone, at the real size, in bright light.", "Check that numbers, accents and special characters exist in both fonts. Romanian diacritics such as ă, ș and ț are a classic trap.", "Check the licence: some free fonts do not allow commercial use or embedding on a website."),
          p("If a font is missing characters your language needs, drop it, however beautiful it is. A brand that cannot spell its own customers' names has a problem."),
        ],
      },
      {
        id: "write-it-down",
        heading: "Write the rules down",
        blocks: [
          p("Once you have a pair, write down which font is used where, in what sizes and weights, and how much space goes between lines. Three sentences are enough. This is the part of a brand book that saves the most time later."),
          p("If you want help choosing typography as part of a complete identity, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can I use the same font for everything?"),
          p("Yes. One well-chosen family with several weights is a safe and elegant choice, especially for small brands."),
          h3("Are free fonts good enough?"),
          p("Many are excellent. Check the licence for commercial use and for use on websites and apps, and make sure the font supports your language."),
          h3("Should my logo font match my brand font?"),
          p("Not necessarily, but they should not clash. Many brands use a custom logotype and a related, simpler font for everything else."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "green-table"], services: ["branding"] },
  },
  {
    id: "logo-file-formats-explained",
    slug: "logo-file-formats-explained-svg-png-pdf-ai",
    title: "Logo File Formats Explained: SVG, PNG, PDF, AI and When to Use Each",
    seoTitle: "Logo File Formats Explained: SVG, PNG, PDF",
    description: "Which logo file to use where: SVG for web, PNG for transparent images, PDF and AI for print and editing, plus what to ask your designer to deliver.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "After a logo project you usually receive a folder full of files with names like logo_final_v3.ai and logo-white.png. It is not obvious which one to put on your website, which one to send to the printer and which one to keep safe. This guide explains the common formats in plain language, so you always grab the right file.",
    sections: [
      {
        id: "vector-vs-raster",
        heading: "Vector and raster: the one idea you need",
        blocks: [
          p("Vector files (SVG, AI, EPS, PDF) describe a logo with lines and shapes, so they can be scaled to any size, from a pen to a billboard, without losing sharpness. Raster files (PNG, JPG) are made of pixels, so they have a fixed size and look soft if you enlarge them."),
          p("Your master logo should always exist as a vector. Everything else can be exported from it."),
        ],
      },
      {
        id: "svg",
        heading: "SVG: the best choice for websites",
        blocks: [
          p("SVG is a vector format that browsers understand. It stays crisp on every screen, is usually very small in file size and can change colour with a line of code. Use it for the logo in your site header and footer."),
          ul("Great for logos and icons, not for photos.", "Check that text in the logo has been converted to outlines, so fonts do not change.", "Keep a copy of the SVG for the dark and light versions."),
        ],
      },
      {
        id: "png",
        heading: "PNG: when you need transparency",
        blocks: [
          p("PNG is a raster format that supports a transparent background. It is the right choice for placing a logo over a photo, for presentations, and for platforms that do not accept SVG, such as many social media and email tools."),
          ul("Export at a large size (for example 2000 pixels wide) so it stays sharp.", "Keep versions for light and dark backgrounds.", "Do not use a PNG for print if you can use a vector."),
        ],
      },
      {
        id: "pdf-ai-eps",
        heading: "PDF, AI and EPS: print and editing",
        blocks: [
          p("A vector PDF is the easiest file to send to a printer, and almost any program can open it. AI is the editable Adobe Illustrator file: keep it as your master for future changes. EPS is an older vector format that some printers and sign makers still ask for."),
          p("When a printer asks for the logo, send a vector PDF unless they request something else. If you are not sure, ask for their file specification."),
        ],
      },
      {
        id: "jpg",
        heading: "JPG: usually not for logos",
        blocks: [
          p("JPG compresses images and cannot be transparent, so a logo saved as JPG sits in a white box on any coloured background. It is fine for sending a quick preview, but not for real use."),
        ],
      },
      {
        id: "what-to-ask",
        heading: "What to ask your designer to deliver",
        blocks: [
          ol("The master logo in AI or another editable vector file.", "SVG and vector PDF versions.", "PNG versions with a transparent background, in full colour, black and white.", "Versions for light and dark backgrounds.", "The icon or small version, and a version for social media profile pictures."),
          p("If you are working on a new identity, ask for this full package up front. It saves a lot of back and forth later."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can I turn a PNG logo into a vector?"),
          p("It can be redrawn or traced, but traced results are often rough. A proper redraw by a designer is much better."),
          h3("Which format should I upload to Instagram?"),
          p("A PNG or JPG at a high resolution, since the platform does not use vectors for profile pictures."),
          h3("Why does my logo look blurry on my website?"),
          p("It is usually a small raster file stretched too large. Replace it with an SVG or a larger PNG."),
        ],
      },
    ],
    related: { projects: ["inklabs", "fleurane"], services: ["branding"] },
  },
  {
    id: "what-makes-a-good-logo",
    slug: "what-makes-a-good-logo-7-principles",
    title: "What Makes a Good Logo? 7 Principles to Check Before You Approve It",
    seoTitle: "What Makes a Good Logo? 7 Principles",
    description: "A good logo is simple, memorable and works everywhere. Seven principles you can use to judge a logo before you sign off on it.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "Most people judge a logo by whether they like it. That is a start, but a logo has to do a lot more than look nice. It has to be recognised in a tiny profile picture, read on a dark background and still work in one colour. These seven checks help you decide if a logo is really good, not just pretty.",
    sections: [
      {
        id: "simple",
        heading: "1. It is simple enough to remember",
        blocks: [
          p("The logos people remember have a clear shape and few details. A test: try to draw it from memory after seeing it once. If you cannot, it is probably too complicated."),
          p("Simplicity does not mean boring. The Inklabs logo is built from a bold wordmark and a small diamond-dotted letter i. It is simple, and unmistakable."),
        ],
      },
      {
        id: "scalable",
        heading: "2. It works at any size",
        blocks: [
          p("Shrink the logo to the size of a profile picture and a favicon. Then enlarge it to fit a banner. If details disappear or fine lines vanish, a simpler version is needed for small uses."),
          ul("Check at about 32 pixels wide.", "Check on a printed business card.", "Make sure there is a compact icon version for tight spaces."),
        ],
      },
      {
        id: "colour-independent",
        heading: "3. It works in one colour",
        blocks: [
          p("A good logo still works in black or white only. You will need that version for stamps, engraving, a fax-like photocopy, or a small print job. If the logo depends on a gradient to be understood, it is fragile."),
          p("Also check the logo on light, dark and photographic backgrounds."),
        ],
      },
      {
        id: "fits",
        heading: "4. It fits the business, not the trend",
        blocks: [
          p("A logo for a premium fashion boutique does not need the same energy as a logo for a press-on nail brand. Check that the shape, type and colour suit the audience. IQ Fashion needed a refined, restrained look. That would be wrong for a playful brand."),
          p("Be wary of fashionable effects. Trends age fast, while a timeless shape stays useful for years."),
        ],
      },
      {
        id: "distinct",
        heading: "5. It is distinct from competitors",
        blocks: [
          p("Put your logo next to three competitors. Can you tell them apart in two seconds? If you can swap the names and nothing changes, the logo does not do its job."),
        ],
      },
      {
        id: "versatile",
        heading: "6. It is versatile",
        blocks: [
          ul("Horizontal and stacked versions.", "A symbol on its own and a wordmark on its own.", "Light and dark versions.", "A shape that can be used in patterns and on social media."),
          p("Versatility is what makes the logo a tool, not just a picture."),
        ],
      },
      {
        id: "legible",
        heading: "7. It is legible",
        blocks: [
          p("If the logo includes a name, make sure it can be read quickly, in every size. Very thin or decorative letters can look pretty and fail when printed small. Check how the letters behave at the smallest size you will use. If you want a second opinion on a logo, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Should a logo include an icon?"),
          p("Not necessarily. A strong wordmark can be enough. An icon is useful for small spaces such as profile pictures."),
          h3("How many colours should a logo have?"),
          p("Usually one to three. Fewer colours are easier to reproduce and remember."),
          h3("Can I design my own logo?"),
          p("You can, but a logo is the visible core of your brand. A professional can help you avoid common problems such as poor scaling and unclear shapes."),
        ],
      },
    ],
    related: { projects: ["inklabs", "iq-fashion"], services: ["branding"] },
  },
  {
    id: "brand-voice-and-tone-of-voice",
    slug: "brand-voice-and-tone-of-voice-how-to-define-yours",
    title: "Brand Voice and Tone of Voice: How to Define Yours (With Examples)",
    seoTitle: "Brand Voice and Tone of Voice: How to Define",
    description: "A clear brand voice makes every post, caption and email sound like the same business. How to define yours in three steps, with examples.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "You can recognise some brands by their writing alone, even with the logo hidden. That is brand voice at work. It is the personality of how a business speaks, and when it is consistent, customers trust it more. Here is a simple way to define yours, even if you are a one-person business.",
    sections: [
      {
        id: "voice-vs-tone",
        heading: "Voice and tone: what is the difference",
        blocks: [
          p("Voice is the constant personality of the brand: warm, direct, playful, expert. Tone is how that voice adapts to the situation. A brand can be friendly in a giveaway post and calm and serious when it discusses a delay or a safety instruction."),
          p("Think of a person: the voice is who they are, the tone changes between a party and a meeting."),
        ],
      },
      {
        id: "step-one",
        heading: "Step 1: choose three words",
        blocks: [
          p("Pick three adjectives that describe how the brand should sound, and write a sentence for each about what it means in practice. For Inklabs, the voice is a mix of rebellious and reliable: bold and a bit cheeky when it talks about style, clear and calm when it talks about skin safety."),
          ul("Friendly, but not childish.", "Expert, but not stiff.", "Confident, but not arrogant."),
        ],
      },
      {
        id: "step-two",
        heading: "Step 2: write do and do not rules",
        blocks: [
          p("For each word, give an example of what to write and what to avoid. This is what makes the voice usable by someone else."),
          ul("Do use short sentences. Do not use corporate jargon.", "Do address the reader as you. Do not hide behind we are pleased to announce.", "Do use humour lightly. Do not joke about customer problems."),
        ],
      },
      {
        id: "step-three",
        heading: "Step 3: test it on real texts",
        blocks: [
          p("Rewrite three existing captions, a product description and a thank-you email using the rules. Read them aloud. If they sound like the brand, keep going. If they feel forced, adjust the words."),
          p("Different channels can stretch the tone: more relaxed on social media, more formal in a quote. The voice stays the same."),
        ],
      },
      {
        id: "keep-it-consistent",
        heading: "Keep it consistent in every channel",
        blocks: [
          ul("Use the same voice in captions, website text, emails and packaging.", "Share the guide with everyone who writes for the brand.", "Include a few model phrases and a few banned ones.", "Review it once a year as the brand grows."),
          p("A voice guide can be one page. For KDT Romania, an industrial brand, the posts stay clear, practical and focused on results, even when the topic is technical. If you want a voice and visual style that work together, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do small businesses need a brand voice?"),
          p("Yes. It makes writing faster, because you know how you sound, and it makes the brand easier to recognise."),
          h3("How long should a voice guide be?"),
          p("One page is enough: three words, do and do not rules, and a few examples."),
          h3("Can the voice change over time?"),
          p("Yes, as the brand evolves. Change it on purpose and update the guide, instead of drifting."),
        ],
      },
    ],
    related: { projects: ["inklabs", "kdt-romania"], services: ["content-creation", "branding"] },
  },
  {
    id: "how-to-make-a-brand-mood-board",
    slug: "how-to-make-a-brand-mood-board",
    title: "How to Make a Brand Mood Board That Actually Guides the Design",
    seoTitle: "How to Make a Brand Mood Board",
    description: "A mood board is a decision tool, not a collage. How to collect references, find the pattern and turn it into colours, type and style.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "A mood board is often treated as decoration at the start of a project. Done properly, it is one of the most useful tools in branding: a way to agree on a direction before anyone spends hours designing. Here is how to build one that guides the work, using the same approach I follow in identity projects.",
    sections: [
      {
        id: "what-it-is",
        heading: "What a mood board is for",
        blocks: [
          p("A mood board gathers visual references that show how a brand should feel: colours, textures, photography, typography, shapes. Its job is to make a vague idea such as soft, glossy and accessible into something everyone can see and discuss."),
          p("For the Divaz identity, the board brought together rose and berry tones, glossy product photography and soft, rounded shapes. That gave the whole project a shared language before any logo was drawn."),
        ],
      },
      {
        id: "collect",
        heading: "Collect widely, then narrow down",
        blocks: [
          ul("Gather 30 to 50 images quickly, without overthinking.", "Include photography, packaging, interiors, textures, typography and colour swatches.", "Look outside your industry. Fashion, architecture and food can inspire a cosmetics brand.", "Save the source of each image."),
          p("Pinterest, Behance and your own photos are all good sources."),
        ],
      },
      {
        id: "find-the-pattern",
        heading: "Find the pattern",
        blocks: [
          p("Lay everything out and ask what repeats. Is it warm light? A restrained palette? Rounded shapes? Heavy contrast? Remove images that do not fit, even if you love them, until a clear direction appears."),
          p("Then write three words that describe it, such as soft, glossy and accessible. These words become the test for every later decision."),
        ],
      },
      {
        id: "translate",
        heading: "Translate the board into decisions",
        blocks: [
          ol("Colours: pick a palette from the images and write the codes.", "Typography: choose fonts that match the mood, such as elegant serif or friendly rounded sans.", "Imagery: describe the light, background and framing for photos.", "Graphic elements: note the shapes, patterns and details that recur.", "Rules: list what the brand will never do."),
        ],
      },
      {
        id: "present",
        heading: "Present it so people can react",
        blocks: [
          p("A good board is clear at a glance: one large image, a palette, two or three type samples and a few words. Show it to the client or your team and ask what feels right and what feels off. Reactions to a board are cheaper than reactions to a finished logo."),
        ],
      },
      {
        id: "after",
        heading: "Use it after the project too",
        blocks: [
          p("Keep the board with the brand guidelines. When you create a new campaign, check it against the board. If you want a mood board and a full identity built around it, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do I need a mood board for a small project?"),
          p("A small one helps. Even a dozen images and a palette can prevent weeks of misunderstanding."),
          h3("Is a mood board the same as a brand book?"),
          p("No. The mood board explores the direction. The brand book documents the final rules."),
          h3("What tools can I use?"),
          p("Pinterest, Figma, Canva or simply a folder of images. The tool matters less than the thinking."),
        ],
      },
    ],
    related: { projects: ["divaz", "fleurane"], services: ["branding"] },
  },
  {
    id: "when-to-rebrand",
    slug: "when-to-rebrand-and-how-to-do-it",
    title: "When to Rebrand and How to Do It Without Losing Your Customers",
    seoTitle: "When to Rebrand and How to Do It Well",
    description: "Not every business needs a rebrand. How to tell when it is time, the difference between a refresh and a full redesign, and how to roll it out safely.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "iq-cover", alt: "Hands holding a blush shirt dress on a hanger beside a rail of terracotta clothes" },
    intro: "A rebrand is exciting and risky in equal measure. Done at the right moment, it can lift a business that has outgrown its look. Done for the wrong reasons, it throws away years of recognition. Before you change anything, ask a few honest questions.",
    sections: [
      {
        id: "signs",
        heading: "Signs that it is time",
        blocks: [
          ul("The business has changed: new audience, new services, or a different positioning.", "The identity looks dated next to competitors and customers mention it.", "Your materials look inconsistent because the system was never complete.", "The logo does not work in digital contexts such as small profile pictures.", "A merger, a new owner, or a new market makes the old identity wrong."),
          p("The reason should be strategic. 'We are bored of it' is rarely a good reason, because the audience takes much longer than you do to get tired of a brand."),
        ],
      },
      {
        id: "refresh-vs-redesign",
        heading: "Refresh or full redesign",
        blocks: [
          p("A refresh keeps what people recognise, such as the name, the main colour or the basic logo shape, and improves what is weak. A redesign changes the identity more deeply. In most cases a careful refresh gives most of the benefit with far less risk."),
          p("Ask which parts of the brand customers already associate with you. Keep those, and change the rest."),
        ],
      },
      {
        id: "audit",
        heading: "Start with an audit",
        blocks: [
          ol("Collect everything the brand currently publishes.", "Note what works, what is inconsistent and what is missing.", "Talk to a few customers about how they see the brand.", "Define what the new identity must achieve."),
          p("An audit often shows that the problem is consistency, not design. In that case a clear system and templates may be all you need."),
        ],
      },
      {
        id: "plan-the-rollout",
        heading: "Plan the rollout",
        blocks: [
          ul("List every place the brand appears: website, social profiles, packaging, signage, emails, invoices.", "Decide the order: digital is fastest, print and signage take longer.", "Prepare the new templates before you announce anything.", "Use a transition period if the change is large."),
        ],
      },
      {
        id: "tell-people",
        heading: "Tell your customers the story",
        blocks: [
          p("Explain the change in a short, positive post: why you are evolving and what stays the same. People accept change when they understand it. Avoid deleting your old content, since it keeps your history and search visibility."),
          p("If you are considering a brand refresh, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How often should a brand be refreshed?"),
          p("There is no fixed schedule. Review the identity every few years, and refresh only when something has changed or no longer works."),
          h3("Will a rebrand hurt my SEO?"),
          p("It can, if URLs, names and metadata change carelessly. Keep redirects, update titles and descriptions, and keep your website structure where possible."),
          h3("How long does a rebrand take?"),
          p("A small refresh can take weeks. A full identity with rollout takes months."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "kanoi"], services: ["branding"] },
  },
  {
    id: "how-to-name-a-brand",
    slug: "how-to-name-a-brand-checklist",
    title: "How to Name a Brand: A Practical Checklist for Choosing a Business Name",
    seoTitle: "How to Name a Brand: A Practical Checklist",
    description: "A good brand name is easy to say, spell and remember, and available where it matters. A step-by-step checklist for choosing and checking a name.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "A name is the first piece of your brand that anyone meets, and the hardest to change later. The good news is that choosing one does not have to be a flash of genius. It can be a process, with clear criteria and a few checks that save you from expensive mistakes.",
    sections: [
      {
        id: "define",
        heading: "Start with what the name must do",
        blocks: [
          p("Write down who the name is for, what the business promises and how it should feel. A name for a playful nail brand has a different job from a name for a dental clinic. Keep that sentence in front of you while you brainstorm."),
          p("Divaz is a good example: short, glamorous, easy to say in any language and fitting for a beauty brand."),
        ],
      },
      {
        id: "types",
        heading: "Types of names",
        blocks: [
          ul("Descriptive: says what you do (clear, but hard to protect and stand out).", "Evocative: suggests a feeling or idea, such as Inklabs.", "Invented: a new word, memorable but needing more brand building.", "Founder name: personal and trusted, but harder to sell later.", "Acronym: short, but meaningless to newcomers."),
        ],
      },
      {
        id: "brainstorm",
        heading: "Brainstorm widely",
        blocks: [
          p("Write 50 names without judging. Combine words, try other languages, play with sounds. Then cut the list using the criteria."),
          ul("Easy to say and spell, including on the phone.", "Short enough to fit on a logo and a profile name.", "No awkward meaning in languages you plan to sell in.", "Distinct from competitors."),
        ],
      },
      {
        id: "check",
        heading: "Check availability before you fall in love",
        blocks: [
          ol("Search the name on Google: who else uses it, and in what field?", "Check the domain name and plausible variations.", "Check the social media handles on the platforms you will use.", "Search trademark databases in your country and the EU for similar names in your category.", "Say it aloud, write it, and ask five people to spell it after hearing it once."),
          p("Trademark searches are worth doing with a professional if the brand is important. A name you cannot use is expensive."),
        ],
      },
      {
        id: "test",
        heading: "Test with real people",
        blocks: [
          p("Show a short list to a handful of people in your target audience. Ask what they imagine when they hear each name. The goal is not to vote, but to see whether the name creates the feeling you want."),
        ],
      },
      {
        id: "next",
        heading: "After you choose",
        blocks: [
          p("Register the domain and handles quickly, consider a trademark, and let the identity follow the name. If you need help with naming and a visual identity together, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Should a business name include keywords?"),
          p("It can help clarity, but a unique name is easier to protect and remember. Many brands combine a distinctive name with a descriptive line."),
          h3("Is it a problem if the domain is taken?"),
          p("Not always. You can add a word or choose a different extension, but avoid names that are confusingly close to another brand."),
          h3("Can I change my brand name later?"),
          p("Yes, but it costs time and recognition. It is much cheaper to choose carefully at the start."),
        ],
      },
    ],
    related: { projects: ["inklabs", "divaz"], services: ["branding"] },
  },
  {
    id: "brand-positioning-statement",
    slug: "brand-positioning-statement-template-and-examples",
    title: "Brand Positioning Statement: A Simple Template (With Examples)",
    seoTitle: "Brand Positioning Statement: Template and Examples",
    description: "A positioning statement tells people who you serve, what you offer and why you are different. A fill-in-the-blank template with worked examples.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "If you struggle to explain what makes your business different, your design and your content will struggle too. A positioning statement is a short, internal sentence that fixes that. It is not a slogan, but it guides every slogan, post and design decision that follows.",
    sections: [
      {
        id: "what",
        heading: "What a positioning statement is",
        blocks: [
          p("It is a one or two sentence description of who your brand is for, what category you compete in, the main benefit you offer and the reason to believe it. It is written for your team and your designer, not for the public."),
          p("Without it, every decision is opinion. With it, you can ask whether a design, a caption or an offer fits the position."),
        ],
      },
      {
        id: "template",
        heading: "The template",
        blocks: [
          p("For [target audience] who [need or problem], [brand] is the [category] that [main benefit], because [reason to believe]."),
          ol("Audience: be specific. 'Women in their thirties who want elegant christening gifts' is better than 'women'.", "Need: the problem or desire, in their words.", "Category: the frame of reference people understand.", "Benefit: the most important result, in one idea.", "Reason to believe: proof, such as materials, expertise or method."),
        ],
      },
      {
        id: "example-one",
        heading: "Example: a silver gift boutique",
        blocks: [
          p("For parents and gift-givers who want something lasting for a christening, Caterina Tomasso is the online boutique of sterling silver that turns a gift into a keepsake, because every piece is made in 925 silver and presented in a premium way."),
          p("From that sentence the visual direction follows: refined, silver, calm and high end, with a lot of white space."),
        ],
      },
      {
        id: "example-two",
        heading: "Example: an industrial machinery company",
        blocks: [
          p("For furniture and woodworking manufacturers who lose time moving boards by hand, KDT Romania is the machinery partner that automates the workshop, because it provides the machines and the training that deliver results."),
          p("Here the content leans on proof and practical results, not on decoration."),
        ],
      },
      {
        id: "test",
        heading: "Test your statement",
        blocks: [
          ul("Could a competitor say the same sentence? If yes, make it more specific.", "Is the benefit real and provable?", "Does it help you say no to some ideas?", "Can the team repeat it from memory?"),
        ],
      },
      {
        id: "use",
        heading: "Use it every day",
        blocks: [
          p("Put the statement at the start of the brand guidelines and in every brief. Review it once a year. If you would like help finding your position and turning it into a visual identity, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Is a positioning statement the same as a slogan?"),
          p("No. It is an internal tool. A slogan can come from it but is written for customers."),
          h3("How long should it be?"),
          p("One or two sentences. If it needs more, the idea is not clear yet."),
          h3("Do small businesses need one?"),
          p("Yes. A clear position saves time and money in every later choice."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "caterina-tomasso"], services: ["branding", "content-creation"] },
  },
  {
    id: "brand-audit-checklist",
    slug: "brand-consistency-audit-checklist",
    title: "Brand Consistency Audit: A 10-Point Checklist You Can Do in an Afternoon",
    seoTitle: "Brand Consistency Audit: A 10-Point Checklist",
    description: "Check whether your brand looks the same everywhere with this 10-point audit: logo, colours, fonts, photos, tone and templates across every channel.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "Brands rarely become inconsistent on purpose. They drift: a new post here, a quick flyer there, a different shade of blue in the invoice. An audit shows you how far you have drifted, and it takes one afternoon. Here is the checklist I use with clients before we change a single design.",
    sections: [
      {
        id: "collect",
        heading: "First, put everything in one place",
        blocks: [
          p("Gather screenshots or files from every place the brand appears: website, social profiles and the last 20 posts, newsletters, business cards, packaging, invoices, signage, email signatures. Print them or lay them out in a grid. Patterns and problems show up immediately."),
        ],
      },
      {
        id: "ten",
        heading: "The 10 checks",
        blocks: [
          ol("Logo: is it always the same version, in correct proportions and with clear space?", "Colours: are the shades identical everywhere, with codes written down?", "Typography: are the same fonts used for the same jobs?", "Photography: do the images share light, style and quality?", "Graphic elements: do patterns, icons and frames follow one style?", "Layouts: do posts and documents use the same grids and templates?", "Tone of voice: do captions, emails and the website sound like one author?", "Quality: are images sharp, texts proofread and files in the right size?", "Contact details: are the phone, address and links the same everywhere?", "Profiles: are names, photos, bios and highlights aligned across platforms?"),
          p("Score each check from one to three. Anything below two is a priority."),
        ],
      },
      {
        id: "read",
        heading: "Read the results",
        blocks: [
          ul("Mostly strong with a few weak points: fix them and write the rules.", "Inconsistency in several areas: the brand needs a clear system and templates.", "Strong consistency but a dated look: consider a refresh, not a redesign.", "Different looks per channel: decide what must stay constant and what can vary."),
        ],
      },
      {
        id: "fix",
        heading: "Fix in the right order",
        blocks: [
          ol("Create or update a one-page guide: logo, colours, fonts and tone.", "Build templates for the formats you use most.", "Update the high-visibility places first: website, social profiles, email signature.", "Replace print materials as they run out, not all at once."),
        ],
      },
      {
        id: "keep",
        heading: "Make it a habit",
        blocks: [
          p("Repeat the audit every six months, or after a big campaign. A short review keeps the system alive. If you would like help creating the system, see my branding and social media design services."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How often should I audit my brand?"),
          p("Once or twice a year is enough, and after any big change in the business."),
          h3("Who should do the audit?"),
          p("Someone close to the brand and someone fresh. An outside view often sees things you no longer notice."),
          h3("What if every channel looks different?"),
          p("Start by choosing the one that represents the brand best, then align the others to it."),
        ],
      },
    ],
    related: { projects: ["inklabs", "iq-fashion"], services: ["branding", "social-media-design"] },
  },
  {
    id: "logo-design-process",
    slug: "logo-design-process-step-by-step",
    title: "The Logo Design Process: What Happens Step by Step",
    seoTitle: "The Logo Design Process, Step by Step",
    description: "From brief to final files: what actually happens during a logo project, how long each stage takes and how you can help it go well.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "Many clients imagine logo design as a designer disappearing for a week and coming back with the perfect mark. In practice, a good logo is the result of a series of steps, and your input at each one decides how good the result is. Here is what really happens, so you know what to expect and when to speak up.",
    sections: [
      {
        id: "one",
        heading: "1. Brief and discovery",
        blocks: [
          p("We start with questions: who the business serves, what it promises, who the competitors are, where the logo will appear. This stage sets the direction, and it saves the most time later. I often ask clients to send three brands they like and three they do not, with reasons."),
        ],
      },
      {
        id: "two",
        heading: "2. Research and moodboard",
        blocks: [
          p("I look at the market, collect visual references and build a mood board. This is where words such as warm, precise or playful become shapes, colours and type. It is also where we agree what the logo must not look like."),
        ],
      },
      {
        id: "three",
        heading: "3. Sketching and concepts",
        blocks: [
          p("Ideas begin on paper, quickly and in large numbers. The strongest become digital concepts, usually two or three directions. Each is shown in context: on a profile picture, on a package, on a dark background."),
          ul("A concept is a direction, not a finished logo.", "Feedback at this stage is about fit and feeling, not details.", "It is normal to combine elements from different directions."),
        ],
      },
      {
        id: "four",
        heading: "4. Feedback and refinement",
        blocks: [
          p("After you choose a direction, it is refined: proportions, spacing, kerning, colour. Small changes matter a lot at this stage. Collect feedback from the people who decide and send it in one message."),
          ol("Say what works first.", "Describe the problem, not the solution.", "Use the goal as the measure: does it feel premium enough, clear enough?"),
        ],
      },
      {
        id: "five",
        heading: "5. Testing",
        blocks: [
          p("The logo is tested at small and large sizes, in one colour, on photographs and on mock-ups. This is where weaknesses appear and get fixed, such as fine lines that vanish in small sizes."),
        ],
      },
      {
        id: "six",
        heading: "6. Final files and guidelines",
        blocks: [
          p("The final package includes the logo in vector and raster formats, colour versions, the icon version and, often, guidelines. For identity projects such as Fleurane, the logo goes on to become part of labels, packaging and print."),
          p("If you are planning a logo, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long does logo design take?"),
          p("From a couple of weeks for a simple logo to several weeks for a full identity, depending on feedback speed."),
          h3("How many concepts will I see?"),
          p("Usually two or three strong directions, so you can choose rather than compare dozens."),
          h3("What do I need to prepare?"),
          p("A clear idea of your audience, three brands you like, three you do not, and where the logo will be used."),
        ],
      },
    ],
    related: { projects: ["inklabs", "fleurane"], services: ["branding"] },
  },
  {
    id: "brand-strategy-small-business",
    slug: "brand-strategy-for-small-business",
    title: "Brand Strategy for a Small Business: Where to Start With a Small Budget",
    seoTitle: "Brand Strategy for Small Business: Where to Start",
    description: "A small business does not need a huge strategy document. Five decisions that give your brand direction, and the order to make them in.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Brand strategy sounds like something for big companies with big budgets. In reality, a small business needs it even more, because every euro has to work harder. The good news is that a useful strategy fits on a single page. These are the five decisions it should answer.",
    sections: [
      {
        id: "audience",
        heading: "1. Who exactly are you for?",
        blocks: [
          p("Describe one core customer in detail: age range is not enough. What do they want, what worries them, where do they spend time? A dental clinic like Art Innova speaks differently to a parent than to a cosmetic patient."),
          p("Trying to appeal to everyone usually means appealing to no one."),
        ],
      },
      {
        id: "promise",
        heading: "2. What do you promise?",
        blocks: [
          p("Choose one main benefit and make it believable. It can be speed, expertise, warmth, price or quality, but it should be something you can deliver every time."),
        ],
      },
      {
        id: "difference",
        heading: "3. What makes you different?",
        blocks: [
          ul("Something you do that competitors do not.", "A way of working that customers notice.", "A story or background that is genuinely yours."),
          p("For a consulting firm such as Selfconsulting, the difference might be a mix of engineering and architecture know-how. Name it clearly and repeat it."),
        ],
      },
      {
        id: "personality",
        heading: "4. How should the brand feel?",
        blocks: [
          p("Pick three words for the personality and avoid contradictions. These words guide the logo, colours, photos and the way you write. Reliable, calm and precise lead to a very different look than bold, loud and playful."),
        ],
      },
      {
        id: "channels",
        heading: "5. Where will people meet you?",
        blocks: [
          p("Choose the two or three channels that matter most and do them well, instead of being everywhere. For local services this may be a good website, a Google profile and one social platform."),
        ],
      },
      {
        id: "after",
        heading: "Turn the strategy into assets",
        blocks: [
          ol("Write the five answers on one page.", "Create a simple visual identity that expresses them.", "Build templates for the most common materials.", "Review once a year."),
          p("If you want help turning these decisions into a consistent identity, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Does a small business really need a brand strategy?"),
          p("Yes, but a short one. A page of clear decisions is more useful than a long document nobody reads."),
          h3("What comes first, the logo or the strategy?"),
          p("Strategy. A logo without direction is decoration."),
          h3("How much does it cost?"),
          p("It depends on who helps you. You can do a lot yourself with the five questions above, then bring in a designer for the identity."),
        ],
      },
    ],
    related: { projects: ["selfconsulting", "art-innova"], services: ["branding"] },
  },
  {
    id: "brand-archetypes",
    slug: "brand-personality-and-archetypes-explained",
    title: "Brand Personality and Archetypes: How to Give Your Brand a Character",
    seoTitle: "Brand Personality and Archetypes Explained",
    description: "Archetypes are a handy tool for describing a brand's character. How to use them, with a few honest cautions, and how personality shapes design.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "Brands that feel like a person are easier to remember and to trust. Archetypes, a framework popularised from Jungian psychology, are a quick way to describe that character. They are not a science, but as a thinking tool they help a team agree on how the brand should look, speak and behave.",
    sections: [
      {
        id: "what",
        heading: "What an archetype is",
        blocks: [
          p("An archetype is a recognisable type of character, such as the caregiver, the explorer, the rebel or the sage. Brand frameworks use around a dozen of them. Each suggests a mood, a tone of voice and a set of visual choices."),
        ],
      },
      {
        id: "examples",
        heading: "A few archetypes in practice",
        blocks: [
          ul("Caregiver: warm, protective, soft colours and rounded shapes. Suits healthcare and family brands.", "Sage: expert, calm, clear. Suits consulting, education and engineering.", "Creator: imaginative, expressive. Suits design, art and fashion.", "Ruler: premium, authoritative, refined. Suits luxury and high-end services.", "Jester: playful, bright, informal. Suits entertainment and youth brands."),
          p("A beauty brand like Divaz can lean on glamour and confidence, while an industrial company like KDT Romania benefits from the reliability of the sage or ruler."),
        ],
      },
      {
        id: "choose",
        heading: "How to choose",
        blocks: [
          ol("Write three words that describe how you want customers to feel.", "Match them to one main archetype and, optionally, a secondary one.", "Check that it fits your real behaviour, not only your aspirations.", "Ask whether competitors have chosen the same one."),
        ],
      },
      {
        id: "design",
        heading: "From character to design",
        blocks: [
          p("Once the character is clear, design choices become easier."),
          ul("Colour: warm or cool, saturated or muted.", "Typography: soft and rounded, or sharp and structured.", "Imagery: candid and human, or polished and minimal.", "Voice: friendly and conversational, or formal and exact."),
        ],
      },
      {
        id: "careful",
        heading: "A few cautions",
        blocks: [
          p("Archetypes simplify. Real brands are more nuanced, and customers do not think in categories. Use the framework to start the conversation, not to replace research with your audience."),
        ],
      },
      {
        id: "next",
        heading: "Put it to work",
        blocks: [
          p("Write the archetype and the three personality words at the top of your brand guidelines. If you want help turning personality into a visual identity, see my branding service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many archetypes can a brand have?"),
          p("One main and at most one secondary. More than that blurs the character."),
          h3("Are archetypes scientifically proven?"),
          p("They are a popular framework, not a measured science. Treat them as a creative tool."),
          h3("Can personality change over time?"),
          p("Yes, slowly. Changes should feel like growth, not a different brand."),
        ],
      },
    ],
    related: { projects: ["divaz", "kdt-romania"], services: ["branding"] },
  },
  {
    id: "business-card-design",
    slug: "business-card-design-tips",
    title: "Business Card Design: What to Include, Sizes and Mistakes to Avoid",
    seoTitle: "Business Card Design: What to Include and Avoid",
    description: "A business card is still a useful first impression. What to put on it, standard sizes, readability rules and the mistakes that make cards forgettable.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "Business cards are small, and that is exactly why they are tricky: every element has to earn its place. A good card is quick to read, easy to keep and a true preview of the brand. Here is what to include and what to avoid.",
    sections: [
      {
        id: "size",
        heading: "Size and format",
        blocks: [
          p("In Europe the common business card size is 85 x 55 mm. Using the standard size means the card fits wallets and card holders. Unusual formats can stand out, but only if they remain practical. Add 3 mm bleed on each side for printing, and keep important text at least 3 to 4 mm from the edge."),
        ],
      },
      {
        id: "content",
        heading: "What to include",
        blocks: [
          ul("Name and role.", "Company name and logo.", "One main phone number and one email.", "Website.", "Address, only if clients visit you.", "A QR code, only if it leads somewhere useful."),
          p("Skip anything that does not help someone contact you. Five social handles on a tiny card are noise."),
        ],
      },
      {
        id: "hierarchy",
        heading: "Hierarchy and readability",
        blocks: [
          ol("Make the name the first thing people read.", "Keep contact lines in a clean, aligned block.", "Use text no smaller than about 7 to 8 pt.", "Leave generous white space.", "Make sure there is enough contrast between text and background."),
        ],
      },
      {
        id: "design",
        heading: "Design decisions",
        blocks: [
          p("Use the brand's colours, fonts and visual language. A card for a tech company like NEXTLAB can be graphic and bold, while an industrial company card may favour restraint and clarity. Two sides give you extra space: use the back for a pattern, a message or the logo, not for more small text."),
        ],
      },
      {
        id: "finish",
        heading: "Paper and finish",
        blocks: [
          p("Weight and texture shape the first impression. A thicker uncoated paper feels premium, while special finishes such as spot varnish or foil should be used sparingly. See my guide to paper and finishes for more detail."),
        ],
      },
      {
        id: "mistakes",
        heading: "Common mistakes",
        blocks: [
          ul("Too much text.", "Low-contrast type on busy backgrounds.", "Missing bleed, so white edges appear after cutting.", "Low-resolution logos.", "QR codes too small to scan."),
          p("If you need cards that match your identity, see my print design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What is the standard business card size?"),
          p("In Europe, 85 x 55 mm is the common size."),
          h3("Do I still need business cards?"),
          p("Yes, for meetings, events and local business. A good card is remembered and kept."),
          h3("Should I put a photo on the card?"),
          p("Only if your work is personal, such as real estate or consulting, and the photo is of good quality."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech", "kdt-romania"], services: ["printed-media", "branding"] },
  },
  {
    id: "stationery-set",
    slug: "brand-stationery-set-what-you-need",
    title: "Brand Stationery: What a Complete Set Includes and What You Can Skip",
    seoTitle: "Brand Stationery: What a Complete Set Includes",
    description: "Letterhead, envelopes, cards, folders, stickers: which stationery pieces actually matter for a small brand, and how to keep them consistent.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "A stationery set is the small print family of a brand: the pieces that sit on desks, travel in envelopes and arrive with parcels. Not every business needs all of them. The right set is the one you use, designed as a unit.",
    sections: [
      {
        id: "core",
        heading: "The core pieces",
        blocks: [
          ul("Business card.", "Letterhead for formal documents.", "Envelope, if you post documents.", "Email signature, the digital twin of the letterhead.", "Invoice and offer template."),
          p("These make the brand look professional in everyday contact, and cost little to set up once the identity exists."),
        ],
      },
      {
        id: "extras",
        heading: "Useful extras by business type",
        blocks: [
          ul("Folders and presentation pockets for consultants.", "Thank-you cards and stickers for online shops.", "Tissue paper and a branded box for gift boutiques such as Caterina Tomasso.", "Notebooks and pens as client gifts."),
        ],
      },
      {
        id: "system",
        heading: "Design it as a system",
        blocks: [
          ol("Choose one layout grid and reuse it.", "Place the logo and contact details in the same positions across pieces.", "Use two or three brand colours, not all of them everywhere.", "Keep paper and finish consistent."),
          p("Consistency is what makes a small set feel designed rather than assembled."),
        ],
      },
      {
        id: "print",
        heading: "Prepare files for print",
        blocks: [
          ul("Use CMYK for print, with the right bleed.", "Convert text to outlines or embed fonts.", "Request a test print or proof before a large run.", "Ask for paper samples when the feel matters."),
        ],
      },
      {
        id: "digital",
        heading: "Do not forget the digital version",
        blocks: [
          p("Letterhead and invoices are usually sent as PDFs. Make sure the template is editable for you and exports cleanly. See my print design and branding services for complete sets."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do I need a full stationery set?"),
          p("No. Start with the business card, a letterhead or document template and an email signature."),
          h3("What size is standard letterhead?"),
          p("A4 is standard in Europe."),
          h3("Should stationery use the same paper as the cards?"),
          p("It helps. Matching paper and finish makes the set feel unified."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "selfconsulting"], services: ["printed-media", "branding"] },
  },
  {
    id: "brand-photography-guidelines",
    slug: "brand-photography-guidelines",
    title: "Brand Photography Guidelines: How to Keep Your Photos Consistent",
    seoTitle: "Brand Photography Guidelines for Consistent Photos",
    description: "Photos make or break a brand's look. How to write simple photography guidelines so every image on your website and social media feels like the same brand.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "You can have a perfect logo and still look inconsistent if every photo is lit, framed and edited differently. Photography guidelines fix that. They do not need to be long. A page or two with clear examples is enough for anyone who takes photos for your brand.",
    sections: [
      {
        id: "why",
        heading: "Why guidelines help",
        blocks: [
          p("Different photographers, phones and seasons produce different looks. Guidelines let anyone, from you to a freelancer, produce images that sit together in a feed or on a website."),
        ],
      },
      {
        id: "elements",
        heading: "What to define",
        blocks: [
          ul("Light: soft daylight, studio light, or moody and dark.", "Colour: warm, cool, natural, or a controlled palette.", "Composition: close-ups, flat lays, centred or off-centre, how much empty space.", "Backgrounds and props: clean surfaces, textures, real environments.", "People: candid or posed, diverse, expressions, clothing.", "Editing: contrast, saturation, grain, and filters to use or avoid."),
        ],
      },
      {
        id: "do-dont",
        heading: "Add do and do not examples",
        blocks: [
          p("Show three images that are right and three that are wrong. Examples teach faster than adjectives. For a food brand such as Green Table, the guideline might be fresh, bright and natural; for a pharma brand like Farmex, clean, precise and trustworthy."),
        ],
      },
      {
        id: "shot-list",
        heading: "Create a shot list",
        blocks: [
          ol("Hero images for websites.", "Product shots on clean backgrounds.", "Detail shots.", "Lifestyle or in-use images.", "People and behind-the-scenes."),
          p("A list makes every shoot productive and guarantees you have the right variety."),
        ],
      },
      {
        id: "maintain",
        heading: "Keep it alive",
        blocks: [
          ul("Store approved images in one folder.", "Name files clearly.", "Review the guidelines when the brand evolves."),
          p("If you would like help setting the visual direction for your photos and content, see my art direction and content creation services."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do I need a professional photographer?"),
          p("For key images, yes. For everyday content, good guidelines let a smartphone do a lot."),
          h3("How many photos do I need for a launch?"),
          p("Enough to cover the shot list, plus extras for later use. Quality matters more than number."),
          h3("Can stock photos fit a brand?"),
          p("Yes, if chosen and edited to match the guidelines. Avoid obvious clichés."),
        ],
      },
    ],
    related: { projects: ["farmacia-farmex", "green-table"], services: ["content-creation", "content-creation"] },
  },
  {
    id: "instagram-image-sizes",
    slug: "instagram-post-and-story-sizes",
    title: "Instagram Image Sizes: Posts, Stories, Reels and Carousels",
    seoTitle: "Instagram Image Sizes for Posts and Stories",
    description: "The sizes and aspect ratios that work on Instagram for feed posts, carousels, Stories and Reels, plus the design tips that keep text from being cropped.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "Nothing makes a brand look careless faster than a cropped logo or a blurry post. Instagram supports several formats, and each one has its own proportions. Here are the sizes to design in, so your content looks the way you intended.",
    sections: [
      {
        id: "feed",
        heading: "Feed posts",
        blocks: [
          p("The feed supports a few ratios. The portrait 4:5 format, 1080 x 1350 pixels, takes up the most space on the screen and is a popular choice for brands. Square posts are 1080 x 1080 pixels, and landscape posts are 1080 x 566 pixels."),
          ul("Portrait 4:5: 1080 x 1350 px.", "Square 1:1: 1080 x 1080 px.", "Landscape: 1080 x 566 px."),
        ],
      },
      {
        id: "carousel",
        heading: "Carousels",
        blocks: [
          p("In a carousel, the aspect ratio is set by the first slide, so all other slides follow it. Plan the whole set in one size. Design each slide so that it makes sense alone, and so that the next one pulls people forward."),
        ],
      },
      {
        id: "stories",
        heading: "Stories and Reels",
        blocks: [
          p("Stories and Reels use a vertical 9:16 format, 1080 x 1920 pixels. Reels can be up to three minutes long."),
          ul("Keep the key text and faces away from the top and bottom, where the interface sits.", "Leave side margins so nothing feels crowded.", "Check the preview on a real phone."),
        ],
      },
      {
        id: "grid",
        heading: "Think about the profile grid",
        blocks: [
          p("Your feed posts also appear as a grid in your profile, which crops them. Keep important content in the central area, so a post still reads in the grid and in the feed."),
        ],
      },
      {
        id: "quality",
        heading: "Keep the quality high",
        blocks: [
          ol("Export at the full size, not smaller.", "Use sharp images with good compression.", "Avoid tiny text that disappears on small screens.", "Keep a clear hierarchy: one idea per post."),
          p("If you want a consistent set of templates built to the right sizes, see my social media design service."),
        ],
      },
      {
        id: "note",
        heading: "A note on changes",
        blocks: [
          p("Platforms change formats from time to time. Check Instagram's current help pages before a big production, and always test on a phone."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What is the best size for Instagram posts?"),
          p("The portrait 4:5 format, 1080 x 1350 pixels, is a strong default because it uses more screen space."),
          h3("Why does Instagram crop my posts?"),
          p("Because the format you uploaded does not match one of the supported ratios, or because the profile grid shows a central crop."),
          h3("Can I mix sizes in a carousel?"),
          p("The first slide sets the ratio, so plan all slides in the same one."),
        ],
      },
    ],
    related: { projects: ["divaz", "farmacia-farmex"], services: ["social-media-design"] },
  },
  {
    id: "instagram-stories-design",
    slug: "how-to-design-instagram-stories-that-get-watched",
    title: "How to Design Instagram Stories That People Actually Watch",
    seoTitle: "How to Design Instagram Stories People Watch",
    description: "Stories are fast. Learn how to design them with a clear first frame, safe zones, readable text and a consistent look that people recognise.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "A Story lasts seconds. People tap through quickly, so the design has to do its job almost at once. That does not mean flashy. It means clear: one idea, readable text and a look that is instantly yours.",
    sections: [
      {
        id: "first-frame",
        heading: "Win the first frame",
        blocks: [
          p("The first frame decides whether the next one is seen. Start with a clear image or a short, bold line. Avoid long introductions."),
        ],
      },
      {
        id: "safe",
        heading: "Respect the safe zones",
        blocks: [
          p("Stories are 1080 x 1920 pixels. Interface elements, such as the profile name at the top and the reply bar at the bottom, cover part of the frame."),
          ul("Keep text and faces away from the top and bottom edges.", "Leave margins on the sides.", "Preview on a real phone before publishing."),
        ],
      },
      {
        id: "text",
        heading: "Make text readable",
        blocks: [
          ol("Use large type, and keep it short.", "Ensure strong contrast with the background.", "Use one or two fonts from your brand.", "Limit each frame to one message."),
        ],
      },
      {
        id: "system",
        heading: "Build a template system",
        blocks: [
          p("Create three or four Story templates: a quote, an announcement, a product frame, a poll. Reusing them gives a consistent look and saves time. A fashion brand like IQ Fashion can use a bold typographic frame next to a lookbook image, while a beauty brand like Divaz can lean on colour and product."),
        ],
      },
      {
        id: "sequence",
        heading: "Think in sequences",
        blocks: [
          p("A set of 3 to 5 frames tells a small story: hook, detail, proof, call to action. Each frame should work if seen alone."),
        ],
      },
      {
        id: "interact",
        heading: "Use interactive features with a purpose",
        blocks: [
          ul("Polls and questions invite participation.", "Link stickers should lead to something useful.", "Highlights keep the best Stories available."),
          p("For help with a Story and social media system, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What size are Instagram Stories?"),
          p("1080 x 1920 pixels, in a 9:16 vertical format."),
          h3("How many Stories should I post?"),
          p("Quality over quantity. A few well-designed frames beat a long scroll of weak ones."),
          h3("Should Stories match my feed?"),
          p("They should feel related: same colours, fonts and tone, even if the format is different."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "divaz"], services: ["social-media-design"] },
  },
  {
    id: "instagram-captions",
    slug: "how-to-write-instagram-captions",
    title: "How to Write Instagram Captions That Sound Like You",
    seoTitle: "How to Write Instagram Captions That Sound Like You",
    description: "A simple structure for captions that get read: a strong first line, one idea, a clear next step and a voice that matches your brand.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "A great image gets attention. The caption turns that attention into understanding, and sometimes into action. Many brands treat captions as an afterthought and lose the chance to explain, connect or sell. A simple structure fixes most of it.",
    sections: [
      {
        id: "first-line",
        heading: "Write the first line for the scroll",
        blocks: [
          p("Only the beginning of a caption shows before people tap 'more'. Make it count: a question, a surprising fact or a clear promise. Skip openings such as 'Hello everyone' that waste the space."),
        ],
      },
      {
        id: "one-idea",
        heading: "Stick to one idea",
        blocks: [
          p("Each post should say one thing. If you have three ideas, you have three posts. A clear single message is easier to read and easier to remember."),
        ],
      },
      {
        id: "structure",
        heading: "A structure you can reuse",
        blocks: [
          ol("Hook: the first line.", "Value: the information, story or tip.", "Proof or detail: an example, a number you can stand behind, a quote.", "Next step: ask a question, invite a save, point to a link."),
        ],
      },
      {
        id: "voice",
        heading: "Match your brand voice",
        blocks: [
          p("Read your caption aloud. Does it sound like the brand? A tattoo studio like Inklabs may be direct and expressive, while a healthy food brand like Green Table may be warm and informative. Consistency matters more than cleverness."),
        ],
      },
      {
        id: "format",
        heading: "Make it easy to read",
        blocks: [
          ul("Use short paragraphs and line breaks.", "Avoid walls of text.", "Add emojis sparingly, if they suit the voice.", "Put key information early."),
        ],
      },
      {
        id: "cta",
        heading: "Use a clear call to action",
        blocks: [
          p("Tell people what to do: save the post, answer a question, visit the link in the bio. One clear action beats three vague ones. If you need a content and design system that supports your captions, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How long should an Instagram caption be?"),
          p("As long as it needs to be. Short for simple posts, longer for tips and stories, always with a strong start."),
          h3("Should I write captions in Romanian or English?"),
          p("Write in the language of your audience. If you serve both, choose the primary one and keep the other consistent."),
          h3("Do emojis help?"),
          p("They can add personality, but only if they fit your voice."),
        ],
      },
    ],
    related: { projects: ["inklabs", "green-table"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "instagram-bio-and-highlights",
    slug: "instagram-bio-profile-and-highlight-covers",
    title: "Instagram Bio, Profile Picture and Highlight Covers: A Brand Checklist",
    seoTitle: "Instagram Bio, Profile and Highlight Covers",
    description: "Your Instagram profile is your shop window. How to write a clear bio, choose a profile picture that works small and design highlight covers that match your brand.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "Before anyone scrolls your posts, they look at your profile. In two seconds they decide whether you are relevant and trustworthy. A clear bio, a recognisable picture and tidy highlights make that decision easy.",
    sections: [
      {
        id: "picture",
        heading: "The profile picture",
        blocks: [
          p("It appears very small and is cropped to a circle. Use your logo mark or a simple, high contrast image, and test it at thumbnail size. Fine details and long names disappear."),
          ul("Centre the important element.", "Use the same picture on every platform.", "Keep enough contrast with the background."),
        ],
      },
      {
        id: "name",
        heading: "Name and handle",
        blocks: [
          p("Use your brand name, and add a keyword in the name field if it helps people find you, such as the category or the city. Keep the handle simple and similar across platforms."),
        ],
      },
      {
        id: "bio",
        heading: "The bio",
        blocks: [
          ol("Say what you do and for whom.", "Add proof or a differentiator.", "Include a call to action.", "Add a link that leads somewhere useful."),
          p("A dental clinic can state the specialty and the city; a beauty brand can state the product and the promise. Be concrete."),
        ],
      },
      {
        id: "highlights",
        heading: "Highlight covers",
        blocks: [
          p("Highlights keep important Stories visible: services, prices, reviews, how to order. Use a consistent set of covers: same shape, a simple icon and short labels. Matching them to your brand colours makes the profile look intentional."),
        ],
      },
      {
        id: "pinned",
        heading: "Pinned posts",
        blocks: [
          p("Pin up to three posts that introduce the brand: the best work, an offer, a clear explanation. For help with a profile system, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What size are highlight covers?"),
          p("They use the Story format, 1080 x 1920 pixels, but display as a circle, so keep the icon centred."),
          h3("Should my profile picture be my face or my logo?"),
          p("For personal brands, a clear face works well. For companies, the logo mark is a safer choice."),
          h3("How often should I update my bio?"),
          p("Whenever your offer changes, and review it every few months."),
        ],
      },
    ],
    related: { projects: ["divaz", "art-innova"], services: ["social-media-design", "branding"] },
  },
  {
    id: "instagram-hashtags",
    slug: "instagram-hashtags-do-they-still-matter",
    title: "Instagram Hashtags: Do They Still Matter and How to Use Them",
    seoTitle: "Instagram Hashtags: Do They Still Matter?",
    description: "Hashtags are not magic reach, but they still help with context and discovery. How many to use, how to choose them and what to avoid.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Hashtag advice changes every year, and much of it is contradictory. The sensible view is modest: hashtags help describe your content and can add some discovery, but they do not replace good content or a clear profile. Here is how to use them without overthinking.",
    sections: [
      {
        id: "role",
        heading: "What hashtags actually do",
        blocks: [
          p("They label a post with a topic. Instagram uses topics, captions, images and many other signals to understand what a post is about and who might enjoy it. Hashtags are one clue among many, not a switch for reach."),
        ],
      },
      {
        id: "how-many",
        heading: "How many to use",
        blocks: [
          p("There is no magic number. A small, relevant set is enough. A handful that truly describes the post is better than a long block of generic tags."),
        ],
      },
      {
        id: "choose",
        heading: "How to choose them",
        blocks: [
          ol("Start with what the post is about: the product, the topic, the style.", "Add one or two for your niche or location.", "Add a brand tag if you want a branded collection.", "Check what the tag shows. If it is full of unrelated content, skip it."),
        ],
      },
      {
        id: "mix",
        heading: "Mix specific and broad",
        blocks: [
          ul("Specific tags attract the right audience, such as a particular material or technique.", "Broad tags are crowded and rarely lead to engagement.", "A local tag can help a local business such as a restaurant or clinic."),
        ],
      },
      {
        id: "avoid",
        heading: "What to avoid",
        blocks: [
          ul("Copying the same block on every post.", "Banned or spammy tags.", "Tags unrelated to the content.", "Hiding tags in a way that makes the caption messy."),
          p("Content quality, clear design and consistent posting matter far more. If you want help with a content system, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Should hashtags go in the caption or the comments?"),
          p("Either. Put them where they keep the caption clean and readable."),
          h3("How do I find good hashtags?"),
          p("Look at what similar accounts use, search relevant tags and see which ones show content you would like to sit next to."),
          h3("Do hashtags guarantee reach?"),
          p("No. They are one small signal among many."),
        ],
      },
    ],
    related: { projects: ["kanoi", "green-table"], services: ["social-media-design"] },
  },
  {
    id: "instagram-feed-layout",
    slug: "how-to-plan-a-cohesive-instagram-feed",
    title: "How to Plan a Cohesive Instagram Feed (Without Making It Boring)",
    seoTitle: "How to Plan a Cohesive Instagram Feed",
    description: "A cohesive feed is recognisable at a glance. How to choose a visual system, mix post types and plan ahead without every post looking the same.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "A cohesive feed does not mean every post is identical. It means someone can glance at a few posts and say whose they are. That recognition builds trust, and it comes from a few repeatable decisions, not from perfection.",
    sections: [
      {
        id: "system",
        heading: "Choose a visual system",
        blocks: [
          ul("A colour palette of two to four colours.", "One or two fonts, used the same way.", "A consistent photo style: light, angles, editing.", "A few layout templates for text posts."),
          p("These decisions are the foundation. Everything else is variation on top."),
        ],
      },
      {
        id: "mix",
        heading: "Mix post types on purpose",
        blocks: [
          p("Alternate between types so the feed has rhythm: product, people, quote, behind the scenes, offer. A fashion brand like IQ Fashion can alternate lookbook photos with typographic posts; a beauty brand like Divaz can alternate product shots with colour-led graphics."),
        ],
      },
      {
        id: "grid",
        heading: "Think in the grid, but not obsessively",
        blocks: [
          p("Look at the profile grid every few posts. Check balance: not too many dark or busy posts in a row. But do not sacrifice the message for the grid. Individual posts must make sense in the feed first."),
        ],
      },
      {
        id: "plan",
        heading: "Plan a month ahead",
        blocks: [
          ol("Choose the topics and the post types.", "Prepare templates and shoot the images in batches.", "Write captions in one sitting.", "Schedule and review the plan weekly."),
        ],
      },
      {
        id: "review",
        heading: "Review and adjust",
        blocks: [
          p("Look at which posts get saves, shares and comments, and do more of them. If you want a complete template system for your feed, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do I need a perfect grid?"),
          p("No. Consistency in colour, type and tone matters more than a puzzle-like layout."),
          h3("How many templates do I need?"),
          p("Four to six cover most needs."),
          h3("How often should I post?"),
          p("Often enough to be consistent. A realistic schedule beats an ambitious one you cannot maintain."),
        ],
      },
    ],
    related: { projects: ["divaz", "iq-fashion"], services: ["social-media-design"] },
  },
  {
    id: "tiktok-vs-reels",
    slug: "tiktok-vs-instagram-reels-for-small-brands",
    title: "TikTok vs Instagram Reels: Which Short Video Format Fits Your Brand?",
    seoTitle: "TikTok vs Instagram Reels for Small Brands",
    description: "Both platforms push short vertical video, but the audiences and habits differ. How to choose, and how to reuse one video on both without looking lazy.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "Short vertical video is no longer optional for many brands. The question is where to put your effort. TikTok and Instagram Reels look similar, but the way people use them differs. The best answer for a small brand is usually practical, not ideological.",
    sections: [
      {
        id: "similar",
        heading: "What they share",
        blocks: [
          ul("Vertical 9:16 video, 1080 x 1920 pixels.", "Music, text overlays and trends.", "Quick hooks in the first seconds."),
          p("Because the format is the same, a well-made video can often live on both."),
        ],
      },
      {
        id: "different",
        heading: "Where they differ",
        blocks: [
          p("Reels live inside Instagram, so they reach people who already follow you or browse your niche, and they connect directly to your profile, Stories and highlights. TikTok is built around discovery from a feed of videos, and rewards entertainment and personality."),
          ul("Instagram: stronger link to a visual brand and existing followers.", "TikTok: stronger for discovery and informal, creator-style content."),
        ],
      },
      {
        id: "choose",
        heading: "How to choose",
        blocks: [
          ol("Where is your audience already? Ask customers.", "Which platform suits the content you can make regularly?", "Where does your profile and brand already live?", "Start with one, do it well, then expand."),
          p("A visual brand such as an artist studio like Inklabs may find Instagram a natural home, while a more playful, story-led content approach might thrive on TikTok."),
        ],
      },
      {
        id: "reuse",
        heading: "Reusing a video",
        blocks: [
          p("Export one clean version without watermarks. Adjust the caption, hashtags and first line for each platform. Keep text away from the interface areas on both."),
        ],
      },
      {
        id: "quality",
        heading: "What matters on both",
        blocks: [
          ul("A strong first frame and hook.", "Clear audio or on-screen text for silent viewing.", "A consistent look that people recognise.", "A clear point: one idea per video."),
          p("For help with short video and a content system, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can I post the same video on both?"),
          p("Yes, if it is exported cleanly and adapted with a fitting caption."),
          h3("Which is better for local business?"),
          p("Instagram often fits better, because of its link to existing customers and location tools."),
          h3("How long should short videos be?"),
          p("As long as they hold attention. Short and clear usually wins."),
        ],
      },
    ],
    related: { projects: ["kanoi", "inklabs"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "linkedin-post-design",
    slug: "linkedin-post-design-for-b2b-brands",
    title: "LinkedIn Post Design for B2B and Technical Brands",
    seoTitle: "LinkedIn Post Design for B2B Brands",
    description: "How to design LinkedIn posts, carousels and cover images that look professional and clear, even for technical or engineering subjects.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "LinkedIn is a text-first platform, but visuals still decide whether someone stops scrolling. For B2B and technical brands, the aim is not to be flashy. It is to be clear, credible and recognisable. Here is how to design for it.",
    sections: [
      {
        id: "audience",
        heading: "Know the audience",
        blocks: [
          p("People on LinkedIn are in a work mindset. They want useful information, credible expertise and clear proof. A visual style that is calm, precise and consistent suits that mood."),
        ],
      },
      {
        id: "formats",
        heading: "Formats that work",
        blocks: [
          ul("Single images with one clear statement.", "Document or carousel posts that explain a process step by step.", "Short videos that show a product or a project.", "A strong cover image on the company page."),
        ],
      },
      {
        id: "design",
        heading: "Design principles",
        blocks: [
          ol("One idea per image.", "Large, readable type with strong contrast.", "A consistent grid and colour palette from your brand.", "Diagrams or labelled photos instead of decorative stock."),
          p("For a technology company such as NEXTLAB, clean diagrams and project photos work better than abstract decoration. For an engineering consultancy such as Selfconsulting, drawings and project visuals build credibility."),
        ],
      },
      {
        id: "text",
        heading: "Support the visual with the text",
        blocks: [
          p("The first lines of the post carry the hook. Use short paragraphs, and keep the image consistent with what the text promises."),
        ],
      },
      {
        id: "proof",
        heading: "Show proof",
        blocks: [
          ul("Real projects and results.", "Quotes from clients, with permission.", "Process and behind-the-scenes."),
          p("If you want help with a professional LinkedIn presence, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What size are LinkedIn images?"),
          p("Common choices are square or portrait images. Check LinkedIn's current guidance before a large production and preview on a phone."),
          h3("Do carousels work on LinkedIn?"),
          p("Yes, as document posts. They suit step-by-step explanations."),
          h3("Should B2B posts be formal?"),
          p("Professional, yes. Dull, no. Clear and human is the aim."),
        ],
      },
    ],
    related: { projects: ["selfconsulting", "nextlab-tech"], services: ["social-media-design"] },
  },
  {
    id: "facebook-local-business",
    slug: "facebook-posts-for-local-business",
    title: "Facebook Posts for a Local Business: What to Publish and How to Design It",
    seoTitle: "Facebook Posts for a Local Business",
    description: "Facebook is still where many local customers look for hours, offers and reviews. What to post, how to design it and how to keep a small page active.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "For many local businesses, the Facebook page is still where customers check opening hours, ask a question or read reviews. You do not need to post daily, but you need a page that looks alive and trustworthy. Here is a practical plan.",
    sections: [
      {
        id: "basics",
        heading: "Get the basics right",
        blocks: [
          ul("A recognisable profile picture and a clear cover image.", "Correct hours, address and phone number.", "A short description of what you do.", "A button for the main action, such as call or message."),
        ],
      },
      {
        id: "content",
        heading: "What to post",
        blocks: [
          ol("Offers and seasonal promotions.", "New products or services.", "Behind the scenes and the team.", "Customer stories and reviews, with permission.", "Useful tips tied to your expertise."),
          p("A bakery like Moș Ilie can show products, seasonal items and the people behind them; an optical shop like Optica Tei can explain lens choices and eye care tips."),
        ],
      },
      {
        id: "design",
        heading: "Design for clarity",
        blocks: [
          p("Use consistent templates with a clear headline, the offer and the date. Keep text short on the image, and put the details in the caption."),
        ],
      },
      {
        id: "rhythm",
        heading: "Keep a realistic rhythm",
        blocks: [
          p("Two or three good posts a week beat daily filler. Plan a month at a time, and keep one weekly slot for answering messages and comments."),
        ],
      },
      {
        id: "ads",
        heading: "Think about ads for key offers",
        blocks: [
          p("A small paid budget can put an important offer in front of nearby people. Use a clear image and a single call to action. See my ads and campaigns service for help."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Is Facebook still useful for local business?"),
          p("Yes, especially for reaching local customers and for information such as hours and reviews."),
          h3("Should my Facebook match Instagram?"),
          p("They should look related, but each may need different formats and captions."),
          h3("How do I handle reviews?"),
          p("Reply politely and promptly, including to negative ones."),
        ],
      },
    ],
    related: { projects: ["mos-ilie", "optica-tei"], services: ["social-media-design"] },
  },
  {
    id: "social-media-templates",
    slug: "social-media-templates-system",
    title: "Social Media Templates: How to Build a System That Saves Time",
    seoTitle: "Social Media Templates: Build a Time-Saving System",
    description: "A small set of well-designed templates keeps your posts consistent and cuts production time. What to include and how to build it.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "If every post starts from a blank page, the brand will drift and the workload will grow. A template system fixes both. It does not need to be big: a handful of well-designed layouts covers most of what a brand publishes.",
    sections: [
      {
        id: "why",
        heading: "Why templates work",
        blocks: [
          ul("They keep the look consistent.", "They speed up production.", "They let non-designers publish on brand.", "They make it easy to change one thing in one place."),
        ],
      },
      {
        id: "which",
        heading: "Which templates to build",
        blocks: [
          ol("Announcement or news.", "Quote or tip.", "Product or service highlight.", "Offer or promotion.", "Photo with caption overlay.", "Carousel cover and inner slides.", "Story frames."),
          p("A pharmacy such as Farmex needs clear, reassuring layouts for information and offers; a beauty brand such as Divaz needs templates that show off colour and product."),
        ],
      },
      {
        id: "build",
        heading: "How to build them",
        blocks: [
          ol("Set the grid, margins and safe zones for each size.", "Define colours, fonts and text sizes.", "Create flexible image areas that crop well.", "Build in space for varying text lengths.", "Name layers and fields clearly."),
        ],
      },
      {
        id: "tools",
        heading: "Choose the right tool",
        blocks: [
          p("Use a tool your team can actually use: a design app you know, or an online editor with brand kits. The best template is the one people will use correctly."),
        ],
      },
      {
        id: "maintain",
        heading: "Maintain the system",
        blocks: [
          p("Review templates every few months, retire ones that are not used and add ones the team asks for. For a custom template set, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many templates do I need?"),
          p("Four to eight cover most brands."),
          h3("Will templates make my feed boring?"),
          p("Not if they allow variation in image, colour and layout within clear rules."),
          h3("Who should use the templates?"),
          p("Anyone publishing for the brand, with a short guide on how."),
        ],
      },
    ],
    related: { projects: ["farmacia-farmex", "divaz"], services: ["social-media-design"] },
  },
  {
    id: "testimonial-posts",
    slug: "how-to-design-testimonial-and-review-posts",
    title: "How to Design Testimonial and Review Posts That Build Trust",
    seoTitle: "How to Design Testimonial and Review Posts",
    description: "Customer reviews are strong proof, but a screenshot is not enough. How to turn reviews and testimonials into clean, honest posts that build trust.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "People trust other customers more than they trust brands. A good review post puts that trust on display. The difference between a convincing one and a forgettable one is mostly in the choice of quote and the care in the design.",
    sections: [
      {
        id: "ask",
        heading: "Get permission and real words",
        blocks: [
          p("Always ask before publishing a client's words or photo. Use real quotes without inventing or improving them. Edit only for length or typos, and keep the meaning intact. For health and beauty brands, be extra careful about claims and privacy."),
        ],
      },
      {
        id: "choose",
        heading: "Choose the right quote",
        blocks: [
          ul("Specific beats general: 'the appointment was on time and explained clearly' is better than 'great service'.", "Pick a quote that answers a real customer worry.", "Keep it short enough to read in a glance."),
        ],
      },
      {
        id: "design",
        heading: "Design the post",
        blocks: [
          ol("Put the quote in large, clear type.", "Add the first name or initials and context, with permission.", "Use brand colours and a calm layout.", "Include the logo discreetly.", "Leave enough contrast and space."),
          p("A clinic like Dr. Kurbe or an optical shop like Optica Tei benefits from a clean, reassuring style that matches the rest of the brand."),
        ],
      },
      {
        id: "formats",
        heading: "Formats that work",
        blocks: [
          ul("Single quote posts.", "Carousels with several short reviews.", "Story highlights titled Reviews.", "Short videos with permission."),
        ],
      },
      {
        id: "honesty",
        heading: "Keep it honest",
        blocks: [
          p("Do not fabricate reviews. If you do not have any yet, ask satisfied customers, and until then use other proof such as process, results you can document and your expertise. See my social media design service for review templates."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can I post screenshots of reviews?"),
          p("With permission, yes, but a designed quote often reads better. Make sure the source is clear."),
          h3("How often should I post reviews?"),
          p("Occasionally, mixed with other content, so the feed does not become one long advert."),
          h3("What if a review is negative?"),
          p("Respond publicly and calmly. It shows how you handle problems."),
        ],
      },
    ],
    related: { projects: ["dr-kurbe-clinic", "optica-tei"], services: ["social-media-design"] },
  },
  {
    id: "social-media-for-beauty-salons",
    slug: "social-media-for-beauty-salons-and-brands",
    title: "Social Media for Beauty Salons and Brands: Content That Books Appointments",
    seoTitle: "Social Media for Beauty Salons and Brands",
    description: "Beauty is visual, which makes social media a natural fit. What to post, how to photograph results and how to turn followers into bookings.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Beauty sells on sight. People choose a salon, a nail technician or a skincare brand largely by what they see. That makes social media a strong channel, as long as the content shows quality and makes booking or buying easy.",
    sections: [
      {
        id: "show",
        heading: "Show the work",
        blocks: [
          ul("Before and after, with permission.", "Close-ups of detail and finish.", "Short videos of the process.", "Products in use, not only on a shelf."),
          p("Good light and clean backgrounds matter more than expensive equipment."),
        ],
      },
      {
        id: "trust",
        heading: "Build trust",
        blocks: [
          p("Introduce the people, the space and the hygiene practices. Customers want to feel safe as well as pampered. Share honest information about products and ingredients, and avoid exaggerated claims."),
        ],
      },
      {
        id: "brand",
        heading: "Keep a consistent look",
        blocks: [
          p("A salon feed with random photos looks cheaper than the service really is. Use a coherent palette and a few templates. A beauty brand like Divaz is built on colour and product, while a natural line such as THS Organic can lean on warmth and honey tones."),
        ],
      },
      {
        id: "book",
        heading: "Make booking easy",
        blocks: [
          ol("Put the booking link or phone number in the bio.", "Add a Highlight with prices and how to book.", "End key posts with a clear call to action.", "Reply fast to messages."),
        ],
      },
      {
        id: "rhythm",
        heading: "A simple weekly rhythm",
        blocks: [
          ul("One or two result posts.", "One educational post, such as aftercare tips.", "One behind-the-scenes or team post.", "Stories every few days for availability and offers."),
          p("If you want a beauty content system, see my social media design and content creation services."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Which platform is best for beauty?"),
          p("Instagram is the usual starting point, with short video and Stories, though it depends on your audience."),
          h3("Can I show client photos?"),
          p("Only with clear permission."),
          h3("How do I handle price questions?"),
          p("Share a price guide or a Highlight, and explain what is included."),
        ],
      },
    ],
    related: { projects: ["divaz", "ths-organic"], services: ["social-media-design", "content-creation"] },
  },
  {
    id: "ecommerce-product-posts",
    slug: "social-media-posts-for-ecommerce-products",
    title: "Social Media Posts for E-commerce: How to Show a Product So It Sells",
    seoTitle: "Social Media Posts for E-commerce Products",
    description: "How to photograph, frame and write about products so social media posts attract attention and lead to the product page.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "A product post has a hard job: stop the scroll, explain the product and push the viewer toward your shop. Good e-commerce posts do this with a clear image, one benefit and an obvious next step.",
    sections: [
      {
        id: "clear",
        heading: "Make the product clear",
        blocks: [
          ul("Show the product large and in good light.", "Use a clean background or a believable setting.", "Include a size or scale reference when needed.", "Show details and the packaging."),
          p("For a premium boutique such as Caterina Tomasso, restraint, clean backgrounds and elegant presentation matter. For a cosmetic brand such as Fleurane, packaging and texture shots add value."),
        ],
      },
      {
        id: "benefit",
        heading: "Lead with one benefit",
        blocks: [
          p("Customers care about what a product does for them. Pick one benefit per post and say it in plain words. Avoid listing every feature."),
        ],
      },
      {
        id: "variety",
        heading: "Vary the formats",
        blocks: [
          ol("Product on a clean background.", "Product in use or in a scene.", "Detail close-up.", "Short video, such as unboxing or a demonstration.", "Customer photos, with permission."),
        ],
      },
      {
        id: "cta",
        heading: "Make buying easy",
        blocks: [
          p("Tell people exactly how to buy: link in bio, product tags or a direct message. Keep price and availability clear. In a carousel, end with a slide that points to the shop."),
        ],
      },
      {
        id: "ads",
        heading: "Reuse good posts for ads",
        blocks: [
          p("Posts that perform well organically often work as ads too. See my ads and campaigns service for help turning product content into campaigns."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many product photos do I need?"),
          p("Several angles per product plus a few lifestyle shots is a good base."),
          h3("Should I show prices in posts?"),
          p("It depends on the brand. Premium brands often keep prices on the shop page; accessible brands often show them."),
          h3("Do I need a studio?"),
          p("Not necessarily. Daylight, a clean surface and a steady phone can work well."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "fleurane"], services: ["social-media-design", "ads-campaigns"] },
  },
  {
    id: "social-media-audit",
    slug: "social-media-audit-checklist",
    title: "Social Media Audit: A Checklist to Find What Is Working and What Is Not",
    seoTitle: "Social Media Audit: A Practical Checklist",
    description: "A practical social media audit covering profiles, content, design consistency and results, with steps to turn findings into a plan.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "Most brands keep posting without ever stopping to look at the whole picture. An audit is that pause. It does not need special software. It needs an hour, honest eyes and a list of questions.",
    sections: [
      {
        id: "profiles",
        heading: "1. Check the profiles",
        blocks: [
          ul("Names, pictures and bios are consistent across platforms.", "Links work and lead to the right place.", "Contact details are current.", "Highlights and pinned posts are up to date."),
        ],
      },
      {
        id: "content",
        heading: "2. Review the content",
        blocks: [
          p("Look at the last 30 posts. Group them by type and topic. Note which have the best saves, shares, comments and reach. Notice what you post a lot of that gets little response."),
        ],
      },
      {
        id: "design",
        heading: "3. Review the design",
        blocks: [
          ol("Do the posts look like one brand?", "Is text readable on a phone?", "Are images sharp and consistent?", "Are templates used, or does everything look improvised?"),
          p("A tattoo studio such as Inklabs and an apparel brand such as Kanoi both benefit from a recognisable look, each in its own style."),
        ],
      },
      {
        id: "audience",
        heading: "4. Understand the audience",
        blocks: [
          p("Look at who follows and engages: location, age ranges, activity times where available. Compare it to the audience you want."),
        ],
      },
      {
        id: "goals",
        heading: "5. Compare with goals",
        blocks: [
          p("What is social media supposed to do for the business: awareness, enquiries, sales? Check whether the content supports that goal."),
        ],
      },
      {
        id: "plan",
        heading: "Turn findings into a plan",
        blocks: [
          ol("List the three biggest problems.", "Pick the quickest wins.", "Set a posting rhythm you can keep.", "Review again in three months."),
          p("If you want an outside review and a template system, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How often should I audit?"),
          p("Every three to six months."),
          h3("What tools do I need?"),
          p("The platforms' own insights are enough to start."),
          h3("Should I delete weak posts?"),
          p("Usually no. Improve the future instead, unless a post is harmful or wrong."),
        ],
      },
    ],
    related: { projects: ["inklabs", "kanoi"], services: ["social-media-design"] },
  },
  {
    id: "social-media-metrics",
    slug: "social-media-metrics-that-matter",
    title: "Social Media Metrics That Matter (and the Ones You Can Ignore)",
    seoTitle: "Social Media Metrics That Matter",
    description: "Likes feel good, but they rarely pay the bills. Which social media metrics tell you if your content works, and how to read them without obsessing.",
    category: "social-media",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "Social platforms give you endless numbers. Most of them are interesting and few are useful. The trick is to pick a small set tied to what you want the content to do, and to read them over weeks, not hours.",
    sections: [
      {
        id: "goal",
        heading: "Start with the goal",
        blocks: [
          p("Different goals need different numbers. A new brand wants to be seen. A shop wants clicks and sales. A local business wants messages and calls. Decide the main goal for each channel first."),
        ],
      },
      {
        id: "reach",
        heading: "Reach and views",
        blocks: [
          p("Reach shows how many people saw the content. It helps you understand what captures attention: formats, topics, hooks. It is not proof of results on its own."),
        ],
      },
      {
        id: "engagement",
        heading: "Saves, shares and comments",
        blocks: [
          p("Saves and shares usually show real value, because someone wanted to keep or pass on the content. Comments can show interest and questions. They tell you more than likes."),
        ],
      },
      {
        id: "action",
        heading: "Clicks and actions",
        blocks: [
          ul("Link clicks and profile visits.", "Messages and calls.", "Sales or bookings attributed to social."),
          p("These are closest to business results. Where possible, track them with a simple method, such as a unique link or a question in your booking form."),
        ],
      },
      {
        id: "growth",
        heading: "Follower growth",
        blocks: [
          p("Growth matters, but quality of followers matters more. Ten local customers are worth more than a thousand random followers."),
        ],
      },
      {
        id: "ignore",
        heading: "What to treat carefully",
        blocks: [
          ul("Single-day spikes or dips.", "Comparing yourself with much bigger accounts.", "Likes as the only signal."),
        ],
      },
      {
        id: "review",
        heading: "Review monthly",
        blocks: [
          p("Pick three metrics, write them down each month and note what you posted. Patterns appear quickly. If you want help planning content around results, see my social media design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Which metric is the most important?"),
          p("The one closest to your goal: usually saves, clicks or messages."),
          h3("How often should I check numbers?"),
          p("Weekly for a quick look, monthly for decisions."),
          h3("Are followers still important?"),
          p("Somewhat, but engaged and relevant followers matter more than the total."),
        ],
      },
    ],
    related: { projects: ["divaz", "farmacia-farmex"], services: ["social-media-design"] },
  },
  {
    id: "what-is-art-direction",
    slug: "what-is-art-direction-and-why-brands-need-it",
    title: "What Is Art Direction and Why Brands Need It",
    seoTitle: "What Is Art Direction and Why Brands Need It",
    description: "Art direction is the person or process that decides how a brand looks across photos, video, design and layout. What an art director does and when you need one.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "Many brands have a designer, a photographer and a video editor, and still look inconsistent. What is missing is often art direction: someone who sets the visual idea and makes sure every piece follows it.",
    sections: [
      {
        id: "definition",
        heading: "What art direction means",
        blocks: [
          p("Art direction is the creative leadership of a visual project. It decides the concept, the mood, the colours, the style of images and how all of these work together. The art director does not necessarily make every asset; they guide the people who do."),
        ],
      },
      {
        id: "tasks",
        heading: "What an art director does",
        blocks: [
          ul("Translates the brand strategy into a visual idea.", "Builds mood boards and references.", "Briefs photographers, editors and designers.", "Reviews work for consistency and quality.", "Keeps the look cohesive across channels."),
        ],
      },
      {
        id: "example",
        heading: "A concrete example",
        blocks: [
          p("For a fashion campaign like IQ Fashion, art direction decides the palette, the styling, how models are framed, how typography appears on posts and how the video feels. Without it, the same clothes could look completely different in every post."),
        ],
      },
      {
        id: "when",
        heading: "When you need it",
        blocks: [
          ol("You are launching a brand or a campaign.", "Several people create content and the look drifts.", "You want a clearer, more premium image.", "You work across photo, video and design at the same time."),
        ],
      },
      {
        id: "work",
        heading: "How it works in a project",
        blocks: [
          ol("Discovery: goals, audience, references.", "Concept: the visual idea and mood board.", "Guidelines: palette, type, photo and video rules.", "Production: briefing and directing the shoot or design.", "Review: checking and adjusting the result."),
          p("If you want help with a visual direction for your brand, see my content creation and art direction service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Is art direction the same as graphic design?"),
          p("Not exactly. Graphic design makes specific assets. Art direction sets the overall visual idea and guides all assets."),
          h3("Do small brands need it?"),
          p("Yes, in a lighter form: a clear concept and simple rules."),
          h3("Can the same person do both?"),
          p("Often yes, especially in small teams."),
        ],
      },
    ],
    related: { projects: ["iq-fashion", "kanoi"], services: ["content-creation"] },
  },
  {
    id: "visual-storytelling",
    slug: "visual-storytelling-for-brands",
    title: "Visual Storytelling for Brands: How to Tell a Story With Images",
    seoTitle: "Visual Storytelling for Brands",
    description: "A story is easier to remember than a list of features. How to use images, sequence and design to tell a brand story in a post, a campaign or a website.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "People remember stories long after they forget specifications. Visual storytelling means using images, order and design to let someone feel a story in seconds. It works for a single post, a campaign or a whole website.",
    sections: [
      {
        id: "start",
        heading: "Start with one idea",
        blocks: [
          p("Before choosing images, write the story in one sentence. What changes for the person? A dental clinic might tell a story about confidence, a cosmetics brand about a ritual, a tech company about learning by building."),
        ],
      },
      {
        id: "structure",
        heading: "Use a simple structure",
        blocks: [
          ol("Beginning: a situation or a need.", "Middle: the product, service or turning point.", "End: the result or feeling."),
          p("In a carousel or a short video, each frame carries one step."),
        ],
      },
      {
        id: "images",
        heading: "Choose images that carry meaning",
        blocks: [
          ul("People and gestures, not only objects.", "Close details that show quality.", "Consistent light and colour.", "Space for text, so images and words work together."),
          p("For a cosmetics identity like Fleurane, ingredient illustrations and texture can tell the story of the product; for a dental clinic like Art Innova, faces and expressions convey care."),
        ],
      },
      {
        id: "rhythm",
        heading: "Control the rhythm",
        blocks: [
          p("Vary close and wide shots, quiet and busy frames. A rhythm keeps people looking."),
        ],
      },
      {
        id: "text",
        heading: "Let words support, not repeat",
        blocks: [
          p("Use short text to add what the image cannot show: a number, a name, a promise. Avoid repeating what is already visible."),
        ],
      },
      {
        id: "consistency",
        heading: "Keep a recognisable style",
        blocks: [
          p("A story told in a consistent visual language builds a brand. See my content creation and art direction service for help developing one."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do I need a big budget?"),
          p("No. A clear idea, good light and a consistent style matter more than equipment."),
          h3("How long should a visual story be?"),
          p("As long as it needs, often three to seven frames for social media."),
          h3("Can B2B brands tell visual stories?"),
          p("Yes. Projects, people and processes are strong material."),
        ],
      },
    ],
    related: { projects: ["art-innova", "fleurane"], services: ["content-creation"] },
  },
  {
    id: "phone-product-photography",
    slug: "product-photography-with-a-phone",
    title: "Product Photography With a Phone: Simple Tips That Look Professional",
    seoTitle: "Product Photography With a Phone: Simple Tips",
    description: "You can take good product photos with a smartphone. Light, background, angles and editing tips that make a big difference.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "Modern phones take very good photos. What separates amateur from professional product images is rarely the camera. It is light, background, framing and consistency. These simple steps will take you far.",
    sections: [
      {
        id: "light",
        heading: "Start with light",
        blocks: [
          ul("Shoot near a large window, with soft daylight.", "Avoid direct sun that creates hard shadows.", "Use a white card or foam board to bounce light into shadows.", "Turn off mixed artificial lights that cast odd colours."),
        ],
      },
      {
        id: "background",
        heading: "Choose a clean background",
        blocks: [
          p("A plain sheet of paper or fabric, or a simple surface, keeps attention on the product. For shiny products such as jewellery or silver pieces, take care with reflections: change the angle until the surface looks clean."),
        ],
      },
      {
        id: "camera",
        heading: "Camera tips",
        blocks: [
          ol("Clean the lens.", "Use a tripod or a stable surface.", "Tap to focus on the product.", "Turn on the grid to keep lines straight.", "Shoot a bit wider and crop later."),
        ],
      },
      {
        id: "angles",
        heading: "Shoot a set of angles",
        blocks: [
          ul("Front view.", "Three-quarter view.", "Top-down flat lay.", "Close-up of details and texture.", "The product in use or in a scene."),
        ],
      },
      {
        id: "edit",
        heading: "Edit gently",
        blocks: [
          p("Adjust brightness, contrast and white balance so the colour is accurate. Avoid heavy filters on products, since customers expect the item to look the same when it arrives. Use the same editing settings for all photos."),
        ],
      },
      {
        id: "consistency",
        heading: "Keep the set consistent",
        blocks: [
          p("Same background, same light, same angles. For a premium look like Caterina Tomasso, restraint and uniformity matter. For help building a photo style, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Do I need a lightbox?"),
          p("Not necessarily. A window and a white card work well."),
          h3("What resolution should I export?"),
          p("High enough for your website and social media, without unnecessary compression."),
          h3("Should I use portrait mode?"),
          p("Sometimes, but check edges. For accuracy, a normal mode with good focus is often safer."),
        ],
      },
    ],
    related: { projects: ["caterina-tomasso", "divaz"], services: ["content-creation"] },
  },
  {
    id: "video-editing-basics",
    slug: "video-editing-basics-for-social-media",
    title: "Video Editing Basics for Social Media: Cuts, Captions and Rhythm",
    seoTitle: "Video Editing Basics for Social Media",
    description: "The basics of editing short videos for social media: structure, cuts, captions, sound and export, so your videos look clean and hold attention.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "Good editing is mostly invisible. It removes what slows the video down, keeps the rhythm and makes the message clear. You do not need advanced software to start, only a few principles.",
    sections: [
      {
        id: "structure",
        heading: "Plan the structure",
        blocks: [
          ol("Hook in the first seconds.", "One main message.", "Proof or detail.", "A clear ending or call to action."),
          p("Cut anything that does not serve that structure."),
        ],
      },
      {
        id: "cuts",
        heading: "Cut with intent",
        blocks: [
          ul("Trim silence and hesitation.", "Cut on movement for a smooth flow.", "Vary shot sizes to keep interest.", "Keep each shot as long as it adds something."),
        ],
      },
      {
        id: "captions",
        heading: "Add captions",
        blocks: [
          p("Many people watch without sound. Add readable captions, large enough for a phone and kept away from interface areas. Keep them accurate, and match the brand fonts and colours."),
        ],
      },
      {
        id: "sound",
        heading: "Take care of sound",
        blocks: [
          p("Clear audio matters more than people expect. Use clean voice recording or music with the right volume, and make sure the music does not hide speech."),
        ],
      },
      {
        id: "format",
        heading: "Export for the platform",
        blocks: [
          p("Use vertical 9:16, 1080 x 1920 pixels, for Reels, TikTok and Stories. Keep a safe margin for text. Export in good quality, but avoid files so large they upload slowly."),
        ],
      },
      {
        id: "brand",
        heading: "Make it look like your brand",
        blocks: [
          p("Use consistent intro frames, colours, type and transitions. Brands such as Kanoi and Farmex benefit from recognisable video styles, each in a different mood. If you want help with video and reels, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What software should I use?"),
          p("Any editor you know well. The principles are the same."),
          h3("How long should a short video be?"),
          p("Short enough to keep attention: often under a minute for social media."),
          h3("Do I need music?"),
          p("Not always. Sound design and clear speech can be enough."),
        ],
      },
    ],
    related: { projects: ["kanoi", "farmacia-farmex"], services: ["content-creation"] },
  },
  {
    id: "motion-vs-2d-animation",
    slug: "motion-graphics-vs-2d-animation",
    title: "Motion Graphics vs 2D Animation: What Is the Difference and Which Do You Need?",
    seoTitle: "Motion Graphics vs 2D Animation: Which Do You Need?",
    description: "The terms overlap, but they are not identical. How motion graphics and 2D animation differ, what each is best for and how to choose for your project.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "Clients often ask for 'an animation' and mean different things. Sometimes they want moving text and shapes to explain a product; other times they want a character that walks and acts. These are different crafts with different costs.",
    sections: [
      {
        id: "motion",
        heading: "Motion graphics",
        blocks: [
          p("Motion graphics animate graphic elements such as text, icons, charts and shapes. They are ideal for explainers, logo animations, social media posts and data presentations."),
          ul("Good for explaining ideas and processes.", "Efficient for branded content and ads.", "Works well with a defined visual identity."),
        ],
      },
      {
        id: "two-d",
        heading: "2D animation",
        blocks: [
          p("2D animation focuses on characters and scenes drawn and animated frame by frame or with rigged puppets. It is best for stories, educational content and characters that express emotion."),
          ul("Good for narrative and character-led content.", "Takes more time and planning.", "Works well for children's education and brand mascots."),
        ],
      },
      {
        id: "overlap",
        heading: "Where they overlap",
        blocks: [
          p("Many projects combine both: a character that walks through animated charts, for example. For educational content like NEXTLAB lessons, characters and diagrams together help understanding."),
        ],
      },
      {
        id: "choose",
        heading: "How to choose",
        blocks: [
          ol("What is the goal: explain, tell a story or sell?", "Who is the audience?", "How long should it be?", "What is the budget and timeline?", "Do you have a script and a visual identity?"),
        ],
      },
      {
        id: "process",
        heading: "How production works",
        blocks: [
          ol("Script and storyboard.", "Style frames and design.", "Animation.", "Sound and music.", "Review and export."),
          p("If you need a 2D animation or motion graphics, see my 2D animation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Which is cheaper?"),
          p("Motion graphics are usually quicker than character animation, but it depends on the details."),
          h3("How long should an explainer be?"),
          p("One to two minutes is a good length for most topics."),
          h3("Do I need a script first?"),
          p("Yes. A clear script makes everything else faster and cheaper."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech", "vibrary"], services: ["2d-animation"] },
  },
  {
    id: "brief-a-video-editor",
    slug: "how-to-brief-a-video-editor",
    title: "How to Brief a Video Editor So You Get What You Imagined",
    seoTitle: "How to Brief a Video Editor",
    description: "A clear brief saves rounds of revisions. What to tell a video editor: goal, audience, references, format, assets and feedback process.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "Most video revisions come from unclear expectations, not from bad editing. A good brief takes twenty minutes to write and can save days. Here is what to include.",
    sections: [
      {
        id: "goal",
        heading: "The goal and the audience",
        blocks: [
          p("Say what the video must achieve and who will watch it: sell a product, explain a process, promote an event. Mention where it will appear, since a Reel and a website video are edited differently."),
        ],
      },
      {
        id: "format",
        heading: "Format and length",
        blocks: [
          ul("Aspect ratio: for example vertical 9:16 for Reels.", "Target length.", "Delivery formats and deadline.", "Subtitles: yes or no, and in which language."),
        ],
      },
      {
        id: "references",
        heading: "References",
        blocks: [
          p("Share two or three videos you like and say what you like about each: pace, colours, transitions, sound. References communicate faster than adjectives. Also share things you do not want."),
        ],
      },
      {
        id: "assets",
        heading: "Assets and brand",
        blocks: [
          ul("Raw footage in organised folders.", "Logo, fonts and colour codes.", "Music or sound preferences, with licences.", "Script or key messages.", "Any text that must appear exactly as written."),
        ],
      },
      {
        id: "structure",
        heading: "Structure",
        blocks: [
          p("If you have a rough structure, share it: hook, main points, ending. If not, ask the editor to propose one. Mention the call to action."),
        ],
      },
      {
        id: "feedback",
        heading: "Feedback process",
        blocks: [
          ol("Agree on the number of revision rounds.", "Collect feedback from all decision makers into one message.", "Give timestamps and specific comments.", "Say what you like first, then what to change."),
          p("For reels and brand video, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How detailed should a brief be?"),
          p("Detailed enough to answer goal, format, references and assets. One page is usually enough."),
          h3("Should I give the editor creative freedom?"),
          p("Yes, within the brand and goal. Good editors improve on the plan."),
          h3("How many revision rounds are normal?"),
          p("Two rounds is a common baseline, but agree it in advance."),
        ],
      },
    ],
    related: { projects: ["kanoi", "farmacia-farmex"], services: ["content-creation"] },
  },
  {
    id: "repurpose-content",
    slug: "how-to-repurpose-content",
    title: "How to Repurpose Content: Get More From One Idea",
    seoTitle: "How to Repurpose Content: More From One Idea",
    description: "Repurposing turns one piece of content into many without repeating yourself. A simple workflow with examples for video, photos and articles.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Creating content from scratch every day is exhausting. Repurposing means taking one strong piece and adapting it to other formats and channels. It saves time and reaches people who prefer different formats, without feeling repetitive when done well.",
    sections: [
      {
        id: "principle",
        heading: "The principle",
        blocks: [
          p("Start with one core piece, such as a project, a video or an article. Then ask how it can be shown differently on each channel: shorter, more visual, more detailed or more personal."),
        ],
      },
      {
        id: "video",
        heading: "From one video",
        blocks: [
          ul("A full version for the website or YouTube.", "A short vertical cut for Reels or TikTok.", "Stills for a carousel.", "Quotes as text posts.", "A behind-the-scenes Story."),
        ],
      },
      {
        id: "project",
        heading: "From one project",
        blocks: [
          p("A project such as a new machine installation for KDT Romania can become a case study, a photo carousel, a short video, a LinkedIn post about the result and a Story with the team."),
        ],
      },
      {
        id: "article",
        heading: "From one article",
        blocks: [
          ol("Turn each section into a post or a slide.", "Extract a quote or a statistic you can verify.", "Create a checklist graphic.", "Answer questions in the FAQ as short videos."),
        ],
      },
      {
        id: "adapt",
        heading: "Adapt, do not copy",
        blocks: [
          p("Change the first line, the format and the call to action for each channel. Keep the look consistent, but avoid posting the same exact asset everywhere."),
        ],
      },
      {
        id: "schedule",
        heading: "Schedule and track",
        blocks: [
          p("Spread the pieces over weeks. Note which formats perform best. If you want help setting up a content system, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Will people see the same content twice?"),
          p("Some will, but different formats and angles keep it fresh. Most followers do not see everything."),
          h3("How many pieces can I get from one idea?"),
          p("Often five to ten, depending on the topic."),
          h3("Does repurposing hurt quality?"),
          p("Not if you adapt carefully."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "nextlab-tech"], services: ["content-creation"] },
  },
  {
    id: "flyer-design",
    slug: "flyer-design-tips-that-get-read",
    title: "Flyer Design Tips: How to Make a Flyer People Actually Read",
    seoTitle: "Flyer Design Tips That Get Read",
    description: "A flyer has seconds to work. How to build a clear hierarchy, choose size and paper, and avoid the mistakes that send flyers straight to the bin.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "Most flyers get a glance of a second or two. In that moment the reader decides whether to keep it. Good flyer design is not about decoration. It is about one clear message, a strong hierarchy and a reason to act.",
    sections: [
      {
        id: "goal",
        heading: "Define one goal",
        blocks: [
          p("What should the reader do after seeing the flyer: visit, call, scan, claim an offer? One flyer, one main action."),
        ],
      },
      {
        id: "hierarchy",
        heading: "Build a hierarchy",
        blocks: [
          ol("A headline that states the benefit or the offer.", "A single strong image or graphic.", "Short supporting text.", "A clear call to action with contact details."),
          p("For a bakery such as Moș Ilie, an appetising product image with a simple offer works better than a crowded list of everything on the menu."),
        ],
      },
      {
        id: "readability",
        heading: "Keep it readable",
        blocks: [
          ul("Large headline, readable body text.", "High contrast between text and background.", "No more than two fonts.", "White space around key elements."),
        ],
      },
      {
        id: "size",
        heading: "Size and format",
        blocks: [
          p("A5 and A6 are practical sizes for handing out. A4 suits posters and inserts. Add bleed, usually 3 mm, and keep text inside safe margins."),
        ],
      },
      {
        id: "paper",
        heading: "Paper and print",
        blocks: [
          p("Heavier paper feels more valuable. For leaflets distributed by hand, a medium weight in good print quality is usually enough. Request a proof before a large run."),
        ],
      },
      {
        id: "measure",
        heading: "Make it measurable",
        blocks: [
          p("Add a code, a unique link or a phrase customers mention, so you know the flyer worked. See my print design service for flyers that match your brand."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What size should a flyer be?"),
          p("A5 is the most common for hand distribution."),
          h3("Should I include a QR code?"),
          p("Only if it leads to something useful on mobile, and print it large enough to scan."),
          h3("How much text is too much?"),
          p("If it cannot be understood in a few seconds, it is too much."),
        ],
      },
    ],
    related: { projects: ["mos-ilie", "global-medical-health"], services: ["printed-media"] },
  },
  {
    id: "qr-codes-in-print",
    slug: "qr-codes-in-print-design",
    title: "QR Codes in Print Design: Size, Placement and Mistakes to Avoid",
    seoTitle: "QR Codes in Print Design: Size and Placement",
    description: "A QR code that does not scan is worse than none. How large it should be, how much empty space it needs, where to put it and what to link to.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "QR codes connect print to the web, but they only work if people can scan them in a second. Many printed codes fail for the same reasons: too small, too low contrast, no quiet space or a link that leads nowhere useful.",
    sections: [
      {
        id: "why",
        heading: "Give people a reason to scan",
        blocks: [
          p("Say what the code does, for example 'See the menu', 'Book an appointment' or 'Watch the video'. A bare code with no explanation gets ignored."),
        ],
      },
      {
        id: "size",
        heading: "Size and contrast",
        blocks: [
          ul("Make the code large enough to scan from the expected distance. On a business card, keep it at a size that scans easily and test it.", "Use dark code on a light background, with strong contrast.", "Avoid inverted colours unless you have tested them.", "Do not stretch the code."),
        ],
      },
      {
        id: "quiet",
        heading: "Leave a quiet zone",
        blocks: [
          p("A QR code needs an empty margin around it, often about four modules wide. Do not place text or graphics inside that zone."),
        ],
      },
      {
        id: "link",
        heading: "Link to something mobile friendly",
        blocks: [
          ul("The page should load fast on a phone.", "Use a short, stable link, so the code is simpler.", "Consider a dedicated page for print campaigns, so you can measure scans.", "Check that the link still works after printing."),
        ],
      },
      {
        id: "design",
        heading: "Design it into the layout",
        blocks: [
          p("Place the code in a consistent location, away from folds and edges. You can style the code with brand colours, but test carefully. Cards or flyers for a florist like Floraria Mariei can link to a catalogue or order page."),
        ],
      },
      {
        id: "test",
        heading: "Test before you print",
        blocks: [
          ol("Test on several phones.", "Test in normal lighting.", "Print a sample at real size.", "Test again after printing."),
          p("For print materials with working QR codes, see my print design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How big should a QR code be?"),
          p("Big enough to scan comfortably. Test at real size, since the right size depends on distance."),
          h3("Can I put a logo in the middle?"),
          p("Sometimes, but it can reduce reliability. Test it."),
          h3("Should I use a dynamic QR code?"),
          p("If you want to change the destination or measure scans, yes."),
        ],
      },
    ],
    related: { projects: ["nextlab-tech", "floraria-mariei"], services: ["printed-media"] },
  },
  {
    id: "paper-and-finishes",
    slug: "paper-and-finishes-for-business-cards-and-print",
    title: "Paper and Finishes for Business Cards and Print: How to Choose",
    seoTitle: "Paper and Finishes for Business Cards and Print",
    description: "Coated or uncoated, matte or gloss, foil or spot varnish. A plain guide to choosing paper and finishes that fit your brand and your budget.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Print is physical, so the paper and finish are part of the message. Two identical designs can feel cheap or premium depending on what they are printed on. Here is how to choose without needing a print-shop vocabulary.",
    sections: [
      {
        id: "weight",
        heading: "Weight",
        blocks: [
          p("Paper weight is measured in grams per square metre (gsm). Heavier paper feels sturdier. Business cards are usually printed on a heavy stock, flyers on lighter paper, and brochures somewhere in between. Ask your printer for samples to feel the difference."),
        ],
      },
      {
        id: "coated",
        heading: "Coated or uncoated",
        blocks: [
          ul("Coated paper is smooth and makes colours look vivid. It comes in matte or gloss.", "Uncoated paper is more natural, absorbs ink and feels softer. It suits a calm, premium or craft look.", "Matte coated paper reduces glare and looks modern."),
        ],
      },
      {
        id: "finishes",
        heading: "Common finishes",
        blocks: [
          ul("Lamination: a thin protective film, matte or gloss, that makes a card more durable.", "Spot varnish: a glossy coating applied to selected areas, such as a logo.", "Foil: a metallic layer for logos or details.", "Embossing: raised areas that add texture."),
          p("Use special finishes sparingly. One well-chosen detail has more effect than several competing ones."),
        ],
      },
      {
        id: "brand",
        heading: "Match the finish to the brand",
        blocks: [
          p("A natural cosmetics brand like Fleurane can use soft, tactile paper that feels calm and refined. A silver boutique such as Caterina Tomasso may use restrained elegance, perhaps with a subtle foil detail. An industrial company may prefer durable, clean materials."),
        ],
      },
      {
        id: "budget",
        heading: "Mind the budget",
        blocks: [
          ol("Choose the paper first, since it has the biggest impact.", "Add one finish where it matters most.", "Order samples or proofs before large runs.", "Ask for quotes with different options."),
          p("For help specifying print materials, see my print design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Which paper is best for business cards?"),
          p("A heavy, good quality stock. Coated or uncoated depends on the brand mood."),
          h3("Is matte or gloss better?"),
          p("Matte looks calmer and shows fewer fingerprints; gloss makes colours pop."),
          h3("Do special finishes make a big difference?"),
          p("Used well, yes, but a few details are better than many."),
        ],
      },
    ],
    related: { projects: ["fleurane", "caterina-tomasso"], services: ["printed-media"] },
  },
  {
    id: "cosmetics-label-requirements",
    slug: "cosmetics-label-requirements-in-the-eu",
    title: "Cosmetics Label Design in the EU: What Must Appear on the Packaging",
    seoTitle: "Cosmetics Label Requirements in the EU",
    description: "A designer's overview of what an EU cosmetics label must show, according to Regulation 1223/2009, and how to plan space for it from the start.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "A cosmetics label has to be beautiful and legal at the same time. Designing it without knowing what must appear leads to rework. This is a designer's overview of the main items listed in Article 19 of the EU Cosmetics Regulation (1223/2009). It is not legal advice, so always confirm with a regulatory expert.",
    sections: [
      {
        id: "why",
        heading: "Why plan the space first",
        blocks: [
          p("Mandatory text takes real space, and some of it needs a minimum legibility. If you plan the layout around it from the start, the label looks intentional. If you add it at the end, the design suffers."),
        ],
      },
      {
        id: "items",
        heading: "The main items on the label",
        blocks: [
          ul("Name and address of the responsible person in the EU.", "Country of origin for imported products.", "Nominal content (weight or volume) at the time of packaging.", "Date of minimum durability or the period after opening symbol, depending on the product.", "Precautions for use and any special warnings.", "Batch number or reference that identifies the product.", "Function of the product, unless it is clear from its presentation.", "List of ingredients, using the standard ingredient naming."),
          p("Some information may need to appear on the container and on the outer packaging; some can be given on an accompanying leaflet or label when it is not practical to print it. Check the details for your product."),
        ],
      },
      {
        id: "design",
        heading: "How to design with it",
        blocks: [
          ol("Make a list of all mandatory items for the product.", "Reserve the area for them, with enough size and contrast.", "Choose a font that stays readable at small sizes.", "Separate regulatory text from marketing text.", "Print a real-size proof and test legibility."),
        ],
      },
      {
        id: "brand",
        heading: "Keep the brand feeling",
        blocks: [
          p("Good hierarchy lets the brand name and the main message lead while the regulatory text stays tidy and clear. Brands such as Fleurane or THS Organic can keep a calm, premium appearance while respecting the rules."),
        ],
      },
      {
        id: "check",
        heading: "Always check with an expert",
        blocks: [
          p("Rules also cover claims, languages and product-specific requirements. Have the final label verified by someone who knows the regulation before printing. For help designing labels and packaging, see my print design and branding services."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Are these rules the same in all EU countries?"),
          p("The regulation applies across the EU, but language requirements for some information can depend on the country. Check each market."),
          h3("Can I put all information on a leaflet?"),
          p("Only in cases where the regulation allows it. Check which items must be on the pack."),
          h3("Who is the responsible person?"),
          p("The person or company, established in the EU, responsible for the product's compliance."),
        ],
      },
    ],
    related: { projects: ["fleurane", "ths-organic"], services: ["printed-media", "branding"] },
  },
  {
    id: "brochure-catalogue-layout",
    slug: "brochure-and-catalogue-layout-basics",
    title: "Brochure and Catalogue Layout: Grids, Hierarchy and Page Flow",
    seoTitle: "Brochure and Catalogue Layout Basics",
    description: "How to lay out a brochure or product catalogue so it is easy to scan and pleasant to read: grids, hierarchy, images, pacing and print preparation.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "A brochure or catalogue is read in a series of glances before any real reading. The layout has to guide those glances. A clear grid, strong hierarchy and a rhythm across pages make the difference between a catalogue people browse and one they put down.",
    sections: [
      {
        id: "goal",
        heading: "Start with the purpose",
        blocks: [
          p("Is the document meant to inform, to sell or to impress? A product catalogue needs scanning and comparison. A brand brochure needs mood and story. Decide the purpose before choosing the layout."),
        ],
      },
      {
        id: "grid",
        heading: "Use a grid",
        blocks: [
          ul("Choose a column grid, such as two, three or four columns.", "Set margins and gutters and keep them consistent.", "Align images and text to the grid.", "Use a baseline grid for tidy text."),
          p("A grid is what makes many pages feel like one document."),
        ],
      },
      {
        id: "hierarchy",
        heading: "Create a hierarchy",
        blocks: [
          ol("Page titles and section openers.", "Product names or headings.", "Descriptions and key details.", "Prices, codes and small print."),
          p("Use size, weight and colour to separate levels. A florist catalogue, for example, can lead with large product images and short names, with details in smaller text."),
        ],
      },
      {
        id: "images",
        heading: "Treat images with care",
        blocks: [
          p("Use high-resolution photos, consistent in light and style. Mix full-page images with smaller ones to create rhythm. Keep captions near the images."),
        ],
      },
      {
        id: "flow",
        heading: "Plan the page flow",
        blocks: [
          ul("Start with a strong cover and a clear contents page.", "Group related products or topics.", "Vary page density: busy pages followed by calmer ones.", "End with contact details and a call to action."),
        ],
      },
      {
        id: "print",
        heading: "Prepare for print",
        blocks: [
          p("Use CMYK, add bleed, check resolution at 300 dpi for images and keep text away from folds and trims. Pay attention to page counts: booklets usually need multiples of four. See my print design service for catalogues and brochures."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many columns should I use?"),
          p("Two to four is typical, depending on the page size and content."),
          h3("What resolution do images need?"),
          p("About 300 dpi at final size for print."),
          h3("Should I print or send a PDF?"),
          p("Both can be useful. A PDF is good for online sharing, print for in-person impact."),
        ],
      },
    ],
    related: { projects: ["regata-print", "floraria-mariei"], services: ["printed-media"] },
  },
  {
    id: "promotional-materials",
    slug: "promotional-materials-that-work",
    title: "Promotional Materials That Work: Which Ones Are Worth Printing",
    seoTitle: "Promotional Materials That Work: What to Print",
    description: "Pens, bags, brochures, banners, stickers. How to decide which promotional items suit your brand and audience, and how to design them well.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "Printed promotional materials can strengthen a brand, or waste a budget. The difference is usually relevance. Items that people keep, use and associate with a good experience work. Generic items that nobody wants do not.",
    sections: [
      {
        id: "purpose",
        heading: "Start with the purpose",
        blocks: [
          ul("Awareness at an event or in a shop.", "Thanking customers.", "Supporting a sale or a presentation.", "Referrals and repeat business."),
        ],
      },
      {
        id: "choose",
        heading: "Choose items people will actually use",
        blocks: [
          p("Think about your audience's daily routine. A notebook may suit a consultant; a tote bag may suit a boutique; a durable catalogue may suit an industrial company showing machines at a trade fair."),
        ],
      },
      {
        id: "list",
        heading: "Common options",
        blocks: [
          ul("Brochures and catalogues for information.", "Stickers and labels for small brands and shops.", "Packaging, tissue paper and thank-you cards for e-commerce.", "Roll-up banners and signage for events.", "Branded stationery, as discussed in my stationery guide."),
        ],
      },
      {
        id: "design",
        heading: "Design as a family",
        blocks: [
          ol("Use the same colours, fonts and logo placement.", "Include a clear call to action.", "Keep layouts simple and bold.", "Test legibility at the real size."),
          p("A tidy family of materials makes a small company look established, as in a project such as KDT Romania."),
        ],
      },
      {
        id: "quality",
        heading: "Quality over quantity",
        blocks: [
          p("A few well-made items beat a large stock of weak ones. Order a sample, check colours and paper, and run small quantities first."),
        ],
      },
      {
        id: "measure",
        heading: "Measure the effect",
        blocks: [
          p("Use codes, links or a question at the checkout to see which materials bring results. For help with promotional design, see my print design and branding services."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Are printed materials still worth it?"),
          p("Yes, for events, local business and premium impressions, alongside digital channels."),
          h3("How many items should I order?"),
          p("Start small, then reorder once you know what works."),
          h3("How do I make promo items feel premium?"),
          p("Good design, good material and restraint."),
        ],
      },
    ],
    related: { projects: ["kdt-romania", "regata-print"], services: ["printed-media", "branding"] },
  },
  {
    id: "ux-vs-ui",
    slug: "ux-vs-ui-design-difference",
    title: "UX vs UI Design: What Is the Difference and Why Both Matter",
    seoTitle: "UX vs UI Design: The Difference Explained",
    description: "UX is how a product works for people, UI is how it looks and feels on screen. How the two differ, how they work together and what to ask a designer.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "UX and UI are often mentioned together, which is why they get confused. They are two sides of the same product. One answers 'does this work for people?', the other 'does this look and feel right?'. A good product needs both.",
    sections: [
      {
        id: "ux",
        heading: "What UX design is",
        blocks: [
          p("User experience design is about how a product works for the person using it. It covers understanding users, mapping tasks, structuring information, planning flows and testing. The question is: can people achieve their goal easily?"),
          ul("User research and personas.", "Information architecture and flows.", "Wireframes and prototypes.", "Usability testing."),
        ],
      },
      {
        id: "ui",
        heading: "What UI design is",
        blocks: [
          p("User interface design is the visual and interactive layer: layout, colours, typography, buttons, icons, spacing and states. The question is: does this look clear, consistent and on brand?"),
          ul("Visual style and design systems.", "Components such as buttons and forms.", "Responsive layouts for different screens.", "Motion and feedback."),
        ],
      },
      {
        id: "together",
        heading: "How they work together",
        blocks: [
          p("UX decides what goes where and why. UI decides how it looks. A beautiful interface with a confusing flow fails. A logical flow with a poor interface feels untrustworthy. In projects such as Vibrary, a reading app, structure, usability and visual style were designed together."),
        ],
      },
      {
        id: "example",
        heading: "A simple example",
        blocks: [
          p("On an ordering page for a food delivery brand like Green Table, UX decides the steps from choosing a plan to paying. UI decides how the plates are presented, how buttons look and how the colours support appetite and clarity."),
        ],
      },
      {
        id: "ask",
        heading: "What to ask a designer",
        blocks: [
          ol("How do you understand users?", "Can you show a flow, not only screens?", "How do you handle consistency?", "How do you test?"),
          p("For app and website interface design, see my UX/UI design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Can one person do both UX and UI?"),
          p("Yes, especially on small projects."),
          h3("Which should come first?"),
          p("UX, because structure and flows shape the interface."),
          h3("Is UX only for apps?"),
          p("No. Websites, print flows and services have user experience too."),
        ],
      },
    ],
    related: { projects: ["vibrary", "green-table"], services: ["ux-ui-design"] },
  },
  {
    id: "mobile-first-checklist",
    slug: "mobile-first-website-design-checklist",
    title: "Mobile-First Website Design: A Practical Checklist",
    seoTitle: "Mobile-First Website Design Checklist",
    description: "Most visitors arrive on a phone. A practical checklist for designing a website that is fast, readable and easy to use on small screens first.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-feed", alt: "Phone showing a blush pink Instagram grid, surrounded by beauty photos and a colour palette" },
    intro: "For many businesses, most visitors open the website on a phone. Designing for the small screen first forces useful discipline: clear priorities, readable text and fast pages. Here is a checklist you can apply to a new site or to a redesign.",
    sections: [
      {
        id: "content",
        heading: "Content and priorities",
        blocks: [
          ul("Put the most important information and action first.", "Keep headlines short.", "Cut text that does not help the visitor decide.", "Make contact options visible: call, message, directions."),
        ],
      },
      {
        id: "layout",
        heading: "Layout",
        blocks: [
          ul("One main column on small screens.", "Generous spacing between elements.", "Navigation that is simple and reachable.", "Images that scale without cropping key details."),
        ],
      },
      {
        id: "touch",
        heading: "Touch-friendly controls",
        blocks: [
          ol("Buttons large enough to tap comfortably.", "Space between links so they are not hit by mistake.", "Forms with the right keyboard type and few fields.", "Clear error messages."),
        ],
      },
      {
        id: "type",
        heading: "Typography",
        blocks: [
          p("Use text size comfortable for reading without zooming, enough line spacing, and strong contrast. A local business such as Optica Tei benefits from clear service pages and easy contact options on mobile."),
        ],
      },
      {
        id: "speed",
        heading: "Speed",
        blocks: [
          p("Google's Core Web Vitals give targets for a good experience: Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint within 200 milliseconds and Cumulative Layout Shift below 0.1."),
          ul("Compress and size images properly.", "Avoid heavy scripts.", "Load below-the-fold images lazily.", "Test on a real phone and slower connections."),
        ],
      },
      {
        id: "test",
        heading: "Test on real devices",
        blocks: [
          p("Check the site on several phones, in daylight, with one hand. For a mobile-friendly website or app design, see my UX/UI design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("What does mobile-first mean?"),
          p("Designing for the smallest screen first, then expanding to larger screens."),
          h3("Is a separate mobile site needed?"),
          p("No. A responsive design adapts to all screens."),
          h3("Does mobile speed affect search results?"),
          p("Page experience is one of many factors, and a fast, usable site helps visitors regardless."),
        ],
      },
    ],
    related: { projects: ["vibrary", "optica-tei"], services: ["ux-ui-design"] },
  },
  {
    id: "designer-portfolio-website",
    slug: "portfolio-website-for-designers",
    title: "A Portfolio Website for Designers: What to Include and What to Leave Out",
    seoTitle: "Portfolio Website for Designers: What to Include",
    description: "How to structure a designer's portfolio website: choosing projects, writing case studies, making contact easy and keeping the site fast and clear.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-stand-out", alt: "Pink and navy collage with an engraved scorpion, an ink bottle, a halftone eye and a flower" },
    intro: "A portfolio website is your best sales tool and your most personal design project. Clients decide quickly whether to contact you, so the site must show your best work clearly and make the next step easy.",
    sections: [
      {
        id: "select",
        heading: "Show fewer, better projects",
        blocks: [
          p("Choose the projects that show the work you want to be hired for. Eight strong projects are better than thirty mixed ones. Put the strongest first and last."),
        ],
      },
      {
        id: "case",
        heading: "Write real case studies",
        blocks: [
          ol("The client and the problem.", "Your role.", "The process and key decisions.", "The result, using facts you can support.", "The deliverables, shown as clear images and mock-ups."),
          p("Clients want to see how you think. A short story with a strong visual is more convincing than a gallery of images."),
        ],
      },
      {
        id: "structure",
        heading: "Keep the structure simple",
        blocks: [
          ul("Home with a clear statement and featured work.", "Work or projects page.", "About, with a real photo and a short story.", "Services, so people know what to hire you for.", "Contact, with an easy form."),
        ],
      },
      {
        id: "presentation",
        heading: "Present work well",
        blocks: [
          ul("Use consistent, high-quality mock-ups.", "Avoid cluttered layouts and slow-loading images.", "Make it work on phones.", "Keep the design simple so the work is the star."),
        ],
      },
      {
        id: "seo",
        heading: "Make it findable",
        blocks: [
          p("Use clear page titles and descriptions, meaningful image names and alt text, and a page for each project and service. A blog with useful articles can bring visitors who are looking for exactly what you do."),
        ],
      },
      {
        id: "contact",
        heading: "Make contact easy",
        blocks: [
          p("Put a clear call to action on every page, with an email and a form. Reply fast. For a custom portfolio site, see my UX/UI design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many projects should I show?"),
          p("Six to ten strong ones is a good range."),
          h3("Should I show unfinished or personal projects?"),
          p("Yes, if they show skills you want to be hired for."),
          h3("Do I need a blog?"),
          p("Not required, but it can help visibility and show expertise."),
        ],
      },
    ],
    related: { projects: ["vibrary", "kdt-romania"], services: ["ux-ui-design", "branding"] },
  },
  {
    id: "web-accessibility-basics",
    slug: "web-accessibility-basics-for-designers",
    title: "Web Accessibility Basics for Designers: Contrast, Text Size and Focus",
    seoTitle: "Web Accessibility Basics: Contrast and Text Size",
    description: "Accessible design helps everyone. The practical basics every designer should know: colour contrast ratios, readable text, focus states and alt text.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-fonts", alt: "Typography collage: a large serif A and a lowercase a on pink, with stars and torn paper" },
    intro: "Accessible design is good design. It helps people with low vision, colour blindness, motor difficulties or a tired eye in bright sunlight. The standards sound technical, but the basics are simple enough to apply from the first sketch.",
    sections: [
      {
        id: "contrast",
        heading: "Colour contrast",
        blocks: [
          p("The Web Content Accessibility Guidelines (WCAG 2.2) set the minimum contrast between text and background at 4.5:1 for normal text and 3:1 for large text. Large text means at least 18 point, or 14 point bold."),
          ul("Check every text and background pair, including buttons.", "Do not put light grey text on white.", "Test text over images with an overlay if needed."),
        ],
      },
      {
        id: "colour",
        heading: "Do not rely on colour alone",
        blocks: [
          p("Errors, links and states should be shown with more than colour: an icon, an underline or a label. People with colour blindness may not see the difference."),
        ],
      },
      {
        id: "size",
        heading: "Readable text",
        blocks: [
          ul("Comfortable body size and generous line spacing.", "Avoid very long lines.", "Avoid text as an image when it can be live text.", "Allow zoom without breaking the layout."),
        ],
      },
      {
        id: "focus",
        heading: "Focus states and keyboard",
        blocks: [
          p("Some people navigate with a keyboard. Make sure every interactive element has a visible focus state and a logical order."),
        ],
      },
      {
        id: "alt",
        heading: "Alt text and labels",
        blocks: [
          ul("Add short, meaningful alt text to informative images.", "Use empty alt text for purely decorative ones.", "Label form fields clearly."),
        ],
      },
      {
        id: "start",
        heading: "Start early",
        blocks: [
          p("Fixing accessibility late is expensive. Include checks in your design process, and test with real people when possible. See my UX/UI design service for accessible interfaces."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("Is accessibility a legal requirement?"),
          p("In some situations it is, depending on country and type of organisation. Check the rules for your case."),
          h3("Does accessible design look worse?"),
          p("No. Good contrast and clear hierarchy often look better."),
          h3("What is the easiest first step?"),
          p("Check colour contrast on your main text and buttons."),
        ],
      },
    ],
    related: { projects: ["vibrary", "green-table"], services: ["ux-ui-design"] },
  },
  {
    id: "graphic-design-portfolio",
    slug: "how-to-build-a-graphic-design-portfolio",
    title: "How to Build a Graphic Design Portfolio That Gets You Hired",
    seoTitle: "How to Build a Graphic Design Portfolio That Gets You Hired",
    description: "A strong graphic design portfolio shows range, process and results. How to choose projects, present them and fill gaps when you are starting out.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-premium", alt: "Pink collage with a rose lip gloss, raspberries, blueberries, a petal and halftone lips" },
    intro: "Whether you are looking for clients or a job, your portfolio does the talking before you do. The best ones are not the biggest. They are focused, well presented and honest about the designer's role. Here is how to build one.",
    sections: [
      {
        id: "aim",
        heading: "Decide what you want to be hired for",
        blocks: [
          p("A portfolio for branding looks different from one for social media or packaging. Show the kind of work you want more of. Remove the rest, even if you are fond of it."),
        ],
      },
      {
        id: "projects",
        heading: "Choose projects with care",
        blocks: [
          ul("Lead with your strongest work.", "Show variety within your focus: identity, print, digital.", "Include a few complete identity projects that show a system, not just a logo.", "Add mock-ups to show how work looks in real use."),
        ],
      },
      {
        id: "fill",
        heading: "What if you have few clients?",
        blocks: [
          ol("Do self-initiated projects for imaginary or small real brands.", "Redesign something with a clear brief and goals.", "Volunteer for a local organisation.", "Be honest that the work is personal."),
        ],
      },
      {
        id: "story",
        heading: "Tell the story of each project",
        blocks: [
          p("Explain the problem, your role and your decisions. For a project such as a tattoo studio identity like Inklabs or a fashion brand like IQ Fashion, show the logo, the system and then how it appears on posts, packaging and print."),
        ],
      },
      {
        id: "present",
        heading: "Present it professionally",
        blocks: [
          ul("Consistent, clean layouts.", "High-quality images and mock-ups.", "Short text.", "A PDF version for sending and a website for showing."),
        ],
      },
      {
        id: "update",
        heading: "Keep it updated",
        blocks: [
          p("Review your portfolio every few months, replace older work with stronger pieces and keep the contact details current. If you need a portfolio site designed, see my UX/UI design service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many projects should a portfolio include?"),
          p("Six to ten is a good range."),
          h3("Should I include client work I disliked?"),
          p("Not if it does not represent the quality you want to be known for."),
          h3("Do I need a website or is a PDF enough?"),
          p("A website is best for discovery; a PDF is useful for specific applications."),
        ],
      },
    ],
    related: { projects: ["inklabs", "iq-fashion"], services: ["branding"] },
  },
  {
    id: "working-with-a-freelance-designer",
    slug: "working-with-a-freelance-designer-contracts-and-usage-rights",
    title: "Working With a Freelance Designer: Briefs, Contracts and Usage Rights",
    seoTitle: "Working With a Freelance Designer: Briefs and Rights",
    description: "How to get the best from a freelance designer: writing a brief, agreeing scope, understanding usage rights and giving feedback that moves the project forward.",
    category: "graphic-design",
    publishedAt: "2026-11-03",
    cover: { key: "journal-mistakes", alt: "Pink and navy brand collage with swatches, a coffee cup, a price tag and shapes" },
    intro: "A good working relationship with a freelance designer saves time and money for both sides. Most problems come from the same few gaps: unclear scope, unclear rights and unclear feedback. A bit of structure at the start prevents them.",
    sections: [
      {
        id: "brief",
        heading: "Start with a clear brief",
        blocks: [
          ul("The business, the audience and the goal.", "What you need delivered and where it will be used.", "References you like and dislike.", "Budget and deadline.", "Who makes the final decision."),
        ],
      },
      {
        id: "scope",
        heading: "Agree the scope in writing",
        blocks: [
          p("List the deliverables, the number of concepts, the revision rounds, the file formats and the timeline. Say what is not included. Extra work can be quoted separately."),
        ],
      },
      {
        id: "contract",
        heading: "Use a simple contract",
        blocks: [
          p("A short written agreement should cover scope, price, payment schedule, timeline, revisions, confidentiality and cancellation. It protects both sides. For anything complex, ask a lawyer."),
        ],
      },
      {
        id: "rights",
        heading: "Understand usage rights",
        blocks: [
          p("Design work usually involves copyright and licensing. Clarify who owns the final files and what you are allowed to do with them: where, for how long, in which media. Many agreements transfer rights for the agreed use after full payment. Put it in the contract and check the rules in your country."),
        ],
      },
      {
        id: "feedback",
        heading: "Give useful feedback",
        blocks: [
          ol("Collect all comments into one message.", "Describe the problem, not only the solution.", "Relate comments to the goal.", "Keep the number of decision makers small."),
        ],
      },
      {
        id: "payment",
        heading: "Payment and delivery",
        blocks: [
          ul("A deposit before work starts is common.", "Pay milestones on time.", "Receive source files and exports as agreed."),
          p("If you would like to work with me, see my services and use the contact form."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How much should a deposit be?"),
          p("It varies. A portion up front is common, with the rest on milestones or delivery."),
          h3("Can I reuse the design anywhere?"),
          p("Only within the rights agreed in the contract."),
          h3("What if I do not like the first concept?"),
          p("Explain why using the brief. A good designer will refine or propose another direction."),
        ],
      },
    ],
    related: { projects: ["regata-print", "caterina-tomasso"], services: ["branding"] },
  },
  {
    id: "content-pillars",
    slug: "content-pillars-how-to-plan-content-by-industry",
    title: "Content Pillars: How to Plan Social Media Content for Your Industry",
    seoTitle: "Content Pillars: Plan Content for Your Industry",
    description: "Content pillars are three to five recurring themes that organise your posts. How to choose them, with examples for health, food, beauty and B2B.",
    category: "content-creation",
    publishedAt: "2026-11-03",
    cover: { key: "journal-identity", alt: "Pink collage of a halftone classical face, a sketch on paper and a hand holding a pen" },
    intro: "'What should we post today?' is the question that exhausts small teams. Content pillars answer it in advance. They are a handful of recurring themes that guide what you publish, keep the feed balanced and make planning faster.",
    sections: [
      {
        id: "what",
        heading: "What a pillar is",
        blocks: [
          p("A pillar is a broad topic that your brand can talk about repeatedly from different angles. Three to five is enough. Each should connect to your goals and to something your audience cares about."),
        ],
      },
      {
        id: "how",
        heading: "How to choose them",
        blocks: [
          ol("List your audience's questions and worries.", "List what you want to be known for.", "Group topics into three to five themes.", "Check that each pillar can produce many posts."),
        ],
      },
      {
        id: "health",
        heading: "Example: healthcare and dental",
        blocks: [
          ul("Education: explain procedures and prevention.", "Team and trust: introduce the people.", "Results and stories, with permission.", "Practical information: hours, how to book, what to expect."),
          p("Brands such as Art Innova and Global Medical Health need a calm, reassuring balance of information and trust."),
        ],
      },
      {
        id: "food",
        heading: "Example: food and beauty",
        blocks: [
          ul("Product and detail.", "Process and ingredients.", "Lifestyle and use.", "Offers and seasonal moments."),
        ],
      },
      {
        id: "b2b",
        heading: "Example: B2B and technical",
        blocks: [
          ul("Projects and results.", "Expertise and explanations.", "Team and process.", "Industry news with your point of view."),
        ],
      },
      {
        id: "calendar",
        heading: "Turn pillars into a calendar",
        blocks: [
          p("Assign pillars to days or weeks, then fill them with specific posts. A simple weekly rhythm with one post per pillar is easy to keep. For help with a content plan and design system, see my content creation service."),
        ],
      },
      {
        id: "faq",
        heading: "Frequently asked questions",
        blocks: [
          h3("How many pillars should I have?"),
          p("Three to five."),
          h3("Can pillars change?"),
          p("Yes. Review them every quarter based on results."),
          h3("Do pillars limit creativity?"),
          p("They give a structure. Creativity happens within it."),
        ],
      },
    ],
    related: { projects: ["art-innova", "global-medical-health"], services: ["content-creation", "social-media-design"] },
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
