import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { Arrow, Breadcrumbs, Eyebrow, MaybePlaceholder, Pic, Placeholder, Reveal, btn, isPlaceholder } from "@/components/site/primitives";
import { getProject, projects, type Project } from "@/content/projects";
import { getService } from "@/content/services";
import { breadcrumbLd, seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProject(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Project not found — Diana Marrie Designs" }, { name: "robots", content: "noindex" }] };
    const path = `/portfolio/${p.slug}`;
    return seo({
      title: `${p.name} — ${p.caseStudy ? "Case Study" : p.categories[0]}`,
      description: p.draft ? `${p.name} case study by Diana Vîlceanu — in preparation.` : `${p.summary} ${p.description[0]}`.slice(0, 158),
      path,
      noindex: p.draft,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: p.name, path },
        ]),
      ],
    });
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">Project not found.</h1>
      <Link to="/portfolio" className={btn({ variant: "text", className: "mt-8" })}>
        Back to portfolio <Arrow />
      </Link>
    </div>
  ),
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const pub = projects.filter((x) => !x.draft);
  const next = pub[(pub.indexOf(p) + 1) % pub.length];
  return p.caseStudy ? <CaseStudy p={p} next={next} /> : <StandardProject p={p} next={next} />;
}

function Meta({ p }: { p: Project }) {
  const rows: [string, string][] = [
    ["Client", p.client],
    ["Industry", p.industry],
    ["Services", p.services.join(", ")],
    ["Deliverables", p.deliverables.join(", ")],
  ];
  return (
    <dl className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="eyebrow text-muted-foreground">{k}</dt>
          <dd className={cn("mt-2 text-sm leading-relaxed", isPlaceholder(v) && "placeholder-block p-2")}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function RelatedServices({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.serviceSlugs.map((s) => {
        const sv = getService(s);
        return sv ? (
          <Link key={s} to="/services/$slug" params={{ slug: s }} className="border border-border px-3 py-1.5 text-sm transition-colors hover:border-foreground">
            {sv.title}
          </Link>
        ) : null;
      })}
    </div>
  );
}

function Crumbs({ p }: { p: Project }) {
  return <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Portfolio", to: "/portfolio" }, { name: p.name }]} />;
}

function NextProject({ next }: { next: Project }) {
  return (
    <section className="border-t border-border">
      <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:items-center md:py-28">
        <div className="md:col-span-6">
          <Eyebrow n="08">Next project</Eyebrow>
          <Link to="/portfolio/$slug" params={{ slug: next.slug }} className="group mt-5 block">
            <span className="display-lg block transition-colors group-hover:text-accent">{next.name}</span>
            <span className="mt-3 block text-muted-foreground">{next.summary}</span>
          </Link>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <ProjectTile p={next} aspect="aspect-[5/4]" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured case study ---------------- */

function CaseStudy({ p, next }: { p: Project; next: Project }) {
  const cs = p.caseStudy!;
  const g = p.gallery;
  return (
    <div data-theme={cs.theme} className="bg-background text-foreground">
      {/* 01 Hero — layout differs per brand */}
      <section className="container-editorial pt-28 pb-16 md:pt-36">
        <Crumbs p={p} />
        {cs.theme === "inklabs" && (
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow n="01">Case study · {p.categories.join(" / ")}</Eyebrow>
              <h1 className="mt-6 text-[clamp(4.5rem,16vw,14rem)] leading-[0.82] font-bold tracking-[-0.06em] uppercase">
                {p.name.toLowerCase()}
              </h1>
              <p className="display-md mt-6 text-primary italic">{cs.tagline}</p>
            </div>
            <div className="md:col-span-5">
              <div className="aspect-[4/5] -rotate-2 overflow-hidden border-4 border-primary">
                <Pic k={p.cover!.key} alt={p.cover!.alt} eager />
              </div>
            </div>
          </div>
        )}
        {cs.theme === "divaz" && (
          <div className="mt-10 text-center">
            <Eyebrow n="01" className="justify-center">
              Case study · {p.categories.join(" / ")}
            </Eyebrow>
            <h1 className="display-xl mt-6 tracking-[0.12em] uppercase">{p.name}</h1>
            <p className="display-sm mt-4 italic">{cs.tagline}</p>
            <div className="mt-12 grid grid-cols-3 items-end gap-3 md:gap-6">
              <Pic k="divaz-galentine" alt="Divaz Galentine's Day post" className="aspect-[4/5] rounded-t-full" eager sizes="33vw" />
              <Pic k={p.cover!.key} alt={p.cover!.alt} className="aspect-[4/5]" eager sizes="33vw" />
              <Pic k="divaz-sale" alt="Divaz 50% off makeup post" className="aspect-[4/5] rounded-t-full" eager sizes="33vw" />
            </div>
          </div>
        )}
        {cs.theme === "kdt" && (
          <div className="mt-10">
            <Eyebrow n="01">Case study · in preparation</Eyebrow>
            <h1 className="display-xl mt-6">{p.name}</h1>
            <Placeholder className="mt-10 max-w-2xl">
              KDT Romania doesn't appear on the current website, so no description or images have been added. Supply the project materials and this
              page will be completed in the same structure as the other case studies.
            </Placeholder>
          </div>
        )}
        <div className="mt-14 space-y-4">
          {p.description.slice(0, 1).map((t) => (
            <MaybePlaceholder key={t} text={t} className="lede max-w-3xl" />
          ))}
        </div>
        <div className="mt-12">
          <Meta p={p} />
        </div>
      </section>

      {/* 02 Brief */}
      <section className="border-t border-border">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Eyebrow n="02">The brief</Eyebrow>
          </div>
          <div className="space-y-5 md:col-span-7 md:col-start-6">
            {cs.brief.map((t) => (
              <MaybePlaceholder key={t} text={t} className="display-sm" />
            ))}
          </div>
        </div>
      </section>

      {/* 03 Creative direction */}
      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Eyebrow n="03">The creative direction</Eyebrow>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {cs.direction.map((d, i) => (
              <Reveal key={d.title} delay={i * 100}>
                <p className="display-md text-primary">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={cn("mt-4 text-xl font-semibold", isPlaceholder(d.title) && "placeholder-block p-2")}>{d.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d.text}</p>
              </Reveal>
            ))}
          </div>
          {cs.palette && (
            <div className="mt-16 grid grid-cols-3 gap-3">
              {cs.palette.map((c) => (
                <div key={c.name}>
                  <div className={cn("aspect-[3/2]", c.className)} />
                  <p className="eyebrow mt-3 text-muted-foreground">{c.name}</p>
                </div>
              ))}
            </div>
          )}
          {g.length > 0 && (
            <div className="mt-16 grid gap-3 md:grid-cols-12">
              <Reveal className="md:col-span-7">
                <Pic k={g[0].key} alt={g[0].alt} className="aspect-[4/5]" />
              </Reveal>
              <div className="grid gap-3 md:col-span-5">
                {g.slice(1, 3).map((x) => (
                  <Reveal key={x.key}>
                    <Pic k={x.key} alt={x.alt} className="aspect-[4/5]" sizes="40vw" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 04 Process */}
      <section className="border-t border-border">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Eyebrow n="04">The design process</Eyebrow>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {cs.process.length ? (
              <div className="grid grid-cols-2 gap-3">
                {cs.process.map((x) => (
                  <Pic key={x.key} k={x.key} alt={x.alt} className="aspect-square" />
                ))}
              </div>
            ) : (
              <Placeholder>
                [ADD PROCESS MATERIALS] — moodboards, references, typography and colour explorations, design development. Only authentic process images
                will be shown here.
              </Placeholder>
            )}
          </div>
        </div>
      </section>

      {/* 05 Deliverables */}
      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Eyebrow n="05">Final deliverables</Eyebrow>
          {g.length > 3 ? (
            <div className="mt-12 columns-2 gap-3 md:columns-4 [&>*]:mb-3">
              {g.slice(3).map((x, i) => (
                <Reveal key={x.key} delay={(i % 4) * 70} className="break-inside-avoid">
                  <div className="frame-zoom">
                    <Pic k={x.key} alt={x.alt} className="h-auto" sizes="25vw" />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Placeholder className="mt-10">[ADD FINAL DELIVERABLES — project images]</Placeholder>
          )}
          {p.description.length > 1 && (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {p.description.slice(1).map((t) => (
                <p key={t} className="text-lg leading-relaxed text-muted-foreground">
                  {t}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 06 Results */}
      <section className="border-t border-border">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Eyebrow n="06">Results & impact</Eyebrow>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {cs.results.map((r) => (
              <Placeholder key={r}>{r}</Placeholder>
            ))}
            <Placeholder className="sm:col-span-2">[ADD QUALITATIVE OUTCOMES — what changed for the brand, in the client's words or verified observations]</Placeholder>
          </div>
        </div>
      </section>

      {/* 07 Testimonial */}
      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Eyebrow n="07">Client testimonial</Eyebrow>
          <figure className="placeholder-block mt-10 p-8 md:p-14">
            <p className="eyebrow mb-6 text-placeholder">Placeholder — to be replaced</p>
            <blockquote className="display-md">“{cs.testimonial.quote}”</blockquote>
            <figcaption className="mt-6 text-muted-foreground">— {cs.testimonial.author}</figcaption>
          </figure>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <RelatedServices p={p} />
            <Link to="/contact" className={btn({ variant: "solid" })}>
              Discuss a new project <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <NextProject next={next} />
    </div>
  );
}

/* ---------------- Standard project ---------------- */

function StandardProject({ p, next }: { p: Project; next: Project }) {
  return (
    <>
      <section className="container-editorial pt-28 pb-16 md:pt-36">
        <Crumbs p={p} />
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>{p.categories.join(" / ")}</Eyebrow>
            <h1 className="display-xl mt-6">{p.name}</h1>
            <p className="display-sm mt-6 italic text-muted-foreground">{p.summary}</p>
            <div className="mt-10 space-y-5 text-lg leading-relaxed">
              {p.description.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          {p.cover && (
            <div className="md:col-span-5 md:col-start-8">
              <div className="md:sticky md:top-28">
                <Pic k={p.cover.key} alt={p.cover.alt} eager className="h-auto" />
              </div>
            </div>
          )}
        </div>
        <div className="mt-16">
          <Meta p={p} />
        </div>
      </section>

      {p.gallery.length > 0 && (
        <section className="bg-secondary py-16 md:py-24">
          <div className="container-editorial columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {p.gallery.map((x, i) => (
              <Reveal key={x.key} delay={(i % 3) * 80} className="break-inside-avoid">
                <div className="frame-zoom">
                  <Pic k={x.key} alt={x.alt} className="h-auto" sizes="33vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-editorial flex flex-wrap items-center justify-between gap-6 py-14">
        <div>
          <p className="eyebrow mb-3 text-muted-foreground">Related services</p>
          <RelatedServices p={p} />
        </div>
        <Link to="/contact" className={btn({ variant: "solid" })}>
          Start a similar project <Arrow />
        </Link>
      </section>
      <NextProject next={next} />
      <CtaBand />
    </>
  );
}
