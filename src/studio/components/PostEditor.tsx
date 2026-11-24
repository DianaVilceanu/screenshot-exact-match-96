import { createContext, useContext, useState, type ReactNode } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { blankPost, nowIso, uid, useStore, useView } from "../lib/store";
import { derive, fmtNum, fmtPct, latest } from "../lib/analytics";
import { extractHashtags } from "../lib/mapping";
import {
  FORMATS,
  FORMAT_LABEL,
  METRIC_KEYS,
  METRIC_LABEL,
  PLATFORMS,
  PLATFORM_LABEL,
  STATUSES,
  STATUS_LABEL,
  type MetricKey,
  type Metrics,
  type Post,
} from "../lib/types";
import { Button, Input, Modal, Notice, Pill, Select, Tabs, Textarea } from "./ui";

interface Ctx {
  openPost: (id: string) => void;
  newPost: (patch?: Partial<Post>) => void;
}
const EditorCtx = createContext<Ctx | null>(null);
export const usePostEditor = () => useContext(EditorCtx)!;

export function PostEditorProvider({ children }: { children: ReactNode }) {
  const { ws } = useStore();
  const { brandId } = useView();
  const [draft, setDraft] = useState<{ post: Post; isNew: boolean } | null>(null);
  const ctx: Ctx = {
    openPost: (id) => {
      const p = ws.posts.find((x) => x.id === id);
      if (p) setDraft({ post: p, isNew: false });
    },
    newPost: (patch) => {
      const b = ws.brands.find((x) => x.id === (patch?.brandId ?? brandId)) ?? ws.brands[0];
      if (!b) return;
      setDraft({
        post: blankPost(b.id, { platform: b.platforms[0] ?? "instagram", ...patch }),
        isNew: true,
      });
    },
  };
  return (
    <EditorCtx.Provider value={ctx}>
      {children}
      {draft && (
        <PostEditor
          key={draft.post.id}
          initial={draft.post}
          isNew={draft.isNew}
          onClose={() => setDraft(null)}
        />
      )}
    </EditorCtx.Provider>
  );
}

function PostEditor({
  initial,
  isNew,
  onClose,
}: {
  initial: Post;
  isNew: boolean;
  onClose: () => void;
}) {
  const { ws, savePost, editPost, deletePost, addSnapshot } = useStore();
  const [p, setP] = useState<Post>(initial);
  const [tab, setTab] = useState<"content" | "metrics" | "source">("content");
  const [hashtagText, setHashtagText] = useState(initial.hashtags.join(" "));
  const [tagText, setTagText] = useState(initial.tags.join(", "));
  const brand = ws.brands.find((b) => b.id === p.brandId);
  const campaigns = ws.campaigns.filter((c) => c.brandId === p.brandId);
  const live = ws.posts.find((x) => x.id === p.id) ?? p; // metrics are saved immediately
  const d = derive(live, ws.settings);
  const set = <K extends keyof Post>(k: K, v: Post[K]) => setP((x) => ({ ...x, [k]: v }));

  const save = () => {
    const next = {
      ...p,
      hashtags: extractHashtags(
        hashtagText
          .split(/[\s,]+/)
          .map((h) => (h && !h.startsWith("#") ? "#" + h : h))
          .join(" "),
      ),
      tags: tagText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (isNew) savePost(next);
    else {
      const { metrics: _m, edits: _e, sources: _s, ...patch } = next;
      editPost(p.id, patch);
    }
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={isNew ? "New content" : p.title || "Edit content"} wide>
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "content", label: "Content" },
          {
            value: "metrics",
            label: `Performance${live.metrics.length ? ` (${live.metrics.length})` : ""}`,
          },
          { value: "source", label: `Source & history` },
        ]}
      />
      {tab === "content" && (
        <div className="grid gap-3 md:grid-cols-4">
          <Select
            label="Brand"
            value={p.brandId}
            onChange={(e) => set("brandId", e.target.value)}
            disabled={!isNew}
          >
            {ws.brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </Select>
          <Input
            label="Date"
            type="date"
            value={p.date}
            onChange={(e) => set("date", e.target.value)}
          />
          <Input
            label="Time"
            type="time"
            value={p.time ?? ""}
            onChange={(e) => set("time", e.target.value || undefined)}
          />
          <Select
            label="Status"
            value={p.status}
            onChange={(e) => set("status", e.target.value as Post["status"])}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </Select>
          <Select
            label="Platform"
            value={p.platform}
            onChange={(e) => set("platform", e.target.value as Post["platform"])}
          >
            {PLATFORMS.map((s) => (
              <option key={s} value={s}>
                {PLATFORM_LABEL[s]}
              </option>
            ))}
          </Select>
          <Select
            label="Format"
            value={p.format}
            onChange={(e) => set("format", e.target.value as Post["format"])}
          >
            {FORMATS.map((s) => (
              <option key={s} value={s}>
                {FORMAT_LABEL[s]}
              </option>
            ))}
          </Select>
          <Select label="Pillar" value={p.pillar} onChange={(e) => set("pillar", e.target.value)}>
            <option value="">—</option>
            {[...new Set([...(brand?.pillars ?? []), p.pillar].filter(Boolean))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select
            label="Campaign"
            value={p.campaignId ?? ""}
            onChange={(e) => set("campaignId", e.target.value || undefined)}
          >
            <option value="">No campaign</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <div className="md:col-span-2">
            <Input label="Title" value={p.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Input label="Topic" value={p.topic} onChange={(e) => set("topic", e.target.value)} />
          </div>
          <div className="md:col-span-4">
            <Input
              label="Hook"
              value={p.hook}
              onChange={(e) => set("hook", e.target.value)}
              placeholder="The first line / first 3 seconds"
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              label="Caption"
              rows={6}
              value={p.caption}
              onChange={(e) => set("caption", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              label="Creative brief"
              rows={6}
              value={p.brief}
              onChange={(e) => set("brief", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Input label="CTA" value={p.cta} onChange={(e) => set("cta", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Hashtags"
              value={hashtagText}
              onChange={(e) => setHashtagText(e.target.value)}
              placeholder="#branding #design"
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Canva design link"
              value={p.canvaUrl}
              onChange={(e) => set("canvaUrl", e.target.value)}
              placeholder="https://www.canva.com/design/…"
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Published post URL"
              value={p.postUrl}
              onChange={(e) => set("postUrl", e.target.value)}
            />
          </div>
          <Input
            label="Video length (s)"
            type="number"
            min={0}
            value={p.videoLength ?? ""}
            onChange={(e) =>
              set("videoLength", e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <div className="md:col-span-3">
            <Input
              label="Labels (comma separated)"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              placeholder="ugc, before-after, trend"
            />
          </div>
          <div className="md:col-span-4">
            <Textarea
              label="Notes"
              rows={2}
              value={p.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
          {p.planReason && (
            <div className="md:col-span-4">
              <Notice>
                <strong>Why this was planned:</strong> {p.planReason}
                {p.kpi && (
                  <>
                    <br />
                    <strong>KPI:</strong> {p.kpi}
                  </>
                )}
              </Notice>
            </div>
          )}
        </div>
      )}

      {tab === "metrics" && (
        <MetricsPanel
          post={live}
          d={d}
          onAdd={(m, note) =>
            addSnapshot(live.id, {
              id: uid(),
              source: "manual",
              capturedAt: nowIso(),
              values: m,
              note,
            })
          }
          isNew={isNew}
        />
      )}

      {tab === "source" && (
        <div className="space-y-5 text-sm">
          <div>
            <h3 className="mb-2 font-semibold">Imported source rows</h3>
            {live.sources.length === 0 && (
              <p className="text-muted-foreground">Created manually in the Command Center.</p>
            )}
            {live.sources.map((s, i) => {
              const imp = ws.imports.find((x) => x.id === s.importId);
              return (
                <details key={i} className="mb-2 rounded-[var(--radius)] border p-3">
                  <summary className="cursor-pointer">
                    {imp?.fileName ?? "Unknown file"} · row {s.rowIndex + 1} ·{" "}
                    {imp ? new Date(imp.importedAt).toLocaleString("en-GB") : ""}{" "}
                    {imp?.status === "reverted" && <Pill tone="bad">reverted</Pill>}
                  </summary>
                  <table className="mt-2 w-full text-xs">
                    <tbody>
                      {Object.entries(s.raw).map(([k, v]) => (
                        <tr key={k} className="border-t align-top">
                          <td className="py-1 pr-3 text-muted-foreground">{k}</td>
                          <td className="py-1 break-all">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              );
            })}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Correction history</h3>
            {live.edits.length === 0 ? (
              <p className="text-muted-foreground">No edits recorded.</p>
            ) : (
              <ul className="space-y-1 text-xs">
                {[...live.edits].reverse().map((e, i) => (
                  <li key={i} className="border-b py-1">
                    <span className="text-muted-foreground">
                      {new Date(e.at).toLocaleString("en-GB")}
                    </span>{" "}
                    · <strong>{e.field}</strong>: “{e.from || "∅"}” → “{e.to || "∅"}”
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
        {!isNew ? (
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm("Delete this content item and its metrics? This can't be undone.")) {
                deletePost(p.id);
                onClose();
              }
            }}
          >
            <Trash2 className="size-3.5" /> Delete
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          {p.canvaUrl && (
            <a
              href={p.canvaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm hover:bg-muted"
            >
              Canva <ExternalLink className="size-3.5" />
            </a>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>{isNew ? "Create" : "Save changes"}</Button>
        </div>
      </div>
    </Modal>
  );
}

function MetricsPanel({
  post,
  d,
  onAdd,
  isNew,
}: {
  post: Post;
  d: ReturnType<typeof derive>;
  onAdd: (m: Metrics, note: string) => void;
  isNew: boolean;
}) {
  const cur = latest(post);
  const [form, setForm] = useState<Record<string, string>>(() =>
    Object.fromEntries(METRIC_KEYS.map((k) => [k, cur?.values[k]?.toString() ?? ""])),
  );
  const [note, setNote] = useState("");
  return (
    <div className="space-y-5">
      {post.status !== "published" && (
        <Notice>
          Performance data only counts toward analytics once the status is “Published”.
        </Notice>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Engagement" value={fmtNum(d.engagement)} />
        <MiniStat
          label={`ER${d.erBasis ? ` (by ${d.erBasis})` : ""}`}
          value={fmtPct(d.er, 2)}
          warn={d.erFallback ? "Preferred basis missing: fallback used" : undefined}
        />
        <MiniStat label="Meaningful (C+S+S)" value={fmtNum(d.meaningful)} />
        <MiniStat label="Source" value={d.source} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Snapshots</h3>
        {post.metrics.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No performance data. Import an analytics export, or enter actual numbers below.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs tabular-nums">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-1 pr-3 font-medium">Captured</th>
                  <th className="pr-3 font-medium">Source</th>
                  {METRIC_KEYS.filter((k) => post.metrics.some((s) => s.values[k] != null)).map(
                    (k) => (
                      <th key={k} className="pr-3 font-medium">
                        {METRIC_LABEL[k]}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {[...post.metrics]
                  .sort((a, b) => b.capturedAt.localeCompare(a.capturedAt))
                  .map((s, i) => (
                    <tr key={s.id} className="border-t">
                      <td className="py-1.5 pr-3">
                        {new Date(s.capturedAt).toLocaleString("en-GB")}{" "}
                        {i === 0 && <Pill tone="brand">current</Pill>}
                      </td>
                      <td className="pr-3">
                        {s.source === "manual"
                          ? `Manual${s.note ? `: ${s.note}` : ""}`
                          : s.source === "demo"
                            ? "Synthetic demo"
                            : (s.note ?? "Import")}
                      </td>
                      {METRIC_KEYS.filter((k) => post.metrics.some((x) => x.values[k] != null)).map(
                        (k) => (
                          <td key={k} className="pr-3">
                            {s.values[k] ?? "—"}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          The most recent snapshot is used. Snapshots are never added together, so importing the
          same export twice can't double-count.
        </p>
      </div>
      {!isNew && (
        <div className="rounded-[var(--radius)] border p-4">
          <h3 className="mb-1 text-sm font-semibold">Enter or correct actual metrics</h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Saved as a new manual snapshot. Earlier imported values stay in the history above. Leave
            a field empty if you don't know the number.
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {METRIC_KEYS.map((k) => (
              <Input
                key={k}
                label={METRIC_LABEL[k]}
                inputMode="decimal"
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                label="Note (where the numbers came from)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Instagram Insights, 30 days after posting"
              />
            </div>
            <Button
              onClick={() => {
                const m: Metrics = {};
                for (const k of METRIC_KEYS) {
                  const v = (form[k] ?? "").trim().replace(",", ".");
                  if (v !== "" && Number.isFinite(Number(v))) m[k as MetricKey] = Number(v);
                }
                if (Object.keys(m).length) onAdd(m, note);
              }}
            >
              Save snapshot
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: string | undefined;
}) {
  return (
    <div className="rounded-[var(--radius)] border px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-semibold tabular-nums">{value}</p>
      {warn && <p className="text-[10px] text-[var(--warn)]">{warn}</p>}
    </div>
  );
}
