import { ArticleCard, ArticleMeta, ProjectTile, formatDate } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { ArticleGrid, CategoryNav } from "@/components/site/journal-list";
import { L } from "@/components/site/llink";
import { Arrow, Breadcrumbs, Eyebrow, Pic, Placeholder, btn } from "@/components/site/primitives";
import { isPublished } from "@/content/journal";
import { img } from "@/content/images";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { SITE_NAME, SITE_URL } from "@/content/site";
import { content, hrefFor, idOf, pathFor, useContent, type Locale } from "@/lib/i18n";
import { breadcrumbLd, notFoundHead, seo } from "@/lib/seo";

export function journalHead(locale: Locale) {
  const { t } = content(locale);
  return seo({ title: t.journal.seoTitle, description: t.journal.seoDesc, path: hrefFor(locale, { kind: "journal" }), locale, ref: { kind: "journal" } });
}

export function JournalPage() {
  const { t, articles } = useContent();
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="container-editorial pt-32 pb-12 md:pt-44">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow n={t.journal.issue}>{t.journal.eyebrow}</Eyebrow>
            <h1 className="display-xl mt-6">
              {t.journal.h1a}
              <em className="text-accent">{t.journal.h1b}</em>
            </h1>
          </div>
          <p className="lede max-w-md text-muted-foreground">{t.journal.lede}</p>
        </div>
        <div className="mt-12">
          <CategoryNav />
        </div>
      </section>
      {featured ? (
        <>
          <section className="container-editorial border-t border-border py-14" aria-label={t.journal.featured}>
            <ArticleCard a={featured} large />
          </section>
          <section className="container-editorial border-t border-border py-16 md:py-24" aria-labelledby="latest-h">
            <h2 id="latest-h" className="display-md mb-10">
              {t.journal.latest}
            </h2>
            <ArticleGrid items={rest} />
          </section>
        </>
      ) : (
        <p className="container-editorial pb-24 text-muted-foreground">{t.journal.empty}</p>
      )}
      <CtaBand title={t.journal.cta} />
    </>
  );
}

export function categoryHead(locale: Locale, slug: string | undefined) {
  const c = content(locale);
  const cat = slug ? c.category(slug) : undefined;
  if (!cat) return notFoundHead(c.t.journal.catNotFound);
  const ref = { kind: "category", id: idOf(cat) } as const;
  const path = hrefFor(locale, ref);
  return seo({
    title: `${cat.name} — ${c.t.nav.journal}`,
    description: c.t.journal.catSeo(cat.description),
    path,
    locale,
    ref,
    jsonLd: [breadcrumbLd([{ name: c.t.nav.home, path: hrefFor(locale, { kind: "home" }) }, { name: c.t.nav.journal, path: hrefFor(locale, { kind: "journal" }) }, { name: cat.name, path }])],
  });
}

export function JournalNotFound({ kind }: { kind: "category" | "article" }) {
  const { t, locale } = useContent();
  return (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">{kind === "category" ? t.journal.catNotFound : t.article.notFound}</h1>
      <L to={hrefFor(locale, { kind: "journal" })} className={btn({ variant: "text", className: "mt-8" })}>
        {t.journal.back} <Arrow />
      </L>
    </div>
  );
}

export function CategoryPage({ slug }: { slug: string }) {
  const c = useContent();
  const { t, locale } = c;
  const cat = c.category(slug)!;
  const items = c.articles.filter((a) => a.category === idOf(cat));
  return (
    <section className="container-editorial pt-28 pb-24 md:pt-36">
      <Breadcrumbs items={[{ name: t.nav.home, to: hrefFor(locale, { kind: "home" }) }, { name: t.nav.journal, to: hrefFor(locale, { kind: "journal" }) }, { name: cat.name }]} />
      <Eyebrow className="mt-10">{t.journal.category}</Eyebrow>
      <h1 className="display-lg mt-5 max-w-4xl">{cat.name}</h1>
      <p className="lede mt-6 max-w-2xl text-muted-foreground">{cat.description}</p>
      <div className="mt-10 mb-14">
        <CategoryNav active={slug} />
      </div>
      {items.length ? <ArticleGrid items={items} /> : <p className="text-muted-foreground">{t.journal.noneInCat}</p>}
    </section>
  );
}

export function articleHead(locale: Locale, slug: string | undefined) {
  const c = content(locale);
  const a = slug ? c.article(slug) : undefined;
  if (!a) return notFoundHead(c.t.article.notFound);
  const ref = { kind: "article", id: idOf(a) } as const;
  const path = hrefFor(locale, ref);
  const cat = c.categoryById(a.category);
  const ld: object[] = [
    breadcrumbLd([
      { name: c.t.nav.home, path: hrefFor(locale, { kind: "home" }) },
      { name: c.t.nav.journal, path: hrefFor(locale, { kind: "journal" }) },
      { name: cat?.name ?? c.t.nav.journal, path: hrefFor(locale, { kind: "category", id: a.category }) },
      { name: a.title, path },
    ]),
  ];
  if (isPublished(a)) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      inLanguage: locale,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt ?? a.publishedAt,
      author: { "@type": "Person", name: c.person.name, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME },
      mainEntityOfPage: SITE_URL + path,
      image: SITE_URL + img[a.cover.key].src,
    });
  }
  return seo({ title: a.seoTitle ?? a.title, description: a.description, path, locale, ref, type: "article", noindex: !isPublished(a), jsonLd: ld });
}

export function ArticlePage({ slug }: { slug: string }) {
  const c = useContent();
  const { t, locale } = c;
  const a = c.article(slug)!;
  const cat = c.categoryById(a.category);
  const related = c.articles
    .filter((x) => x.slug !== a.slug)
    .sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category))
    .slice(0, 3);
  const projects = a.related.projects.map(c.projectById).filter((p): p is Project => !!p);
  const services = a.related.services.map(c.serviceById).filter((s): s is Service => !!s);
  const other: Locale = locale === "ro" ? "en" : "ro";
  const otherArticle = content(other).articleById(idOf(a));
  const translation = otherArticle && (isPublished(otherArticle) || !isPublished(a)) ? pathFor(other, { kind: "article", id: idOf(a) }) : null;

  return (
    <article>
      <header className="container-editorial pt-28 md:pt-36">
        <Breadcrumbs
          items={[
            { name: t.nav.home, to: hrefFor(locale, { kind: "home" }) },
            { name: t.nav.journal, to: hrefFor(locale, { kind: "journal" }) },
            { name: cat?.name ?? "", to: hrefFor(locale, { kind: "category", id: a.category }) },
          ]}
        />
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <div className="flex justify-center">
            <ArticleMeta a={a} />
          </div>
          <h1 className="display-lg mt-6">{a.title}</h1>
          <p className="lede mx-auto mt-6 max-w-2xl text-muted-foreground">{a.description}</p>
          {translation && (
            <L to={translation} hrefLang={other} lang={other} className="link-underline mt-6 inline-block text-sm text-muted-foreground">
              {t.article.alsoIn} →
            </L>
          )}
        </div>
        {!isPublished(a) && <Placeholder className="mx-auto mt-10 max-w-2xl">{t.article.draftNote}</Placeholder>}
        <figure className="mt-14">
          <div className="mx-auto aspect-[16/9] max-w-6xl overflow-hidden bg-muted">
            <Pic k={a.cover.key} alt={a.cover.alt} eager sizes="100vw" className="object-contain" />
          </div>
          <figcaption className="eyebrow mx-auto mt-3 max-w-6xl text-muted-foreground">{a.cover.alt}</figcaption>
        </figure>
      </header>

      <div className="container-editorial grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <nav aria-label={t.article.toc}>
              <p className="eyebrow mb-4 text-muted-foreground">{t.article.inThis}</p>
              <ol className="space-y-2 text-sm">
                {a.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-3 hover:text-accent">
                      <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-10 border-t border-border pt-6 text-sm">
              <p className="eyebrow text-muted-foreground">{t.article.by}</p>
              <p className="mt-2 font-medium">{c.person.name}</p>
              <p className="text-muted-foreground">{c.person.role}</p>
              {a.publishedAt && (
                <p className="mt-3 text-muted-foreground">
                  {t.article.published} {formatDate(a.publishedAt, t.dateLocale)}
                </p>
              )}
              {a.updatedAt && (
                <p className="text-muted-foreground">
                  {t.article.updated} {formatDate(a.updatedAt, t.dateLocale)}
                </p>
              )}
            </div>
          </div>
        </aside>

        <div className="prose-editorial lg:col-span-7 lg:col-start-5">
          <p className="first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent">{a.intro}</p>
          {a.sections.map((s) => (
            <section key={s.id}>
              <h2 id={s.id}>{s.heading}</h2>
              {s.blocks.map((b, i) =>
                b.type === "p" ? (
                  <p key={i}>{b.text}</p>
                ) : b.type === "h3" ? (
                  <h3 key={i}>{b.text}</h3>
                ) : b.type === "ul" ? (
                  <ul key={i}>
                    {b.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : (
                  <ol key={i}>
                    {b.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                ),
              )}
            </section>
          ))}
          {services.length > 0 && (
            <aside className="not-prose mt-14 border-y border-border py-8">
              <p className="eyebrow text-muted-foreground">{t.article.related}</p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <L to={hrefFor(locale, { kind: "service", id: idOf(s) })}>{s.title}</L> — {s.short}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>

      {projects.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="container-editorial">
            <p className="eyebrow text-muted-foreground">{t.article.projects}</p>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectTile key={p.slug} p={p} aspect="aspect-[5/4]" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-secondary py-16 md:py-24">
        <div className="container-editorial">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">{t.article.keep}</h2>
            <L to={hrefFor(locale, { kind: "contact" })} className={btn({ variant: "solid" })}>
              {t.article.work} <Arrow />
            </L>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} a={r} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
