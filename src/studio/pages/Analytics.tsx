import { useState } from "react";
import {
  defined,
  fmtIndex,
  fmtNum,
  fmtPct,
  groupStats,
  median,
  monthLabel,
  monthOf,
  type Row,
} from "../lib/analytics";
import { useScope } from "../lib/hooks";
import { findPatterns, hookKind, HOOK_LABEL, type HookKind } from "../lib/insights";
import { FORMAT_LABEL, PLATFORM_LABEL, isVideo, type Format, type Platform } from "../lib/types";
import { FilterBar } from "../components/FilterBar";
import { HBar, TimingHeatmap } from "../components/charts";
import { PostTable, type Col } from "../components/PostTable";
import {
  Card,
  Empty,
  Notice,
  PageHeader,
  PLATFORM_COLOR,
  Select,
  Tabs,
  Tentative,
} from "../components/ui";
import { GroupTable } from "./Overview";
import { FindingCard } from "./Working";

type Tab = "top" | "compare" | "timing" | "hooks" | "patterns" | "archive";
type TopMetric = "views" | "reach" | "er" | "shares" | "saves" | "meaningful";
const TOP: Record<TopMetric, { label: string; col: Col; pick: (r: Row) => number | undefined }> = {
  views: { label: "Views", col: "views", pick: (r) => r.d.views },
  reach: { label: "Reach", col: "reach", pick: (r) => r.d.reach },
  er: { label: "Engagement rate", col: "er", pick: (r) => r.d.er },
  shares: { label: "Shares", col: "shares", pick: (r) => r.d.m.shares },
  saves: { label: "Saves", col: "saves", pick: (r) => r.d.m.saves },
  meaningful: {
    label: "Meaningful engagement (comments + shares + saves)",
    col: "meaningful",
    pick: (r) => r.d.meaningful,
  },
};

export function Analytics() {
  const { rows, settings, brandName, campaignName } = useScope();
  const [tab, setTab] = useState<Tab>("top");
  const [top, setTop] = useState<TopMetric>("views");
  const [dim, setDim] = useState<"brand" | "platform" | "month" | "pillar" | "format" | "campaign">(
    "platform",
  );
  const min = settings.minSample;
  const withM = rows.filter((r) => r.d.hasMetrics);

  const keyOf: Record<typeof dim, (r: Row) => string | undefined> = {
    brand: (r) => r.post.brandId,
    platform: (r) => r.post.platform,
    month: (r) => monthOf(r.post.date) || undefined,
    pillar: (r) => r.post.pillar || undefined,
    format: (r) => r.post.format,
    campaign: (r) => r.post.campaignId,
  };
  const labelOf: Record<typeof dim, (k: string) => string> = {
    brand: brandName,
    platform: (k) => PLATFORM_LABEL[k as Platform],
    month: monthLabel,
    pillar: (k) => k,
    format: (k) => FORMAT_LABEL[k as Format],
    campaign: (k) => campaignName(k),
  };
  const groups = groupStats(rows, keyOf[dim], labelOf[dim], min);

  return (
    <>
      <PageHeader
        eyebrow="Performance"
        title="Analytics"
        description="Everything you've published, measured on the latest imported snapshot. Posts without data are listed but never counted as zero."
      />
      <FilterBar />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "top", label: "Top 10" },
          { value: "compare", label: "Compare" },
          { value: "timing", label: "Days & times" },
          { value: "hooks", label: "Hooks" },
          { value: "patterns", label: "Format patterns" },
          { value: "archive", label: `Archive (${rows.length})` },
        ]}
      />
      {!withM.length && tab !== "archive" ? (
        <Empty title="No performance data in scope">
          Import an analytics export (Meta Business Suite, TikTok Studio or a CSV/XLSX), or widen
          the filters.
        </Empty>
      ) : (
        <>
          {tab === "top" && (
            <Card
              title={`Top 10 by ${TOP[top].label.toLowerCase()}`}
              subtitle={`${rows.filter((r) => TOP[top].pick(r) != null).length} of ${rows.length} posts have this metric. Posts without it are left out, not counted as zero.`}
              action={
                <Select
                  value={top}
                  onChange={(e) => setTop(e.target.value as TopMetric)}
                  className="h-8 w-48 text-xs"
                  aria-label="Ranking metric"
                >
                  {Object.entries(TOP).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </Select>
              }
            >
              {top === "er" && (
                <Notice className="mb-3">
                  Engagement rate favours small-reach posts. Check the “vs typical” column and views
                  before you draw conclusions.
                </Notice>
              )}
              <PostTable
                rows={rows.filter((r) => TOP[top].pick(r) != null)}
                initialSort={{ col: TOP[top].col, dir: "desc" }}
                limit={10}
                rank
                cols={[
                  "date",
                  "brand",
                  "platform",
                  "format",
                  "title",
                  "views",
                  "reach",
                  "er",
                  "index",
                  "shares",
                  "saves",
                  "meaningful",
                ]}
              />
            </Card>
          )}

          {tab === "compare" && (
            <div className="grid gap-4">
              <Card
                title="Compare performance"
                subtitle="Median ER is less affected by one viral post than the average. “vs typical” compares each post with its own brand and platform."
                action={
                  <Select
                    value={dim}
                    onChange={(e) => setDim(e.target.value as typeof dim)}
                    className="h-8 w-40 text-xs"
                    aria-label="Dimension"
                  >
                    <option value="platform">By platform</option>
                    <option value="brand">By brand</option>
                    <option value="month">By month</option>
                    <option value="pillar">By pillar</option>
                    <option value="format">By format</option>
                    <option value="campaign">By campaign</option>
                  </Select>
                }
              >
                <HBar
                  data={groups
                    .sort((a, b) =>
                      dim === "month"
                        ? a.key.localeCompare(b.key)
                        : (b.medianIndex ?? 0) - (a.medianIndex ?? 0),
                    )
                    .map((g) => ({
                      label: g.label,
                      value: g.medianIndex,
                      n: g.withMetrics,
                      sufficient: g.sufficient,
                      color: dim === "platform" ? PLATFORM_COLOR[g.key as Platform] : undefined,
                    }))}
                  fmt={(v) => fmtIndex(v)}
                />
              </Card>
              <Card title="Detail">
                <GroupTable groups={groups} />
              </Card>
            </div>
          )}

          {tab === "timing" && (
            <Card
              title="Best posting days & times"
              subtitle="Only cells with enough posts are shaded and ranked."
            >
              <TimingHeatmap rows={rows} minSample={min} />
            </Card>
          )}

          {tab === "hooks" && <Hooks rows={rows} min={min} />}

          {tab === "patterns" && <Patterns rows={rows} min={min} />}
        </>
      )}
      {tab === "archive" && (
        <Card
          title="Published content archive"
          subtitle="Searchable from the Content Calendar (table view, “Search the whole archive”). Click a row to see source data and corrections."
        >
          <PostTable
            rows={rows}
            cols={[
              "date",
              "brand",
              "platform",
              "format",
              "pillar",
              "title",
              "views",
              "reach",
              "engagement",
              "er",
              "shares",
              "saves",
              "retention",
            ]}
          />
        </Card>
      )}
    </>
  );
}

function Hooks({ rows, min }: { rows: Row[]; min: number }) {
  const withHook = rows.filter((r) => r.post.hook && r.erIndex != null);
  const kinds = groupStats(
    withHook,
    (r) => hookKind(r.post),
    (k) => HOOK_LABEL[k as HookKind],
    min,
  );
  if (!withHook.length)
    return (
      <Empty title="No hooks recorded">
        Add hooks to your content (or map a “Hook” column on import) to analyse them.
      </Empty>
    );
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card
        className="lg:col-span-2"
        title="Hook structures"
        subtitle="Classified automatically from the hook text"
      >
        <HBar
          data={kinds
            .sort((a, b) => (b.medianIndex ?? 0) - (a.medianIndex ?? 0))
            .map((g) => ({
              label: g.label,
              value: g.medianIndex,
              n: g.n,
              sufficient: g.sufficient,
            }))}
          fmt={(v) => fmtIndex(v)}
        />
        <p className="mt-2 text-[11px] text-muted-foreground">
          Faded bars: fewer than {min} posts.
        </p>
      </Card>
      <Card
        className="lg:col-span-3"
        title="Best performing hooks"
        subtitle={`${withHook.length} posts with a recorded hook`}
      >
        <PostTable
          rows={withHook}
          cols={["date", "platform", "format", "hook", "views", "er", "index"]}
          initialSort={{ col: "index", dir: "desc" }}
          limit={10}
          rank
        />
      </Card>
    </div>
  );
}

function Patterns({ rows, min }: { rows: Row[]; min: number }) {
  const groups: { label: string; rows: Row[] }[] = [
    { label: "Videos & reels", rows: rows.filter((r) => isVideo(r.post.format)) },
    { label: "Static posts", rows: rows.filter((r) => r.post.format === "static") },
    { label: "Carousels", rows: rows.filter((r) => r.post.format === "carousel") },
  ];
  return (
    <div className="space-y-6">
      {groups.map((g) => {
        const scored = g.rows.filter((r) => r.erIndex != null);
        const f = findPatterns(scored, min, `Within ${g.label.toLowerCase()}`).filter(
          (x) => x.dim !== "format",
        );
        const lengths = isVideo(g.rows[0]?.post.format ?? "static")
          ? scored.filter((r) => r.post.videoLength)
          : [];
        return (
          <section key={g.label}>
            <h2 className="mb-2 flex items-center gap-2 font-display text-2xl">
              {g.label}{" "}
              <span className="font-sans text-sm text-muted-foreground">
                ({scored.length} with metrics)
              </span>
            </h2>
            {scored.length < min * 2 ? (
              <Notice>
                Not enough {g.label.toLowerCase()} with metrics to detect patterns (need {min * 2},
                have {scored.length}).
              </Notice>
            ) : f.length ? (
              <div className="grid gap-3 lg:grid-cols-2">
                {f.slice(0, 6).map((x) => (
                  <FindingCard key={x.id} f={x} compact />
                ))}
              </div>
            ) : (
              <Notice>
                No feature stands out (±20%) within {g.label.toLowerCase()}. They perform fairly
                evenly.
              </Notice>
            )}
            {lengths.length >= min && (
              <p className="mt-2 text-xs text-muted-foreground">
                Median video length of top-quartile videos:{" "}
                {median(
                  defined(
                    lengths
                      .sort((a, b) => b.erIndex! - a.erIndex!)
                      .slice(0, Math.ceil(lengths.length / 4))
                      .map((r) => r.post.videoLength),
                  ),
                )}
                s vs {median(defined(lengths.map((r) => r.post.videoLength)))}s overall.
                {lengths.length < min * 2 && <Tentative n={lengths.length} />}
              </p>
            )}
          </section>
        );
      })}
      <p className="text-[11px] text-muted-foreground">
        Numbers: {fmtNum(rows.length)} published posts in scope; patterns compare posts with a
        feature against posts without it in the same group, using {fmtPct(0.2, 0)} as the minimum
        difference.
      </p>
    </div>
  );
}
