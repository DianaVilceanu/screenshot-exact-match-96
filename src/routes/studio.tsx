import { createFileRoute } from "@tanstack/react-router";
import { StudioShell } from "@/studio/components/Shell";

// Private workspace: client-rendered (data lives in the browser), never indexed.
export const Route = createFileRoute("/studio")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Command Center" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: StudioShell,
});
