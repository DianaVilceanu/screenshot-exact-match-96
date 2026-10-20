import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, contactHead } from "@/components/pages/contact";

export const Route = createFileRoute("/en/contact")({
  head: () => contactHead("en"),
  component: ContactPage,
});
