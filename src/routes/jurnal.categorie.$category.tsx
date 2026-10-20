import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, categoryHead, JournalNotFound } from "@/components/pages/journal";
import { content } from "@/lib/i18n";

export const Route = createFileRoute("/jurnal/categorie/$category")({
  loader: ({ params }) => {
    if (!content("ro").category(params.category)) throw notFound();
    return { slug: params.category };
  },
  head: ({ loaderData }) => categoryHead("ro", loaderData?.slug),
  component: function Page() {
    const { slug } = Route.useLoaderData();
    return <CategoryPage slug={slug} />;
  },
  notFoundComponent: () => <JournalNotFound kind="category" />,
});
