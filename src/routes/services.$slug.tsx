import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleCard, ProjectTile } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { Arrow, Breadcrumbs, Eyebrow, Pic, Placeholder, Reveal, btn } from "@/components/site/primitives";
import { getArticle } from "@/content/journal";
import { getProject } from "@/content/projects";
import { getService, services } from "@/content/services";
import { breadcrumbLd, seo } from "@/lib/seo";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!getService(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getService(loaderData.slug) : undefined;
    if (!s) return { meta: [{ title: "Service not found — Diana Marrie Designs" }, { name: "robots", content: "noindex" }] };
    const path = `/services/${s.slug}`;
    return seo({
      title: `${s.title} Services`,
      description: `${s.short} ${s.intro}`.slice(0, 158),
      path,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.title, path },
        ]),
        { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.intro, provider: { "@type": "Person", name: "Diana Vîlceanu", url: SITE_URL } },
      ],
    });
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">Service not found.</h1>
      <Link to="/services" className={btn({ variant: "text", className: "mt-8" })}>
        All services <Arrow />
      </Link>
    </div>
  ),
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const projects = s.projectSlugs.map(getProject).filter((p) => p && !p.draft);
  const arts = s.articleSlugs.map(getArticle).filter(Boolean);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="container-editorial pt-28 pb-16 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Services", to: "/services" }, { name: s.title }]} />
        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow n={s.number}>{s.group === "core" ? "Core service" : "Specialist service"}</Eyebrow>
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
          <Eyebrow>Why it matters</Eyebrow>
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
          <Eyebrow>What I create</Eyebrow>
          <ul className="mt-8 border-t border-border">
            {s.offerings.map((o) => (
              <li key={o} className="display-sm border-b border-border py-4">
                {o}
              </li>
            ))}
          </ul>
          {s.missing && <Placeholder className="mt-8">{s.missing}</Placeholder>}
          <Link to="/contact" className={btn({ variant: "solid", className: "mt-10" })}>
            Ask about {s.title} <Arrow />
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="border-t border-border py-20 md:py-28">
          <div className="container-editorial">
            <Eyebrow>Selected examples</Eyebrow>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((p, i) => (
                <Reveal key={p!.slug} delay={(i % 3) * 90}>
                  <ProjectTile p={p!} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {arts.length > 0 && (
        <section className="border-t border-border bg-secondary py-20">
          <div className="container-editorial">
            <Eyebrow>From the journal</Eyebrow>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {arts.map((a) => (
                <ArticleCard key={a!.slug} a={a!} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-editorial py-16">
        <p className="eyebrow mb-5 text-muted-foreground">Other services</p>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="border border-border px-4 py-2 text-sm transition-colors hover:border-foreground">
              {o.title}
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
