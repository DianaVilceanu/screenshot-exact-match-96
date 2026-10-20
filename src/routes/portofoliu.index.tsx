import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage, portfolioHead } from "@/components/pages/portfolio";

export const Route = createFileRoute("/portofoliu/")({
  head: () => portfolioHead("ro"),
  component: PortfolioPage,
});
