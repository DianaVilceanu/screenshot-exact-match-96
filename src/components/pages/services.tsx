import { ArticleCard, ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { L } from "@/components/site/llink";
import { Arrow, Breadcrumbs, Eyebrow, Pic, Placeholder, Reveal, btn } from "@/components/site/primitives";
import type { Project } from "@/content/projects";
import type { Article } from "@/content/journal";
import { SITE_URL } from "@/content/site";
import { content, hrefFor, idOf, useContent, type Locale } from "@/lib/i18n";
import { breadcrumbLd, notFoundHead, seo } from "@/lib/seo";

export function servicesHead(locale: Locale) {
  const { t } = content(locale);
  return seo({ title: t.services.seoTitle, description: t.services.seoDesc, path: hrefFor(locale, { kind: "services" }), locale, ref: { kind: "services" } });
}

export function ServicesPage() {
  const { t, locale, services } = useContent();
  const core = services.filter((s) => s.group === "core");
  const spec = services.filter((s) => s.group === "specialist");
  return (
    <>
      <section className="container-editorial pt-32 pb-16 md:pt-44">
        <Eyebrow n="08">{t.services.eyebrow}</Eyebrow>
        <h1 className="display-xl mt-6 max-w-[11ch]">
          {t.services.h1a}
          <em className="text-accent">{t.services.h1b}</em>
        </h1>
        <p className="lede mt-8 max-w-2xl text-muted-foreground">{t.services.lede}</p>
      </section>
      <section aria-label={t.services.coreAria}>
        {core.map((s, i) => (
          <Reveal key={s.slug} as="article" className="border-t border-border">
            <div className="container-editorial grid gap-10 py-16 md:grid-cols-12 md:py-24">
              <div className={i % 2 ? "md:order-2 md:col-span-5 md:col-start-8" : "md:col-span-5"}>
                <p className="display-lg text-accent">{s.number}</p>
                <h2 className="display-md mt-4">{s.title}</h2>
                <p className="lede mt-5 text-muted-foreground">{s.intro}</p>
                <ul className="mt-6 space-y-2">
                  {s.offerings.map((o) => (
                    <li key={o} className="flex gap-3 border-b border-border pb-2 text-sm">
                      <span className="text-accent">✶</span>
                      {o}
                    </li>
                  ))}
                </ul>
                <L to={hrefFor(locale, { kind: "service", id: idOf(s) })} className="group link-underline mt-8 inline-flex items-center gap-3 font-medium">
                  {t.services.explore} <Arrow />
                </L>
              </div>
              <div className={`grid grid-cols-2 gap-3 ${i % 2 ? "md:order-1 md:col-span-6" : "md:col-span-6 md:col-start-7"}`}>
                {s.images.slice(0, 2).map((im, j) => (
                  <div key={im.key} className={j === 1 ? "mt-12" : ""}>
                    <Pic k={im.key} alt={im.alt} className="aspect-[4/5]" sizes="25vw" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>
      <section data-theme="ink" className="bg-background py-20 text-foreground md:py-28" aria-labelledby="spec-h">
        <div className="container-editorial">
          <Eyebrow>{t.services.spec}</Eyebrow>
          <h2 id="spec-h" className="display-lg mt-5">
            {t.services.specH1}
            <em className="text-accent">{t.services.specH2}</em>
          </h2>
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {spec.map((s) => (
              <L key={s.slug} to={hrefFor(locale, { kind: "service", id: idOf(s) })} className="group flex min-h-64 flex-col bg-background p-8 transition-colors hover:bg-card">
                <span className="eyebrow text-accent">{s.number}</span>
                <h3 className="display-sm mt-6">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-auto pt-6">
                  <Arrow className="text-xl" />
                </span>
              </L>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={t.services.ctaTitle} text={t.services.ctaText} />
    </>
  );
}

export function serviceHead(locale: Locale, slug: string | undefined) {
  const c = content(locale);
  const s = slug ? c.service(slug) : undefined;
  if (!s) return notFoundHead(c.t.service.notFound);
  const ref = { kind: "service", id: idOf(s) } as const;
  const path = hrefFor(locale, ref);
  return seo({
    title: `${s.title} — ${c.t.service.seoSuffix}`,
    description: `${s.short} ${s.intro}`.slice(0, 158),
    path,
    locale,
    ref,
    jsonLd: [
      breadcrumbLd([
        { name: c.t.nav.home, path: hrefFor(locale, { kind: "home" }) },
        { name: c.t.nav.services, path: hrefFor(locale, { kind: "services" }) },
        { name: s.title, path },
      ]),
      { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.intro, inLanguage: locale, provider: { "@type": "Person", name: "Diana Vîlceanu", url: SITE_URL } },
    ],
  });
}

export function ServiceNotFound() {
  const { t, locale } = useContent();
  return (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">{t.service.notFound}</h1>
      <L to={hrefFor(locale, { kind: "services" })} className={btn({ variant: "text", className: "mt-8" })}>
        {t.service.all} <Arrow />
      </L>
    </div>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const c = useContent();
  const { t, locale } = c;
  const s = c.service(slug)!;
  const projects = s.projectSlugs.map(c.projectById).filter((p): p is Project => !!p && !p.draft);
  const arts = s.articleSlugs.map(c.articleById).filter((a): a is Article => !!a);
  const others = c.services.filter((x) => x.slug !== s.slug);
  return (
    <>
      <section className="container-editorial pt-28 pb-16 md:pt-36">
        <Breadcrumbs items={[{ name: t.nav.home, to: hrefFor(locale, { kind: "home" }) }, { name: t.nav.services, to: hrefFor(locale, { kind: "services" }) }, { name: s.title }]} />
        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow n={s.number}>{s.group === "core" ? t.service.core : t.service.specialist}</Eyebrow>
            <h1 className="display-xl mt-6">{s.title}</h1>
          </div>
          <p className="lede text-muted-foreground md:col-span-5">{s.intro}</p>
        </div>
      </section>
      {s.images.length > 0 && (
        <section className="container-editorial">
          <div className={`grid gap-3 ${s.images.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
            {s.images.map((im, i) => (
              <Reveal key={im.key} delay={i * 90}>
                <Pic k={im.key} alt={im.alt} className="aspect-[4/5]" eager={i === 0} sizes="33vw" />
              </Reveal>
            ))}
          </div>
        </section>
      )}
      <section className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Eyebrow>{t.service.why}</Eyebrow>
          <ul className="mt-8 space-y-6">
            {s.value.map((v, i) => (
              <li key={v} className="flex gap-5">
                <span className="display-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg leading-relaxed">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Eyebrow>{t.service.create}</Eyebrow>
          <ul className="mt-8 border-t border-border">
            {s.offerings.map((o) => (
              <li key={o} className="display-sm border-b border-border py-4">
                {o}
              </li>
            ))}
          </ul>
          {s.missing && <Placeholder className="mt-8">{s.missing}</Placeholder>}
          <L to={hrefFor(locale, { kind: "contact" })} className={btn({ variant: "solid", className: "mt-10" })}>
            {t.service.ask(s.title)} <Arrow />
          </L>
        </div>
      </section>
      {projects.length > 0 && (
        <section className="border-t border-border py-20 md:py-28">
          <div className="container-editorial">
            <Eyebrow>{t.service.examples}</Eyebrow>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <ProjectTile p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
      {arts.length > 0 && (
        <section className="border-t border-border bg-secondary py-20">
          <div className="container-editorial">
            <Eyebrow>{t.service.fromJournal}</Eyebrow>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {arts.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="container-editorial py-16">
        <p className="eyebrow mb-5 text-muted-foreground">{t.service.others}</p>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <L key={o.slug} to={hrefFor(locale, { kind: "service", id: idOf(o) })} className="border border-border px-4 py-2 text-sm transition-colors hover:border-foreground">
              {o.title}
            </L>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
