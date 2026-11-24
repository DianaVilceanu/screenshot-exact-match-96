import { useMemo } from "react";
import { applyFilters, buildRows } from "./analytics";
import { useStore, useView } from "./store";

/** Current scope: selected brand + global filters → posts and analysed rows. */
export function useScope(opts: { ignoreFilters?: boolean | undefined } = {}) {
  const { ws } = useStore();
  const { brandId, filters } = useView();
  const brand = ws.brands.find((b) => b.id === brandId);
  const effectiveBrand = brand ? brandId : "all";
  const posts = useMemo(
    () =>
      opts.ignoreFilters
        ? ws.posts.filter((p) => effectiveBrand === "all" || p.brandId === effectiveBrand)
        : applyFilters(ws.posts, effectiveBrand, filters),
    [ws.posts, effectiveBrand, filters, opts.ignoreFilters],
  );
  const rows = useMemo(() => buildRows(ws, posts), [ws, posts]);
  const brandName = (id: string) => ws.brands.find((b) => b.id === id)?.name ?? "Unknown brand";
  const campaignName = (id?: string) =>
    id ? (ws.campaigns.find((c) => c.id === id)?.name ?? "Unknown campaign") : "No campaign";
  return {
    ws,
    brand,
    brandId: effectiveBrand,
    posts,
    rows,
    brandName,
    campaignName,
    settings: ws.settings,
  };
}
