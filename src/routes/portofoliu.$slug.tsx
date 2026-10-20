import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectPage, projectHead, ProjectNotFound } from "@/components/pages/project";
import { content } from "@/lib/i18n";

export const Route = createFileRoute("/portofoliu/$slug")({
  loader: ({ params }) => {
    if (!content("ro").project(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => projectHead("ro", loaderData?.slug),
  component: function Page() {
    const { slug } = Route.useLoaderData();
    return <ProjectPage slug={slug} />;
  },
  notFoundComponent: () => <ProjectNotFound />,
});
