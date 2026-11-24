import { createFileRoute } from "@tanstack/react-router";
import { BrandsList } from "@/studio/pages/Brands";

export const Route = createFileRoute("/studio/brands/")({
  head: () => ({ meta: [{ title: "Brands | Command Center" }] }),
  component: BrandsList,
});
