import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead, JournalNotFound } from "@/components/pages/journal";
import { content } from "@/lib/i18n";

export const Route = createFileRoute("/en/journal/$slug")({
  loader: ({ params }) => {
    if (!content("en").article(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => articleHead("en", loaderData?.slug),
  component: function Page() {
    const { slug } = Route.useLoaderData();
    return <ArticlePage slug={slug} />;
  },
  notFoundComponent: () => <JournalNotFound kind="article" />,
});
