import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/journal/")({
  beforeLoad: () => {
    throw redirect({ href: "/en/journal", statusCode: 301 });
  },
});
