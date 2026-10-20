import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { type Article, categories } from "@/content/journal";
import { cn } from "@/lib/utils";
import { ArticleCard } from "./cards";
import { Reveal } from "./primitives";

const PAGE = 6;

export function CategoryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Journal categories" className="flex gap-2 overflow-x-auto">
      <Link to="/journal" className={cn("shrink-0 border px-4 py-2 text-sm", !active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          to="/journal/category/$category"
          params={{ category: c.slug }}
          className={cn("shrink-0 border px-4 py-2 text-sm", active === c.slug ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}

export function ArticleGrid({ items }: { items: Article[] }) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? items.filter((a) => (a.title + " " + a.description).toLowerCase().includes(t)) : items;
  }, [q, items]);

  return (
    <div>
      <label className="flex items-center gap-3 border-b border-border pb-2">
        <span className="eyebrow text-muted-foreground">Search</span>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setShown(PAGE);
          }}
          placeholder="Typography, Instagram, premium…"
          className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-muted-foreground/60"
        />
      </label>
      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No articles match “{q}”.</p>
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
            Load more articles
          </button>
        </div>
      )}
    </div>
  );
}
