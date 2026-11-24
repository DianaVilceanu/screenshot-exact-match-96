import { createFileRoute } from "@tanstack/react-router";
import { Import } from "@/studio/pages/Import";

export const Route = createFileRoute("/studio/import")({
  head: () => ({ meta: [{ title: "Import data | Command Center" }] }),
  component: Import,
});
