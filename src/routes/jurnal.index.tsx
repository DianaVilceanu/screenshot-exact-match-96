import { createFileRoute } from "@tanstack/react-router";
import { JournalPage, journalHead } from "@/components/pages/journal";

export const Route = createFileRoute("/jurnal/")({
  head: () => journalHead("ro"),
  component: JournalPage,
});
