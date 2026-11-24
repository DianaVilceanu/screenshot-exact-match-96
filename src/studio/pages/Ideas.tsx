import { useMemo, useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { addMonths, buildRows, currentMonth, fmtIndex, monthLabel } from "../lib/analytics";
import { downloadCsv } from "../lib/importer";
import {
  analyseForPlan,
  generateIdeas,
  generatePlan,
  inferCadence,
  type Idea,
  type PlanSlot,
} from "../lib/recommend";
import { blankPost, useStore, useView } from "../lib/store";
import { FORMATS, FORMAT_LABEL, PLATFORMS, PLATFORM_LABEL, type Platform } from "../lib/types";
import { usePostEditor } from "../components/PostEditor";
import {
  Button,
  Card,
  Draft,
  Empty,
  Input,
  Notice,
  PageHeader,
  Pill,
  PlatformDot,
  Select,
  Tabs,
  Textarea,
} from "../components/ui";

export function Ideas() {
  const { ws } = useStore();
  const { brandId, setBrandId } = useView();
  const [tab, setTab] = useState<"ideas" | "plan">("ideas");
  const brand = ws.brands.find((b) => b.id === brandId);

  return (
    <>
      <PageHeader
        eyebrow="Content intelligence"
        title="Content Ideas"
        description="Ideas and monthly plans for a specific brand, generated from its own results. Each one shows the data it's based on."
      />
      <Notice className="mb-5">
        This is a <strong>rule-based engine</strong>, not a live AI model. It works from your
        imported data and brand profile and never makes up results. Captions and hooks are
        structured starting points: text in <Draft text="[square brackets]" /> needs your input. It
        does not know what's trending online right now. Add researched trends on the Trends page and
        they'll be included here.
      </Notice>
      {!brand ? (
        <Empty
          title="Pick a brand"
          action={
            <Select value="" onChange={(e) => setBrandId(e.target.value)} className="w-64">
              <option value="">Choose a brand…</option>
              {ws.brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
          }
        >
          Recommendations are generated per brand. Generic advice across brands isn't useful.
        </Empty>
      ) : (
        <>
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: "ideas", label: "Recommendations" },
              { value: "plan", label: "Monthly plan builder" },
            ]}
          />
          {tab === "ideas" ? <IdeaList brandId={brand.id} /> : <Planner brandId={brand.id} />}
        </>
      )}
    </>
  );
}

const KIND_LABEL: Record<Idea["kind"], string> = {
  idea: "Content idea",
  pillar: "Pillar",
  format: "Format",
  hook: "Hooks",
  cta: "CTA",
  campaign: "Campaign idea",
  experiment: "Experiment",
  repurpose: "Repurpose",
  direction: "Creative direction",
};

function IdeaList({ brandId }: { brandId: string }) {
  const { ws } = useStore();
  const { openPost, newPost } = usePostEditor();
  const brand = ws.brands.find((b) => b.id === brandId)!;
  const rows = useMemo(() => buildRows(ws), [ws]);
  const ideas = generateIdeas(brand, rows, ws.settings.minSample, ws.experiments, ws.trends);
  const [kind, setKind] = useState("all");
  const list = ideas.filter((i) => kind === "all" || i.kind === kind);
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {["all", ...new Set(ideas.map((i) => i.kind))].map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`rounded-full border px-3 py-1 text-xs ${kind === k ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
          >
            {k === "all" ? `All (${ideas.length})` : KIND_LABEL[k as Idea["kind"]]}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((i) => (
          <Card key={i.id}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {KIND_LABEL[i.kind]}
              </span>
              <Pill
                tone={
                  i.confidence === "proven"
                    ? "good"
                    : i.confidence === "tentative"
                      ? "warn"
                      : "neutral"
                }
              >
                {i.confidence === "proven"
                  ? "Backed by data"
                  : i.confidence === "tentative"
                    ? "Tentative"
                    : "Experiment"}
              </Pill>
            </div>
            <h3 className="text-[15px] font-semibold leading-snug">{i.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <Draft text={i.body} />
            </p>
            <div className="mt-3 rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed">
              <span className="font-medium">Based on: </span>
              {i.basis}
            </div>
            {i.evidence.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {i.evidence.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openPost(p.id)}
                    className="max-w-[240px] truncate rounded border px-2 py-0.5 text-[11px] hover:bg-muted"
                  >
                    {p.date} · {p.title || p.hook}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  newPost({
                    brandId,
                    status: "idea",
                    title: i.title,
                    brief: `${i.body}\n\nBased on: ${i.basis}`,
                    notes: "From Content Intelligence",
                  })
                }
              >
                Save as idea
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Planner({ brandId }: { brandId: string }) {
  const { ws, update } = useStore();
  const brand = ws.brands.find((b) => b.id === brandId)!;
  const [month, setMonth] = useState(addMonths(currentMonth(), 1));
  const [perWeek, setPerWeek] = useState<Record<Platform, number>>(() =>
    inferCadence(brand, ws.posts, addMonths(currentMonth(), 1)),
  );
  const [expShare, setExpShare] = useState(0.3);
  const [slots, setSlots] = useState<PlanSlot[] | null>(null);
  const [added, setAdded] = useState(0);
  const rows = useMemo(() => buildRows(ws), [ws]);
  const input = {
    brand,
    month,
    rows,
    existing: ws.posts.filter((p) => p.brandId === brandId),
    perWeek,
    experimentShare: expShare,
    minSample: ws.settings.minSample,
    experiments: ws.experiments,
    trends: ws.trends,
  };
  const ctx = useMemo(() => analyseForPlan(input), [brand, month, rows, perWeek, expShare]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSlot = (id: string, patch: Partial<PlanSlot>) =>
    setSlots((s) => s!.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const included = slots?.filter((s) => s.include) ?? [];

  return (
    <div className="space-y-4">
      <Card title="1 · Choose the month and cadence">
        <div className="grid gap-3 md:grid-cols-6">
          <Input
            label="Month"
            type="month"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setSlots(null);
            }}
          />
          {PLATFORMS.filter((p) => p !== "other").map((p) => (
            <Input
              key={p}
              label={`${PLATFORM_LABEL[p]} / week`}
              type="number"
              min={0}
              max={14}
              value={perWeek[p]}
              onChange={(e) =>
                setPerWeek({ ...perWeek, [p]: Math.max(0, Math.min(14, Number(e.target.value))) })
              }
            />
          ))}
          <Select
            label="Experiments"
            value={String(expShare)}
            onChange={(e) => setExpShare(Number(e.target.value))}
          >
            <option value="0.1">10% experiments</option>
            <option value="0.2">20% experiments</option>
            <option value="0.3">30% experiments</option>
            <option value="0.5">50% experiments</option>
          </Select>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Cadence is pre-filled from your last 3 months of published posts (or 2/week per brand
          platform if there's no history).
        </p>
      </Card>

      <Card title="2 · What the plan is based on" subtitle={`Analysis for ${monthLabel(month)}`}>
        <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {ctx.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
          <li>
            {ctx.alreadyPlanned.length} item(s) already in the calendar for this month. Slots on the
            same date and platform are unticked.
          </li>
          <li>
            {ctx.findings.filter((f) => f.direction === "up").length} positive and{" "}
            {ctx.findings.filter((f) => f.direction === "down").length} negative patterns detected.
          </li>
          <li>
            Calendar moments:{" "}
            {ctx.seasonal.map((s) => `${s.name} (${s.date.slice(8)})`).join(", ") || "none"}. These
            are fixed dates, not trends.
          </li>
          <li>
            Researched trends for this brand:{" "}
            {ws.trends.filter((t) => t.brandId === brandId && t.kind === "external").length}.
            Hypotheses aren't used in plans.
          </li>
        </ul>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Best recent posts
            </p>
            {ctx.best.map((r) => (
              <p key={r.post.id} className="truncate text-xs">
                {fmtIndex(r.erIndex)} · {PLATFORM_LABEL[r.post.platform]}{" "}
                {FORMAT_LABEL[r.post.format].toLowerCase()} · {r.post.title || r.post.hook}
              </p>
            ))}
            {!ctx.best.length && <p className="text-xs text-muted-foreground">No data</p>}
          </div>
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Weakest recent posts
            </p>
            {ctx.worst.map((r) => (
              <p key={r.post.id} className="truncate text-xs">
                {fmtIndex(r.erIndex)} · {PLATFORM_LABEL[r.post.platform]}{" "}
                {FORMAT_LABEL[r.post.format].toLowerCase()} · {r.post.title || r.post.hook}
              </p>
            ))}
            {!ctx.worst.length && <p className="text-xs text-muted-foreground">No data</p>}
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => {
              setSlots(generatePlan(input, ctx));
              setAdded(0);
            }}
          >
            Generate plan
          </Button>
        </div>
      </Card>

      {slots && (
        <Card
          title={`3 · Review the plan: ${included.length} of ${slots.length} posts`}
          subtitle="Edit any field. Untick slots you don't want. Nothing goes into the calendar until you add it."
          action={
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  downloadCsv(`plan-${brand.name}-${month}.csv`, [
                    [
                      "Date",
                      "Platform",
                      "Format",
                      "Pillar",
                      "Topic",
                      "Hook",
                      "Creative brief",
                      "Caption",
                      "CTA",
                      "Hashtags",
                      "KPI",
                      "Reason",
                      "Type",
                    ],
                    ...included.map((s) => [
                      s.date,
                      PLATFORM_LABEL[s.platform],
                      FORMAT_LABEL[s.format],
                      s.pillar,
                      s.topic,
                      s.hook,
                      s.brief,
                      s.caption,
                      s.cta,
                      s.hashtags.join(" "),
                      s.kpi,
                      s.reason,
                      s.type,
                    ]),
                  ])
                }
              >
                <Download className="size-3.5" /> CSV
              </Button>
              <Button
                size="sm"
                disabled={!included.length}
                onClick={() => {
                  update((w) => ({
                    ...w,
                    posts: [
                      ...w.posts,
                      ...included.map((s) =>
                        blankPost(brandId, {
                          date: s.date,
                          platform: s.platform,
                          format: s.format,
                          pillar: s.pillar,
                          title: s.topic,
                          topic: s.topic,
                          hook: s.hook,
                          brief: s.brief,
                          caption: s.caption,
                          cta: s.cta,
                          hashtags: s.hashtags,
                          status: "planned",
                          generated: true,
                          planReason: s.reason,
                          kpi: s.kpi,
                          tags: s.type === "experiment" ? ["experiment"] : [],
                        }),
                      ),
                    ],
                  }));
                  setAdded(included.length);
                  setSlots(null);
                }}
              >
                <CalendarPlus className="size-3.5" /> Add {included.length} to calendar
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            {slots.map((s) => (
              <div
                key={s.id}
                className={`rounded-[var(--radius)] border p-3 ${s.include ? "" : "opacity-50"}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="checkbox"
                    checked={s.include}
                    onChange={(e) => setSlot(s.id, { include: e.target.checked })}
                    aria-label="Include"
                  />
                  <Input
                    type="date"
                    value={s.date}
                    onChange={(e) => setSlot(s.id, { date: e.target.value })}
                    className="h-8 w-36 text-xs"
                  />
                  <PlatformDot platform={s.platform} withLabel />
                  <Select
                    value={s.format}
                    onChange={(e) =>
                      setSlot(s.id, { format: e.target.value as PlanSlot["format"] })
                    }
                    className="h-8 w-32 text-xs"
                    aria-label="Format"
                  >
                    {FORMATS.map((f) => (
                      <option key={f} value={f}>
                        {FORMAT_LABEL[f]}
                      </option>
                    ))}
                  </Select>
                  <Select
                    value={s.pillar}
                    onChange={(e) => setSlot(s.id, { pillar: e.target.value })}
                    className="h-8 w-40 text-xs"
                    aria-label="Pillar"
                  >
                    {[...new Set([...brand.pillars, s.pillar])].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Select>
                  <Pill
                    tone={s.type === "proven" ? "good" : s.type === "seasonal" ? "brand" : "warn"}
                  >
                    {s.type}
                  </Pill>
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <Input
                    value={s.topic}
                    onChange={(e) => setSlot(s.id, { topic: e.target.value })}
                    aria-label="Topic"
                    placeholder="Topic"
                  />
                  <Input
                    value={s.hook}
                    onChange={(e) => setSlot(s.id, { hook: e.target.value })}
                    aria-label="Hook"
                    placeholder="Hook"
                  />
                </div>
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-xs text-muted-foreground">
                    Brief, caption, CTA, hashtags, KPI
                  </summary>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    <Textarea
                      label="Creative brief"
                      value={s.brief}
                      onChange={(e) => setSlot(s.id, { brief: e.target.value })}
                      rows={3}
                    />
                    <Textarea
                      label="Caption draft"
                      value={s.caption}
                      onChange={(e) => setSlot(s.id, { caption: e.target.value })}
                      rows={3}
                    />
                    <Input
                      label="CTA"
                      value={s.cta}
                      onChange={(e) => setSlot(s.id, { cta: e.target.value })}
                    />
                    <Input
                      label="Hashtags"
                      value={s.hashtags.join(" ")}
                      onChange={(e) =>
                        setSlot(s.id, { hashtags: e.target.value.split(/\s+/).filter(Boolean) })
                      }
                      placeholder={s.hashtags.length ? "" : "No hashtag data with enough posts"}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="KPI objective"
                        value={s.kpi}
                        onChange={(e) => setSlot(s.id, { kpi: e.target.value })}
                      />
                    </div>
                  </div>
                </details>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Why: </span>
                  {s.reason}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
      {added > 0 && (
        <Notice>
          Added {added} planned posts to the calendar for {monthLabel(month)}. Each one keeps its
          “why” and KPI. Open a post in the calendar to see them.
        </Notice>
      )}
    </div>
  );
}
