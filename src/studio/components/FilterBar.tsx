import { useMemo } from "react";
import { X } from "lucide-react";
import { defaultFilters, useStore, useView, type Filters } from "../lib/store";
import { monthLabel, monthOf } from "../lib/analytics";
import { FORMATS, FORMAT_LABEL, PLATFORMS, PLATFORM_LABEL } from "../lib/types";
import { Button, Input, Select } from "./ui";

type Key = keyof Filters | "brand";

export function FilterBar({
  show = ["brand", "platform", "month", "from", "to", "format", "campaign", "pillar"],
}: {
  show?: Key[];
}) {
  const { ws } = useStore();
  const { brandId, setBrandId, filters, setFilters } = useView();
  const set = (k: keyof Filters, v: string) => setFilters({ ...filters, [k]: v });
  const scoped = brandId === "all" ? ws.posts : ws.posts.filter((p) => p.brandId === brandId);
  const months = useMemo(
    () => [...new Set(scoped.map((p) => monthOf(p.date)).filter(Boolean))].sort().reverse(),
    [scoped],
  );
  const pillars = useMemo(() => {
    const fromBrands = (
      brandId === "all" ? ws.brands : ws.brands.filter((b) => b.id === brandId)
    ).flatMap((b) => b.pillars);
    return [...new Set([...fromBrands, ...scoped.map((p) => p.pillar)].filter(Boolean))].sort();
  }, [ws.brands, scoped, brandId]);
  const campaigns = ws.campaigns.filter((c) => brandId === "all" || c.brandId === brandId);
  const active = Object.entries(filters).some(([k, v]) => v !== defaultFilters[k as keyof Filters]);

  return (
    <div className="no-print mb-6 grid grid-cols-2 gap-2.5 rounded-[var(--radius)] border bg-card p-3 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
      {show.includes("brand") && (
        <Select label="Brand" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
          <option value="all">All brands</option>
          {ws.brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
      )}
      {show.includes("platform") && (
        <Select
          label="Platform"
          value={filters.platform}
          onChange={(e) => set("platform", e.target.value)}
        >
          <option value="all">All platforms</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_LABEL[p]}
            </option>
          ))}
        </Select>
      )}
      {show.includes("month") && (
        <Select label="Month" value={filters.month} onChange={(e) => set("month", e.target.value)}>
          <option value="all">All months</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
        </Select>
      )}
      {show.includes("from") && (
        <Input
          label="From"
          type="date"
          value={filters.from}
          onChange={(e) => set("from", e.target.value)}
        />
      )}
      {show.includes("to") && (
        <Input
          label="To"
          type="date"
          value={filters.to}
          onChange={(e) => set("to", e.target.value)}
        />
      )}
      {show.includes("format") && (
        <Select
          label="Content type"
          value={filters.format}
          onChange={(e) => set("format", e.target.value)}
        >
          <option value="all">All formats</option>
          {FORMATS.map((f) => (
            <option key={f} value={f}>
              {FORMAT_LABEL[f]}
            </option>
          ))}
        </Select>
      )}
      {show.includes("campaign") && (
        <Select
          label="Campaign"
          value={filters.campaign}
          onChange={(e) => set("campaign", e.target.value)}
        >
          <option value="all">All campaigns</option>
          <option value="">No campaign</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      )}
      {show.includes("pillar") && (
        <Select
          label="Pillar"
          value={filters.pillar}
          onChange={(e) => set("pillar", e.target.value)}
        >
          <option value="all">All pillars</option>
          {pillars.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      )}
      {active && (
        <div className="flex items-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters(defaultFilters)}
            className="h-9"
          >
            <X className="size-3.5" /> Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
