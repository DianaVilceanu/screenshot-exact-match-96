import { SITE_NAME, SITE_URL } from "@/content/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object[];
};

/** Builds head() output: unique title, description, canonical, OG/Twitter, optional JSON-LD. */
export function seo({ title, description, path, type = "website", noindex, jsonLd = [] }: SeoInput) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const url = SITE_URL + path;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path,
    })),
  };
}
