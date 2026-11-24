import { useMemo, useState } from "react";
import { Download, Printer } from "lucide-react";
import {
  addMonths,
  avg,
  buildRows,
  fmtIndex,
  fmtNum,
  fmtPct,
  fmtSigned,
  groupStats,
  monthLabel,
  monthOf,
  total,
  type Row,
} from "../lib/analytics";
import { downloadCsv } from "../lib/importer";
import { findPatterns, findProblems } from "../lib/insights";
import { useStore, useView } from "../lib/store";
import { FORMAT_LABEL, PLATFORM_LABEL, type Format, type Platform } from "../lib/types";
import { Button, Card, Empty, PageHeader, Select, Tentative } from "../components/ui";

export function Reports() {
  const { ws } = useStore();
  const { brandId, setBrandId } = useView();
  const brand = ws.brands.find((b) => b.id === brandId);
  const all = useMemo(
    () => buildRows(ws).filter((r) => !brand || r.post.brandId === brand.id),
    [ws, brand],
  );
  const months = [...new Set(all.map((r) => monthOf(r.post.date)).filter(Boolean))]
    .sort()
    .reverse();
  const [month, setMonth] = useState(months[0] ?? "");
  const m = months.includes(month) ? month : (months[0] ?? "");
  const cur = all.filter((r) => monthOf(r.post.date) === m);
  const prev = all.filter((r) => monthOf(r.post.date) === addMonths(m, -1));
  const min = ws.settings.minSample;
  const campaignName = (id: string) => ws.campaigns.find((c) => c.id === id)?.name ?? "Unknown";
  const brandName = (id: string) => ws.brands.find((b) => b.id === id)?.name ?? "";

  const kpis: [
    string,
    (rs: Row[]) => { value?: number | undefined; n: number; of: number },
    (v?: number) => string,
  ][] = [
    ["Posts published", (rs) => ({ value: rs.length, n: rs.length, of: rs.length }), fmtNum],
    ["Views", (rs) => total(rs, (r) => r.d.views), fmtNum],
    ["Reach", (rs) => total(rs, (r) => r.d.reach), fmtNum],
    ["Engagement", (rs) => total(rs, (r) => r.d.engagement), fmtNum],
    ["Avg ER", (rs) => avg(rs, (r) => r.d.er), (v) => fmtPct(v, 2)],
    ["Shares", (rs) => total(rs, (r) => r.d.m.shares), fmtNum],
    ["Saves", (rs) => total(rs, (r) => r.d.m.saves), fmtNum],
  ];
  // Patterns: computed on all history up to and including the month, so the report stays reproducible.
  const hist = all.filter((r) => monthOf(r.post.date) <= m);
  const ups = findPatterns(
    hist.filter((r) => r.erIndex != null),
    min,
    "History to date",
  )
    .filter((f) => f.direction === "up")
    .slice(0, 3);
  const problems = findProblems(cur, min, campaignName).slice(0, 3);
  const scored = cur.filter((r) => r.erIndex != null).sort((a, b) => b.erIndex! - a.erIndex!);

  return (
    <>
      <PageHeader
        eyebrow="Reporting"
        title="Monthly report"
        description="A one-page summary you can print or save as a PDF, or export as CSV. Every figure comes from imported data. Missing metrics are shown as unavailable."
        actions={
          <div className="no-print flex gap-2">
            <Select
              value={brand ? brandId : "all"}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-44"
              aria-label="Brand"
            >
              <option value="all">All brands</option>
              {ws.brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
            <Select
              value={m}
              onChange={(e) => setMonth(e.target.value)}
              className="w-36"
              aria-label="Month"
            >
              {months.map((x) => (
                <option key={x} value={x}>
                  {monthLabel(x)}
                </option>
              ))}
            </Select>
            <Button
              variant="outline"
              disabled={!cur.length}
              onClick={() =>
                downloadCsv(`report-${brand?.name ?? "all"}-${m}.csv`, [
                  [
                    "Brand",
                    "Date",
                    "Platform",
                    "Format",
                    "Pillar",
                    "Title",
                    "Views",
                    "Reach",
                    "Likes",
                    "Comments",
                    "Shares",
                    "Saves",
                    "Engagement",
                    "ER",
                    "ER basis",
                    "Index vs typical",
                    "Metrics source",
                  ],
                  ...cur.map((r) => [
                    brandName(r.post.brandId),
                    r.post.date,
                    PLATFORM_LABEL[r.post.platform],
                    FORMAT_LABEL[r.post.format],
                    r.post.pillar,
                    r.post.title,
                    r.d.views,
                    r.d.reach,
                    r.d.m.likes,
                    r.d.m.comments,
                    r.d.m.shares,
                    r.d.m.saves,
                    r.d.engagement,
                    r.d.er?.toFixed(4),
                    r.d.erBasis,
                    r.erIndex?.toFixed(2),
                    r.d.source,
                  ]),
                ])
              }
            >
              <Download className="size-4" /> CSV
            </Button>
            <Button onClick={() => window.print()} disabled={!cur.length}>
              <Printer className="size-4" /> Print / PDF
            </Button>
          </div>
        }
      />
      {!m ? (
        <Empty title="No published content yet">
          Reports appear once you've imported published posts.
        </Empty>
      ) : (
        <div className="space-y-4">
          <Card
            title={`${brand?.name ?? "All brands"} · ${monthLabel(m)}`}
            subtitle={`Compared with ${monthLabel(addMonths(m, -1))}${prev.length ? "" : " (no data for that month)"}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm tabular-nums">
                <thead>
                  <tr className="border-b text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    <th className="py-2 font-medium">Metric</th>
                    <th className="text-right font-medium">{monthLabel(m)}</th>
                    <th className="text-right font-medium">{monthLabel(addMonths(m, -1))}</th>
                    <th className="text-right font-medium">Change</th>
                    <th className="text-right font-medium">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map(([label, f, fmt]) => {
                    const a = f(cur);
                    const b = f(prev);
                    const ch = a.value != null && b.value ? a.value / b.value - 1 : undefined;
                    return (
                      <tr key={label} className="border-b last:border-0">
                        <td className="py-2">{label}</td>
                        <td className="text-right font-medium">
                          {a.n ? fmt(a.value) : "Unavailable"}
                        </td>
                        <td className="text-right text-muted-foreground">
                          {b.n ? fmt(b.value) : "—"}
                        </td>
                        <td className="text-right">{fmtSigned(ch)}</td>
                        <td className="text-right text-xs text-muted-foreground">
                          {a.n}/{a.of}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Coverage = posts that have the metric out of posts published that month. Totals only
              include posts that have the metric.
            </p>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Platforms">
              <MiniGroups
                groups={groupStats(
                  cur,
                  (r) => r.post.platform,
                  (k) => PLATFORM_LABEL[k as Platform],
                  min,
                )}
              />
            </Card>
            <Card title="Formats">
              <MiniGroups
                groups={groupStats(
                  cur,
                  (r) => r.post.format,
                  (k) => FORMAT_LABEL[k as Format],
                  min,
                )}
              />
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Top posts" subtitle="By engagement index">
              <ol className="space-y-1.5 text-sm">
                {scored.slice(0, 5).map((r) => (
                  <li key={r.post.id} className="flex justify-between gap-3">
                    <span className="truncate">
                      {r.post.date.slice(8)} · {PLATFORM_LABEL[r.post.platform]} ·{" "}
                      {r.post.title || r.post.hook}
                    </span>
                    <span className="shrink-0 tabular-nums text-muted-foreground">
                      {fmtIndex(r.erIndex)} · {fmtNum(r.d.views)}
                    </span>
                  </li>
                ))}
                {!scored.length && (
                  <li className="text-muted-foreground">No metrics this month.</li>
                )}
              </ol>
            </Card>
            <Card
              title="Weakest posts"
              subtitle="Lowest engagement index. Check views before calling them failures."
            >
              <ol className="space-y-1.5 text-sm">
                {[...scored]
                  .reverse()
                  .slice(0, 5)
                  .map((r) => (
                    <li key={r.post.id} className="flex justify-between gap-3">
                      <span className="truncate">
                        {r.post.date.slice(8)} · {PLATFORM_LABEL[r.post.platform]} ·{" "}
                        {r.post.title || r.post.hook}
                      </span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {fmtIndex(r.erIndex)} · {fmtNum(r.d.views)}
                      </span>
                    </li>
                  ))}
              </ol>
            </Card>
          </div>

          <Card title="Key learnings" subtitle="Patterns across all history up to this month">
            {!ups.length && !problems.length && (
              <p className="text-sm text-muted-foreground">
                Not enough data for reliable patterns yet.
              </p>
            )}
            <ul className="space-y-2 text-sm">
              {ups.map((f) => (
                <li key={f.id}>
                  <strong>Working:</strong> {f.label}, +{Math.round(f.lift * 100)}% engagement vs
                  other posts (n={f.n}). {f.tentative && <Tentative />}
                </li>
              ))}
              {problems.map((p) => (
                <li key={p.id}>
                  <strong>Watch:</strong> {p.title}. {p.recommendation}
                </li>
              ))}
            </ul>
          </Card>
          <p className="text-[11px] text-muted-foreground">
            Generated {new Date().toLocaleString("en-GB")} from the Command Center. ER = engagement
            ÷ {ws.settings.erBasis} (falls back to views when missing).
          </p>
        </div>
      )}
    </>
  );
}

function MiniGroups({ groups }: { groups: ReturnType<typeof groupStats> }) {
  if (!groups.length) return <p className="text-sm text-muted-foreground">No data.</p>;
  return (
    <table className="w-full text-sm tabular-nums">
      <tbody>
        {groups
          .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
          .map((g) => (
            <tr key={g.key} className="border-b last:border-0">
              <td className="py-1.5">{g.label}</td>
              <td className="text-right text-muted-foreground">{g.n} posts</td>
              <td className="text-right">{fmtNum(g.views)} views</td>
              <td className="text-right">{fmtPct(g.medianEr)} ER</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
