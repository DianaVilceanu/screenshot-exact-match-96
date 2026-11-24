import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/studio/pages/Calendar";

export const Route = createFileRoute("/studio/calendar")({
  head: () => ({ meta: [{ title: "Content Calendar | Command Center" }] }),
  component: Calendar,
});
