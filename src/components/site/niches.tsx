import { Eyebrow, Pic, Reveal } from "@/components/site/primitives";
import { nicheCopy, nicheIds, nichesOf, type NicheId } from "@/content/niches";
import { hrefFor, useContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Home section: one tile per niche, with a fan of project covers and a link into the filtered portfolio. */
export function NicheGrid() {
  const { locale, projects } = useContent();
  const c = nicheCopy[locale === "ro" ? "ro" : "en"];
  const base = hrefFor(locale, { kind: "portfolio" });
  return (
    <section className="container-editorial pt-24 pb-4 md:pt-36" aria-labelledby="niches-h">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 id="niches-h" className="display-lg mt-5 max-w-[16ch]">
            {c.h1}
            <em>{c.h2}</em>
          </h2>
        </div>
        <p className="lede max-w-md text-muted-foreground">{c.lede}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {nicheIds.map((id, i) => {
          const list = projects.filter((p) => nichesOf(p.slug).includes(id) && p.cover);
          return (
            <Reveal key={id} as="li" delay={i * 70} className={cn("lg:col-span-2", i >= 3 && "lg:col-span-3")}>
              <a
                href={`${base}?niche=${id}`}
                className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden border border-border bg-card p-6 transition-colors duration-500 hover:border-foreground hover:bg-foreground hover:text-background md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow opacity-60">{c.count(projectCount(projects, id))}</span>
                </div>
                <div className="pointer-events-none relative my-6 h-44 md:h-48" aria-hidden>
                  {list.slice(0, 3).map((p, j) => (
                    <div
                      key={p.slug}
                      className="absolute top-0 w-28 md:w-32 shadow-[0_18px_34px_-14px_rgb(12_3_44/0.45)] transition-transform duration-700 ease-out group-hover:translate-y-[-6px]"
                      style={{ left: `${j * 5.2}rem`, rotate: `${(j - 1) * 5}deg`, zIndex: j, transitionDelay: `${j * 60}ms` }}
                    >
                      <Pic k={p.cover!.key} alt="" className="aspect-[4/5]" sizes="14vw" />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="display-sm">{c.names[id]}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{c.blurbs[id]}</p>
                  <p className="mt-5 text-sm font-medium underline-offset-4 group-hover:underline">{c.browse} →</p>
                </div>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

function projectCount(projects: { slug: string }[], id: NicheId) {
  return projects.filter((p) => nichesOf(p.slug).includes(id)).length;
}
