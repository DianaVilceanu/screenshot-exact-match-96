import { createFileRoute } from "@tanstack/react-router";
import { Working } from "@/studio/pages/Working";

export const Route = createFileRoute("/studio/working")({
  head: () => ({ meta: [{ title: "What's Working | Command Center" }] }),
  component: Working,
});
