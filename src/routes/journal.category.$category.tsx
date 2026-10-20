import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/journal/category/$category")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: "/en/journal/category/" + params.category, statusCode: 301 });
  },
});
