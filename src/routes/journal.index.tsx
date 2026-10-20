import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/chrome";
import { ArticleGrid, CategoryNav } from "@/components/site/journal-list";
import { Eyebrow } from "@/components/site/primitives";
import { articles } from "@/content/journal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/journal/")({
  head: () =>
    seo({
      title: "Journal — Notes on Graphic Design, Branding & Social Media",
      description: "An independent creative journal by Diana Vîlceanu on graphic design, branding, visual culture and social media design.",
      path: "/journal",
    }),
  component: Journal,
});

function Journal() {
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="container-editorial pt-32 pb-12 md:pt-44">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow n="Issue 01">The Journal</Eyebrow>
            <h1 className="display-xl mt-6">
              Notes on <em className="text-accent">looking.</em>
            </h1>
          </div>
          <p className="lede max-w-md text-muted-foreground">
            Essays and practical guides on graphic design, branding, visual culture and designing for social media.
          </p>
        </div>
        <div className="mt-12">
          <CategoryNav />
        </div>
      </section>

      <section className="container-editorial border-t border-border py-14" aria-label="Featured article">
        <ArticleCard a={featured!} large />
      </section>

      <section className="container-editorial border-t border-border py-16 md:py-24" aria-labelledby="latest-h">
        <h2 id="latest-h" className="display-md mb-10">
          Latest
        </h2>
        <ArticleGrid items={rest} />
      </section>
      <CtaBand title="Want this thinking applied to your brand?" />
    </>
  );
}
