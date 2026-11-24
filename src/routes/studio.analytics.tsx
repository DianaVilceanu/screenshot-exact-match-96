import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/studio/pages/Analytics";

export const Route = createFileRoute("/studio/analytics")({
  head: () => ({ meta: [{ title: "Analytics | Command Center" }] }),
  component: Analytics,
});
