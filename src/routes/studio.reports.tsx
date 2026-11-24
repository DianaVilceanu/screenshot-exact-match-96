import { createFileRoute } from "@tanstack/react-router";
import { Reports } from "@/studio/pages/Reports";

export const Route = createFileRoute("/studio/reports")({
  head: () => ({ meta: [{ title: "Reports | Command Center" }] }),
  component: Reports,
});
