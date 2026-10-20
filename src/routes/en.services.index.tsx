import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage, servicesHead } from "@/components/pages/services";

export const Route = createFileRoute("/en/services/")({
  head: () => servicesHead("en"),
  component: ServicesPage,
});
