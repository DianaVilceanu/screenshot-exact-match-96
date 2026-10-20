import type { Project } from "@/content/projects";
import { type Article, readingTime } from "@/content/journal";
import { hrefFor, idOf, useContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { L } from "./llink";
import { Arrow, Pic } from "./primitives";

export function formatDate(d: string, locale: string) {
  return new Date(d).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export function ProjectTile({ p, className, aspect = "aspect-[4/5]", index }: { p: Project; className?: string; aspect?: string; index?: number }) {
  const { locale, t } = useContent();
  return (
    <L to={hrefFor(locale, { kind: "project", id: idOf(p) })} className={cn("group block", className)}>
      <div className={cn("frame-zoom relative bg-muted", aspect)}>
        {p.cover ? (
          <Pic k={p.cover.key} alt={p.cover.alt} />
        ) : (
          <div data-theme="kdt" className="flex h-full w-full flex-col justify-between bg-primary p-6 text-primary-foreground">
            <span className="eyebrow opacity-70">{t.project.inPrep}</span>
            <span className="display-md">{p.name}</span>
          </div>
        )}
        {index !== undefined && (
          <span className="eyebrow absolute top-4 left-4 bg-background/90 px-2 py-1 text-foreground">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="display-sm transition-colors group-hover:text-accent">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.categories.map((c) => t.categories[c] ?? c).join(" · ")}</p>
        </div>
        <Arrow className="mt-2" />
      </div>
    </L>
  );
}

export function ArticleMeta({ a }: { a: Article }) {
  const { t, categoryById } = useContent();
  const cat = categoryById(a.category);
  return (
    <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground">
      <span className="text-accent">{cat?.name}</span>
      <span>{a.publishedAt ? formatDate(a.publishedAt, t.dateLocale) : t.journal.draft}</span>
      <span>
        {readingTime(a)} {t.journal.minRead}
      </span>
    </p>
  );
}

export function ArticleCard({ a, large }: { a: Article; large?: boolean }) {
  const { locale } = useContent();
  return (
    <L to={hrefFor(locale, { kind: "article", id: idOf(a) })} className="group block">
      <div className={cn("frame-zoom bg-muted", large ? "aspect-[16/11]" : "aspect-[4/3]")}>
        <Pic k={a.cover.key} alt={a.cover.alt} />
      </div>
      <div className="mt-5">
        <ArticleMeta a={a} />
        <h3 className={cn("mt-3 transition-colors group-hover:text-accent", large ? "display-md" : "display-sm")}>{a.title}</h3>
        {large && <p className="lede mt-4 text-muted-foreground">{a.description}</p>}
      </div>
    </L>
  );
}
