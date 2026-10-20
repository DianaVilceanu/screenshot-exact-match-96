import { createFileRoute } from "@tanstack/react-router";
import { JournalPage, journalHead } from "@/components/pages/journal";

export const Route = createFileRoute("/en/journal/")({
  head: () => journalHead("en"),
  component: JournalPage,
});
