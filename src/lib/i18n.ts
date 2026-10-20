import { useRouterState } from "@tanstack/react-router";
import * as enJournal from "@/content/journal";
import * as enProjects from "@/content/projects";
import * as enServices from "@/content/services";
import * as enSite from "@/content/site";
import * as roJournal from "@/content/ro/journal";
import * as roProjects from "@/content/ro/projects";
import * as roServices from "@/content/ro/services";
import * as roSite from "@/content/ro/site";
import { ui } from "@/content/ui";
import type { Article, Category as JournalCategory } from "@/content/journal";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { SITE_URL } from "@/content/site";

export type Locale = "ro" | "en";
export const LOCALES: Locale[] = ["ro", "en"];
export const DEFAULT_LOCALE: Locale = "ro";

export const localeFromPath = (path: string): Locale => (path === "/en" || path.startsWith("/en/") ? "en" : "ro");

/** Stable id linking translations: the English slug. */
const idOf = (x: { id?: string; slug: string }) => x.id ?? x.slug;

/** All content for one language. Each language is edited in its own file. */
export function content(locale: Locale) {
  const j = locale === "ro" ? roJournal : enJournal;
  const pr = locale === "ro" ? roProjects : enProjects;
  const sv = locale === "ro" ? roServices : enServices;
  const projects: Project[] = pr.projects;
  const services: Service[] = sv.services;
  const articles: Article[] = j.articles;
  const categories: JournalCategory[] = j.categories;
  return {
    locale,
    t: ui[locale],
    person: locale === "ro" ? roSite.person : enSite.person,
    projects,
    publicProjects: projects.filter((p) => !p.draft),
    services,
    articles,
    categories,
    project: (slug: string) => projects.find((p) => p.slug === slug),
    projectById: (id: string) => projects.find((p) => idOf(p) === id),
    service: (slug: string) => services.find((s) => s.slug === slug),
    serviceById: (id: string) => services.find((s) => idOf(s) === id),
    article: (slug: string) => articles.find((a) => a.slug === slug),
    articleById: (id: string) => articles.find((a) => idOf(a) === id),
    category: (slug: string) => categories.find((c) => c.slug === slug),
    categoryById: (id: string) => categories.find((c) => idOf(c) === id),
  };
}
export type Content = ReturnType<typeof content>;
export { idOf };

const sections = {
  ro: { home: "/", portfolio: "/portofoliu", services: "/servicii", journal: "/jurnal", category: "/jurnal/categorie", contact: "/contact" },
  en: { home: "/en", portfolio: "/en/portfolio", services: "/en/services", journal: "/en/journal", category: "/en/journal/category", contact: "/en/contact" },
} as const;

export type PageRef =
  | { kind: "home" | "portfolio" | "services" | "journal" | "contact" }
  | { kind: "project" | "service" | "article" | "category"; id: string };

/** URL of a page in a language, or null if that translation doesn't exist (or isn't published). */
export function pathFor(locale: Locale, ref: PageRef): string | null {
  const s = sections[locale];
  if (!("id" in ref)) return s[ref.kind];
  const c = content(locale);
  if (ref.kind === "project") {
    const p = c.projectById(ref.id);
    return p ? `${s.portfolio}/${p.slug}` : null;
  }
  if (ref.kind === "service") {
    const x = c.serviceById(ref.id);
    return x ? `${s.services}/${x.slug}` : null;
  }
  if (ref.kind === "category") {
    const x = c.categoryById(ref.id);
    return x ? `${s.category}/${x.slug}` : null;
  }
  const a = c.articleById(ref.id);
  return a ? `${s.journal}/${a.slug}` : null;
}

/** Same as pathFor but falls back to the closest section page. */
export function hrefFor(locale: Locale, ref: PageRef): string {
  const direct = pathFor(locale, ref);
  if (direct) return direct;
  const s = sections[locale];
  if (ref.kind === "project") return s.portfolio;
  if (ref.kind === "service") return s.services;
  if (ref.kind === "article" || ref.kind === "category") return s.journal;
  return s.home;
}

/** Find which page a URL represents (used by the language switcher). */
export function refFromPath(path: string): PageRef {
  const locale = localeFromPath(path);
  const s = sections[locale];
  const clean = path.replace(/\/+$/, "") || "/";
  const c = content(locale);
  const tail = (prefix: string) => (clean.startsWith(prefix + "/") ? clean.slice(prefix.length + 1) : null);
  let slug: string | null;
  if ((slug = tail(s.category))) {
    const x = c.category(slug);
    return x ? { kind: "category", id: idOf(x) } : { kind: "journal" };
  }
  if ((slug = tail(s.portfolio))) {
    const x = c.project(slug);
    return x ? { kind: "project", id: idOf(x) } : { kind: "portfolio" };
  }
  if ((slug = tail(s.services))) {
    const x = c.service(slug);
    return x ? { kind: "service", id: idOf(x) } : { kind: "services" };
  }
  if ((slug = tail(s.journal))) {
    const x = c.article(slug);
    return x ? { kind: "article", id: idOf(x) } : { kind: "journal" };
  }
  for (const k of ["portfolio", "services", "journal", "contact"] as const) if (clean === s[k]) return { kind: k };
  return { kind: "home" };
}

export const absolute = (path: string) => SITE_URL + (path === "/" ? "/" : path);

/** hreflang alternates: only languages where this page actually exists. */
export function alternatesFor(ref: PageRef) {
  const out: { locale: Locale; path: string }[] = [];
  for (const l of LOCALES) {
    const p = pathFor(l, ref);
    if (p) out.push({ locale: l, path: p });
  }
  return out;
}

export function useLocale(): Locale {
  return useRouterState({ select: (s) => localeFromPath(s.location.pathname) });
}
export function useContent() {
  return content(useLocale());
}
