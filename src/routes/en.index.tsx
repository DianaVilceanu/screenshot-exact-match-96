import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/components/pages/home";

export const Route = createFileRoute("/en/")({
  head: () => homeHead("en"),
  component: HomePage,
});
