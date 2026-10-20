import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, contactHead } from "@/components/pages/contact";

export const Route = createFileRoute("/contact")({
  head: () => contactHead("ro"),
  component: ContactPage,
});
