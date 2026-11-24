import { createFileRoute } from "@tanstack/react-router";
import { BrandDetail } from "@/studio/pages/Brands";

export const Route = createFileRoute("/studio/brands/$brandId")({
  head: () => ({ meta: [{ title: "Brand | Command Center" }] }),
  component: BrandPage,
});

function BrandPage() {
  const { brandId } = Route.useParams();
  return <BrandDetail brandId={brandId} />;
}
