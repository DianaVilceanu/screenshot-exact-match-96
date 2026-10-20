import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServicePage, serviceHead, ServiceNotFound } from "@/components/pages/services";
import { content } from "@/lib/i18n";

export const Route = createFileRoute("/servicii/$slug")({
  loader: ({ params }) => {
    if (!content("ro").service(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => serviceHead("ro", loaderData?.slug),
  component: function Page() {
    const { slug } = Route.useLoaderData();
    return <ServicePage slug={slug} />;
  },
  notFoundComponent: () => <ServiceNotFound />,
});
