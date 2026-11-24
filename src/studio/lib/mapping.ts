/** Column mapping (header synonyms, EN + RO + Meta/TikTok export names) and value normalisation. */
import type { Format, MetricKey, Platform, Status } from "./types";

export type FieldKey =
  | "ignore"
  | "date"
  | "time"
  | "datetime"
  | "platform"
  | "format"
  | "title"
  | "topic"
  | "hook"
  | "caption"
  | "cta"
  | "hashtags"
  | "pillar"
  | "campaign"
  | "brief"
  | "canvaUrl"
  | "postUrl"
  | "postId"
  | "status"
  | "videoLength"
  | "tags"
  | "notes"
  | MetricKey;

export interface FieldDef {
  key: FieldKey;
  label: string;
  group: "Identity" | "Content" | "Metrics" | "Other";
  synonyms: string[];
}

export const FIELDS: FieldDef[] = [
  { key: "ignore", label: "— Don't import —", group: "Other", synonyms: [] },
  {
    key: "date",
    label: "Date",
    group: "Identity",
    synonyms: [
      "date",
      "data",
      "post date",
      "publish date",
      "posting date",
      "scheduled date",
      "day",
      "zi",
      "data publicarii",
      "data postarii",
    ],
  },
  {
    key: "time",
    label: "Time",
    group: "Identity",
    synonyms: ["time", "ora", "hour", "posting time", "publish hour"],
  },
  {
    key: "datetime",
    label: "Date + time",
    group: "Identity",
    synonyms: [
      "publish time",
      "published",
      "created time",
      "post time",
      "date posted",
      "posted at",
      "published at",
      "timestamp",
      "create time",
    ],
  },
  {
    key: "platform",
    label: "Platform",
    group: "Identity",
    synonyms: ["platform", "platforma", "network", "channel", "canal", "social network", "retea"],
  },
  {
    key: "postUrl",
    label: "Post URL",
    group: "Identity",
    synonyms: ["permalink", "url", "post url", "link", "post link", "video link", "link postare"],
  },
  {
    key: "postId",
    label: "Post ID",
    group: "Identity",
    synonyms: ["post id", "id", "media id", "video id", "content id"],
  },
  {
    key: "format",
    label: "Format",
    group: "Content",
    synonyms: [
      "format",
      "post type",
      "type",
      "content type",
      "media type",
      "tip",
      "tip continut",
      "tip postare",
      "media product type",
    ],
  },
  {
    key: "title",
    label: "Title",
    group: "Content",
    synonyms: ["title", "titlu", "name", "post title", "content title", "subiect", "headline"],
  },
  {
    key: "topic",
    label: "Topic",
    group: "Content",
    synonyms: ["topic", "tema", "theme", "idea", "idee", "concept", "subject"],
  },
  {
    key: "hook",
    label: "Hook",
    group: "Content",
    synonyms: ["hook", "carlig", "opening line", "first line", "intro"],
  },
  {
    key: "caption",
    label: "Caption",
    group: "Content",
    synonyms: [
      "caption",
      "description",
      "descriere",
      "text",
      "copy",
      "post text",
      "message",
      "mesaj",
      "video description",
    ],
  },
  {
    key: "cta",
    label: "CTA",
    group: "Content",
    synonyms: ["cta", "call to action", "call-to-action", "indemn"],
  },
  {
    key: "hashtags",
    label: "Hashtags",
    group: "Content",
    synonyms: ["hashtags", "hashtag", "tags hashtags"],
  },
  {
    key: "pillar",
    label: "Content pillar",
    group: "Content",
    synonyms: [
      "pillar",
      "content pillar",
      "pilon",
      "pilon continut",
      "category",
      "categorie",
      "bucket",
    ],
  },
  {
    key: "campaign",
    label: "Campaign",
    group: "Content",
    synonyms: ["campaign", "campanie", "campaign name"],
  },
  {
    key: "brief",
    label: "Creative brief",
    group: "Content",
    synonyms: [
      "brief",
      "creative brief",
      "visual",
      "vizual",
      "creative",
      "design notes",
      "art direction",
      "descriere vizual",
    ],
  },
  {
    key: "canvaUrl",
    label: "Canva link",
    group: "Content",
    synonyms: ["canva", "canva link", "canva url", "design link", "design", "link canva"],
  },
  {
    key: "status",
    label: "Status",
    group: "Other",
    synonyms: ["status", "stare", "stage", "etapa"],
  },
  {
    key: "videoLength",
    label: "Video length",
    group: "Content",
    synonyms: ["duration", "video duration", "length", "durata", "video length", "duration (sec)"],
  },
  {
    key: "tags",
    label: "Labels / tags",
    group: "Other",
    synonyms: ["labels", "label", "tags", "etichete"],
  },
  {
    key: "notes",
    label: "Notes",
    group: "Other",
    synonyms: ["notes", "note", "observatii", "comments internal"],
  },
  {
    key: "views",
    label: "Views",
    group: "Metrics",
    synonyms: [
      "views",
      "video views",
      "plays",
      "vizualizari",
      "video plays",
      "total views",
      "afisari video",
    ],
  },
  {
    key: "reach",
    label: "Reach",
    group: "Metrics",
    synonyms: ["reach", "accounts reached", "acoperire", "people reached", "unique reach"],
  },
  {
    key: "impressions",
    label: "Impressions",
    group: "Metrics",
    synonyms: ["impressions", "impresii", "afisari"],
  },
  {
    key: "likes",
    label: "Likes",
    group: "Metrics",
    synonyms: ["likes", "like", "reactions", "aprecieri", "reactii", "likes and reactions"],
  },
  {
    key: "comments",
    label: "Comments",
    group: "Metrics",
    synonyms: ["comments", "comentarii", "comment count"],
  },
  {
    key: "shares",
    label: "Shares",
    group: "Metrics",
    synonyms: ["shares", "distribuiri", "share count", "sends"],
  },
  {
    key: "saves",
    label: "Saves",
    group: "Metrics",
    synonyms: ["saves", "salvari", "saved", "add to favorites", "favorites"],
  },
  {
    key: "follows",
    label: "Follows",
    group: "Metrics",
    synonyms: ["follows", "new followers", "urmaritori noi", "follows gained"],
  },
  {
    key: "profileVisits",
    label: "Profile visits",
    group: "Metrics",
    synonyms: ["profile visits", "vizite profil", "profile views"],
  },
  {
    key: "linkClicks",
    label: "Link clicks",
    group: "Metrics",
    synonyms: ["link clicks", "clicks", "clickuri", "website clicks"],
  },
  {
    key: "avgWatchTime",
    label: "Avg watch time (s)",
    group: "Metrics",
    synonyms: [
      "average watch time",
      "avg watch time",
      "average time watched",
      "timp mediu vizionare",
    ],
  },
  {
    key: "retention",
    label: "Retention / completion %",
    group: "Metrics",
    synonyms: [
      "retention",
      "completion rate",
      "watched full video",
      "watched full video (%)",
      "retentie",
      "full video watched rate",
    ],
  },
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[_\-./]+/g, " ")
    .replace(/[^a-z0-9%() ]+/g, "")
    .replace(/\s+/g, " ")
    .trim();

const SYN = new Map<string, FieldKey>();
for (const f of FIELDS) for (const s of f.synonyms) SYN.set(norm(s), f.key);

export const isKnownHeader = (h: string) =>
  SYN.has(norm(h)) || [...SYN.keys()].some((s) => s.length > 3 && norm(h).includes(s));

/** Auto-maps headers. Exact synonym first, then "contains" match; each field used once. */
export function autoMap(headers: string[]): Record<string, FieldKey> {
  const used = new Set<FieldKey>();
  const out: Record<string, FieldKey> = {};
  for (const h of headers) {
    const k = SYN.get(norm(h));
    if (k && !used.has(k)) {
      out[h] = k;
      used.add(k);
    }
  }
  for (const h of headers) {
    if (out[h]) continue;
    const n = norm(h);
    let hit: FieldKey | undefined;
    let len = 0;
    for (const [s, k] of SYN)
      if (s.length > 3 && n.includes(s) && s.length > len && !used.has(k)) {
        hit = k;
        len = s.length;
      }
    out[h] = hit ?? "ignore";
    if (hit) used.add(hit);
  }
  return out;
}

/* ---------------- value normalisation ---------------- */

export type DateOrder = "auto" | "dmy" | "mdy";

/** Detects day-first vs month-first from a whole column. */
export function detectDateOrder(values: string[]): { order: "dmy" | "mdy"; ambiguous: boolean } {
  let dmy = 0;
  let mdy = 0;
  for (const v of values) {
    const m = v.match(/^\s*(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/);
    if (!m) continue;
    if (+m[1]! > 12) dmy++;
    if (+m[2]! > 12) mdy++;
  }
  if (dmy && !mdy) return { order: "dmy", ambiguous: false };
  if (mdy && !dmy) return { order: "mdy", ambiguous: false };
  return { order: "dmy", ambiguous: true };
}

const MONTHS: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
  ian: 1,
  mai: 5,
  iun: 6,
  iul: 7,
  noi: 11,
  dece: 12,
};

/** Returns { date: yyyy-mm-dd, time?: HH:MM } or null. */
export function parseDate(
  raw: string,
  order: "dmy" | "mdy",
): { date: string; time?: string | undefined } | null {
  const v = raw.trim();
  if (!v) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const timeM = v.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?/i);
  let time: string | undefined;
  if (timeM) {
    let h = +timeM[1]!;
    if (timeM[3]?.toLowerCase() === "pm" && h < 12) h += 12;
    if (timeM[3]?.toLowerCase() === "am" && h === 12) h = 0;
    time = `${pad(h)}:${timeM[2]!}`;
  }
  let y: number, mo: number, d: number;
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) {
    [y, mo, d] = [+m[1]!, +m[2]!, +m[3]!];
    // ISO strings with "T" and Z come from Excel dates; keep the date part.
    if (/T00:00:00(\.000)?Z$/.test(v)) time = undefined;
  } else if ((m = v.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/))) {
    const a = +m[1]!,
      b = +m[2]!;
    y = +m[3]! < 100 ? 2000 + +m[3]! : +m[3]!;
    [d, mo] = order === "dmy" ? [a, b] : [b, a];
  } else if ((m = v.match(/^(\d{1,2})\s+([a-zăâîșțA-Z]{3,})\.?\s+(\d{4})/))) {
    d = +m[1]!;
    mo = MONTHS[m[2]!.toLowerCase().slice(0, 3)] ?? 0;
    y = +m[3]!;
  } else if ((m = v.match(/^([a-zA-Z]{3,})\.?\s+(\d{1,2}),?\s+(\d{4})/))) {
    mo = MONTHS[m[1]!.toLowerCase().slice(0, 3)] ?? 0;
    d = +m[2]!;
    y = +m[3]!;
  } else if (/^\d{5}(\.\d+)?$/.test(v)) {
    // Excel serial date
    const ms = Math.round((+v - 25569) * 86400 * 1000);
    const dt = new Date(ms);
    return { date: `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}` };
  } else return null;
  if (!mo || mo > 12 || !d || d > 31 || y < 2000 || y > 2100) return null;
  return { date: `${y}-${pad(mo)}-${pad(d)}`, time };
}

export function parseTime(raw: string) {
  const m = raw.match(/(\d{1,2})[:.h](\d{2})\s*(am|pm)?/i);
  if (!m) return undefined;
  let h = +m[1]!;
  if (m[3]?.toLowerCase() === "pm" && h < 12) h += 12;
  if (m[3]?.toLowerCase() === "am" && h === 12) h = 0;
  return h < 24 ? `${String(h).padStart(2, "0")}:${m[2]!}` : undefined;
}

/** "1,234" "1.234" (thousands) "12.5K" "3.4M" "4,5%" → number; "", "-", "n/a" → undefined. */
export function parseNumber(raw: string): number | undefined {
  let v = raw.trim().toLowerCase().replace(/\s/g, "");
  if (!v || v === "-" || v === "—" || v === "n/a" || v === "na" || v === "null") return undefined;
  let mult = 1;
  if (/k$/.test(v)) {
    mult = 1e3;
    v = v.slice(0, -1);
  } else if (/m$/.test(v)) {
    mult = 1e6;
    v = v.slice(0, -1);
  }
  v = v.replace(/%$/, "");
  if (/^\d{1,3}([.,]\d{3})+$/.test(v)) v = v.replace(/[.,]/g, "");
  else if (/^\d+,\d+$/.test(v)) v = v.replace(",", ".");
  else v = v.replace(/,/g, "");
  const n = Number(v);
  return Number.isFinite(n) ? n * mult : undefined;
}

/** "0:45" "1:02" "45s" "45" → seconds. */
export function parseDuration(raw: string): number | undefined {
  const v = raw.trim();
  const mmss = v.match(/^(\d+):(\d{2})$/);
  if (mmss) return +mmss[1]! * 60 + +mmss[2]!;
  const n = parseNumber(v.replace(/s(ec)?$/i, ""));
  return n;
}

export function parsePlatform(raw: string): Platform | undefined {
  const v = raw.toLowerCase();
  if (!v.trim()) return undefined;
  if (/insta|\big\b/.test(v)) return "instagram";
  if (/face|\bfb\b|meta/.test(v)) return "facebook";
  if (/tik ?tok|\btt\b/.test(v)) return "tiktok";
  return "other";
}

export function parseFormat(raw: string): Format | undefined {
  const v = raw.toLowerCase();
  if (!v.trim()) return undefined;
  if (/reel/.test(v)) return "reel";
  if (/carou|carusel|album|slides?/.test(v)) return "carousel";
  if (/stor/.test(v)) return "story";
  if (/live/.test(v)) return "live";
  if (/video|clip|tiktok/.test(v)) return "video";
  if (/image|photo|static|imagine|foto|post|graphic|single/.test(v)) return "static";
  if (/text|status/.test(v)) return "text";
  return "other";
}

export function parseStatus(raw: string): Status | undefined {
  const v = raw.toLowerCase();
  if (!v.trim()) return undefined;
  if (/publi|posted|live|done|postat/.test(v)) return "published";
  if (/ready|approved|gata|aprobat|scheduled|programat/.test(v)) return "ready";
  if (/prod|progress|design|lucru|editing/.test(v)) return "in_production";
  if (/plan/.test(v)) return "planned";
  if (/idea|idee|draft|backlog/.test(v)) return "idea";
  return undefined;
}

export const extractHashtags = (s: string) => [
  ...new Set((s.match(/#[\p{L}\p{N}_]+/gu) ?? []).map((h) => h.toLowerCase())),
];
export const splitList = (s: string) =>
  s
    .split(/[,;|]/)
    .map((x) => x.trim())
    .filter(Boolean);

/** Canonical URL key for matching: lowercase host+path, no query/hash/trailing slash. */
export function urlKey(u: string) {
  const v = u.trim();
  if (!v) return "";
  try {
    const url = new URL(v.startsWith("http") ? v : `https://${v}`);
    return (url.host.replace(/^www\.|^m\./, "") + url.pathname.replace(/\/+$/, "")).toLowerCase();
  } catch {
    return v.toLowerCase();
  }
}

/** Token-set similarity (0–1) for titles/captions. */
export function similarity(a: string, b: string) {
  const tok = (s: string) =>
    new Set(
      norm(s)
        .split(" ")
        .filter((w) => w.length > 2),
    );
  const A = tok(a);
  const B = tok(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return (inter / Math.min(A.size, B.size)) * ((2 * inter) / (A.size + B.size)) ** 0.5;
}
