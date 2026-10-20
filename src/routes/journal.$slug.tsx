import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleCard, ArticleMeta, ProjectTile } from "@/components/site/cards";
import { Arrow, Breadcrumbs, Pic, Placeholder, btn } from "@/components/site/primitives";
import { articles, formatDate, getArticle, getCategory, isPublished } from "@/content/journal";
import { getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { img } from "@/content/images";
import { person, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    if (!getArticle(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData ? getArticle(loaderData.slug) : undefined;
    if (!a) return { meta: [{ title: "Article not found — Diana Marrie Designs" }, { name: "robots", content: "noindex" }] };
    const path = `/journal/${a.slug}`;
    const cat = getCategory(a.category);
    const ld: object[] = [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Journal", path: "/journal" },
        { name: cat?.name ?? "Journal", path: `/journal/category/${a.category}` },
        { name: a.title, path },
      ]),
    ];
    if (isPublished(a)) {
      ld.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: a.title,
        description: a.description,
        datePublished: a.publishedAt,
        dateModified: a.updatedAt ?? a.publishedAt,
        author: { "@type": "Person", name: person.name, url: SITE_URL },
        publisher: { "@type": "Organization", name: SITE_NAME },
        mainEntityOfPage: SITE_URL + path,
        image: SITE_URL + img[a.cover.key].src,
      });
    }
    return seo({ title: a.seoTitle ?? a.title, description: a.description, path, type: "article", noindex: !isPublished(a), jsonLd: ld });
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">Article not found.</h1>
      <Link to="/journal" className={btn({ variant: "text", className: "mt-8" })}>
        Back to the journal <Arrow />
      </Link>
    </div>
  ),
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const a = getArticle(slug)!;
  const cat = getCategory(a.category);
  const related = articles.filter((x) => x.slug !== a.slug).sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category)).slice(0, 3);
  const projects = a.related.projects.map(getProject).filter(Boolean);
  const services = a.related.services.map(getService).filter(Boolean);

  return (
    <article>
      <header className="container-editorial pt-28 md:pt-36">
        <Breadcrumbs
          items={[
            { name: "Home", to: "/" },
            { name: "Journal", to: "/journal" },
            { name: cat?.name ?? "", to: "/journal/category/$category", params: { category: a.category } },
          ]}
        />
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <div className="flex justify-center">
            <ArticleMeta a={a} />
          </div>
          <h1 className="display-lg mt-6">{a.title}</h1>
          <p className="lede mx-auto mt-6 max-w-2xl text-muted-foreground">{a.description}</p>
        </div>
        {!isPublished(a) && (
          <Placeholder className="mx-auto mt-10 max-w-2xl">
            Draft article — hidden from search engines until a publication date is set. Review and edit the text before publishing.
          </Placeholder>
        )}
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
            <nav aria-label="Table of contents">
              <p className="eyebrow mb-4 text-muted-foreground">In this article</p>
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
              <p className="eyebrow text-muted-foreground">Written by</p>
              <p className="mt-2 font-medium">{person.name}</p>
              <p className="text-muted-foreground">{person.role}</p>
              {a.publishedAt && <p className="mt-3 text-muted-foreground">Published {formatDate(a.publishedAt)}</p>}
              {a.updatedAt && <p className="text-muted-foreground">Updated {formatDate(a.updatedAt)}</p>}
            </div>
          </div>
        </aside>

        <div className="prose-editorial lg:col-span-7 lg:col-start-5">
          <p className="first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent">
            {a.intro}
          </p>
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
                    {b.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <ol key={i}>
                    {b.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                ),
              )}
            </section>
          ))}

          <aside className="not-prose mt-14 border-y border-border py-8">
            <p className="eyebrow text-muted-foreground">Related services</p>
            <ul>
              {services.map((s) => (
                <li key={s!.slug}>
                  <Link to="/services/$slug" params={{ slug: s!.slug }}>
                    {s!.title}
                  </Link>{" "}
                  — {s!.short}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {projects.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="container-editorial">
            <p className="eyebrow text-muted-foreground">Projects mentioned</p>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectTile key={p!.slug} p={p!} aspect="aspect-[5/4]" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-secondary py-16 md:py-24">
        <div className="container-editorial">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">Keep reading</h2>
            <Link to="/contact" className={btn({ variant: "solid" })}>
              Work with me <Arrow />
            </Link>
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
