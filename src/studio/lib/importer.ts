/**
 * Import pipeline: mapped table → normalised rows → match against existing posts → user
 * decisions → commit. Nothing is written until commit. Existing non-empty fields are never
 * overwritten; conflicts are listed instead. Metrics are added as a new snapshot.
 */
import { blankPost, nowIso, uid } from "./store";
import {
  detectDateOrder,
  extractHashtags,
  parseDate,
  parseDuration,
  parseFormat,
  parseNumber,
  parsePlatform,
  parseStatus,
  parseTime,
  similarity,
  splitList,
  urlKey,
  type DateOrder,
  type FieldKey,
} from "./mapping";
import type { Table } from "./parse";
import {
  METRIC_KEYS,
  type ImportKind,
  type ImportRecord,
  type MetricKey,
  type Metrics,
  type Platform,
  type Post,
  type Workspace,
} from "./types";

export interface MappedRow {
  index: number;
  raw: Record<string, string>;
  post: Partial<Post>;
  metrics: Metrics;
  campaignName?: string | undefined;
  warnings: string[];
}

export interface Candidate {
  post: Post;
  score: number;
  reasons: string[];
}

export type Action = "create" | "merge" | "skip";
export interface RowPlan {
  row: MappedRow;
  candidates: Candidate[];
  certainty: "certain" | "likely" | "uncertain" | "none" | "duplicate-metrics";
  /** undefined = waiting for the user's review. */
  action?: Action | undefined;
  targetId?: string | undefined;
}

export interface MapOptions {
  mapping: Record<string, FieldKey>;
  dateOrder: DateOrder;
  defaultPlatform: Platform;
  kind: ImportKind;
}

export function mapRows(
  table: Table,
  opt: MapOptions,
): { rows: MappedRow[]; dateAmbiguous: boolean } {
  const col = (k: FieldKey) => table.headers.filter((h) => opt.mapping[h] === k);
  const dateCols = [...col("datetime"), ...col("date")];
  const allDates = table.rows.flatMap((r) =>
    dateCols.map((h) => r[table.headers.indexOf(h)] ?? ""),
  );
  const detected = detectDateOrder(allDates);
  const order = opt.dateOrder === "auto" ? detected.order : opt.dateOrder;

  const rows = table.rows.map((cells, index): MappedRow => {
    const raw: Record<string, string> = {};
    table.headers.forEach((h, i) => (raw[h] = cells[i] ?? ""));
    const get = (k: FieldKey) =>
      col(k)
        .map((h) => raw[h])
        .filter(Boolean)
        .join(" ")
        .trim();
    const warnings: string[] = [];
    const post: Partial<Post> = {};
    const metrics: Metrics = {};

    const dt = get("datetime") || get("date");
    if (dt) {
      const pd = parseDate(dt, order);
      if (pd) {
        post.date = pd.date;
        if (pd.time) post.time = pd.time;
      } else warnings.push(`Couldn't read date “${dt}”`);
    }
    const t = get("time");
    if (t) post.time = parseTime(t) ?? post.time;

    const plat = get("platform");
    post.platform = parsePlatform(plat) ?? opt.defaultPlatform;
    if (plat && post.platform === "other") warnings.push(`Unknown platform “${plat}”`);
    const fmt = get("format");
    const pf = parseFormat(fmt);
    if (pf) post.format = pf;
    else if (post.platform === "tiktok") post.format = "video";

    for (const k of [
      "title",
      "topic",
      "hook",
      "caption",
      "cta",
      "brief",
      "canvaUrl",
      "postUrl",
      "notes",
      "pillar",
    ] as const) {
      const v = get(k);
      if (v) (post as Record<string, unknown>)[k] = v;
    }
    const pid = get("postId");
    if (pid) post.externalId = pid;
    const tags = get("hashtags");
    post.hashtags = tags
      ? extractHashtags(
          tags.includes("#")
            ? tags
            : tags
                .split(/[\s,;]+/)
                .map((x) => "#" + x.replace(/^#/, ""))
                .join(" "),
        )
      : extractHashtags(post.caption ?? "");
    const lbl = get("tags");
    if (lbl) post.tags = splitList(lbl);
    const st = get("status");
    const ps = parseStatus(st);
    if (ps) post.status = ps;
    else if (st) warnings.push(`Unknown status “${st}”`);
    const len = get("videoLength");
    if (len) post.videoLength = parseDuration(len);
    const camp = get("campaign");

    for (const k of METRIC_KEYS) {
      const v = get(k as FieldKey);
      if (!v) continue;
      const n = k === "avgWatchTime" ? parseDuration(v) : parseNumber(v);
      if (n == null) warnings.push(`Couldn't read ${k} “${v}”`);
      else metrics[k as MetricKey] = n;
    }
    // Title fallback: first line of caption, so the post is identifiable in lists.
    if (!post.title && post.caption) post.title = (post.caption.split(/\n/)[0] ?? "").slice(0, 90);
    if (!post.title && post.topic) post.title = post.topic;

    if (opt.kind === "analytics") post.status = "published";
    return { index, raw, post, metrics, campaignName: camp || undefined, warnings };
  });
  return {
    rows,
    dateAmbiguous: opt.dateOrder === "auto" && detected.ambiguous && allDates.some(Boolean),
  };
}

const dayDiff = (a: string, b: string) => Math.abs((Date.parse(a) - Date.parse(b)) / 864e5);
const textOf = (p: Partial<Post>) =>
  [p.title, p.hook, p.topic, p.caption].filter(Boolean).join(" ");

export function matchRows(
  rows: MappedRow[],
  ws: Workspace,
  brandId: string,
  kind: ImportKind,
): RowPlan[] {
  const pool = ws.posts.filter((p) => p.brandId === brandId);
  return rows.map((row): RowPlan => {
    const r = row.post;
    const cands: Candidate[] = [];
    for (const p of pool) {
      const reasons: string[] = [];
      let score = 0;
      if (r.postUrl && p.postUrl && urlKey(r.postUrl) === urlKey(p.postUrl)) {
        cands.push({ post: p, score: 1, reasons: ["Same post URL"] });
        continue;
      }
      if (r.externalId && p.externalId && r.externalId === p.externalId) {
        cands.push({ post: p, score: 1, reasons: ["Same post ID"] });
        continue;
      }
      if (r.canvaUrl && p.canvaUrl && urlKey(r.canvaUrl) === urlKey(p.canvaUrl)) {
        cands.push({ post: p, score: 0.95, reasons: ["Same Canva design link"] });
        continue;
      }
      if (r.platform && p.platform !== r.platform && r.platform !== "other") continue;
      if (r.date && p.date) {
        const dd = dayDiff(r.date, p.date);
        if (dd > 1) continue;
        score += dd === 0 ? 0.45 : 0.25;
        reasons.push(dd === 0 ? "Same date" : "Date ±1 day");
      } else if (r.date || p.date) continue;
      const sim = similarity(textOf(r), textOf(p));
      if (sim > 0.15) {
        score += 0.45 * sim;
        reasons.push(`Text ${Math.round(sim * 100)}% similar`);
      }
      if (r.format && r.format === p.format) {
        score += 0.1;
        reasons.push("Same format");
      }
      if (score >= 0.45) cands.push({ post: p, score: Math.min(score, 0.99), reasons });
    }
    cands.sort((a, b) => b.score - a.score);
    const top = cands[0];
    const second = cands[1];
    const clear = top && (!second || second.score < top.score - 0.15);

    if (top && top.score >= 0.95 && clear) {
      // Same metrics already on this post → this row was imported before.
      if (kind === "analytics" && hasSameSnapshot(top.post, row.metrics))
        return {
          row,
          candidates: cands,
          certainty: "duplicate-metrics",
          action: "skip",
          targetId: top.post.id,
        };
      return {
        row,
        candidates: cands,
        certainty: "certain",
        action: "merge",
        targetId: top.post.id,
      };
    }
    if (top && top.score >= 0.8 && clear)
      return {
        row,
        candidates: cands,
        certainty: "likely",
        action: "merge",
        targetId: top.post.id,
      };
    if (top) return { row, candidates: cands, certainty: "uncertain" }; // needs review
    return { row, candidates: [], certainty: "none", action: "create" };
  });
}

function hasSameSnapshot(p: Post, m: Metrics) {
  const keys = Object.keys(m) as MetricKey[];
  if (!keys.length) return false;
  return p.metrics.some((s) => keys.every((k) => s.values[k] === m[k]));
}

/** Fields on the target that would differ if we copied the row: reported, never overwritten. */
export function conflicts(target: Post, row: MappedRow) {
  const out: { field: string; existing: string; incoming: string }[] = [];
  for (const [k, v] of Object.entries(row.post)) {
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) continue;
    if (k === "status") continue;
    const cur = (target as unknown as Record<string, unknown>)[k];
    const empty = cur == null || cur === "" || (Array.isArray(cur) && !cur.length);
    if (!empty && String(cur) !== String(v))
      out.push({ field: k, existing: String(cur), incoming: String(v) });
  }
  return out;
}

export interface CommitInput {
  ws: Workspace;
  brandId: string;
  kind: ImportKind;
  fileName: string;
  fileType: string;
  headers: string[];
  mapping: Record<string, FieldKey>;
  plans: RowPlan[];
}

export function commitImport(input: CommitInput): { ws: Workspace; record: ImportRecord } {
  const { brandId, kind, plans } = input;
  let ws = input.ws;
  const importId = uid();
  const at = nowIso();
  const notes: string[] = [];
  const campaigns = [...ws.campaigns];
  const brand = ws.brands.find((b) => b.id === brandId)!;
  const pillars = new Set(brand.pillars);
  const newPillars: string[] = [];

  const campaignId = (name?: string) => {
    if (!name) return undefined;
    let c = campaigns.find(
      (x) => x.brandId === brandId && x.name.toLowerCase() === name.toLowerCase(),
    );
    if (!c) {
      c = {
        id: uid(),
        brandId,
        name,
        objective: "",
        notes: `Created by import of ${input.fileName}`,
      };
      campaigns.push(c);
      notes.push(`Created campaign “${name}”.`);
    }
    return c.id;
  };

  let created = 0,
    merged = 0,
    skipped = 0,
    matched = 0;
  const posts = [...ws.posts];
  for (const plan of plans) {
    const { row } = plan;
    const action = plan.action ?? "skip";
    if (action === "skip") {
      skipped++;
      continue;
    }
    if (row.post.pillar && !pillars.has(row.post.pillar)) {
      pillars.add(row.post.pillar);
      newPillars.push(row.post.pillar);
    }
    const source = { importId, rowIndex: row.index, raw: row.raw };
    const snap = Object.keys(row.metrics).length
      ? [
          {
            id: uid(),
            source: "import" as const,
            importId,
            capturedAt: at,
            values: row.metrics,
            note: input.fileName,
          },
        ]
      : [];
    if (action === "create") {
      const p = blankPost(brandId, {
        ...row.post,
        status: row.post.status ?? (kind === "analytics" ? "published" : "planned"),
        campaignId: campaignId(row.campaignName),
        metrics: snap,
        sources: [source],
        createdByImport: importId,
        createdAt: at,
        updatedAt: at,
      });
      posts.push(p);
      created++;
    } else {
      const i = posts.findIndex((p) => p.id === plan.targetId);
      if (i < 0) {
        skipped++;
        continue;
      }
      const t = posts[i]!;
      const fill: Partial<Post> = {};
      const edits = [...t.edits];
      for (const [k, v] of Object.entries(row.post)) {
        if (v == null || v === "" || (Array.isArray(v) && !v.length)) continue;
        const cur = (t as unknown as Record<string, unknown>)[k];
        const empty = cur == null || cur === "" || (Array.isArray(cur) && !cur.length);
        if (empty) (fill as Record<string, unknown>)[k] = v;
      }
      // Analytics prove a post went live; that's the one field we advance (logged).
      if (kind === "analytics" && t.status !== "published") {
        fill.status = "published";
        edits.push({
          at,
          field: "status",
          from: t.status,
          to: "published (from analytics import)",
        });
      } else delete fill.status;
      if (!t.campaignId && row.campaignName) fill.campaignId = campaignId(row.campaignName);
      posts[i] = {
        ...t,
        ...fill,
        edits,
        metrics: [...t.metrics, ...snap],
        sources: [...t.sources, source],
        updatedAt: at,
      };
      if (kind === "analytics") matched++;
      else merged++;
    }
  }
  if (newPillars.length) notes.push(`Added pillar(s) to brand: ${newPillars.join(", ")}.`);
  const record: ImportRecord = {
    id: importId,
    brandId,
    kind,
    fileName: input.fileName,
    fileType: input.fileType,
    importedAt: at,
    rows: plans.length,
    created,
    matched,
    merged,
    skipped,
    mapping: input.mapping,
    headers: input.headers,
    status: "active",
    notes,
  };
  ws = {
    ...ws,
    posts,
    campaigns,
    brands: ws.brands.map((b) => (b.id === brandId ? { ...b, pillars: [...pillars] } : b)),
    imports: [record, ...ws.imports],
  };
  return { ws, record };
}

/* ---------------- templates (headers only, no example data) ---------------- */

export const PLAN_TEMPLATE = [
  "Date",
  "Time",
  "Platform",
  "Format",
  "Content pillar",
  "Campaign",
  "Title",
  "Topic",
  "Hook",
  "Caption",
  "CTA",
  "Hashtags",
  "Creative brief",
  "Canva link",
  "Status",
];
export const ANALYTICS_TEMPLATE = [
  "Publish time",
  "Platform",
  "Post type",
  "Permalink",
  "Post ID",
  "Title",
  "Description",
  "Duration",
  "Views",
  "Reach",
  "Impressions",
  "Likes",
  "Comments",
  "Shares",
  "Saves",
  "Follows",
  "Average watch time",
  "Watched full video (%)",
];

export function downloadCsv(name: string, rows: (string | number | undefined)[][]) {
  const esc = (v: string | number | undefined) => {
    const s = v == null ? "" : String(v);
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const blob = new Blob(["﻿" + rows.map((r) => r.map(esc).join(",")).join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
