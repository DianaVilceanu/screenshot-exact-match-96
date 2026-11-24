import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/studio/pages/Overview";

export const Route = createFileRoute("/studio/")({
  head: () => ({ meta: [{ title: "Overview | Command Center" }] }),
  component: Overview,
});
