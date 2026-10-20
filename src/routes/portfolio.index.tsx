import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import { allCategories, projects, type Category } from "@/content/projects";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/portfolio/")({
  head: () =>
    seo({
      title: "Portfolio — Branding, Social Media & UX/UI Projects",
      description:
        "Selected projects by Diana Vîlceanu: branding and social media for Inklabs and Divaz, campaigns, print packaging and UX/UI design.",
      path: "/portfolio",
    }),
  component: Portfolio,
});

// Varied proportions give the grid an editorial rhythm.
const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[5/4]", "aspect-[3/4]"];

function Portfolio() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const list = projects.filter((p) => filter === "All" || p.categories.includes(filter));
  const used = allCategories.filter((c) => projects.some((p) => p.categories.includes(c)));

  return (
    <>
      <section className="container-editorial pt-32 pb-12 md:pt-44">
        <Eyebrow n={String(projects.length).padStart(2, "0")}>Portfolio · Projects</Eyebrow>
        <h1 className="display-xl mt-6">
          The <em className="text-accent">work.</em>
        </h1>
        <p className="lede mt-8 max-w-2xl text-muted-foreground">
          Branding, social media, campaigns, print and interfaces — for beauty, fashion, food, health and service brands.
        </p>
      </section>

      <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-md md:top-20">
        <div className="container-editorial flex gap-2 overflow-x-auto py-3" role="group" aria-label="Filter projects by category">
          {(["All", ...used] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 border px-4 py-2 text-sm transition-colors",
                filter === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="container-editorial py-16 md:py-24" aria-live="polite">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90} className={cn(i % 3 === 1 && "lg:mt-20")}>
              <ProjectTile p={p} index={i} aspect={aspects[i % aspects.length]} />
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
