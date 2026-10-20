import { SITE_NAME, SITE_URL } from "@/content/site";
import { absolute, alternatesFor, type Locale, type PageRef } from "@/lib/i18n";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  /** Identifies the page across languages for hreflang. */
  ref: PageRef;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object[];
};

/** Builds head(): unique title, description, self canonical, reciprocal hreflang, OG/Twitter, JSON-LD. */
export function seo({ title, description, path, locale, ref, type = "website", noindex, jsonLd = [] }: SeoInput) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = absolute(path);
  const alts = alternatesFor(ref);
  const hreflang =
    alts.length > 1
      ? [
          ...alts.map((a) => ({ rel: "alternate", hrefLang: a.locale, href: absolute(a.path) })),
          { rel: "alternate", hrefLang: "x-default", href: absolute(alts.find((a) => a.locale === "ro")!.path) },
        ]
      : [];
  const other = alts.find((a) => a.locale !== locale);
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: locale === "ro" ? "ro_RO" : "en_GB" },
      ...(other ? [{ property: "og:locale:alternate", content: other.locale === "ro" ? "ro_RO" : "en_GB" }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }, ...hreflang],
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

export const notFoundHead = (title: string) => ({ meta: [{ title: `${title} | ${SITE_NAME}` }, { name: "robots", content: "noindex" }] });
