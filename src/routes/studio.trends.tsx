import { createFileRoute } from "@tanstack/react-router";
import { Trends } from "@/studio/pages/Trends";

export const Route = createFileRoute("/studio/trends")({
  head: () => ({ meta: [{ title: "Trends | Command Center" }] }),
  component: Trends,
});
