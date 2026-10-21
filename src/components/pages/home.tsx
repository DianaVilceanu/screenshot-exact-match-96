import { ArticleCard, ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { L } from "@/components/site/llink";
import { Arrow, Eyebrow, Pic, Reveal, btn } from "@/components/site/primitives";
import type { Project } from "@/content/projects";
import { SITE_URL } from "@/content/site";
import { content, hrefFor, idOf, useContent, type Locale } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import camera from "@/assets/hero-camera.webp";
import laptop from "@/assets/hero-laptop.webp";
import palette from "@/assets/hero-palette.webp";

const CAMERA = { w: 900, h: 687 };
const LAPTOP = { w: 1000, h: 691 };
const PALETTE = { w: 520, h: 836 };

export function homeHead(locale: Locale) {
  const c = content(locale);
  return seo({
    title: c.t.home.seoTitle,
    description: c.t.home.seoDesc,
    path: hrefFor(locale, { kind: "home" }),
    locale,
    ref: { kind: "home" },
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Person", name: c.person.fullName, jobTitle: c.person.role, url: SITE_URL, knowsLanguage: ["ro", "en"] },
      { "@context": "https://schema.org", "@type": "WebSite", name: "Diana Marrie Designs", url: SITE_URL, inLanguage: locale },
    ],
  });
}

const SELECTED = ["inklabs", "divaz", "kdt-romania", "iq-fashion", "mos-ilie", "floraria-mariei"];

export function HomePage() {
  const c = useContent();
  const { t, locale } = c;
  const h = t.home;
  const selected = SELECTED.map((id) => c.projectById(id)).filter(Boolean) as Project[];
  const [ink, divaz, kdt, ...rest] = selected as [Project, Project, Project, ...Project[]];
  const link = (p: Project) => hrefFor(locale, { kind: "project", id: idOf(p) });
  return (
    <>
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="container-editorial">
          <div className="flex items-center justify-between">
            <Eyebrow n="Vol. 2026">{h.eyebrow}</Eyebrow>
            <p className="eyebrow hidden text-muted-foreground md:block">{h.location}</p>
          </div>
          <div className="mt-10 grid grid-cols-[1fr_0.95fr] items-center gap-3 md:mt-14 md:grid-cols-[1.3fr_1fr] md:gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <h1 className="display-hero relative z-10">
              {h.h1a}
              <em className="text-accent">{h.h1b}</em>
              {h.h1c}
            </h1>
            <HeroObjects className="-mr-3 w-[calc(100%+0.75rem)] md:mr-0 md:w-full" />
          </div>
          <div className="mt-12 grid gap-10 border-t border-border pt-8 md:mt-16 md:grid-cols-12">
            <p className="lede md:col-span-6 lg:col-span-5">{h.lede}</p>
            <div className="flex flex-wrap items-start gap-4 md:col-span-6 md:justify-end lg:col-span-7">
              <L to={hrefFor(locale, { kind: "portfolio" })} className={btn({ variant: "solid" })}>
                {h.explore} <Arrow />
              </L>
              <L to={hrefFor(locale, { kind: "contact" })} className={btn({ variant: "outline" })}>
                {h.work}
              </L>
            </div>
          </div>
        </div>
        <div className="container-editorial mt-16 flex items-center gap-4 pb-6 md:mt-24">
          <span className="relative block h-12 w-px overflow-hidden bg-border">
            <span className="scroll-cue absolute inset-0 bg-foreground" />
          </span>
          <span className="eyebrow text-muted-foreground">{h.scroll}</span>
        </div>
        <div className="overflow-hidden border-y border-border py-5" aria-label={h.brandsAria}>
          <div className="marquee flex w-max gap-12 whitespace-nowrap">
            {[0, 1].map((r) => (
              <div key={r} className="flex gap-12" aria-hidden={r === 1}>
                {["Inklabs", "Divaz", "IQ Fashion", "Moș Ilie", "Farmacia Farmex", "Kanoi", "Dr. Kurbe", "Global Medical Health", "Florăria Mariei", "Regata Print"].map((b) => (
                  <span key={b} className="font-display text-3xl italic md:text-4xl">
                    {b} <span className="text-accent not-italic">✶</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-24 md:py-36" aria-labelledby="work-h">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow n="02">{h.selected}</Eyebrow>
            <h2 id="work-h" className="display-lg mt-5 max-w-[14ch]">
              {h.selectedH1}
              <em>{h.selectedH2}</em>
            </h2>
          </div>
          <L to={hrefFor(locale, { kind: "portfolio" })} className={btn({ variant: "text" })}>
            {h.viewAll} <Arrow />
          </L>
        </div>
        <Reveal>
          <L to={link(ink)} className="group grid gap-6 md:grid-cols-12 md:items-end">
            <div className="frame-zoom grid grid-cols-3 gap-2 md:col-span-8">
              <Pic k="inklabs-features" alt={h.inkAlts[0]!} className="aspect-[4/5]" sizes="25vw" />
              <Pic k="inklabs-before" alt={h.inkAlts[1]!} className="aspect-[4/5]" sizes="25vw" />
              <Pic k="inklabs-stop-scroll" alt={h.inkAlts[2]!} className="aspect-[4/5]" sizes="25vw" />
            </div>
            <FeatureText p={ink} n="01" className="md:col-span-4" />
          </L>
        </Reveal>
        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <L to={link(divaz)} className="group block">
              <div className="frame-zoom grid grid-cols-3 gap-2">
                {(["divaz-home-galentine", "divaz-home-manicure", "divaz-home-lip-combo"] as const).map((k, i) => (
                  <Pic key={k} k={k} alt={h.divazAlts[i]!} className="aspect-[4/5]" sizes="(min-width: 768px) 20vw, 33vw" />
                ))}
              </div>
              <FeatureText p={divaz} n="02" className="mt-6" />
            </L>
          </Reveal>
          <Reveal className="md:col-span-5 md:pt-40" delay={120}>
            <ProjectTile p={kdt} aspect="aspect-[4/5]" />
            <p className="mt-3 text-sm text-muted-foreground">{h.kdtSoon}</p>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-10 sm:grid-cols-2 md:mt-28 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className={i === 1 ? "md:mt-16" : ""}>
              <ProjectTile p={p} />
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-theme="ink" className="bg-background py-24 text-foreground md:py-36" aria-labelledby="services-h">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow n="03">{h.services}</Eyebrow>
              <h2 id="services-h" className="display-lg mt-5">
                {h.servicesH1}
                <em className="text-accent">{h.servicesH2}</em>
              </h2>
            </div>
            <p className="lede text-muted-foreground md:col-span-6 md:col-start-7 md:self-end">{h.servicesLede}</p>
          </div>
          <ol className="mt-16 border-t border-border">
            {c.services
              .filter((s) => s.group === "core")
              .map((s) => (
                <li key={s.slug} className="border-b border-border">
                  <L to={hrefFor(locale, { kind: "service", id: idOf(s) })} className="group grid gap-4 py-10 md:grid-cols-12 md:items-center">
                    <span className="eyebrow text-accent md:col-span-1">{s.number}</span>
                    <span className="display-md transition-transform duration-700 group-hover:translate-x-3 md:col-span-6">{s.title}</span>
                    <span className="text-muted-foreground md:col-span-4">{s.short}</span>
                    <Arrow className="hidden text-2xl md:col-span-1 md:block md:justify-self-end" />
                  </L>
                </li>
              ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {c.services
              .filter((s) => s.group === "specialist")
              .map((s) => (
                <L key={s.slug} to={hrefFor(locale, { kind: "service", id: idOf(s) })} className="link-underline text-muted-foreground hover:text-foreground">
                  {s.title}
                </L>
              ))}
            <L to={hrefFor(locale, { kind: "services" })} className="link-underline text-accent">
              {h.allServices}
            </L>
          </div>
        </div>
      </section>

      <section className="container-editorial py-24 md:py-36" aria-labelledby="about-h">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="relative md:col-span-5">
            <Pic k="portrait-cutout" alt={h.portraitAlt} className="h-auto" sizes="(min-width: 768px) 40vw, 100vw" />
            <p className="font-display absolute -bottom-6 -left-2 text-6xl text-accent italic md:-left-8 md:text-8xl">Diana</p>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow n="04">{h.about}</Eyebrow>
            <h2 id="about-h" className="display-md mt-5">
              {h.aboutH}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {c.person.about.map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
              <div>
                <dt className="eyebrow text-muted-foreground">{h.languages}</dt>
                {c.person.languages.map((l) => (
                  <dd key={l} className="mt-1">
                    {l}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">{h.tools}</dt>
                {c.person.tools.map((x) => (
                  <dd key={x} className="mt-1">
                    {x}
                  </dd>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>

      {c.articles.length > 0 && (
        <section className="border-t border-border py-24 md:py-32" aria-labelledby="journal-h">
          <div className="container-editorial">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow n="05">{h.journal}</Eyebrow>
                <h2 id="journal-h" className="display-lg mt-5">
                  {h.journalH1}
                  <em>{h.journalH2}</em>
                </h2>
              </div>
              <L to={hrefFor(locale, { kind: "journal" })} className={btn({ variant: "text" })}>
                {h.readJournal} <Arrow />
              </L>
            </div>
            <div className="grid gap-12 md:grid-cols-12">
              <Reveal className="md:col-span-6">
                <ArticleCard a={c.articles[0]!} large />
              </Reveal>
              <div className="grid gap-12 md:col-span-5 md:col-start-8">
                {c.articles.slice(1, 3).map((a, i) => (
                  <Reveal key={a.slug} delay={i * 120}>
                    <ArticleCard a={a} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

/** Floating studio props for the hero: laptop, camera and colour-swatch card, plus a few quiet decorations. */
function HeroObjects({ className }: { className: string }) {
  const shadow = "drop-shadow-[0_12px_14px_rgb(23_12_46/0.22)] md:drop-shadow-[0_28px_32px_rgb(23_12_46/0.22)]";
  return (
    <div aria-hidden className={cn("pointer-events-none flex items-center select-none", className)}>
      <div className="relative aspect-square w-full">
        <div className="absolute top-[4%] left-[4%] aspect-square w-[92%] rounded-full border border-dashed border-coral/45" />
        <span className="absolute top-0 left-[44%] font-display text-base text-coral md:text-3xl">✶</span>
        <span className="absolute right-0 bottom-[12%] font-display text-xs text-coral md:text-xl">✶</span>
        <span className="absolute bottom-[2%] left-[6%] font-display text-sm text-ink/70 md:text-2xl">✶</span>
        <span className="absolute top-[42%] left-0 size-1.5 rounded-full bg-coral md:size-2.5" />
        <img
          src={laptop}
          alt=""
          width={LAPTOP.w}
          height={LAPTOP.h}
          fetchPriority="high"
          className={cn("float-slow absolute top-[34%] left-[4%] w-[92%] rotate-[-4deg]", shadow)}
        />
        <img
          src={palette}
          alt=""
          width={PALETTE.w}
          height={PALETTE.h}
          className={cn("float-slow absolute top-[8%] left-[6%] w-[26%] rotate-[-8deg] [animation-delay:-2.5s]", shadow)}
        />
        <img
          src={camera}
          alt=""
          width={CAMERA.w}
          height={CAMERA.h}
          className={cn("float-slow absolute top-[5%] right-[1%] w-[56%] rotate-[6deg] [animation-delay:-5s]", shadow)}
        />
      </div>
    </div>
  );
}

function FeatureText({ p, n, className }: { p: Project; n: string; className?: string }) {
  const { t } = useContent();
  return (
    <div className={className}>
      <p className="eyebrow text-muted-foreground">
        <span className="text-accent">{n}</span> · {p.client} · {p.categories.map((c) => t.categories[c] ?? c).join(" / ")}
      </p>
      <h3 className="display-md mt-3 transition-colors group-hover:text-accent">{p.name}</h3>
      <p className="mt-3 max-w-md text-muted-foreground">{p.summary}</p>
      <span className={btn({ variant: "text", className: "mt-5" })}>
        {t.home.viewCase} <Arrow />
      </span>
    </div>
  );
}
