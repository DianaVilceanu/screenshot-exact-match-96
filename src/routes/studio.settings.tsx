import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/studio/pages/Settings";

export const Route = createFileRoute("/studio/settings")({
  head: () => ({ meta: [{ title: "Settings | Command Center" }] }),
  component: Settings,
});
