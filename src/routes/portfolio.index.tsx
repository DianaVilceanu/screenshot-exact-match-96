import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/")({
  beforeLoad: () => {
    throw redirect({ href: "/en/portfolio", statusCode: 301 });
  },
});
