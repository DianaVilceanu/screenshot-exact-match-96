import { useEffect, useState } from "react";
import { ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import { allCategories, type Category } from "@/content/projects";
import { nicheCopy, nicheIds, nichesOf, type NicheId } from "@/content/niches";
import { content, hrefFor, useContent, type Locale } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function portfolioHead(locale: Locale) {
  const { t } = content(locale);
  return seo({ title: t.portfolio.seoTitle, description: t.portfolio.seoDesc, path: hrefFor(locale, { kind: "portfolio" }), locale, ref: { kind: "portfolio" } });
}

const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[5/4]", "aspect-[3/4]"];

export function PortfolioPage() {
  const { t, projects, locale } = useContent();
  const nc = nicheCopy[locale === "ro" ? "ro" : "en"];
  const [filter, setFilter] = useState<Category | "All">("All");
  const [niche, setNiche] = useState<NicheId | "All">("All");
  // Deep links from the home page: /portfolio?niche=food
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("niche");
    if (q && (nicheIds as string[]).includes(q)) setNiche(q as NicheId);
  }, []);
  const pickNiche = (n: NicheId | "All") => {
    setNiche(n);
    const u = new URL(window.location.href);
    if (n === "All") u.searchParams.delete("niche");
    else u.searchParams.set("niche", n);
    window.history.replaceState(null, "", u);
  };
  const inNiche = (slug: string) => niche === "All" || nichesOf(slug).includes(niche);
  const list = projects.filter((p) => inNiche(p.slug) && (filter === "All" || p.categories.includes(filter)));
  const used = allCategories.filter((c) => projects.some((p) => inNiche(p.slug) && p.categories.includes(c)));
  const countOf = (n: NicheId) => projects.filter((p) => nichesOf(p.slug).includes(n)).length;
  return (
    <>
      <section className="container-editorial pt-32 pb-12 md:pt-44">
        <Eyebrow n={String(projects.length).padStart(2, "0")}>{t.portfolio.eyebrow}</Eyebrow>
        <h1 className="display-xl mt-6">
          {t.portfolio.h1a}
          <em className="text-accent">{t.portfolio.h1b}</em>
        </h1>
        <p className="lede mt-8 max-w-2xl text-muted-foreground">{t.portfolio.lede}</p>
      </section>
      <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-md md:top-20">
        <div className="container-editorial flex gap-2 overflow-x-auto pt-3 pb-1" role="group" aria-label={nc.filterAria}>
          {(["All", ...nicheIds] as const).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={niche === n}
              onClick={() => pickNiche(n)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                niche === n ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
              )}
            >
              {n === "All" ? nc.all : nc.names[n]}
              <span className={cn("text-[0.7rem] tabular-nums", niche === n ? "opacity-80" : "text-muted-foreground")}>{n === "All" ? projects.length : countOf(n)}</span>
            </button>
          ))}
        </div>
        <div className="container-editorial flex gap-2 overflow-x-auto pt-1 pb-3" role="group" aria-label={t.portfolio.filterAria}>
          {(["All", ...used] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn("shrink-0 border px-4 py-2 text-sm transition-colors", filter === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}
            >
              {c === "All" ? t.portfolio.all : (t.categories[c] ?? c)}
            </button>
          ))}
        </div>
      </div>
      <section className="container-editorial py-16 md:py-24" aria-live="polite">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90} className={cn(i % 3 === 1 && "lg:mt-20")}>
              <ProjectTile p={p} index={i} aspect={aspects[i % aspects.length]!} />
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
