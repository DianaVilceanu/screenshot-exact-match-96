import { createFileRoute } from "@tanstack/react-router";
import { Ideas } from "@/studio/pages/Ideas";

export const Route = createFileRoute("/studio/ideas")({
  head: () => ({ meta: [{ title: "Content Ideas | Command Center" }] }),
  component: Ideas,
});
