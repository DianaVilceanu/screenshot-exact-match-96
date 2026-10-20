import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: "/en/portfolio/" + params.slug, statusCode: 301 });
  },
});
