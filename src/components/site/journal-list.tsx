import { useMemo, useState } from "react";
import type { Article } from "@/content/journal";
import { hrefFor, idOf, useContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArticleCard } from "./cards";
import { L } from "./llink";
import { Reveal } from "./primitives";

const PAGE = 6;

export function CategoryNav({ active }: { active?: string }) {
  const { locale, t, categories } = useContent();
  return (
    <nav aria-label={t.journal.catsAria} className="flex gap-2 overflow-x-auto">
      <L to={hrefFor(locale, { kind: "journal" })} className={cn("shrink-0 border px-4 py-2 text-sm", !active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>
        {t.journal.all}
      </L>
      {categories.map((c) => (
        <L
          key={c.slug}
          to={hrefFor(locale, { kind: "category", id: idOf(c) })}
          className={cn("shrink-0 border px-4 py-2 text-sm", active === c.slug ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}
        >
          {c.name}
        </L>
      ))}
    </nav>
  );
}

export function ArticleGrid({ items }: { items: Article[] }) {
  const { t } = useContent();
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((a) => (a.title + " " + a.description).toLowerCase().includes(s)) : items;
  }, [q, items]);

  return (
    <div>
      <label className="flex items-center gap-3 border-b border-border pb-2">
        <span className="eyebrow text-muted-foreground">{t.journal.search}</span>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setShown(PAGE);
          }}
          placeholder={t.journal.searchPh}
          className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-muted-foreground/60"
        />
      </label>
      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">{t.journal.noMatch(q)}</p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {filtered.slice(0, shown).map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 90}>
              <ArticleCard a={a} />
            </Reveal>
          ))}
        </div>
      )}
      {filtered.length > shown && (
        <div className="mt-14 text-center">
          <button type="button" onClick={() => setShown((s) => s + PAGE)} className="border border-foreground px-8 py-3 transition-colors hover:bg-foreground hover:text-background">
            {t.journal.more}
          </button>
        </div>
      )}
    </div>
  );
}
