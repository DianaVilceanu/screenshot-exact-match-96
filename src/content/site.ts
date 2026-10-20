// Contact details and social links come from the original dianamarriedesigns.com.
export const SITE_URL = "https://dianamarriedesigns.com";
export const SITE_NAME = "Diana Marrie Designs";

export const person = {
  name: "Diana Vîlceanu",
  fullName: "Diana-Maria Vîlceanu",
  role: "Graphic Designer & Art Director",
  handle: "@DianaMarrieDesigns",
  languages: ["Romanian (native)", "English (fluent / advanced)"],
  tools: ["Figma", "CapCut", "Filmora"],
  about: [
    "I'm Diana, an artistic-minded creator who started in graphic design through illustration and branding, later expanding into video editing, animation, and a variety of design niches. With 6 years of experience across digital content creation, I've also built a solid technical foundation through my studies in Economic Informatics.",
    "Recently, my focus has shifted toward social media, where I craft engaging visuals, carousels, and reels. I'm passionate about creating visually appealing, impactful digital experiences.",
  ],
};

export const contact = {
  email: "dianavlceanu@gmail.com",
  whatsapp: {
    label: "+40 764 869 425",
    href: "https://wa.me/40764869425?text=Bun%C4%83%21%20A%C8%99%20dori%20mai%20multe%20informa%C8%9Bii%20despre%20serviciile%20de%20grafic%C4%83",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/recreationalplace/" },
    { label: "Behance", href: "https://www.behance.net/dianamariavilceanu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/diana-vilceanu-b63429170/" },
    { label: "Facebook", href: "https://www.facebook.com/diana.vilceanu.1/" },
  ],
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/journal", label: "Journal" },
] as const;
