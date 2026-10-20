import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage, servicesHead } from "@/components/pages/services";

export const Route = createFileRoute("/servicii/")({
  head: () => servicesHead("ro"),
  component: ServicesPage,
});
