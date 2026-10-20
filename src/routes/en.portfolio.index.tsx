import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage, portfolioHead } from "@/components/pages/portfolio";

export const Route = createFileRoute("/en/portfolio/")({
  head: () => portfolioHead("en"),
  component: PortfolioPage,
});
