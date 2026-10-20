import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({
  beforeLoad: () => {
    throw redirect({ href: "/en/services", statusCode: 301 });
  },
});
