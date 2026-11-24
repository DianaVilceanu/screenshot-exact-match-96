import type { Filters } from "./store";
import type { Metrics, Post, Settings, Workspace } from "./types";

/* ------------------------------------------------------------------ */
/* Per-post derived metrics                                            */
/* ------------------------------------------------------------------ */

export interface Derived {
  m: Metrics; // latest snapshot values (never summed)
  hasMetrics: boolean;
  views?: number | undefined;
  reach?: number | undefined;
  engagement?: number | undefined; // likes + comments + shares + saves (only fields present)
  meaningful?: number | undefined; // comments + shares + saves
  er?: number | undefined; // engagement / basis
  erBasis?: "reach" | "views" | "impressions" | undefined;
  erFallback: boolean; // true when the preferred basis was missing
  meaningfulRate?: number | undefined;
  shareRate?: number | undefined;
  saveRate?: number | undefined;
  source: string; // where the metrics came from
}

export function latest(post: Post) {
  if (!post.metrics.length) return undefined;
  return [...post.metrics].sort((a, b) => a.capturedAt.localeCompare(b.capturedAt)).at(-1);
}

const sumDefined = (...xs: (number | undefined)[]) => {
  const d = xs.filter((x): x is number => typeof x === "number");
  return d.length ? d.reduce((a, b) => a + b, 0) : undefined;
};

export function derive(post: Post, settings: Settings): Derived {
  const snap = latest(post);
  const m = snap?.values ?? {};
  const engagement = sumDefined(m.likes, m.comments, m.shares, m.saves);
  const meaningful = sumDefined(m.comments, m.shares, m.saves);
  const order: Derived["erBasis"][] = [settings.erBasis, "reach", "views", "impressions"];
  let erBasis: Derived["erBasis"];
  for (const b of order)
    if (b && m[b] && m[b]! > 0) {
      erBasis = b;
      break;
    }
  const denom = erBasis ? m[erBasis] : undefined;
  const rate = (x?: number) => (x != null && denom ? x / denom : undefined);
  return {
    m,
    hasMetrics: !!snap && Object.keys(m).length > 0,
    views: m.views,
    reach: m.reach,
    engagement,
    meaningful,
    er: rate(engagement),
    erBasis,
    erFallback: !!erBasis && erBasis !== settings.erBasis,
    meaningfulRate: rate(meaningful),
    shareRate: rate(m.shares),
    saveRate: rate(m.saves),
    source: !snap
      ? "none"
      : snap.source === "manual"
        ? "Manual entry"
        : snap.source === "demo"
          ? "Synthetic demo"
          : "Import",
  };
}

export interface Row {
  post: Post;
  d: Derived;
  /** ER relative to the median ER of the same brand + platform (1 = typical). */
  erIndex?: number | undefined;
  viewsIndex?: number | undefined;
}

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

export function median(xs: number[]) {
  if (!xs.length) return undefined;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}
export const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : undefined;
export const defined = <T>(xs: (T | undefined | null)[]) =>
  xs.filter((x): x is T => x != null && !(typeof x === "number" && Number.isNaN(x)));

/* ------------------------------------------------------------------ */
/* Building rows with platform-normalised indices                      */
/* ------------------------------------------------------------------ */

export function buildRows(ws: Workspace, posts: Post[] = ws.posts): Row[] {
  const published = posts.filter((p) => p.status === "published");
  // Baselines are computed over *all* published posts of a brand+platform, not just the filtered set,
  // so an index means the same thing on every screen.
  const baseline = new Map<string, { er?: number | undefined; views?: number | undefined }>();
  const groups = new Map<string, Derived[]>();
  for (const p of ws.posts) {
    if (p.status !== "published") continue;
    const k = `${p.brandId}|${p.platform}`;
    const arr = groups.get(k) ?? [];
    arr.push(derive(p, ws.settings));
    groups.set(k, arr);
  }
  for (const [k, ds] of groups) {
    baseline.set(k, {
      er: median(defined(ds.map((d) => d.er))),
      views: median(defined(ds.map((d) => d.views))),
    });
  }
  return published.map((post) => {
    const d = derive(post, ws.settings);
    const b = baseline.get(`${post.brandId}|${post.platform}`);
    return {
      post,
      d,
      erIndex: d.er != null && b?.er ? d.er / b.er : undefined,
      viewsIndex: d.views != null && b?.views ? d.views / b.views : undefined,
    };
  });
}

/* ------------------------------------------------------------------ */
/* Filters                                                             */
/* ------------------------------------------------------------------ */

export function applyFilters(posts: Post[], brandId: string, f: Filters) {
  return posts.filter((p) => {
    if (brandId !== "all" && p.brandId !== brandId) return false;
    if (f.platform !== "all" && p.platform !== f.platform) return false;
    if (f.format !== "all" && p.format !== f.format) return false;
    if (f.pillar !== "all" && p.pillar !== f.pillar) return false;
    if (f.campaign !== "all" && (p.campaignId ?? "") !== f.campaign) return false;
    if (f.month !== "all" && !p.date.startsWith(f.month)) return false;
    if (f.from && (!p.date || p.date < f.from)) return false;
    if (f.to && (!p.date || p.date > f.to)) return false;
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Totals with coverage                                                */
/* ------------------------------------------------------------------ */

export interface Total {
  value?: number | undefined;
  n: number; // posts that had the metric
  of: number; // posts considered
}

export function total(rows: Row[], pick: (r: Row) => number | undefined): Total {
  const vals = defined(rows.map(pick));
  return {
    value: vals.length ? vals.reduce((a, b) => a + b, 0) : undefined,
    n: vals.length,
    of: rows.length,
  };
}
export function avg(rows: Row[], pick: (r: Row) => number | undefined): Total {
  const vals = defined(rows.map(pick));
  return { value: mean(vals), n: vals.length, of: rows.length };
}

/* ------------------------------------------------------------------ */
/* Grouping & comparison                                               */
/* ------------------------------------------------------------------ */

export interface GroupStat {
  key: string;
  label: string;
  rows: Row[];
  n: number;
  withMetrics: number;
  views?: number | undefined;
  reach?: number | undefined;
  engagement?: number | undefined;
  shares?: number | undefined;
  saves?: number | undefined;
  medianEr?: number | undefined;
  meanEr?: number | undefined;
  medianIndex?: number | undefined; // median platform-normalised ER index
  medianViewsIndex?: number | undefined;
  sufficient: boolean;
}

export function groupStats(
  rows: Row[],
  keyOf: (r: Row) => string | undefined,
  labelOf: (key: string) => string,
  minSample: number,
): GroupStat[] {
  const map = new Map<string, Row[]>();
  for (const r of rows) {
    const k = keyOf(r);
    if (!k) continue;
    map.set(k, [...(map.get(k) ?? []), r]);
  }
  return [...map.entries()].map(([key, rs]) => {
    const ers = defined(rs.map((r) => r.d.er));
    const withMetrics = rs.filter((r) => r.d.hasMetrics).length;
    return {
      key,
      label: labelOf(key),
      rows: rs,
      n: rs.length,
      withMetrics,
      views: total(rs, (r) => r.d.views).value,
      reach: total(rs, (r) => r.d.reach).value,
      engagement: total(rs, (r) => r.d.engagement).value,
      shares: total(rs, (r) => r.d.m.shares).value,
      saves: total(rs, (r) => r.d.m.saves).value,
      medianEr: median(ers),
      meanEr: mean(ers),
      medianIndex: median(defined(rs.map((r) => r.erIndex))),
      medianViewsIndex: median(defined(rs.map((r) => r.viewsIndex))),
      sufficient: ers.length >= minSample,
    };
  });
}

/** Best group by median normalised ER, only among groups with enough data. */
export function best(groups: GroupStat[]) {
  const ok = groups.filter((g) => g.sufficient && g.medianIndex != null);
  if (!ok.length) return undefined;
  return ok.sort((a, b) => b.medianIndex! - a.medianIndex!)[0];
}

/* ------------------------------------------------------------------ */
/* Time                                                                */
/* ------------------------------------------------------------------ */

export const monthOf = (d: string) => (d ? d.slice(0, 7) : "");
export function monthLabel(ym: string) {
  if (!ym) return "Undated";
  const [y, m] = ym.split("-").map(Number) as [number, number];
  return new Date(y, m - 1, 1).toLocaleString("en-GB", { month: "short", year: "numeric" });
}
export function addMonths(ym: string, n: number) {
  const [y, m] = ym.split("-").map(Number) as [number, number];
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
export const currentMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function weekday(date: string) {
  const d = new Date(date + "T12:00:00");
  return (d.getDay() + 6) % 7; // Mon = 0
}

export function monthlySeries(rows: Row[]) {
  const months = [...new Set(rows.map((r) => monthOf(r.post.date)).filter(Boolean))].sort();
  return months.map((ym) => {
    const rs = rows.filter((r) => monthOf(r.post.date) === ym);
    return {
      month: ym,
      label: monthLabel(ym),
      posts: rs.length,
      views: total(rs, (r) => r.d.views),
      reach: total(rs, (r) => r.d.reach),
      engagement: total(rs, (r) => r.d.engagement),
      medianEr: median(defined(rs.map((r) => r.d.er))),
    };
  });
}

/** Growth of the latest month with data vs the month before it. Requires both months to have the metric. */
export function monthlyGrowth(rows: Row[], pick: (r: Row) => number | undefined) {
  const series = monthlySeries(rows);
  if (series.length < 2) return undefined;
  const cur = series.at(-1)!;
  const prev = series.at(-2)!;
  const sum = (ym: string) =>
    total(
      rows.filter((r) => monthOf(r.post.date) === ym),
      pick,
    );
  const a = sum(prev.month);
  const b = sum(cur.month);
  if (!a.value || b.value == null) return undefined;
  return {
    pct: (b.value - a.value) / a.value,
    from: prev.label,
    to: cur.label,
    partial: a.n < a.of || b.n < b.of,
  };
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export function fmtNum(v?: number) {
  if (v == null) return "—";
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (Math.abs(v) >= 1e4) return (v / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return Math.round(v).toLocaleString("en-GB");
}
export const fmtPct = (v?: number, digits = 1) =>
  v == null ? "—" : (v * 100).toFixed(digits) + "%";
export const fmtIndex = (v?: number) => (v == null ? "—" : v.toFixed(2) + "×");
export const fmtSigned = (v?: number) =>
  v == null ? "—" : (v >= 0 ? "+" : "") + (v * 100).toFixed(0) + "%";
