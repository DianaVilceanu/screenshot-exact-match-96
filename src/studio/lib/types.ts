/**
 * Social Media Command Center: data model.
 *
 * Integrity rules baked into the shape:
 * - Metrics are never fields on a post. They live in `metrics` as snapshots, each with
 *   its source (import id or manual correction). The *latest* snapshot is the current
 *   value; snapshots are never summed, so re-importing the same export cannot double-count.
 * - Every imported row keeps its raw source cells (`sources[].raw`) so the original file
 *   content is preserved even after the post is corrected.
 * - Manual corrections are logged in `edits` (field, previous value, new value, time).
 */

export const PLATFORMS = ["instagram", "facebook", "tiktok", "other"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const FORMATS = [
  "reel",
  "video",
  "carousel",
  "static",
  "story",
  "text",
  "live",
  "other",
] as const;
export type Format = (typeof FORMATS)[number];

export const STATUSES = ["idea", "planned", "in_production", "ready", "published"] as const;
export type Status = (typeof STATUSES)[number];

export const METRIC_KEYS = [
  "views",
  "reach",
  "impressions",
  "likes",
  "comments",
  "shares",
  "saves",
  "follows",
  "profileVisits",
  "linkClicks",
  "avgWatchTime",
  "retention",
] as const;
export type MetricKey = (typeof METRIC_KEYS)[number];
export type Metrics = { [K in MetricKey]?: number | undefined };

export interface Brand {
  id: string;
  name: string;
  logo?: string | undefined; // data URL, resized on upload
  description: string;
  audience: string;
  industry: string;
  tone: string;
  platforms: Platform[];
  pillars: string[];
  createdAt: string;
  /** Synthetic sandbox data created from Settings. Never real analytics. */
  isDemo?: boolean | undefined;
}

export interface Campaign {
  id: string;
  brandId: string;
  name: string;
  objective: string;
  start?: string | undefined;
  end?: string | undefined;
  notes: string;
}

export interface MetricSnapshot {
  id: string;
  source: "import" | "manual" | "demo";
  importId?: string | undefined;
  capturedAt: string; // ISO timestamp
  values: Metrics;
  note?: string | undefined;
}

export interface SourceRef {
  importId: string;
  rowIndex: number;
  raw: Record<string, string>;
}

export interface EditLog {
  at: string;
  field: string;
  from: string;
  to: string;
}

export interface Post {
  id: string;
  brandId: string;
  date: string; // yyyy-mm-dd, "" if unknown
  time?: string | undefined; // HH:MM, local to the export
  platform: Platform;
  format: Format;
  pillar: string;
  campaignId?: string | undefined;
  title: string;
  topic: string;
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
  brief: string;
  canvaUrl: string;
  postUrl: string;
  /** Platform post/media id from an analytics export, used for exact matching. */
  externalId?: string | undefined;
  status: Status;
  videoLength?: number | undefined; // seconds
  tags: string[]; // manual labels, e.g. "ugc", "before-after"
  notes: string;
  metrics: MetricSnapshot[];
  sources: SourceRef[];
  edits: EditLog[];
  createdAt: string;
  updatedAt: string;
  /** Import that created this post (revert removes it). */
  createdByImport?: string | undefined;
  /** Created by the monthly planner; `planReason` explains why. */
  generated?: boolean | undefined;
  planReason?: string | undefined;
  kpi?: string | undefined;
}

export type ImportKind = "plan" | "analytics";

export interface ImportRecord {
  id: string;
  brandId: string;
  kind: ImportKind;
  fileName: string;
  fileType: string;
  importedAt: string;
  rows: number;
  created: number;
  matched: number;
  merged: number;
  skipped: number;
  mapping: Record<string, string>;
  headers: string[];
  status: "active" | "reverted";
  notes: string[];
}

export const EXPERIMENT_VARIABLES = [
  "hook",
  "video length",
  "format",
  "cta",
  "content pillar",
  "posting time",
  "creative style",
  "other",
] as const;
export type ExperimentVariable = (typeof EXPERIMENT_VARIABLES)[number];

export interface Experiment {
  id: string;
  brandId: string;
  name: string;
  variable: ExperimentVariable;
  hypothesis: string;
  metric: "er" | "views" | "reach" | "shares" | "saves";
  a: { label: string; postIds: string[] };
  b: { label: string; postIds: string[] };
  status: "planned" | "running" | "concluded";
  conclusion: string;
  createdAt: string;
}

export interface Trend {
  id: string;
  brandId: string;
  topic: string;
  relevance: string;
  format: string;
  hook: string;
  cta: string;
  priority: "high" | "medium" | "low";
  /** external = researched with a source; hypothesis = idea to verify. */
  kind: "external" | "hypothesis";
  source: string;
  retrievedAt?: string | undefined;
  createdAt: string;
}

export interface Settings {
  /** Denominator for engagement rate. Falls back to views (flagged) when reach is missing. */
  erBasis: "reach" | "views" | "impressions";
  /** Minimum posts in a group before a finding is reported as a pattern. */
  minSample: number;
  mode: "light" | "dark";
}

export interface Workspace {
  version: 1;
  brands: Brand[];
  campaigns: Campaign[];
  posts: Post[];
  imports: ImportRecord[];
  experiments: Experiment[];
  trends: Trend[];
  settings: Settings;
}

export const emptyWorkspace = (): Workspace => ({
  version: 1,
  brands: [],
  campaigns: [],
  posts: [],
  imports: [],
  experiments: [],
  trends: [],
  settings: { erBasis: "reach", minSample: 5, mode: "light" },
});

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  other: "Other",
};
export const FORMAT_LABEL: Record<Format, string> = {
  reel: "Reel",
  video: "Video",
  carousel: "Carousel",
  static: "Static image",
  story: "Story",
  text: "Text",
  live: "Live",
  other: "Other",
};
export const STATUS_LABEL: Record<Status, string> = {
  idea: "Idea",
  planned: "Planned",
  in_production: "In production",
  ready: "Ready",
  published: "Published",
};
export const METRIC_LABEL: Record<MetricKey, string> = {
  views: "Views",
  reach: "Reach",
  impressions: "Impressions",
  likes: "Likes",
  comments: "Comments",
  shares: "Shares",
  saves: "Saves",
  follows: "Follows",
  profileVisits: "Profile visits",
  linkClicks: "Link clicks",
  avgWatchTime: "Avg watch time (s)",
  retention: "Retention / completion %",
};

/** Video-ish formats share pattern analysis. */
export const isVideo = (f: Format) => f === "reel" || f === "video" || f === "live";
