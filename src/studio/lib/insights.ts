/**
 * Pattern detection. Everything here is computed from the posts passed in.
 * A pattern is only reported when the group has >= minSample posts with metrics AND the
 * comparison group does too. Findings with < 2 × minSample posts or from a single month
 * are marked tentative. Performance is compared on the platform-normalised ER index
 * (post ER ÷ median ER of the same brand + platform) so platform mix can't fake a pattern.
 */
import { addMonths, defined, median, monthOf, type Row } from "./analytics";
import { FORMAT_LABEL, PLATFORM_LABEL, isVideo, type Post } from "./types";

/* ------------------------------------------------------------------ */
/* Feature extraction                                                  */
/* ------------------------------------------------------------------ */

type Theme = { id: string; label: string; words: RegExp };

// English + Romanian keywords. Matched against title, topic, hook, caption, brief and manual tags.
export const THEMES: Theme[] = [
  {
    id: "educational",
    label: "Educational / how-to",
    words:
      /\b(how to|tips?|guide|learn|steps?|mistakes?|why|explained|tutorial|cum s[aă]|sfaturi|ghid|gre[sș]eli|pa[sș]i|de ce|afl[aă])\b/i,
  },
  {
    id: "before_after",
    label: "Before & after",
    words:
      /(before ?(&|and|\/)? ?after|before-after|transformation|[iî]nainte (și|si) dup[aă]|transformare)/i,
  },
  {
    id: "ugc",
    label: "UGC / customer content",
    words: /\b(ugc|customer|client[ei]?|review|testimonial|recenzi[ea]|feedback)\b/i,
  },
  {
    id: "demo",
    label: "Product demonstration",
    words:
      /\b(demo|how it works|unboxing|in action|showcase|prezentare|cum func[tț]ioneaz[aă]|produs(ul)?)\b/i,
  },
  {
    id: "bts",
    label: "Behind the scenes",
    words:
      /(behind the scenes|\bbts\b|process|making of|in the studio|culise|proces(ul)?|din spatele)/i,
  },
  {
    id: "story",
    label: "Storytelling",
    words: /\b(story|journey|when i|the day|poveste|povestea|c[aâ]nd am)\b/i,
  },
  { id: "trend", label: "Trend-based", words: /\b(trend(ing)?|challenge|sound|meme|viral|pov)\b/i },
  {
    id: "seasonal",
    label: "Seasonal",
    words:
      /(christmas|xmas|black friday|valentine|easter|halloween|summer|winter|holiday|new year|back to school|cr[aă]ciun|pa[sș]te|vara|iarna|m[aă]r[tț]i[sș]or|8 martie|s[aă]rb[aă]tori|anul nou)/i,
  },
  {
    id: "promo",
    label: "Promotional",
    words:
      /(\bsale\b|discount|% ?off|\boffer\b|promo|launch|shop now|\bcode\b|reducer[ei]|ofert[aă]|lansare|cod)/i,
  },
];

export type CtaKind =
  "save" | "share" | "comment" | "link" | "follow" | "dm" | "shop" | "other" | "none";
const CTA_RULES: [CtaKind, RegExp][] = [
  ["save", /\b(save|salveaz[aă])/i],
  ["share", /\b(share|send this|tag|trimite|distribuie|eticheteaz[aă])/i],
  ["comment", /\b(comment|tell us|let us know|which one|scrie|comenteaz[aă]|spune-ne)/i],
  ["link", /\b(link in bio|link|bio|website|site)/i],
  ["dm", /\b(dm|message us|mesaj)/i],
  ["shop", /\b(shop|buy|order|book|comand[aă]|cump[aă]r[aă]|rezerv[aă])/i],
  ["follow", /\b(follow|urm[aă]re[sș]te)/i],
];
export function ctaKind(p: Post): CtaKind {
  const t = p.cta.trim();
  if (!t) return "none";
  for (const [k, re] of CTA_RULES) if (re.test(t)) return k;
  return "other";
}

export type HookKind = "question" | "number" | "negative" | "pov" | "howto" | "statement" | "none";
export function hookKind(p: Post): HookKind {
  const h = (p.hook || "").trim();
  if (!h) return "none";
  if (
    /\?\s*$/.test(h) ||
    /^(do|does|did|are|is|why|what|how|which|who|ever|ce|cum|de ce|care|știi|stii)\b/i.test(h)
  )
    return "question";
  if (/^pov\b/i.test(h)) return "pov";
  if (/\b(stop|never|don'?t|mistakes?|wrong|avoid|nu mai|gre[sș]eal[aă]|evit[aă])\b/i.test(h))
    return "negative";
  if (/\b\d+\b/.test(h)) return "number";
  if (/^(how to|cum s[aă])/i.test(h)) return "howto";
  return "statement";
}
export const HOOK_LABEL: Record<HookKind, string> = {
  question: "Question hooks",
  number: "Number / list hooks",
  negative: "Warning / mistake hooks",
  pov: "POV hooks",
  howto: "How-to hooks",
  statement: "Bold statement hooks",
  none: "No hook recorded",
};
export const CTA_LABEL: Record<CtaKind, string> = {
  save: "Save CTAs",
  share: "Share / tag CTAs",
  comment: "Comment CTAs",
  link: "Link-in-bio CTAs",
  follow: "Follow CTAs",
  dm: "DM CTAs",
  shop: "Shop / book CTAs",
  other: "Other CTAs",
  none: "No CTA",
};

export function lengthBucket(p: Post) {
  const s = p.videoLength;
  if (!isVideo(p.format) || !s) return undefined;
  if (s < 15) return "< 15s";
  if (s <= 30) return "15–30s";
  if (s <= 60) return "31–60s";
  return "> 60s";
}

export function timeBand(p: Post) {
  if (!p.time) return undefined;
  const h = Number(p.time.slice(0, 2));
  if (h < 6) return "Night (00–06)";
  if (h < 11) return "Morning (06–11)";
  if (h < 15) return "Midday (11–15)";
  if (h < 19) return "Afternoon (15–19)";
  return "Evening (19–24)";
}

const textOf = (p: Post) =>
  [p.title, p.topic, p.hook, p.caption, p.brief, p.tags.join(" ")].join(" \n ");
export function themesOf(p: Post) {
  const t = textOf(p);
  const found = THEMES.filter(
    (th) =>
      th.words.test(t) ||
      p.tags.some((tag) => tag.toLowerCase().replace(/[^a-z]/g, "") === th.id.replace(/_/g, "")),
  );
  return found.map((f) => f.id);
}

export interface Feature {
  dim: string; // e.g. "theme", "format"
  value: string;
  label: string;
}

export function featuresOf(p: Post): Feature[] {
  const out: Feature[] = [
    { dim: "format", value: p.format, label: FORMAT_LABEL[p.format] },
    { dim: "platform", value: p.platform, label: PLATFORM_LABEL[p.platform] },
    { dim: "hook", value: hookKind(p), label: HOOK_LABEL[hookKind(p)] },
    { dim: "cta", value: ctaKind(p), label: CTA_LABEL[ctaKind(p)] },
  ];
  if (p.pillar) out.push({ dim: "pillar", value: p.pillar, label: `“${p.pillar}” pillar` });
  for (const id of themesOf(p))
    out.push({ dim: "theme", value: id, label: THEMES.find((t) => t.id === id)!.label });
  const lb = lengthBucket(p);
  if (lb) out.push({ dim: "length", value: lb, label: `Videos ${lb}` });
  const tb = timeBand(p);
  if (tb) out.push({ dim: "time", value: tb, label: `Posted ${tb.toLowerCase()}` });
  if (p.date)
    out.push({
      dim: "day",
      value: String(new Date(p.date + "T12:00:00").getDay()),
      label: `Posted on ${new Date(p.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long" })}`,
    });
  for (const t of p.tags) out.push({ dim: "tag", value: t.toLowerCase(), label: `Tagged “${t}”` });
  return out.filter((f) => !(f.dim === "hook" && f.value === "none"));
}

/* ------------------------------------------------------------------ */
/* Findings                                                            */
/* ------------------------------------------------------------------ */

export interface Finding {
  id: string;
  dim: string;
  value: string;
  label: string;
  direction: "up" | "down";
  n: number;
  restN: number;
  medianIndex: number;
  restIndex: number;
  lift: number; // medianIndex / restIndex - 1
  consistency: number; // share of posts on the "right" side of 1.0
  medianEr?: number | undefined;
  restEr?: number | undefined;
  medianShareRate?: number | undefined;
  medianSaveRate?: number | undefined;
  medianViews?: number | undefined;
  months: number;
  tentative: boolean;
  support: Row[]; // best (or worst) examples, sorted
  scope: string; // e.g. "All formats" / "Within carousels"
}

const LIFT = 0.2;

export function findPatterns(
  rows: Row[],
  minSample: number,
  scope = "All published content",
): Finding[] {
  const scored = rows.filter((r) => r.erIndex != null);
  if (scored.length < minSample * 2) return [];
  const byFeature = new Map<string, { f: Feature; rows: Row[] }>();
  for (const r of scored) {
    for (const f of featuresOf(r.post)) {
      const k = `${f.dim}:${f.value}`;
      const e = byFeature.get(k) ?? { f, rows: [] };
      e.rows.push(r);
      byFeature.set(k, e);
    }
  }
  const out: Finding[] = [];
  for (const [k, { f, rows: rs }] of byFeature) {
    const ids = new Set(rs.map((r) => r.post.id));
    const rest = scored.filter((r) => !ids.has(r.post.id));
    if (rs.length < minSample || rest.length < minSample) continue;
    const mi = median(rs.map((r) => r.erIndex!))!;
    const ri = median(rest.map((r) => r.erIndex!))!;
    if (!ri) continue;
    const lift = mi / ri - 1;
    if (Math.abs(lift) < LIFT) continue;
    const direction = lift > 0 ? "up" : "down";
    const consistency =
      rs.filter((r) => (direction === "up" ? r.erIndex! >= 1 : r.erIndex! < 1)).length / rs.length;
    if (consistency < 0.55) continue; // driven by a couple of outliers
    const months = new Set(rs.map((r) => monthOf(r.post.date)).filter(Boolean)).size;
    const support = [...rs]
      .sort((a, b) => (direction === "up" ? b.erIndex! - a.erIndex! : a.erIndex! - b.erIndex!))
      .slice(0, 5);
    out.push({
      id: `${scope}|${k}`,
      dim: f.dim,
      value: f.value,
      label: f.label,
      direction,
      n: rs.length,
      restN: rest.length,
      medianIndex: mi,
      restIndex: ri,
      lift,
      consistency,
      medianEr: median(defined(rs.map((r) => r.d.er))),
      restEr: median(defined(rest.map((r) => r.d.er))),
      medianShareRate: median(defined(rs.map((r) => r.d.shareRate))),
      medianSaveRate: median(defined(rs.map((r) => r.d.saveRate))),
      medianViews: median(defined(rs.map((r) => r.d.views))),
      months,
      tentative: rs.length < minSample * 2 || months < 2,
      support,
      scope,
    });
  }
  return out.sort((a, b) => Math.abs(b.lift) * Math.sqrt(b.n) - Math.abs(a.lift) * Math.sqrt(a.n));
}

/* Why / how copy. Phrased as hypotheses: the data shows *that*, not *why*. */
const WHY: Record<string, (f: Finding) => string> = {
  format: (f) =>
    f.direction === "up"
      ? `Your audience interacts more with ${f.label.toLowerCase()} posts than your other formats on the same platforms. The format may suit how they consume your content.`
      : `${f.label} posts get less interaction than your other formats on the same platforms. The format may not suit these topics, or the execution needs work.`,
  pillar: (f) =>
    f.direction === "up"
      ? `This pillar seems to match what your audience follows you for. Posts here get more interaction than your other pillars.`
      : `This pillar gets less interaction than your other pillars. It may be too broad, too promotional, or not what people follow you for.`,
  theme: (f) =>
    f.direction === "up"
      ? `Posts with this angle get more interaction. It may give people a reason to save, share or reply (useful, relatable or surprising).`
      : `Posts with this angle get less interaction. People may scroll past it, or it may only work in some formats.`,
  hook: (f) =>
    f.direction === "up"
      ? `This opening style gets more interaction. It may stop the scroll and set up why the post is worth it.`
      : `This opening style gets less interaction than your other hooks.`,
  cta: (f) =>
    f.direction === "up"
      ? `This type of ask seems to get people to act. A specific ask tends to work better than a vague one.`
      : `This ask gets less interaction than your other CTAs. It may come across as too sales-led or too much effort.`,
  length: (f) =>
    f.direction === "up"
      ? `This video length suits your audience. Short enough to watch to the end, long enough to give them something.`
      : `Videos of this length do worse. They may be too long to finish or too short to say anything.`,
  time: () =>
    `Timing affects early distribution. Treat this as a scheduling signal, not a creative one.`,
  day: () =>
    `The day you post affects early distribution. Treat this as a scheduling signal, not a creative one.`,
  platform: () =>
    `The posts are compared against each platform's own baseline, so this reflects the content you post there, not the platform itself.`,
  tag: (f) =>
    f.direction === "up"
      ? `Posts with your “${f.value}” tag get more interaction.`
      : `Posts with your “${f.value}” tag get less interaction.`,
};

const HOW: Record<string, (f: Finding, ex?: Post) => string> = {
  format: (f, ex) =>
    `Plan more ${f.label.toLowerCase()} posts, using the format for new topics rather than re-posting “${ex?.title || ex?.hook || "the top post"}”. Keep what makes the format work (structure, pacing, number of slides) and change the subject.`,
  pillar: (f) =>
    `Give ${f.label} more slots, and break it into smaller sub-topics you haven't covered yet instead of repeating what worked.`,
  theme: (f, ex) =>
    `Use the ${f.label.toLowerCase()} angle on a different topic or pillar. Take the structure of “${ex?.title || ex?.hook || "the top post"}” and write a new subject and new examples.`,
  hook: (f, ex) =>
    `Write new ${f.label.toLowerCase()} for upcoming posts. Use the structure of “${ex?.hook || "your best hook"}” with your own new wording.`,
  cta: (f) =>
    `Use ${f.label.replace(" CTAs", "").toLowerCase()} CTAs on posts that suit them (for example, save CTAs on content people will want to come back to), and vary the wording.`,
  length: (f) =>
    `Plan scripts for ${f.value} and cut longer edits down, or turn them into a series.`,
  time: (f) =>
    `Schedule a test week at ${f.value.toLowerCase()} and compare it with your usual slot.`,
  day: (f) => `${f.label}: move one or two weekly posts to that day and see if the effect holds.`,
  platform: () => `Look at what you post on this platform compared with the others and adapt it.`,
  tag: (f) =>
    `Plan more content that fits your “${f.value}” tag, on topics you haven't covered yet.`,
};

export const whyFor = (f: Finding) => (WHY[f.dim] ?? WHY["theme"]!)(f);
export const howFor = (f: Finding) => (HOW[f.dim] ?? HOW["theme"]!)(f, f.support[0]?.post);

/* ------------------------------------------------------------------ */
/* What's not working: specific checks                                 */
/* ------------------------------------------------------------------ */

export interface Problem {
  id: string;
  kind:
    | "low_engagement"
    | "low_reach_strong_engagement"
    | "declining"
    | "low_shareability"
    | "low_retention"
    | "campaign";
  title: string;
  detail: string;
  recommendation: string;
  rows: Row[];
  tentative: boolean;
}

export function findProblems(
  rows: Row[],
  minSample: number,
  campaignName: (id: string) => string,
): Problem[] {
  const out: Problem[] = [];
  const scored = rows.filter((r) => r.erIndex != null);

  // 1. Low engagement on ALL fronts. Never label a post weak on views alone.
  const weak = scored.filter(
    (r) =>
      r.erIndex! < 0.5 &&
      (r.viewsIndex == null || r.viewsIndex < 1) &&
      (r.d.meaningfulRate == null ||
        r.d.meaningfulRate < (median(defined(scored.map((x) => x.d.meaningfulRate))) ?? Infinity)),
  );
  if (weak.length)
    out.push({
      id: "low_engagement",
      kind: "low_engagement",
      title: `${weak.length} post${weak.length > 1 ? "s" : ""} with unusually low engagement`,
      detail: `Engagement rate is below half the median for the same brand and platform, views are below median too, and comments, shares and saves are below average. These posts are weak on every measure, not only views.`,
      recommendation: `Compare their hooks and first frames with your top posts. If they share a topic or format, try one rewritten version of that topic before dropping it.`,
      rows: weak.sort((a, b) => a.erIndex! - b.erIndex!).slice(0, 10),
      tentative: scored.length < minSample * 2,
    });

  // 2. Distribution problem, not a content problem.
  const reachLow = scored.filter(
    (r) => r.viewsIndex != null && r.viewsIndex < 0.6 && r.erIndex! >= 1.2,
  );
  if (reachLow.length)
    out.push({
      id: "reach_low",
      kind: "low_reach_strong_engagement",
      title: `${reachLow.length} post${reachLow.length > 1 ? "s" : ""} with low reach but strong engagement`,
      detail: `These are not failures. People who saw them interacted more than usual, but few people saw them. This usually points to timing, the opening seconds, or how the platform distributed them, not to the idea.`,
      recommendation: `Re-post or re-cut these ideas with a stronger opening frame and hook, try a different time slot, or move them to a format that gets more reach on that platform.`,
      rows: reachLow.sort((a, b) => b.erIndex! - a.erIndex!).slice(0, 10),
      tentative: true,
    });

  // 3. Repeated formats with declining performance (last 3 months vs previous 3).
  const months = [...new Set(scored.map((r) => monthOf(r.post.date)).filter(Boolean))].sort();
  if (months.length >= 4) {
    const last = months.at(-1)!;
    const recentFrom = addMonths(last, -2);
    const prevFrom = addMonths(last, -5);
    const keys = new Set(scored.map((r) => `${r.post.brandId}|${r.post.format}`));
    for (const k of keys) {
      const rs = scored.filter((r) => `${r.post.brandId}|${r.post.format}` === k);
      const recent = rs.filter((r) => monthOf(r.post.date) >= recentFrom);
      const prev = rs.filter(
        (r) => monthOf(r.post.date) >= prevFrom && monthOf(r.post.date) < recentFrom,
      );
      const minArm = Math.max(3, Math.ceil(minSample / 2));
      if (recent.length < minArm || prev.length < minArm) continue;
      const a = median(prev.map((r) => r.erIndex!))!;
      const b = median(recent.map((r) => r.erIndex!))!;
      if (a > 0 && b / a - 1 <= -0.25) {
        const fmt = FORMAT_LABEL[rs[0]!.post.format];
        out.push({
          id: `declining_${k}`,
          kind: "declining",
          title: `${fmt} performance is declining`,
          detail: `Median engagement index went from ${a.toFixed(2)}× (${prev.length} posts, previous 3 months) to ${b.toFixed(2)}× (${recent.length} posts, last 3 months), a ${Math.round((1 - b / a) * 100)}% drop.`,
          recommendation: `People may be tired of how you do this format. Keep the format but change its structure: new opening, a different visual style, or a new series concept.`,
          rows: recent.sort((x, y) => x.erIndex! - y.erIndex!).slice(0, 6),
          tentative: recent.length < minSample || prev.length < minSample,
        });
      }
    }
  }

  // 4. Low shareability: seen by many, shared by few.
  const withShares = scored.filter((r) => r.d.shareRate != null);
  if (withShares.length >= minSample * 2) {
    const shareMed = median(withShares.map((r) => r.d.shareRate!))!;
    const lowShare = withShares.filter(
      (r) => (r.viewsIndex ?? 0) >= 1 && r.d.shareRate! < shareMed * 0.4,
    );
    if (lowShare.length)
      out.push({
        id: "low_share",
        kind: "low_shareability",
        title: `${lowShare.length} widely seen post${lowShare.length > 1 ? "s" : ""} that people didn't share`,
        detail: `Views are at or above median, but the share rate is under 40% of your median share rate (${(shareMed * 100).toFixed(2)}%). People watched but didn't pass them on.`,
        recommendation: `Shared posts usually say something about the person sharing them: useful to a friend, relatable, or surprising. Add a line people would want to send to someone, or an explicit “send this to…” CTA.`,
        rows: lowShare.slice(0, 8),
        tentative: withShares.length < minSample * 3,
      });
  }

  // 5. Low retention, only if retention data exists.
  const withRet = scored.filter((r) => r.d.m.retention != null && isVideo(r.post.format));
  if (withRet.length >= minSample) {
    const med = median(withRet.map((r) => r.d.m.retention!))!;
    const low = withRet.filter((r) => r.d.m.retention! < med * 0.6);
    if (low.length)
      out.push({
        id: "low_ret",
        kind: "low_retention",
        title: `${low.length} video${low.length > 1 ? "s" : ""} with low retention`,
        detail: `Retention is under 60% of your median (${med.toFixed(1)}%).`,
        recommendation: `Check the first 3 seconds and the total length. Cut the intro and show the payoff sooner.`,
        rows: low.slice(0, 8),
        tentative: withRet.length < minSample * 2,
      });
  }

  // 6. Campaigns.
  const camps = new Set(scored.map((r) => r.post.campaignId).filter(Boolean) as string[]);
  for (const c of camps) {
    const rs = scored.filter((r) => r.post.campaignId === c);
    if (rs.length < 3) continue;
    const mi = median(rs.map((r) => r.erIndex!))!;
    if (mi < 0.8)
      out.push({
        id: `camp_${c}`,
        kind: "campaign",
        title: `Campaign “${campaignName(c)}” underperformed`,
        detail: `Median engagement index ${mi.toFixed(2)}× across ${rs.length} posts (1.00× = typical for the brand and platform).`,
        recommendation: `Check whether the campaign posts were more promotional than your usual content. For the next one, mix in value-led posts and use your best-performing formats to carry the campaign message.`,
        rows: rs.sort((a, b) => a.erIndex! - b.erIndex!).slice(0, 6),
        tentative: rs.length < minSample,
      });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Own-data trends: rising / falling over the last 3 months            */
/* ------------------------------------------------------------------ */

export interface OwnTrend {
  label: string;
  dim: string;
  value: string;
  recent: number;
  previous: number;
  change: number;
  nRecent: number;
  nPrev: number;
  tentative: boolean;
  example?: Post | undefined;
}

export function ownTrends(rows: Row[], minSample: number): OwnTrend[] {
  const scored = rows.filter((r) => r.erIndex != null && r.post.date);
  const months = [...new Set(scored.map((r) => monthOf(r.post.date)))].sort();
  if (months.length < 2) return [];
  const last = months.at(-1)!;
  const recentFrom = addMonths(last, -2);
  const prevFrom = addMonths(last, -5);
  const recent = scored.filter((r) => monthOf(r.post.date) >= recentFrom);
  const prev = scored.filter(
    (r) => monthOf(r.post.date) >= prevFrom && monthOf(r.post.date) < recentFrom,
  );
  const minArm = Math.max(3, Math.ceil(minSample / 2));
  const keyed = (rs: Row[]) => {
    const m = new Map<string, { f: Feature; rows: Row[] }>();
    for (const r of rs)
      for (const f of featuresOf(r.post)) {
        if (!["format", "pillar", "theme", "hook", "length"].includes(f.dim)) continue;
        const k = `${f.dim}:${f.value}`;
        const e = m.get(k) ?? { f, rows: [] };
        e.rows.push(r);
        m.set(k, e);
      }
    return m;
  };
  const R = keyed(recent);
  const P = keyed(prev);
  const out: OwnTrend[] = [];
  for (const [k, { f, rows: rr }] of R) {
    const pr = P.get(k)?.rows ?? [];
    if (rr.length < minArm || pr.length < minArm) continue;
    const a = median(pr.map((r) => r.erIndex!))!;
    const b = median(rr.map((r) => r.erIndex!))!;
    if (!a) continue;
    const change = b / a - 1;
    if (Math.abs(change) < 0.2) continue;
    out.push({
      label: f.label,
      dim: f.dim,
      value: f.value,
      recent: b,
      previous: a,
      change,
      nRecent: rr.length,
      nPrev: pr.length,
      tentative: rr.length < minSample || pr.length < minSample,
      example: [...rr].sort((x, y) => y.erIndex! - x.erIndex!)[0]?.post,
    });
  }
  return out.sort((a, b) => b.change - a.change);
}
