import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/journal/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: "/en/journal/" + params.slug, statusCode: 301 });
  },
});
