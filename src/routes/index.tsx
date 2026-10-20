import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard, ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { Arrow, Eyebrow, Pic, Reveal, btn } from "@/components/site/primitives";
import { articles } from "@/content/journal";
import { getProject, type Project } from "@/content/projects";
import { services } from "@/content/services";
import { person, SITE_URL } from "@/content/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Diana Marrie Designs — Graphic Designer & Art Director",
      description:
        "Diana Vîlceanu is a graphic designer and art director creating distinctive visual identities, social media design and content for brands like Inklabs and Divaz.",
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.fullName,
          jobTitle: person.role,
          url: SITE_URL,
          knowsLanguage: ["ro", "en"],
        },
      ],
    }),
  component: Home,
});

const selected = ["inklabs", "divaz", "kdt-romania", "iq-fashion", "mos-ilie", "floraria-mariei"].map((s) => getProject(s)!) as Project[];

function Home() {
  const [ink, divaz, kdt, ...rest] = selected as [Project, Project, Project, ...Project[]];
  return (
    <>
      {/* 01 — Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="container-editorial">
          <div className="flex items-center justify-between">
            <Eyebrow n="Vol. 2026">Graphic Designer · Art Director · Social Media</Eyebrow>
            <p className="eyebrow hidden text-muted-foreground md:block">Romania — working worldwide</p>
          </div>

          <div className="relative mt-10 md:mt-14">
            <h1 className="display-xl relative z-10 max-w-[12ch]">
              Design that makes brands <em className="text-accent">impossible</em> to ignore.
            </h1>

            {/* Collage of real work */}
            <div aria-hidden className="pointer-events-none absolute top-0 right-0 hidden h-full w-[42%] lg:block">
              <div className="float-slow absolute top-[2%] right-[30%] w-[46%] rotate-[-4deg] shadow-2xl">
                <Pic k="inklabs-main" alt="" eager sizes="20vw" />
              </div>
              <div className="absolute top-[18%] right-0 w-[44%] rotate-[3deg] shadow-2xl">
                <Pic k="divaz-nails" alt="" eager sizes="20vw" />
              </div>
              <div className="float-slow absolute top-[52%] right-[22%] w-[38%] rotate-[2deg] shadow-2xl [animation-delay:-3s]">
                <Pic k="iq-5" alt="" eager sizes="18vw" />
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-t border-border pt-8 md:mt-16 md:grid-cols-12">
            <p className="lede md:col-span-6 lg:col-span-5">
              I'm Diana Vîlceanu — a graphic designer and art director creating distinctive visual identities, thoughtful digital experiences and
              social content that gives brands a recognisable point of view.
            </p>
            <div className="flex flex-wrap items-start gap-4 md:col-span-6 md:justify-end lg:col-span-7">
              <Link to="/portfolio" className={btn({ variant: "solid" })}>
                Explore selected work <Arrow />
              </Link>
              <Link to="/contact" className={btn({ variant: "outline" })}>
                Let's work together
              </Link>
            </div>
          </div>

          {/* Mobile collage */}
          <div className="mt-12 grid grid-cols-3 gap-3 lg:hidden">
            <Pic k="inklabs-main" alt="Inklabs social post" className="aspect-[4/5]" eager sizes="33vw" />
            <Pic k="divaz-nails" alt="Divaz press-on nails" className="aspect-[4/5]" eager sizes="33vw" />
            <Pic k="iq-5" alt="IQ Fashion Black Friday post" className="aspect-[4/5]" eager sizes="33vw" />
          </div>
        </div>

        <div className="container-editorial mt-16 flex items-center gap-4 pb-6 md:mt-24">
          <span className="relative block h-12 w-px overflow-hidden bg-border">
            <span className="scroll-cue absolute inset-0 bg-foreground" />
          </span>
          <span className="eyebrow text-muted-foreground">Scroll — selected work below</span>
        </div>

        {/* Client marquee */}
        <div className="overflow-hidden border-y border-border py-5" aria-label="Brands I've designed for">
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

      {/* 02 — Selected work */}
      <section className="container-editorial py-24 md:py-36" aria-labelledby="work-h">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow n="02">Selected work</Eyebrow>
            <h2 id="work-h" className="display-lg mt-5 max-w-[14ch]">
              Brand worlds, built <em>post by post.</em>
            </h2>
          </div>
          <Link to="/portfolio" className={btn({ variant: "text" })}>
            View all projects <Arrow />
          </Link>
        </div>

        {/* Inklabs — full width feature */}
        <Reveal>
          <Link to="/portfolio/$slug" params={{ slug: ink.slug }} className="group grid gap-6 md:grid-cols-12 md:items-end">
            <div className="frame-zoom grid grid-cols-3 gap-2 md:col-span-8">
              <Pic k="inklabs-main" alt={ink.cover!.alt} className="aspect-[4/5]" sizes="25vw" />
              <Pic k="inklabs-wrapped" alt="Inklabs Wrapped 2025 post" className="aspect-[4/5]" sizes="25vw" />
              <Pic k="inklabs-stop" alt="Inklabs 'Stop scrolling' post" className="aspect-[4/5]" sizes="25vw" />
            </div>
            <FeatureText p={ink} n="01" className="md:col-span-4" />
          </Link>
        </Reveal>

        {/* Divaz + KDT asymmetric */}
        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Link to="/portfolio/$slug" params={{ slug: divaz.slug }} className="group block">
              <div className="frame-zoom relative aspect-[5/4] bg-blush">
                <Pic k="divaz-galentine" alt="Divaz Galentine's Day campaign" className="absolute inset-y-0 left-0 !w-1/2" sizes="30vw" />
                <Pic k="divaz-nails" alt={divaz.cover!.alt} className="absolute inset-y-0 right-0 !w-1/2" sizes="30vw" />
              </div>
              <FeatureText p={divaz} n="02" className="mt-6" />
            </Link>
          </Reveal>
          <Reveal className="md:col-span-5 md:pt-40" delay={120}>
            <ProjectTile p={kdt} aspect="aspect-[4/5]" />
            <p className="mt-3 text-sm text-muted-foreground">Full case study coming soon.</p>
          </Reveal>
        </div>

        {/* Further work */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 md:mt-28 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className={i === 1 ? "md:mt-16" : ""}>
              <ProjectTile p={p} />
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — Services */}
      <section data-theme="ink" className="bg-background py-24 text-foreground md:py-36" aria-labelledby="services-h">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow n="03">Services</Eyebrow>
              <h2 id="services-h" className="display-lg mt-5">
                What I <em className="text-accent">make.</em>
              </h2>
            </div>
            <p className="lede text-muted-foreground md:col-span-6 md:col-start-7 md:self-end">
              Three core disciplines, plus specialist work in ads, print, newsletters, UX/UI and 2D animation.
            </p>
          </div>

          <ol className="mt-16 border-t border-border">
            {services
              .filter((s) => s.group === "core")
              .map((s) => (
                <li key={s.slug} className="border-b border-border">
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="group grid gap-4 py-10 md:grid-cols-12 md:items-center">
                    <span className="eyebrow text-accent md:col-span-1">{s.number}</span>
                    <span className="display-md transition-transform duration-700 group-hover:translate-x-3 md:col-span-6">{s.title}</span>
                    <span className="text-muted-foreground md:col-span-4">{s.short}</span>
                    <Arrow className="hidden text-2xl md:col-span-1 md:block md:justify-self-end" />
                  </Link>
                </li>
              ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {services
              .filter((s) => s.group === "specialist")
              .map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="link-underline text-muted-foreground hover:text-foreground">
                  {s.title}
                </Link>
              ))}
            <Link to="/services" className="link-underline text-accent">
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — About */}
      <section className="container-editorial py-24 md:py-36" aria-labelledby="about-h">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="relative md:col-span-5">
            <div className="relative aspect-[2/3] overflow-hidden bg-ink">
              <Pic k="portrait" alt="Portrait of Diana Vîlceanu" sizes="40vw" />
            </div>
            <p className="font-display absolute -bottom-6 -left-2 text-6xl text-accent italic md:-left-8 md:text-8xl">Diana</p>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow n="04">About & philosophy</Eyebrow>
            <h2 id="about-h" className="display-md mt-5">
              Started with illustration. Grew into brands, motion and the feed.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {person.about.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
              <div>
                <dt className="eyebrow text-muted-foreground">Languages</dt>
                {person.languages.map((l) => (
                  <dd key={l} className="mt-1">
                    {l}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Tools</dt>
                <dd className="mt-1">{person.tools.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 05 — Journal */}
      <section className="border-t border-border py-24 md:py-32" aria-labelledby="journal-h">
        <div className="container-editorial">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow n="05">The Journal</Eyebrow>
              <h2 id="journal-h" className="display-lg mt-5">
                Notes on <em>visual culture.</em>
              </h2>
            </div>
            <Link to="/journal" className={btn({ variant: "text" })}>
              Read the journal <Arrow />
            </Link>
          </div>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <ArticleCard a={articles[0]!} large />
            </Reveal>
            <div className="grid gap-12 md:col-span-5 md:col-start-8">
              {articles.slice(1, 3).map((a, i) => (
                <Reveal key={a.slug} delay={i * 120}>
                  <ArticleCard a={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CTA */}
      <CtaBand />
    </>
  );
}

function FeatureText({ p, n, className }: { p: Project; n: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-muted-foreground">
        <span className="text-accent">{n}</span> · {p.client} · {p.categories.join(" / ")}
      </p>
      <h3 className="display-md mt-3 transition-colors group-hover:text-accent">{p.name}</h3>
      <p className="mt-3 max-w-md text-muted-foreground">{p.summary}</p>
      <span className={btn({ variant: "text", className: "mt-5" })}>
        View case study <Arrow />
      </span>
    </div>
  );
}
