import { createFileRoute } from "@tanstack/react-router";
import { NotWorking } from "@/studio/pages/Working";

export const Route = createFileRoute("/studio/not-working")({
  head: () => ({ meta: [{ title: "What's Not Working | Command Center" }] }),
  component: NotWorking,
});
