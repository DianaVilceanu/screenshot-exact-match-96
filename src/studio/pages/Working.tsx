import { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { fmtIndex, fmtNum, fmtPct, type Row } from "../lib/analytics";
import { useScope } from "../lib/hooks";
import {
  findPatterns,
  findProblems,
  howFor,
  whyFor,
  type Finding,
  type Problem,
} from "../lib/insights";
import { FORMAT_LABEL, PLATFORM_LABEL } from "../lib/types";
import { FilterBar } from "../components/FilterBar";
import { usePostEditor } from "../components/PostEditor";
import { Card, Empty, Notice, PageHeader, Pill, Select, Tentative } from "../components/ui";

const DIMS: Record<string, string> = {
  all: "All signals",
  format: "Formats",
  pillar: "Pillars",
  theme: "Content angles",
  hook: "Hooks",
  cta: "CTAs",
  length: "Video length",
  time: "Time of day",
  day: "Day of week",
  tag: "Your labels",
  platform: "Platforms",
};

function Method({ min }: { min: number }) {
  return (
    <Notice className="mb-5">
      <strong>How this is calculated:</strong> each post's engagement rate is compared with the
      median for the same brand and platform (1.00× = typical). Posts that share a feature (format,
      pillar, angle, hook style, CTA, length, timing) are compared with all posts that don't have
      it. A pattern is shown only if both groups have at least {min} posts, the difference is at
      least 20%, and most posts in the group point the same way. Findings based on fewer than{" "}
      {min * 2} posts or a single month are marked <em>tentative</em>. Content angles are detected
      from keywords in your titles, hooks, captions and labels. Add labels to posts to make this
      more accurate.
    </Notice>
  );
}

export function Working() {
  const { rows, settings, brand } = useScope();
  const [dim, setDim] = useState("all");
  const min = settings.minSample;
  const scored = rows.filter((r) => r.erIndex != null);
  const all = findPatterns(scored, min, brand?.name ?? "All brands").filter(
    (f) => f.direction === "up",
  );
  const list = all.filter((f) => dim === "all" || f.dim === dim);
  return (
    <>
      <PageHeader
        eyebrow="Content intelligence"
        title="What's Working"
        description="Patterns backed by your own published content. Nothing here is assumed. If the data doesn't support a pattern, it isn't shown."
      />
      <FilterBar />
      <Method min={min} />
      {scored.length < min * 2 ? (
        <Empty title="Not enough data for patterns yet">
          {scored.length} published post(s) with metrics in scope; at least {min * 2} are needed.
          Import more history or widen the filters.
        </Empty>
      ) : !all.length ? (
        <Empty title="No clear winners">
          Across {scored.length} posts, no feature performs at least 20% better than the rest.
          Performance is fairly even, so try the experiments on the Content Ideas page.
        </Empty>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {list.length} pattern{list.length === 1 ? "" : "s"} from {scored.length} posts
            </p>
            <Select
              value={dim}
              onChange={(e) => setDim(e.target.value)}
              className="h-8 w-44 text-xs"
              aria-label="Signal type"
            >
              {Object.entries(DIMS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {list.map((f) => (
              <FindingCard key={f.id} f={f} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export function NotWorking() {
  const { rows, settings, brand, campaignName } = useScope();
  const min = settings.minSample;
  const scored = rows.filter((r) => r.erIndex != null);
  const downs = findPatterns(scored, min, brand?.name ?? "All brands").filter(
    (f) => f.direction === "down" && f.dim !== "platform",
  );
  const problems = findProblems(rows, min, campaignName);
  return (
    <>
      <PageHeader
        eyebrow="Content intelligence"
        title="What's Not Working"
        description="Underperformance judged on several metrics together. A post with low views but strong engagement is listed as a reach problem, not a failure."
      />
      <FilterBar />
      <Method min={min} />
      {scored.length < min ? (
        <Empty title="Not enough data yet">
          {scored.length} published post(s) with metrics in scope. Import more history to analyse
          underperformance.
        </Empty>
      ) : (
        <div className="space-y-6">
          {problems.length === 0 && downs.length === 0 && (
            <Empty title="Nothing stands out">No consistent underperformance in this scope.</Empty>
          )}
          {problems.map((p) => (
            <ProblemCard key={p.id} p={p} />
          ))}
          {downs.length > 0 && (
            <section>
              <h2 className="mb-3 font-display text-2xl">Consistently underperforming</h2>
              <div className="grid gap-4 xl:grid-cols-2">
                {downs.map((f) => (
                  <FindingCard key={f.id} f={f} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}

export function FindingCard({ f, compact }: { f: Finding; compact?: boolean | undefined }) {
  const up = f.direction === "up";
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span
            className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${up ? "bg-[var(--good)]/12 text-[var(--good)]" : "bg-[var(--bad)]/12 text-[var(--bad)]"}`}
          >
            {up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              {DIMS[f.dim] ?? f.dim} · {f.scope}
            </p>
            <h3 className="text-[15px] font-semibold leading-snug">
              {f.label} {up ? "outperform" : "underperform"}: {up ? "+" : ""}
              {Math.round(f.lift * 100)}%
            </h3>
          </div>
        </div>
        {f.tentative ? <Tentative n={f.n} /> : <Pill tone="good">n={f.n}</Pill>}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <M
          label="Median vs typical"
          value={`${fmtIndex(f.medianIndex)} vs ${fmtIndex(f.restIndex)}`}
        />
        <M label="Median ER" value={`${fmtPct(f.medianEr)} vs ${fmtPct(f.restEr)}`} />
        <M label="Consistency" value={`${Math.round(f.consistency * 100)}% of posts`} />
        <M label="Span" value={`${f.months} month${f.months === 1 ? "" : "s"}`} />
        {f.medianSaveRate != null && (
          <M label="Median save rate" value={fmtPct(f.medianSaveRate, 2)} />
        )}
        {f.medianShareRate != null && (
          <M label="Median share rate" value={fmtPct(f.medianShareRate, 2)} />
        )}
        {f.medianViews != null && <M label="Median views" value={fmtNum(f.medianViews)} />}
        <M label="Compared with" value={`${f.restN} other posts`} />
      </dl>

      {!compact && (
        <div className="mt-4 space-y-2.5 text-sm leading-relaxed">
          <p>
            <span className="font-medium">Why it might be {up ? "working" : "struggling"}: </span>
            <span className="text-muted-foreground">{whyFor(f)}</span>
          </p>
          <p>
            <span className="font-medium">
              {up ? "How to repeat it without copying:" : "What to do:"}{" "}
            </span>
            <span className="text-muted-foreground">{howFor(f)}</span>
          </p>
        </div>
      )}
      <Support rows={f.support} label={up ? "Strongest examples" : "Weakest examples"} />
    </Card>
  );
}

function ProblemCard({ p }: { p: Problem }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold">{p.title}</h3>
        {p.tentative ? <Tentative /> : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
      <p className="mt-2 text-sm leading-relaxed">
        <span className="font-medium">Recommendation: </span>
        {p.recommendation}
      </p>
      <Support rows={p.rows} label="Posts" />
    </Card>
  );
}

function Support({ rows, label }: { rows: Row[]; label: string }) {
  const { openPost } = usePostEditor();
  if (!rows.length) return null;
  return (
    <div className="mt-4 border-t pt-3">
      <p className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <ul className="space-y-1">
        {rows.map((r) => (
          <li key={r.post.id}>
            <button
              onClick={() => openPost(r.post.id)}
              className="flex w-full items-center justify-between gap-3 rounded px-1.5 py-1 text-left text-xs hover:bg-muted"
            >
              <span className="min-w-0 truncate">
                <span className="text-muted-foreground tabular-nums">
                  {r.post.date || "undated"}
                </span>{" "}
                · {PLATFORM_LABEL[r.post.platform]} {FORMAT_LABEL[r.post.format].toLowerCase()} ·{" "}
                {r.post.title || r.post.hook || "Untitled"}
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                ER {fmtPct(r.d.er)} · {fmtIndex(r.erIndex)} · {fmtNum(r.d.views)} views
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function M({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted/60 px-2.5 py-1.5">
      <dt className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}
