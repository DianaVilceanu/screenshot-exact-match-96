import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectPage, projectHead, ProjectNotFound } from "@/components/pages/project";
import { content } from "@/lib/i18n";

export const Route = createFileRoute("/en/portfolio/$slug")({
  loader: ({ params }) => {
    if (!content("en").project(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => projectHead("en", loaderData?.slug),
  component: function Page() {
    const { slug } = Route.useLoaderData();
    return <ProjectPage slug={slug} />;
  },
  notFoundComponent: () => <ProjectNotFound />,
});
