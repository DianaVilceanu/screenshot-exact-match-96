import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  avg,
  best,
  fmtIndex,
  fmtNum,
  fmtPct,
  fmtSigned,
  groupStats,
  monthLabel,
  monthOf,
  monthlyGrowth,
  monthlySeries,
  total,
  type GroupStat,
} from "../lib/analytics";
import { useScope } from "../lib/hooks";
import { FORMAT_LABEL, PLATFORM_LABEL, type Format, type Platform } from "../lib/types";
import { FilterBar } from "../components/FilterBar";
import { HBar, MonthBars, MonthLine } from "../components/charts";
import {
  Card,
  Empty,
  Notice,
  PageHeader,
  PLATFORM_COLOR,
  Select,
  Stat,
  Tentative,
} from "../components/ui";
import { PostTable } from "../components/PostTable";

export function Overview() {
  const { ws, rows, posts, brand, brandName, campaignName, settings } = useScope();
  const [metric, setMetric] = useState<"views" | "reach" | "engagement">("views");
  const min = settings.minSample;

  if (!ws.brands.length)
    return (
      <>
        <PageHeader
          eyebrow="Overview"
          title="Welcome to your Command Center"
          description="One place to manage every brand, analyse what you've published and plan what's next. Every number here comes from data you import."
        />
        <Empty
          title="Start with your first brand"
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/studio/brands"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                Create a brand
              </Link>
              <Link
                to="/studio/settings"
                className="inline-flex h-9 items-center rounded-md border px-4 text-sm"
              >
                Explore with demo data
              </Link>
            </div>
          }
        >
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-left">
            <li>Create the brand profile: audience, tone, platforms and pillars.</li>
            <li>Import your content plan (Canva export, CSV, Excel or PDF).</li>
            <li>Import analytics exports from Meta Business Suite and TikTok.</li>
            <li>Review uncertain matches, then explore the insights.</li>
          </ol>
        </Empty>
      </>
    );

  const withMetrics = rows.filter((r) => r.d.hasMetrics);
  const views = total(rows, (r) => r.d.views);
  const reach = total(rows, (r) => r.d.reach);
  const eng = total(rows, (r) => r.d.engagement);
  const er = avg(rows, (r) => r.d.er);
  const shares = total(rows, (r) => r.d.m.shares);
  const saves = total(rows, (r) => r.d.m.saves);
  const growth = monthlyGrowth(rows, (r) => r.d[metric === "engagement" ? "engagement" : metric]);
  const brandsG = groupStats(rows, (r) => r.post.brandId, brandName, min);
  const platG = groupStats(
    rows,
    (r) => r.post.platform,
    (k) => PLATFORM_LABEL[k as Platform],
    min,
  );
  const fmtG = groupStats(
    rows,
    (r) => r.post.format,
    (k) => FORMAT_LABEL[k as Format],
    min,
  );
  const pillG = groupStats(
    rows,
    (r) => r.post.pillar || undefined,
    (k) => k,
    min,
  );
  const series = monthlySeries(rows);
  const pick = (s: (typeof series)[number]) =>
    metric === "views" ? s.views : metric === "reach" ? s.reach : s.engagement;

  return (
    <>
      <PageHeader
        eyebrow={brand ? "Brand overview" : "All brands"}
        title={brand ? brand.name : "Overview"}
        description={
          <>
            {rows.length} published posts in scope ({withMetrics.length} with performance data) ·{" "}
            {posts.length - rows.length} planned or in progress.
          </>
        }
        actions={
          <Link
            to="/studio/import"
            className="inline-flex h-9 items-center rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground"
          >
            Import data
          </Link>
        }
      />
      <FilterBar />

      {rows.length > 0 && withMetrics.length === 0 && (
        <Notice tone="warn" className="mb-5">
          None of the published posts in scope have performance data yet, so the metrics show as
          unavailable. Import an analytics export or enter metrics on a post.
        </Notice>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          label="Posts published"
          value={fmtNum(rows.length)}
          hint={`${withMetrics.length} with metrics`}
        />
        <Stat label="Total views" value={fmtNum(views.value)} total={views} />
        <Stat label="Total reach" value={fmtNum(reach.value)} total={reach} />
        <Stat
          label="Total engagement"
          value={fmtNum(eng.value)}
          total={eng}
          hint="Likes + comments + shares + saves"
        />
        <Stat
          label="Avg engagement rate"
          value={fmtPct(er.value, 2)}
          total={er}
          hint={`Engagement ÷ ${settings.erBasis} (mean per post)`}
        />
        <Stat label="Total shares" value={fmtNum(shares.value)} total={shares} />
        <Stat label="Total saves" value={fmtNum(saves.value)} total={saves} />
        <Stat
          label={`Monthly growth · ${metric}`}
          value={
            growth ? (
              fmtSigned(growth.pct)
            ) : (
              <span className="text-base font-normal text-muted-foreground">Unavailable</span>
            )
          }
          hint={
            growth
              ? `${growth.from} → ${growth.to}${growth.partial ? " · some posts missing data" : ""}`
              : "Needs two months with this metric"
          }
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <BestCard label="Best performing brand" g={best(brandsG)} groups={brandsG} min={min} />
        <BestCard label="Best performing platform" g={best(platG)} groups={platG} min={min} />
        <BestCard label="Best performing format" g={best(fmtG)} groups={fmtG} min={min} />
        <BestCard label="Best performing pillar" g={best(pillG)} groups={pillG} min={min} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="Monthly performance"
          subtitle="Totals from the latest snapshot of each post, by publish month"
          action={
            <Select
              value={metric}
              onChange={(e) => setMetric(e.target.value as typeof metric)}
              className="h-8 w-36 text-xs"
              aria-label="Metric"
            >
              <option value="views">Views</option>
              <option value="reach">Reach</option>
              <option value="engagement">Engagement</option>
            </Select>
          }
        >
          <MonthBars
            data={series.map((s) => ({ label: s.label, value: pick(s).value, n: pick(s).n }))}
          />
        </Card>
        <Card title="Median engagement rate by month">
          <MonthLine
            data={series.map((s) => ({ label: s.label, value: s.medianEr, n: s.posts }))}
            fmt={(v) => fmtPct(v)}
          />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Platforms" subtitle="Median engagement rate">
          <HBar
            data={platG.map((g) => ({
              label: g.label,
              value: g.medianEr,
              n: g.n,
              color: PLATFORM_COLOR[g.key as Platform],
              sufficient: g.sufficient,
            }))}
            fmt={(v) => fmtPct(v)}
          />
        </Card>
        <Card title="Formats" subtitle="Median engagement rate">
          <HBar
            data={fmtG
              .sort((a, b) => (b.medianEr ?? 0) - (a.medianEr ?? 0))
              .map((g) => ({
                label: g.label,
                value: g.medianEr,
                n: g.n,
                sufficient: g.sufficient,
              }))}
            fmt={(v) => fmtPct(v)}
          />
        </Card>
        <Card title="Content pillars" subtitle="Median engagement rate">
          <HBar
            data={pillG
              .sort((a, b) => (b.medianEr ?? 0) - (a.medianEr ?? 0))
              .map((g) => ({
                label: g.label,
                value: g.medianEr,
                n: g.n,
                sufficient: g.sufficient,
              }))}
            fmt={(v) => fmtPct(v)}
          />
        </Card>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Faded bars have fewer than {min} posts with metrics: shown, but not ranked.
      </p>

      {!brand && ws.brands.length > 1 && (
        <Card className="mt-4" title="Brand comparison">
          <GroupTable groups={brandsG} />
        </Card>
      )}

      <Card
        className="mt-4"
        title="Top posts in scope"
        subtitle="Ranked by engagement index: the post's ER compared with the median for the same brand and platform"
        action={
          <Link to="/studio/analytics" className="text-xs underline">
            All analytics →
          </Link>
        }
      >
        <PostTable
          rows={rows.filter((r) => r.erIndex != null)}
          initialSort={{ col: "index", dir: "desc" }}
          limit={8}
          rank
          cols={[
            "date",
            "brand",
            "platform",
            "format",
            "title",
            "views",
            "er",
            "index",
            "shares",
            "saves",
          ]}
        />
      </Card>

      {ws.campaigns.length > 0 && (
        <Card className="mt-4" title="Campaigns">
          <GroupTable
            groups={groupStats(
              rows,
              (r) => r.post.campaignId,
              (k) => campaignName(k),
              min,
            )}
          />
        </Card>
      )}
      <p className="mt-6 text-[11px] text-muted-foreground">
        Months in data:{" "}
        {[...new Set(rows.map((r) => monthOf(r.post.date)).filter(Boolean))]
          .sort()
          .map(monthLabel)
          .join(", ") || "none"}
        .
      </p>
    </>
  );
}

function BestCard({
  label,
  g,
  groups,
  min,
}: {
  label: string;
  g?: GroupStat | undefined;
  groups: GroupStat[];
  min: number;
}) {
  return (
    <div className="rounded-[var(--radius)] border bg-card px-4 py-3.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      {g ? (
        <>
          <p className="mt-1.5 truncate text-lg font-semibold">{g.label}</p>
          <p className="text-[11px] text-muted-foreground">
            {fmtIndex(g.medianIndex)} typical ER · median ER {fmtPct(g.medianEr)} · n={g.n}
          </p>
        </>
      ) : (
        <>
          <p className="mt-1.5 text-sm text-muted-foreground">Not enough data</p>
          <p className="text-[11px] text-muted-foreground">
            {groups.length ? `Needs ${min}+ posts with metrics per group` : "No groups to compare"}
          </p>
        </>
      )}
    </div>
  );
}

export function GroupTable({ groups }: { groups: GroupStat[] }) {
  if (!groups.length) return <p className="text-sm text-muted-foreground">No data.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-[13px] tabular-nums">
        <thead>
          <tr className="border-b text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            <th className="py-2 pr-2 font-medium">Group</th>
            <th className="px-2 text-right font-medium">Posts</th>
            <th className="px-2 text-right font-medium">With metrics</th>
            <th className="px-2 text-right font-medium">Views</th>
            <th className="px-2 text-right font-medium">Reach</th>
            <th className="px-2 text-right font-medium">Engagement</th>
            <th className="px-2 text-right font-medium">Median ER</th>
            <th className="px-2 text-right font-medium">vs typical</th>
            <th className="px-2 font-medium" />
          </tr>
        </thead>
        <tbody>
          {[...groups]
            .sort((a, b) => (b.medianIndex ?? -1) - (a.medianIndex ?? -1))
            .map((g) => (
              <tr key={g.key} className="border-b last:border-0">
                <td className="py-2 pr-2 font-medium">{g.label}</td>
                <td className="px-2 text-right">{g.n}</td>
                <td className="px-2 text-right">{g.withMetrics}</td>
                <td className="px-2 text-right">{fmtNum(g.views)}</td>
                <td className="px-2 text-right">{fmtNum(g.reach)}</td>
                <td className="px-2 text-right">{fmtNum(g.engagement)}</td>
                <td className="px-2 text-right">{fmtPct(g.medianEr)}</td>
                <td className="px-2 text-right">{fmtIndex(g.medianIndex)}</td>
                <td className="px-2">
                  {!g.sufficient && <Tentative label="Small sample" n={g.withMetrics} />}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
