import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: "/en/services/" + params.slug, statusCode: 301 });
  },
});
