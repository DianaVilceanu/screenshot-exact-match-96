import { createFileRoute } from "@tanstack/react-router";
import { Experiments } from "@/studio/pages/Experiments";

export const Route = createFileRoute("/studio/experiments")({
  head: () => ({ meta: [{ title: "Content Experiments | Command Center" }] }),
  component: Experiments,
});
