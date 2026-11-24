import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { buildRows, defined, fmtNum, fmtPct, median, type Row } from "../lib/analytics";
import { nowIso, uid, useStore, useView } from "../lib/store";
import { EXPERIMENT_VARIABLES, FORMAT_LABEL, PLATFORM_LABEL, type Experiment } from "../lib/types";
import {
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Notice,
  PageHeader,
  Pill,
  Select,
  Textarea,
} from "../components/ui";

const METRIC: Record<
  Experiment["metric"],
  { label: string; pick: (r: Row) => number | undefined; fmt: (v?: number) => string }
> = {
  er: { label: "Engagement rate", pick: (r) => r.d.er, fmt: (v) => fmtPct(v, 2) },
  views: { label: "Views", pick: (r) => r.d.views, fmt: fmtNum },
  reach: { label: "Reach", pick: (r) => r.d.reach, fmt: fmtNum },
  shares: { label: "Shares", pick: (r) => r.d.m.shares, fmt: fmtNum },
  saves: { label: "Saves", pick: (r) => r.d.m.saves, fmt: fmtNum },
};

export function result(e: Experiment, rows: Row[]) {
  const arm = (ids: string[]) => {
    const rs = rows.filter((r) => ids.includes(r.post.id));
    const vals = defined(rs.map(METRIC[e.metric].pick));
    return { n: vals.length, posts: rs.length, med: median(vals) };
  };
  const a = arm(e.a.postIds);
  const b = arm(e.b.postIds);
  let verdict = "Waiting for data";
  let tone: "neutral" | "good" | "warn" = "neutral";
  if (a.n >= 3 && b.n >= 3 && a.med != null && b.med != null && b.med > 0) {
    const diff = a.med / b.med - 1;
    if (Math.abs(diff) < 0.1) verdict = "No meaningful difference (<10%)";
    else {
      verdict = `${diff > 0 ? e.a.label : e.b.label} ahead by ${Math.round(Math.abs(diff) * 100)}%`;
      tone = a.n >= 5 && b.n >= 5 ? "good" : "warn";
    }
    if (a.n < 5 || b.n < 5) verdict += " (tentative: under 5 posts per variant)";
  } else if (a.posts || b.posts) verdict = "Needs 3+ posts with metrics in each variant";
  return { a, b, verdict, tone };
}

export function Experiments() {
  const { ws, saveExperiment, deleteExperiment } = useStore();
  const { brandId } = useView();
  const brand = ws.brands.find((b) => b.id === brandId);
  const rows = useMemo(() => buildRows(ws), [ws]);
  const [editing, setEditing] = useState<Experiment | null>(null);
  const list = ws.experiments.filter((e) => !brand || e.brandId === brand.id);
  const blank = (): Experiment => ({
    id: uid(),
    brandId: brand?.id ?? ws.brands[0]?.id ?? "",
    name: "",
    variable: "hook",
    hypothesis: "",
    metric: "er",
    a: { label: "Variant A", postIds: [] },
    b: { label: "Variant B", postIds: [] },
    status: "planned",
    conclusion: "",
    createdAt: nowIso(),
  });

  return (
    <>
      <PageHeader
        eyebrow="Learn deliberately"
        title="Content Experiments"
        description="Test one variable at a time: hooks, lengths, formats, CTAs, pillars, posting times or creative styles. Results are calculated from the posts you link to each variant."
        actions={
          <Button onClick={() => setEditing(blank())} disabled={!ws.brands.length}>
            <Plus className="size-4" /> New experiment
          </Button>
        }
      />
      <Notice className="mb-5">
        Change only the variable you're testing and keep the rest similar (platform, pillar,
        timing). Aim for at least 5 posts per variant. Concluded experiments with a written
        conclusion feed the Content Ideas page.
      </Notice>
      {!list.length ? (
        <Empty
          title="No experiments yet"
          action={
            <Button onClick={() => setEditing(blank())} disabled={!ws.brands.length}>
              Design an experiment
            </Button>
          }
        >
          Example: “Question hooks get more saves than statement hooks on Instagram carousels.”
        </Empty>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((e) => {
            const r = result(e, rows);
            return (
              <Card key={e.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      {e.variable} · {ws.brands.find((b) => b.id === e.brandId)?.name}
                    </p>
                    <h3 className="text-[15px] font-semibold">{e.name}</h3>
                  </div>
                  <Pill
                    tone={
                      e.status === "concluded"
                        ? "good"
                        : e.status === "running"
                          ? "brand"
                          : "neutral"
                    }
                  >
                    {e.status}
                  </Pill>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Hypothesis: </span>
                  {e.hypothesis || "—"}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    [e.a.label, r.a],
                    [e.b.label, r.b],
                  ].map(([label, arm]) => {
                    const x = arm as typeof r.a;
                    return (
                      <div key={label as string} className="rounded-md bg-muted/60 px-3 py-2">
                        <p className="truncate text-xs font-medium">{label as string}</p>
                        <p className="text-lg font-semibold tabular-nums">
                          {METRIC[e.metric].fmt(x.med)}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          median {METRIC[e.metric].label.toLowerCase()} · {x.n}/{x.posts} posts with
                          data
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-sm">
                  <Pill tone={r.tone}>{r.verdict}</Pill>
                </p>
                {e.conclusion && (
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Conclusion: </span>
                    {e.conclusion}
                  </p>
                )}
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => confirm("Delete this experiment?") && deleteExperiment(e.id)}
                  >
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditing(e)}>
                    Edit
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      {editing && (
        <ExperimentForm
          e={editing}
          rows={rows}
          onClose={() => setEditing(null)}
          onSave={(x) => {
            saveExperiment(x);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

function ExperimentForm({
  e: init,
  rows,
  onClose,
  onSave,
}: {
  e: Experiment;
  rows: Row[];
  onClose: () => void;
  onSave: (e: Experiment) => void;
}) {
  const { ws } = useStore();
  const [e, setE] = useState(init);
  const [q, setQ] = useState("");
  const pool = rows.filter(
    (r) =>
      r.post.brandId === e.brandId &&
      (!q ||
        [r.post.title, r.post.hook, r.post.date].join(" ").toLowerCase().includes(q.toLowerCase())),
  );
  const r = result(e, rows);
  const toggle = (arm: "a" | "b", id: string) => {
    const other = arm === "a" ? "b" : "a";
    setE((x) => ({
      ...x,
      [arm]: {
        ...x[arm],
        postIds: x[arm].postIds.includes(id)
          ? x[arm].postIds.filter((p) => p !== id)
          : [...x[arm].postIds, id],
      },
      [other]: { ...x[other], postIds: x[other].postIds.filter((p) => p !== id) },
    }));
  };
  return (
    <Modal open onClose={onClose} title={init.name ? "Edit experiment" : "New experiment"} wide>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <Input
            label="Name *"
            value={e.name}
            onChange={(x) => setE({ ...e, name: x.target.value })}
          />
        </div>
        <Select
          label="Brand"
          value={e.brandId}
          onChange={(x) =>
            setE({
              ...e,
              brandId: x.target.value,
              a: { ...e.a, postIds: [] },
              b: { ...e.b, postIds: [] },
            })
          }
        >
          {ws.brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
        <Select
          label="Variable"
          value={e.variable}
          onChange={(x) => setE({ ...e, variable: x.target.value as Experiment["variable"] })}
        >
          {EXPERIMENT_VARIABLES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
        <div className="md:col-span-4">
          <Textarea
            label="Hypothesis"
            value={e.hypothesis}
            onChange={(x) => setE({ ...e, hypothesis: x.target.value })}
            rows={2}
            placeholder="If we… then… because…"
          />
        </div>
        <Select
          label="Success metric"
          value={e.metric}
          onChange={(x) => setE({ ...e, metric: x.target.value as Experiment["metric"] })}
        >
          {Object.entries(METRIC).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </Select>
        <Input
          label="Variant A label"
          value={e.a.label}
          onChange={(x) => setE({ ...e, a: { ...e.a, label: x.target.value } })}
        />
        <Input
          label="Variant B label"
          value={e.b.label}
          onChange={(x) => setE({ ...e, b: { ...e.b, label: x.target.value } })}
        />
        <Select
          label="Status"
          value={e.status}
          onChange={(x) => setE({ ...e, status: x.target.value as Experiment["status"] })}
        >
          <option value="planned">Planned</option>
          <option value="running">Running</option>
          <option value="concluded">Concluded</option>
        </Select>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">Link published posts to each variant</p>
          <Input
            value={q}
            onChange={(x) => setQ(x.target.value)}
            placeholder="Search posts…"
            className="h-8 w-56 text-xs"
          />
        </div>
        <div className="max-h-72 overflow-y-auto rounded-[var(--radius)] border">
          {!pool.length && (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No published posts for this brand yet. You can save the experiment now and link posts
              later.
            </p>
          )}
          {pool.map((row) => (
            <div
              key={row.post.id}
              className="flex items-center justify-between gap-2 border-b px-3 py-1.5 text-xs last:border-0"
            >
              <span className="min-w-0 truncate">
                <span className="text-muted-foreground tabular-nums">{row.post.date}</span> ·{" "}
                {PLATFORM_LABEL[row.post.platform]} {FORMAT_LABEL[row.post.format].toLowerCase()} ·{" "}
                {row.post.title || row.post.hook}
              </span>
              <span className="flex shrink-0 gap-1">
                {(["a", "b"] as const).map((arm) => (
                  <button
                    key={arm}
                    onClick={() => toggle(arm, row.post.id)}
                    className={`rounded border px-2 py-0.5 ${e[arm].postIds.includes(row.post.id) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    {arm.toUpperCase()}
                  </button>
                ))}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          A: {e.a.postIds.length} posts · B: {e.b.postIds.length} posts · {r.verdict}
        </p>
      </div>
      <div className="mt-3">
        <Textarea
          label="Conclusion (what you'll do differently)"
          value={e.conclusion}
          onChange={(x) => setE({ ...e, conclusion: x.target.value })}
          rows={2}
        />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!e.name.trim() || !e.brandId} onClick={() => onSave(e)}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
