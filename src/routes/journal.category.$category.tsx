import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleGrid, CategoryNav } from "@/components/site/journal-list";
import { Arrow, Breadcrumbs, Eyebrow, btn } from "@/components/site/primitives";
import { articles, getCategory } from "@/content/journal";
import { breadcrumbLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/journal/category/$category")({
  loader: ({ params }) => {
    if (!getCategory(params.category)) throw notFound();
    return { slug: params.category };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getCategory(loaderData.slug) : undefined;
    if (!c) return { meta: [{ title: "Category not found — Diana Marrie Designs" }, { name: "robots", content: "noindex" }] };
    const path = `/journal/category/${c.slug}`;
    return seo({
      title: `${c.name} — Journal`,
      description: `${c.description} Articles from the Diana Marrie Designs journal.`,
      path,
      jsonLd: [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }, { name: c.name, path }])],
    });
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24">
      <h1 className="display-lg">Category not found.</h1>
      <Link to="/journal" className={btn({ variant: "text", className: "mt-8" })}>
        Back to the journal <Arrow />
      </Link>
    </div>
  ),
});

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const c = getCategory(slug)!;
  const items = articles.filter((a) => a.category === slug);
  return (
    <section className="container-editorial pt-28 pb-24 md:pt-36">
      <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Journal", to: "/journal" }, { name: c.name }]} />
      <Eyebrow className="mt-10">Category</Eyebrow>
      <h1 className="display-lg mt-5 max-w-4xl">{c.name}</h1>
      <p className="lede mt-6 max-w-2xl text-muted-foreground">{c.description}</p>
      <div className="mt-10 mb-14">
        <CategoryNav active={slug} />
      </div>
      {items.length ? <ArticleGrid items={items} /> : <p className="text-muted-foreground">No articles in this category yet.</p>}
    </section>
  );
}
