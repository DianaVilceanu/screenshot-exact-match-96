import { ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { L } from "@/components/site/llink";
import { Arrow, Breadcrumbs, Eyebrow, MaybePlaceholder, Pic, Placeholder, Reveal, btn, isPlaceholder } from "@/components/site/primitives";
import type { BrandGuidelines, GalleryItem, Project, ReelItem } from "@/content/projects";
import { reels } from "@/content/reels";
import { content, hrefFor, idOf, useContent, type Locale } from "@/lib/i18n";
import { breadcrumbLd, notFoundHead, seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function projectHead(locale: Locale, slug: string | undefined) {
  const c = content(locale);
  const p = slug ? c.project(slug) : undefined;
  if (!p) return notFoundHead(c.t.project.notFound);
  const ref = { kind: "project", id: idOf(p) } as const;
  const path = hrefFor(locale, ref);
  return seo({
    title: `${p.name} | ${p.caseStudy ? c.t.project.caseStudy : (c.t.categories[p.categories[0]!] ?? p.categories[0])}`,
    description: p.draft ? c.t.project.draftDesc(p.name) : `${p.summary} ${p.description[0]}`.slice(0, 158),
    path,
    locale,
    ref,
    noindex: !!p.draft,
    jsonLd: [
      breadcrumbLd([
        { name: c.t.nav.home, path: hrefFor(locale, { kind: "home" }) },
        { name: c.t.nav.portfolio, path: hrefFor(locale, { kind: "portfolio" }) },
        { name: p.name, path },
      ]),
    ],
  });
}

export function ProjectNotFound() {
  const { t, locale } = useContent();
  return (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">{t.project.notFound}</h1>
      <L to={hrefFor(locale, { kind: "portfolio" })} className={btn({ variant: "text", className: "mt-8" })}>
        {t.project.back} <Arrow />
      </L>
    </div>
  );
}

export function ProjectPage({ slug }: { slug: string }) {
  const c = useContent();
  const p = c.project(slug)!;
  const pub = c.publicProjects;
  const next = pub[(pub.indexOf(p) + 1) % pub.length] ?? pub[0]!;
  return p.caseStudy ? <CaseStudy p={p} next={next} /> : <StandardProject p={p} next={next} />;
}

function Meta({ p }: { p: Project }) {
  const { t } = useContent();
  const rows: [string, string][] = [
    [t.project.client, p.client],
    [t.project.industry, p.industry],
    [t.project.services, p.services.join(", ")],
    [t.project.deliverables, p.deliverables.join(", ")],
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
  const { locale, serviceById } = useContent();
  return (
    <div className="flex flex-wrap gap-2">
      {p.serviceSlugs.map((id) => {
        const sv = serviceById(id);
        return sv ? (
          <L key={id} to={hrefFor(locale, { kind: "service", id })} className="border border-border px-3 py-1.5 text-sm transition-colors hover:border-foreground">
            {sv.title}
          </L>
        ) : null;
      })}
    </div>
  );
}

function Crumbs({ p }: { p: Project }) {
  const { t, locale } = useContent();
  return <Breadcrumbs items={[{ name: t.nav.home, to: hrefFor(locale, { kind: "home" }) }, { name: t.nav.portfolio, to: hrefFor(locale, { kind: "portfolio" }) }, { name: p.name }]} />;
}

const cats = (p: Project, t: ReturnType<typeof useContent>["t"]) => p.categories.map((c) => t.categories[c] ?? c).join(" / ");

function NextProject({ next, n = "08" }: { next: Project; n?: string }) {
  const { t, locale } = useContent();
  return (
    <section className="border-t border-border">
      <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:items-center md:py-28">
        <div className="md:col-span-6">
          <Eyebrow n={n}>{t.project.next}</Eyebrow>
          <L to={hrefFor(locale, { kind: "project", id: idOf(next) })} className="group mt-5 block">
            <span className="display-lg block transition-colors group-hover:text-accent">{next.name}</span>
            <span className="mt-3 block text-muted-foreground">{next.summary}</span>
          </L>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <ProjectTile p={next} aspect="aspect-[5/4]" />
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ p, next }: { p: Project; next: Project }) {
  const { t, locale } = useContent();
  const cs = p.caseStudy!;
  const g = p.gallery;
  // Sections after the optional guidelines section shift down by one.
  const num = (i: number) => String(i + (cs.guidelines ? 1 : 0)).padStart(2, "0");
  return (
    <div data-theme={cs.theme} className="bg-background text-foreground">
      <section className="container-editorial pt-28 pb-16 md:pt-36">
        <Crumbs p={p} />
        {cs.theme === "inklabs" && (
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow n="01">
                {t.project.caseStudy} · {cats(p, t)}
              </Eyebrow>
              <h1 className="mt-6 text-[clamp(3.5rem,11vw,10rem)] break-words leading-[0.82] font-bold tracking-[-0.06em] uppercase">{p.name.toLowerCase()}</h1>
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
              {t.project.caseStudy} · {cats(p, t)}
            </Eyebrow>
            <h1 className="display-xl mt-6 tracking-[0.12em] uppercase">{p.name}</h1>
            <p className="display-sm mt-4 italic">{cs.tagline}</p>
            <div className="mt-12 grid grid-cols-3 items-end gap-3 md:gap-6">
              <Pic k="divaz-galentine" alt={t.project.divazAlts[0]!} className="aspect-[4/5] rounded-t-full" eager sizes="33vw" />
              <Pic k={p.cover!.key} alt={p.cover!.alt} className="aspect-[4/5]" eager sizes="33vw" />
              <Pic k="divaz-sale" alt={t.project.divazAlts[1]!} className="aspect-[4/5] rounded-t-full" eager sizes="33vw" />
            </div>
          </div>
        )}
        {cs.theme === "kdt" && (
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <Eyebrow n="01">
                {t.project.caseStudy} · {cats(p, t)}
              </Eyebrow>
              <h1 className="mt-6 text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.04em]">{p.name}</h1>
              <p className="mt-6 inline-block bg-primary px-4 py-2 text-[clamp(1.25rem,2.4vw,2rem)] font-semibold text-primary-foreground">{cs.tagline}</p>
            </div>
            <div className="md:col-span-5">
              <div className="relative">
                <div aria-hidden className="absolute -right-3 -bottom-3 h-full w-full bg-primary md:-right-5 md:-bottom-5" />
                <Pic k={p.cover!.key} alt={p.cover!.alt} className="relative aspect-[4/5]" eager sizes="(min-width: 768px) 40vw, 100vw" />
              </div>
            </div>
          </div>
        )}
        <div className="mt-14 space-y-4">
          {p.description.slice(0, 1).map((x) => (
            <MaybePlaceholder key={x} text={x} className="lede max-w-3xl" />
          ))}
        </div>
        <div className="mt-12">
          <Meta p={p} />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Eyebrow n="02">{t.project.brief}</Eyebrow>
          </div>
          <div className="space-y-5 md:col-span-7 md:col-start-6">
            {cs.brief.map((x) => (
              <MaybePlaceholder key={x} text={x} className="display-sm" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Eyebrow n="03">{t.project.direction}</Eyebrow>
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
              {cs.palette.map((x) => (
                <div key={x.name}>
                  <div className={cn("aspect-[3/2]", x.className)} />
                  <p className="eyebrow mt-3 text-muted-foreground">{x.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {cs.guidelines && <Guidelines g={cs.guidelines} n="04" />}

      <section className="border-t border-border">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Eyebrow n={num(4)}>{t.project.process}</Eyebrow>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {cs.process.length ? (
              <div className={cn("grid gap-3", cs.process.length > 1 && "grid-cols-2")}>
                {cs.process.map((x) => (
                  <Pic key={x.key} k={x.key} alt={x.alt} className={cs.process.length > 1 ? "aspect-square" : "h-auto"} />
                ))}
              </div>
            ) : (
              <Placeholder>{t.project.processMissing}</Placeholder>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Eyebrow n={num(5)}>{t.project.finals}</Eyebrow>
          {p.mixReels && p.reels ? (
            <div className="mt-12 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4">
              {mixed(g, p.reels).map((x, i) =>
                "title" in x ? (
                  <Reveal key={x.key} delay={(i % 4) * 70} className="row-span-2">
                    <Reel item={x} fill />
                  </Reveal>
                ) : (
                  <Reveal key={x.key} delay={(i % 4) * 70}>
                    <div className="frame-zoom">
                      <Pic k={x.key} alt={x.alt} className="aspect-[4/5]" sizes="(min-width: 768px) 25vw, 50vw" />
                    </div>
                  </Reveal>
                ),
              )}
            </div>
          ) : g.length > 0 ? (
            <>
              {(p.reels || p.carousels) && <h3 className="eyebrow mt-12 text-muted-foreground">{t.project.statics}</h3>}
              <div className={cn("columns-2 gap-3 md:columns-4 [&>*]:mb-3", p.reels || p.carousels ? "mt-6" : "mt-12")}>
                {g.map((x, i) => (
                  <Reveal key={x.key} delay={(i % 4) * 70} className="break-inside-avoid">
                    <div className="frame-zoom">
                      <Pic k={x.key} alt={x.alt} className="h-auto" sizes="25vw" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <Placeholder className="mt-10">{t.project.finalsMissing}</Placeholder>
          )}
          {p.carousels && (
            <>
              <h3 className="eyebrow mt-16 text-muted-foreground">{t.project.carousels}</h3>
              <div className="mt-6 space-y-10">
                {p.carousels.map((c) => (
                  <Reveal key={c.title}>
                    <p className="text-lg font-semibold">{c.title}</p>
                    <ol className="mt-4 grid grid-flow-col auto-cols-[72%] gap-3 overflow-x-auto pb-2 sm:auto-cols-[40%] md:auto-cols-[calc((100%-1.5rem)/3)] md:overflow-visible">
                      {c.slides.map((x, i) => (
                        <li key={x.key} className="relative">
                          <Pic k={x.key} alt={x.alt} className="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 70vw" />
                          <span className="eyebrow absolute top-3 right-3 bg-background/90 px-2 py-1 text-foreground">
                            {i + 1}/{c.slides.length}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                ))}
              </div>
            </>
          )}
          {p.reels && !p.mixReels && (
            <>
              <h3 className="eyebrow mt-16 text-muted-foreground">{t.project.reels}</h3>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                {p.reels.map((r, i) => (
                  <Reveal key={r.key} delay={i * 80}>
                    <Reel item={r} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
          {p.description.length > 1 && (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {p.description.slice(1).map((x) => (
                <p key={x} className="text-lg leading-relaxed text-muted-foreground">
                  {x}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <Eyebrow n={num(6)}>{t.project.results}</Eyebrow>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {cs.results.map((r) =>
              isPlaceholder(r) ? (
                <Placeholder key={r}>{r}</Placeholder>
              ) : (
                <p key={r} className="border-t-2 border-primary pt-5 text-lg leading-relaxed sm:last:col-span-2">
                  {r}
                </p>
              ),
            )}
            {cs.results.some(isPlaceholder) && <Placeholder className="sm:col-span-2">{t.project.resultsMissing}</Placeholder>}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-editorial py-20 md:py-28">
          <Eyebrow n={num(7)}>{t.project.testimonial}</Eyebrow>
          {isPlaceholder(cs.testimonial.quote) ? (
            <figure className="placeholder-block mt-10 p-8 md:p-14">
              <p className="eyebrow mb-6 text-placeholder">{t.placeholder}</p>
              <blockquote className="display-md">“{cs.testimonial.quote}”</blockquote>
              <figcaption className="mt-6 text-muted-foreground">{cs.testimonial.author}</figcaption>
            </figure>
          ) : (
            <figure className="mt-10 max-w-5xl border-l-2 border-primary pl-8 md:pl-14">
              <blockquote className="display-md">“{cs.testimonial.quote}”</blockquote>
              <figcaption className="eyebrow mt-8 text-muted-foreground">{cs.testimonial.author}</figcaption>
            </figure>
          )}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <RelatedServices p={p} />
            <L to={hrefFor(locale, { kind: "contact" })} className={btn({ variant: "solid" })}>
              {t.project.discuss} <Arrow />
            </L>
          </div>
        </div>
      </section>
      <NextProject next={next} n={num(8)} />
    </div>
  );
}

/** The brand guidelines delivered with a case study: overview, slogan, logo, colours, type, photography and voice. */
function Guidelines({ g, n }: { g: BrandGuidelines; n: string }) {
  const { t } = useContent();
  const label = "eyebrow text-muted-foreground";
  return (
    <section className="border-t border-border">
      <div className="container-editorial py-20 md:py-28">
        <Eyebrow n={n}>{t.project.guidelines}</Eyebrow>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className={label}>{t.project.slogan}</p>
            <p className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-bold tracking-[-0.04em] text-primary">{g.slogan}</p>
          </div>
          <div className="md:col-span-5">
            <p className={label}>{t.project.overview}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{g.overview}</p>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className={label}>{t.project.logo}</p>
            <div className="mt-4 overflow-hidden border border-border">
              <Pic k={g.logo.key} alt={g.logo.alt} className="h-auto" sizes="(min-width: 768px) 55vw, 100vw" />
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-5">
            <p className={label}>{t.project.colors}</p>
            <ul className="mt-4 grid gap-3">
              {g.colors.map((c) => (
                <li key={c.hex} className="flex items-end justify-between border border-border p-5" style={{ backgroundColor: c.hex, color: contrastText(c.hex) }}>
                  <span className="text-xl font-semibold">{c.name}</span>
                  <span className="font-mono text-sm tracking-wider uppercase">{c.hex}</span>
                </li>
              ))}
            </ul>
            <p className={cn(label, "mt-10")}>{t.project.typography}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {(
                [
                  [t.project.primaryFont, g.fonts.primary],
                  [t.project.secondaryFont, g.fonts.secondary],
                ] as const
              ).map(([role, names]) => (
                <div key={role} className="border border-border p-5">
                  <dt className={label}>{role}</dt>
                  {names.map((x) => (
                    <dd key={x} className="mt-2 text-lg font-bold text-primary">
                      {x}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-20">
          <p className={label}>{t.project.photography}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {g.photography.map((x, i) => (
              <Reveal key={x.key} delay={i * 80} className="frame-zoom">
                <Pic k={x.key} alt={x.alt} className="aspect-[4/7]" sizes="(min-width: 768px) 25vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className={label}>{t.project.voice}</p>
            <p className="display-sm mt-4">{g.voice}</p>
          </div>
          <ol className="grid gap-8 md:col-span-6 md:col-start-7">
            {g.pillars.map((x, i) => (
              <li key={x.title} className="border-t border-border pt-6">
                <h3 className="text-xl font-semibold">
                  <span className="mr-3 text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {x.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{x.text}</p>
                <ul aria-label={t.project.keywords} className="mt-4 flex flex-wrap gap-2">
                  {x.keywords.map((k) => (
                    <li key={k} className="border border-primary/50 px-3 py-1 text-sm text-primary">
                      {k}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Statics with a reel after every third post, so the two formats alternate in one grid. */
function mixed(statics: GalleryItem[], reels: ReelItem[]): (GalleryItem | ReelItem)[] {
  const out: (GalleryItem | ReelItem)[] = [];
  let r = 0;
  statics.forEach((s, i) => {
    out.push(s);
    if (i % 3 === 1 && r < reels.length) out.push(reels[r++]!);
  });
  return out.concat(reels.slice(r));
}

/** A muted, looping 9:16 reel that plays while on screen; tap the button for sound. `fill` stretches it to its grid cell and moves the title onto the video. */
function Reel({ item, fill }: { item: ReelItem; fill?: boolean }) {
  const { t } = useContent();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const src = reels[item.key];
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e!.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.5 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <figure className={cn(fill && "h-full")}>
      <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-card", fill ? "h-full" : "aspect-[9/16]")}>
        <video ref={ref} src={src.video} poster={src.poster} muted={muted} loop playsInline preload="none" aria-label={item.title} className="h-full w-full object-cover" />
        {fill && (
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pr-16 text-sm font-medium text-white">{item.title}</figcaption>
        )}
        <span className="eyebrow absolute top-3 left-3 bg-primary px-2 py-1 text-primary-foreground">{t.project.reels}</span>
        <button
          type="button"
          onClick={() => {
            const v = ref.current;
            setMuted((m) => !m);
            if (v?.paused) v.play().catch(() => {});
          }}
          aria-label={muted ? t.project.soundOn : t.project.soundOff}
          className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4z" />
            {muted ? <path d="m22 9-6 6m0-6 6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
          </svg>
        </button>
      </div>
      {!fill && <figcaption className="mt-3 text-sm text-muted-foreground">{item.title}</figcaption>}
    </figure>
  );
}

/** Black or white text, whichever reads better on the given hex colour. */
function contrastText(hex: string) {
  const v = parseInt(hex.slice(1), 16);
  const lum = 0.299 * (v >> 16) + 0.587 * ((v >> 8) & 255) + 0.114 * (v & 255);
  return lum > 150 ? "#000000" : "#FFFFFF";
}

function StandardProject({ p, next }: { p: Project; next: Project }) {
  const { t, locale } = useContent();
  return (
    <>
      <section className="container-editorial pt-28 pb-16 md:pt-36">
        <Crumbs p={p} />
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>{cats(p, t)}</Eyebrow>
            <h1 className="display-xl mt-6">{p.name}</h1>
            <p className="display-sm mt-6 italic text-muted-foreground">{p.summary}</p>
            <div className="mt-10 space-y-5 text-lg leading-relaxed">
              {p.description.map((x) => (
                <p key={x}>{x}</p>
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
      {p.moodboard && (
        <section className="container-editorial pb-16 md:pb-24">
          <Eyebrow>{t.project.identity}</Eyebrow>
          <Reveal className="mt-8">
            <Pic k={p.moodboard.key} alt={p.moodboard.alt} className="h-auto" sizes="100vw" />
          </Reveal>
        </section>
      )}
      {p.gallery.length > 0 && (
        <section className="bg-secondary py-16 md:py-24">
          {(p.reels || p.newsletter) && (
            <div className="container-editorial mb-8">
              <Eyebrow>{t.project.statics}</Eyebrow>
            </div>
          )}
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
      {p.reels && (
        <section className="container-editorial py-16 md:py-24">
          <Eyebrow>{t.project.reels}</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {p.reels.map((r, i) => (
              <Reveal key={r.key} delay={i * 80}>
                <Reel item={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
      {p.newsletter && (
        <section className="bg-secondary py-16 md:py-24">
          <div className="container-editorial grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:sticky md:top-28 md:col-span-4">
              <Eyebrow>{t.project.newsletter}</Eyebrow>
            </div>
            <Reveal className="mx-auto w-full max-w-[600px] md:col-span-7 md:col-start-6">
              <div className="overflow-hidden rounded-xl border border-border shadow-2xl">
                <Pic k={p.newsletter.key} alt={p.newsletter.alt} className="h-auto" sizes="(min-width: 768px) 600px, 100vw" />
              </div>
            </Reveal>
          </div>
        </section>
      )}
      <section className="container-editorial flex flex-wrap items-center justify-between gap-6 py-14">
        <div>
          <p className="eyebrow mb-3 text-muted-foreground">{t.project.related}</p>
          <RelatedServices p={p} />
        </div>
        <L to={hrefFor(locale, { kind: "contact" })} className={btn({ variant: "solid" })}>
          {t.project.similar} <Arrow />
        </L>
      </section>
      <NextProject next={next} />
      <CtaBand />
    </>
  );
}
