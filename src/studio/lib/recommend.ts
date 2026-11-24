/**
 * Rule-based recommendation engine. Every output carries `basis`: the historical evidence
 * (findings, posts, numbers) that produced it. When evidence is thin, it says so and the
 * idea is framed as an experiment rather than a proven play.
 */
import { addMonths, defined, median, monthOf, type Row } from "./analytics";
import { findPatterns, hookKind, HOOK_LABEL, type Finding, type HookKind } from "./insights";
import { similarity } from "./mapping";
import {
  FORMAT_LABEL,
  PLATFORM_LABEL,
  type Brand,
  type Experiment,
  type Format,
  type Platform,
  type Post,
  type Trend,
} from "./types";

export interface Idea {
  id: string;
  kind:
    | "idea"
    | "pillar"
    | "format"
    | "hook"
    | "cta"
    | "campaign"
    | "experiment"
    | "repurpose"
    | "direction";
  title: string;
  body: string;
  basis: string;
  evidence: Post[];
  confidence: "proven" | "tentative" | "experiment";
}

/* ---------------- hook templates by structure, filled with brand context ---------------- */

const HOOK_TEMPLATES: Record<Exclude<HookKind, "none">, (topic: string, aud: string) => string> = {
  question: (t, a) => `What do most ${a} get wrong about ${t}?`,
  number: (t) => `3 things about ${t} nobody tells you`,
  negative: (t) => `Stop doing this with ${t}`,
  pov: (t, a) => `POV: you're one of the ${a} finally figuring out ${t}`,
  howto: (t) => `How to get ${t} right in under a minute`,
  statement: (t) => `${cap(t)} is simpler than you think. Here's why.`,
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const audienceOf = (b: Brand) =>
  b.audience ? (b.audience.split(/[,.;]/)[0] ?? "").trim().toLowerCase() : "[your audience]";

export function hookFor(kind: HookKind, topic: string, b: Brand) {
  const k = kind === "none" ? "statement" : kind;
  return HOOK_TEMPLATES[k](topic || "[topic]", audienceOf(b));
}

/* ---------------- ideas ---------------- */

export function generateIdeas(
  brand: Brand,
  rows: Row[],
  minSample: number,
  experiments: Experiment[],
  trends: Trend[],
): Idea[] {
  const mine = rows.filter((r) => r.post.brandId === brand.id && r.erIndex != null);
  const out: Idea[] = [];
  if (mine.length < minSample) {
    out.push({
      id: "need-data",
      kind: "direction",
      title: "Not enough performance data yet",
      body: `This brand has ${mine.length} published post(s) with metrics. Recommendations need at least ${minSample}. Import an analytics export to unlock data-backed ideas. Until then, everything below is an experiment.`,
      basis: `${mine.length} posts with metrics (minimum ${minSample}).`,
      evidence: [],
      confidence: "experiment",
    });
  }
  const findings = findPatterns(mine, minSample, brand.name);
  const ups = findings.filter((f) => f.direction === "up");
  const downs = findings.filter((f) => f.direction === "down");
  const top = [...mine].sort((a, b) => b.erIndex! - a.erIndex!);
  const conf = (f: Finding) => (f.tentative ? "tentative" : "proven") as Idea["confidence"];
  const basisOf = (f: Finding) =>
    `${f.label}: median engagement index ${f.medianIndex.toFixed(2)}× vs ${f.restIndex.toFixed(2)}× for everything else (${f.lift >= 0 ? "+" : ""}${Math.round(f.lift * 100)}%), ${f.n} posts over ${f.months} month(s)${f.tentative ? ". Tentative" : ""}.`;

  // Pillars
  const pillarUps = ups.filter((f) => f.dim === "pillar");
  for (const f of pillarUps.slice(0, 2))
    out.push({
      id: `pillar-${f.value}`,
      kind: "pillar",
      title: `Give “${f.value}” more slots`,
      body: `Split it into smaller sub-topics you haven't covered yet so it doesn't get repetitive. Use it to carry the formats that do well for you.`,
      basis: basisOf(f),
      evidence: f.support.map((r) => r.post),
      confidence: conf(f),
    });
  const unused = brand.pillars.filter(
    (p) => mine.filter((r) => r.post.pillar === p).length < Math.max(2, Math.ceil(minSample / 2)),
  );
  for (const p of unused.slice(0, 2))
    out.push({
      id: `pillar-test-${p}`,
      kind: "experiment",
      title: `Test the “${p}” pillar properly`,
      body: `This is one of your brand pillars but it has almost no published data. Plan ${minSample} posts in it across your best formats so you can judge it on evidence.`,
      basis: `Only ${mine.filter((r) => r.post.pillar === p).length} published post(s) with metrics in this pillar.`,
      evidence: [],
      confidence: "experiment",
    });

  // Formats
  for (const f of ups.filter((x) => x.dim === "format").slice(0, 2))
    out.push({
      id: `format-${f.value}`,
      kind: "format",
      title: `Lean into ${f.label.toLowerCase()}`,
      body: `Make it your default for ideas that could work in more than one format.`,
      basis: basisOf(f),
      evidence: f.support.map((r) => r.post),
      confidence: conf(f),
    });

  // Hooks
  const hookUps = ups.filter((x) => x.dim === "hook");
  const topicSeed = (p?: Post) =>
    (p?.topic || p?.pillar || brand.pillars[0] || "your core topic").toLowerCase();
  for (const f of hookUps.slice(0, 2)) {
    const k = f.value as HookKind;
    const seeds = [
      ...new Set([...brand.pillars, ...f.support.map((r) => r.post.topic)].filter(Boolean)),
    ].slice(0, 3);
    out.push({
      id: `hook-${k}`,
      kind: "hook",
      title: `More ${HOOK_LABEL[k].toLowerCase()}`,
      body: `Hooks to try: ${seeds.map((s) => `“${hookFor(k, s.toLowerCase(), brand)}”`).join(" · ") || `“${hookFor(k, topicSeed(), brand)}”`}. Your best one so far: “${f.support[0]?.post.hook}”.`,
      basis: basisOf(f),
      evidence: f.support.map((r) => r.post),
      confidence: conf(f),
    });
  }

  // CTAs
  for (const f of ups.filter((x) => x.dim === "cta" && x.value !== "none").slice(0, 1))
    out.push({
      id: `cta-${f.value}`,
      kind: "cta",
      title: `Use ${f.label.toLowerCase()} more`,
      body: `Write new versions of the ask, for example: ${f.support
        .slice(0, 2)
        .map((r) => `“${r.post.cta}”`)
        .join(" · ")} → rewrite them for the next topics.`,
      basis: basisOf(f),
      evidence: f.support.map((r) => r.post),
      confidence: conf(f),
    });

  // Themes → creative directions + concrete ideas
  for (const f of ups.filter((x) => x.dim === "theme" || x.dim === "tag").slice(0, 3)) {
    const ex = f.support[0]?.post;
    const pillar =
      brand.pillars.find((p) => !f.support.some((r) => r.post.pillar === p)) ?? brand.pillars[0];
    out.push({
      id: `dir-${f.value}`,
      kind: "direction",
      title: `${f.label} angle${pillar ? ` for “${pillar}”` : ""}`,
      body: `Use the ${f.label.toLowerCase()} angle${pillar ? ` on the “${pillar}” pillar, where you haven't used it yet` : ""}. Keep the structure of “${ex?.title || ex?.hook}”, with a new subject, new visuals and new examples.`,
      basis: basisOf(f),
      evidence: f.support.map((r) => r.post),
      confidence: conf(f),
    });
  }

  // Repurpose top posts into formats/platforms they haven't been on.
  const platforms = brand.platforms.length
    ? brand.platforms
    : (["instagram", "facebook", "tiktok"] as Platform[]);
  for (const r of top.slice(0, 4)) {
    if (r.erIndex! < 1.3) break;
    const p = r.post;
    const otherPlatform = platforms.find((pl) => pl !== p.platform);
    const target: Format =
      p.format === "carousel" ? "reel" : p.format === "static" ? "carousel" : "carousel";
    out.push({
      id: `rep-${p.id}`,
      kind: "repurpose",
      title: `Repurpose “${p.title || p.hook || "top post"}”`,
      body: `Turn it into a ${FORMAT_LABEL[target].toLowerCase()}${otherPlatform ? ` and adapt it for ${PLATFORM_LABEL[otherPlatform]}` : ""}. Make it a new take, for example a breakdown of the key point, a follow-up answering the comments, or a part 2. Don't re-post it as is.`,
      basis: `Engagement index ${r.erIndex!.toFixed(2)}× (ER ${(r.d.er! * 100).toFixed(1)}% vs typical for ${PLATFORM_LABEL[p.platform]}), posted ${p.date || "undated"}.`,
      evidence: [p],
      confidence: "proven",
    });
  }

  // Avoid list from downs
  for (const f of downs.slice(0, 2))
    out.push({
      id: `avoid-${f.dim}-${f.value}`,
      kind: "direction",
      title: `Rethink ${f.label.toLowerCase()}`,
      body: `Cut back on this or change how you do it before giving it more slots.`,
      basis: basisOf(f),
      evidence: f.support.map((r) => r.post),
      confidence: conf(f),
    });

  // Experiments from tentative findings (n between minSample/2 and minSample).
  const loose = findPatterns(mine, Math.max(3, Math.ceil(minSample / 2)), brand.name).filter(
    (f) => f.direction === "up" && f.n < minSample,
  );
  for (const f of loose.slice(0, 3))
    out.push({
      id: `exp-${f.dim}-${f.value}`,
      kind: "experiment",
      title: `Experiment: ${f.label.toLowerCase()}`,
      body: `Early signal, too few posts to trust. Run ${minSample - f.n + 2} more posts with this feature and compare them with similar posts without it.`,
      basis: `${f.n} posts, median index ${f.medianIndex.toFixed(2)}× vs ${f.restIndex.toFixed(2)}×. Below the ${minSample}-post minimum.`,
      evidence: f.support.map((r) => r.post),
      confidence: "experiment",
    });

  // Concluded experiments
  for (const e of experiments.filter(
    (x) => x.brandId === brand.id && x.status === "concluded" && x.conclusion,
  ))
    out.push({
      id: `learned-${e.id}`,
      kind: "direction",
      title: `Apply what you learned: ${e.name}`,
      body: e.conclusion,
      basis: `Concluded experiment (${e.variable}): ${e.a.label} (${e.a.postIds.length} posts) vs ${e.b.label} (${e.b.postIds.length} posts).`,
      evidence: [],
      confidence: "proven",
    });

  // Campaign idea combining strongest pillar + format + hook
  const bp = pillarUps[0],
    bf = ups.find((x) => x.dim === "format"),
    bh = hookUps[0];
  if (bp || bf) {
    out.push({
      id: "campaign",
      kind: "campaign",
      title: `Campaign: a ${bf ? bf.label.toLowerCase() : "multi-format"} series on “${bp?.value ?? brand.pillars[0] ?? "your strongest pillar"}”`,
      body: `A 3–4 week series with a recurring name and look, ${bh ? `opening each episode with a ${HOOK_LABEL[bh.value as HookKind].toLowerCase().replace(/s$/, "")}` : "with a consistent hook style"}, and a final post that asks the audience to choose the next topic.`,
      basis: [bp, bf, bh]
        .filter(Boolean)
        .map((f) => basisOf(f!))
        .join(" "),
      evidence: [...(bp?.support ?? []), ...(bf?.support ?? [])].slice(0, 5).map((r) => r.post),
      confidence: [bp, bf].some((f) => f?.tentative) ? "tentative" : "proven",
    });
  }

  // Researched trends become ideas only if they have a source.
  for (const t of trends.filter((x) => x.brandId === brand.id && x.kind === "external").slice(0, 3))
    out.push({
      id: `trend-${t.id}`,
      kind: "idea",
      title: `Trend: ${t.topic}`,
      body: `${t.format ? `Format: ${t.format}. ` : ""}${t.hook ? `Hook: “${t.hook}”. ` : ""}${t.relevance}`,
      basis: `External research you added: ${t.source}${t.retrievedAt ? ` (retrieved ${t.retrievedAt})` : ""}.`,
      evidence: [],
      confidence: "experiment",
    });

  return out;
}

/* ---------------- seasonal calendar (fixed dates, not trends) ---------------- */

function easter(y: number, orthodox: boolean) {
  if (orthodox) {
    const a = y % 4,
      b = y % 7,
      c = y % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;
    const dt = new Date(y, month - 1, day + 13); // Julian → Gregorian
    return dt;
  }
  const a = y % 19,
    b = Math.floor(y / 100),
    c = y % 100,
    d = Math.floor(b / 4),
    e = b % 4;
  const f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3),
    h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4),
    k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7,
    m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31),
    day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, month - 1, day);
}
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function nthWeekday(y: number, m: number, weekday: number, n: number) {
  const d = new Date(y, m - 1, 1);
  const shift = (weekday - d.getDay() + 7) % 7;
  return new Date(y, m - 1, 1 + shift + (n - 1) * 7);
}

export function seasonalMoments(ym: string) {
  const [y, m] = ym.split("-").map(Number) as [number, number];
  const list: { date: string; name: string }[] = [
    { date: `${y}-01-01`, name: "New Year" },
    { date: `${y}-02-14`, name: "Valentine's Day" },
    { date: `${y}-02-24`, name: "Dragobete (RO)" },
    { date: `${y}-03-01`, name: "Mărțișor (RO)" },
    { date: `${y}-03-08`, name: "International Women's Day" },
    { date: iso(easter(y, true)), name: "Orthodox Easter" },
    { date: iso(easter(y, false)), name: "Easter (Western)" },
    { date: iso(nthWeekday(y, 5, 0, 1)), name: "Mother's Day (RO)" },
    { date: `${y}-06-01`, name: "Children's Day" },
    { date: `${y}-09-15`, name: "Back to school (approx.)" },
    { date: `${y}-10-31`, name: "Halloween" },
    {
      date: iso(nthWeekday(y, 11, 5, 4)),
      name: "Black Friday (US date; RO retailers often earlier)",
    },
    { date: `${y}-12-01`, name: "Romania's National Day" },
    { date: `${y}-12-25`, name: "Christmas" },
    { date: `${y}-12-31`, name: "New Year's Eve" },
  ];
  return list
    .filter((x) => x.date.slice(5, 7) === String(m).padStart(2, "0"))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/* ---------------- monthly planner ---------------- */

export interface PlanSlot {
  id: string;
  date: string;
  platform: Platform;
  format: Format;
  pillar: string;
  topic: string;
  hook: string;
  brief: string;
  caption: string;
  cta: string;
  hashtags: string[];
  kpi: string;
  reason: string;
  type: "proven" | "experiment" | "seasonal";
  include: boolean;
}

export interface PlanInput {
  brand: Brand;
  month: string; // yyyy-mm
  rows: Row[]; // all published rows (any brand); filtered here
  existing: Post[]; // all posts of the brand (for de-duplication / calendar awareness)
  perWeek: Record<Platform, number>;
  experimentShare: number; // 0–1
  minSample: number;
  experiments: Experiment[];
  trends: Trend[];
}

export interface PlanContext {
  windowMonths: number;
  postsAnalysed: number;
  findings: Finding[];
  best: Row[];
  worst: Row[];
  alreadyPlanned: Post[];
  seasonal: { date: string; name: string }[];
  notes: string[];
}

export function analyseForPlan(input: PlanInput): PlanContext {
  const { brand, month, minSample } = input;
  const from6 = addMonths(month, -6);
  const from3 = addMonths(month, -3);
  const mine = input.rows.filter(
    (r) => r.post.brandId === brand.id && r.erIndex != null && monthOf(r.post.date) < month,
  );
  const six = mine.filter((r) => monthOf(r.post.date) >= from6);
  const three = mine.filter((r) => monthOf(r.post.date) >= from3);
  const use = six.length >= minSample * 2 ? six : mine;
  const windowMonths = use === six ? 6 : 0;
  const notes: string[] = [];
  notes.push(
    `${three.length} posts with metrics in the previous 3 months, ${six.length} in the previous 6.`,
  );
  if (use !== six)
    notes.push(
      `Too few posts in the last 6 months, so all ${mine.length} historical posts are used.`,
    );
  if (mine.length < minSample)
    notes.push(
      `Below the ${minSample}-post minimum: the plan is built from your brand profile and is mostly experiments.`,
    );
  const sorted = [...use].sort((a, b) => b.erIndex! - a.erIndex!);
  return {
    windowMonths,
    postsAnalysed: use.length,
    findings: findPatterns(use, minSample, brand.name),
    best: sorted.slice(0, 5),
    worst: sorted.slice(-5).reverse(),
    alreadyPlanned: input.existing.filter((p) => monthOf(p.date) === month),
    seasonal: seasonalMoments(month),
    notes,
  };
}

export function generatePlan(input: PlanInput, ctx: PlanContext): PlanSlot[] {
  const { brand, month, minSample } = input;
  const [y, m] = month.split("-").map(Number) as [number, number];
  const daysInMonth = new Date(y, m, 0).getDate();
  const mine = input.rows.filter((r) => r.post.brandId === brand.id && r.erIndex != null);
  const ups = ctx.findings.filter((f) => f.direction === "up");
  const downs = ctx.findings.filter((f) => f.direction === "down");

  // Best day(s) of week from data, else Tue/Thu/Sat spread.
  const dayStats = [0, 1, 2, 3, 4, 5, 6].map((d) => {
    const rs = mine.filter(
      (r) => r.post.date && new Date(r.post.date + "T12:00:00").getDay() === d,
    );
    return { d, n: rs.length, idx: median(rs.map((r) => r.erIndex!)) ?? 0 };
  });
  const dayOk = dayStats.filter((s) => s.n >= minSample);
  const dayRank =
    dayOk.length >= 3 ? dayOk.sort((a, b) => b.idx - a.idx).map((s) => s.d) : [2, 4, 6, 1, 3, 5, 0];
  const dayNote =
    dayOk.length >= 3
      ? `Day chosen from your data (best days: ${dayRank
          .slice(0, 3)
          .map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d])
          .join(", ")}).`
      : "Not enough data per weekday yet, so posts are spread evenly.";

  // Score combos (platform × format × pillar) by median index; fallback to platform × format.
  const comboScore = (pl: Platform, fm: Format, pi?: string) => {
    const rs = mine.filter(
      (r) => r.post.platform === pl && r.post.format === fm && (!pi || r.post.pillar === pi),
    );
    return { n: rs.length, idx: median(rs.map((r) => r.erIndex!)) };
  };
  const formatsFor = (pl: Platform): Format[] =>
    pl === "tiktok"
      ? ["video"]
      : pl === "facebook"
        ? ["reel", "static", "carousel", "video"]
        : ["reel", "carousel", "static"];
  const avoid = new Set(
    downs.filter((f) => f.dim === "format" || f.dim === "pillar").map((f) => `${f.dim}:${f.value}`),
  );

  // Hashtags that appear on above-median posts more than below.
  const tagScore = new Map<string, number[]>();
  for (const r of mine)
    for (const h of r.post.hashtags) tagScore.set(h, [...(tagScore.get(h) ?? []), r.erIndex!]);
  const goodTags = [...tagScore.entries()]
    .filter(([, v]) => v.length >= 3)
    .map(([k, v]) => ({ k, idx: median(v)! }))
    .filter((x) => x.idx >= 1)
    .sort((a, b) => b.idx - a.idx)
    .map((x) => x.k);

  const provenHooks = ups.filter((f) => f.dim === "hook").map((f) => f.value as HookKind);
  const HOOK_CYCLE: HookKind[] = ["question", "number", "negative", "howto", "pov", "statement"];
  const hookN = (k: HookKind) => mine.filter((r) => hookKind(r.post) === k).length;
  const leastTestedHook = () => [...HOOK_CYCLE].sort((a, b) => hookN(a) - hookN(b))[0]!;
  const bestCta = ups.find((f) => f.dim === "cta" && f.value !== "none");
  const pillars = brand.pillars.length ? brand.pillars : ["[add pillars in the brand profile]"];
  const pillarWeight = (p: string) => {
    if (avoid.has(`pillar:${p}`)) return 0.5;
    const f = ups.find((x) => x.dim === "pillar" && x.value === p);
    return f ? 1 + Math.min(f.lift, 1) : 1;
  };
  const weekdaysInMonth = (dows: number[]) => {
    const out: string[] = [];
    for (let d = 1; d <= daysInMonth; d++)
      if (dows.includes(new Date(y, m - 1, d).getDay()))
        out.push(`${month}-${String(d).padStart(2, "0")}`);
    return out;
  };
  const publishedTopics = input.existing
    .filter((p) => p.status === "published")
    .map((p) => [p.title, p.topic, p.hook].join(" "));
  const slots: PlanSlot[] = [];
  const pillarCount = new Map<string, number>();
  let expCount = 0;

  const platforms = (Object.keys(input.perWeek) as Platform[]).filter((p) => input.perWeek[p] > 0);
  for (const pl of platforms) {
    const n = input.perWeek[pl];
    const dows = dayRank.slice(0, Math.min(7, n));
    const dates = weekdaysInMonth(dows);
    for (const date of dates) {
      // Pillar: lowest (count / weight) → balanced but tilted to what works.
      const pillar = [...pillars].sort(
        (a, b) =>
          (pillarCount.get(a) ?? 0) / pillarWeight(a) - (pillarCount.get(b) ?? 0) / pillarWeight(b),
      )[0]!;
      pillarCount.set(pillar, (pillarCount.get(pillar) ?? 0) + 1);
      const total = slots.length + 1;
      const isExp = expCount / total < input.experimentShare;
      let expHook: HookKind | undefined;
      // Format: best scoring with data for this platform+pillar, else platform level.
      const fmts = formatsFor(pl).filter((f) => !avoid.has(`format:${f}`) || isExp);
      const scored = fmts.map((f) => {
        const a = comboScore(pl, f, pillar);
        const b = comboScore(pl, f);
        return {
          f,
          n: a.n >= 3 ? a.n : b.n,
          idx: a.n >= 3 ? a.idx : b.idx,
          level: a.n >= 3 ? "pillar" : "platform",
        };
      });
      const proven = scored
        .filter((s) => s.n >= Math.max(3, Math.ceil(minSample / 2)) && s.idx != null)
        .sort((a, b) => b.idx! - a.idx!);
      const untested = scored.filter((s) => s.n < Math.max(3, Math.ceil(minSample / 2)));
      let format: Format;
      let reason: string;
      let type: PlanSlot["type"];
      if (isExp && untested.length) {
        const pick = untested[(slots.length + pillar.length) % untested.length]!;
        format = pick.f;
        type = "experiment";
        expCount++;
        reason = `Experiment: only ${pick.n} ${FORMAT_LABEL[format].toLowerCase()} post(s) with data on ${PLATFORM_LABEL[pl]}${pick.level === "pillar" ? ` in “${pillar}”` : ""}. This adds a data point.`;
      } else if (proven.length) {
        const pick = proven[slots.length % Math.min(2, proven.length)]!;
        format = pick.f;
        type = "proven";
        reason = `${FORMAT_LABEL[format]} on ${PLATFORM_LABEL[pl]} has a median engagement index of ${pick.idx!.toFixed(2)}× (${pick.n} posts${pick.level === "pillar" ? ` in “${pillar}”` : ""}).`;
        if (isExp) {
          // Every format already has data: experiment on the hook instead (proven format, new hook style).
          expCount++;
          type = "experiment";
          expHook = leastTestedHook();
          reason += ` Experiment: the format is proven, but this post tests a ${HOOK_LABEL[expHook].toLowerCase().replace(/s$/, "")}, which has little data (${hookN(expHook)} posts).`;
        }
      } else {
        format = fmts[slots.length % fmts.length] ?? "static";
        type = "experiment";
        expCount++;
        reason = `No performance history for this combination yet, so it's treated as an experiment.`;
      }
      const pillarF = ups.find((f) => f.dim === "pillar" && f.value === pillar);
      if (pillarF) reason += ` “${pillar}” is outperforming (+${Math.round(pillarF.lift * 100)}%).`;

      // Topic: seasonal moment near this date, else pillar-derived angle from a winning theme.
      const moment = ctx.seasonal.find(
        (s) =>
          Math.abs(Date.parse(s.date) - Date.parse(date)) / 864e5 <= 4 &&
          !slots.some((x) => x.topic.includes(s.name)),
      );
      const theme = ups.filter((f) => f.dim === "theme")[
        slots.length % Math.max(1, ups.filter((f) => f.dim === "theme").length)
      ];
      let topic = moment
        ? `${moment.name} × ${pillar}`
        : theme
          ? `${pillar}: ${theme.label.toLowerCase()} angle`
          : `${pillar}: [specific sub-topic]`;
      if (moment) {
        type = type === "experiment" ? "experiment" : "seasonal";
        reason += ` Calendar moment: ${moment.name} (${moment.date}).`;
      } else if (theme)
        reason += ` ${theme.label} posts do ${Math.round(theme.lift * 100)}% better (${theme.n} posts).`;

      // De-duplicate against published content.
      const dupe = publishedTopics.find((t) => similarity(t, topic) > 0.7);
      if (dupe) {
        topic += " (new angle)";
        reason += ` A similar topic was already published (“${dupe.slice(0, 60)}”), so go for a new angle rather than a repeat.`;
      }

      // Rotate across proven hook styles so the plan doesn't repeat one template.
      const hk: HookKind =
        expHook ??
        provenHooks[slots.length % provenHooks.length] ??
        HOOK_CYCLE[slots.length % HOOK_CYCLE.length]!;
      const hook = hookFor(hk, moment?.name ?? pillar.toLowerCase(), brand);
      const ctaKind =
        bestCta?.value ??
        (format === "carousel"
          ? "save"
          : format === "reel" || format === "video"
            ? "share"
            : "comment");
      const cta =
        {
          save: "Save this for later",
          share: "Send this to someone who needs it",
          comment: "Tell us in the comments",
          link: "Link in bio",
          follow: `Follow ${brand.name} for more`,
          dm: "DM us “INFO”",
          shop: "Shop via the link in bio",
        }[ctaKind as string] ?? "Tell us in the comments";
      const medViews = median(
        defined(
          mine
            .filter((r) => r.post.platform === pl && r.post.format === format)
            .map((r) => r.d.views),
        ),
      );
      const medEr = median(
        defined(
          mine.filter((r) => r.post.platform === pl && r.post.format === format).map((r) => r.d.er),
        ),
      );
      const kpi =
        type === "experiment"
          ? `Learn: compare ER with the ${PLATFORM_LABEL[pl]} median${medEr ? ` (${(medEr * 100).toFixed(1)}%)` : ""}`
          : format === "carousel"
            ? `Saves; ER above ${medEr ? (medEr * 100).toFixed(1) + "%" : "your median"}`
            : format === "reel" || format === "video"
              ? `Reach/views above ${medViews ? Math.round(medViews).toLocaleString("en-GB") : "your median"}; shares`
              : `ER above ${medEr ? (medEr * 100).toFixed(1) + "%" : "your median"}; comments`;
      const brief =
        format === "carousel"
          ? `Carousel, 6–8 slides. Slide 1 is the hook as a headline; slides 2–7 give one point each; the last slide is the CTA. ${brand.tone ? `Tone: ${brand.tone}.` : ""}`
          : format === "reel" || format === "video"
            ? `Vertical video, ${ups.find((f) => f.dim === "length")?.value ?? "15–30s"}. Hook on screen in the first 2 seconds, then show the payoff early and close with the CTA. ${brand.tone ? `Tone: ${brand.tone}.` : ""}`
            : format === "story"
              ? `Story sequence, 3–5 frames, with a poll or question sticker.`
              : `Single image with a headline that carries the hook. Keep it to one idea and leave space around it. ${brand.tone ? `Tone: ${brand.tone}.` : ""}`;
      const caption = `${hook}\n\n[2–3 lines on ${topic.replace(/ \(new angle\)$/, "")}. Write in ${brand.tone || "the brand tone"}.]\n\n${cta}.`;
      slots.push({
        id: `${pl}-${date}`,
        date,
        platform: pl,
        format,
        pillar,
        topic,
        hook,
        brief: brief.trim(),
        caption,
        cta,
        hashtags: goodTags.slice(0, 5),
        kpi,
        reason: `${reason} ${dayNote}`.trim(),
        type,
        include: true,
      });
    }
  }
  // Skip dates that already have a post on the same platform in the calendar.
  return slots
    .map((s) =>
      ctx.alreadyPlanned.some((p) => p.date === s.date && p.platform === s.platform)
        ? {
            ...s,
            include: false,
            reason:
              s.reason +
              " There's already a post on this date and platform in your calendar, so this slot is unticked.",
          }
        : s,
    )
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Posting cadence over the last 3 months, per platform, rounded to posts/week. */
export function inferCadence(brand: Brand, posts: Post[], month: string): Record<Platform, number> {
  const from = addMonths(month, -3);
  const res = { instagram: 0, facebook: 0, tiktok: 0, other: 0 } as Record<Platform, number>;
  const rs = posts.filter(
    (p) =>
      p.brandId === brand.id &&
      p.status === "published" &&
      monthOf(p.date) >= from &&
      monthOf(p.date) < month,
  );
  for (const pl of Object.keys(res) as Platform[])
    res[pl] = Math.round(rs.filter((p) => p.platform === pl).length / 13);
  if (!rs.length) for (const pl of brand.platforms) res[pl] = 2;
  return res;
}

export { hookKind };
