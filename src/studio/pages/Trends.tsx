import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { buildRows, fmtIndex } from "../lib/analytics";
import { ownTrends } from "../lib/insights";
import { nowIso, uid, useStore, useView } from "../lib/store";
import type { Trend } from "../lib/types";
import { usePostEditor } from "../components/PostEditor";
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
  Tentative,
  Textarea,
} from "../components/ui";

export function Trends() {
  const { ws, saveTrend, deleteTrend } = useStore();
  const { brandId } = useView();
  const { openPost } = usePostEditor();
  const brand = ws.brands.find((b) => b.id === brandId);
  const [editing, setEditing] = useState<Trend | null>(null);
  const rows = useMemo(
    () => buildRows(ws).filter((r) => !brand || r.post.brandId === brand.id),
    [ws, brand],
  );
  const own = ownTrends(rows, ws.settings.minSample);
  const trends = ws.trends.filter((t) => !brand || t.brandId === brand.id);
  const external = trends.filter((t) => t.kind === "external");
  const hypotheses = trends.filter((t) => t.kind === "hypothesis");
  const blank = (kind: Trend["kind"]): Trend => ({
    id: uid(),
    brandId: brand?.id ?? ws.brands[0]?.id ?? "",
    topic: "",
    relevance: "",
    format: "",
    hook: "",
    cta: "",
    priority: "medium",
    kind,
    source: "",
    createdAt: nowIso(),
  });

  return (
    <>
      <PageHeader
        eyebrow="Signals"
        title="Trends"
        description="Two separate sources: what's rising in your own data, and outside trends you've researched (each with a source)."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => setEditing(blank("hypothesis"))}
              disabled={!ws.brands.length}
            >
              <Plus className="size-4" /> Hypothesis
            </Button>
            <Button onClick={() => setEditing(blank("external"))} disabled={!ws.brands.length}>
              <Plus className="size-4" /> Researched trend
            </Button>
          </>
        }
      />
      <Notice tone="warn" className="mb-5">
        <strong>No live trend feed is connected.</strong> The Command Center can't check what's
        trending on Instagram, Facebook or TikTok right now, and it won't pretend to. External
        trends below are ones you've entered with a source (for example TikTok Creative Center,
        Instagram's trend reports or an industry newsletter), with the date you checked. Anything
        without a source is labelled a hypothesis to verify.
      </Notice>

      <section className="mb-8">
        <h2 className="mb-1 font-display text-2xl">From your own content</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Features whose engagement index changed by ±20% or more between the last 3 months and the
          3 months before{brand ? ` for ${brand.name}` : " (all brands)"}.
        </p>
        {!own.length ? (
          <Empty title="No internal trends detected">
            Needs posts with metrics in both periods and at least a few posts per feature.
          </Empty>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {own.map((t) => (
              <Card key={`${t.dim}:${t.value}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      {t.change > 0 ? "Rising" : "Cooling"}
                    </p>
                    <h3 className="font-semibold">{t.label}</h3>
                  </div>
                  {t.tentative ? (
                    <Tentative />
                  ) : (
                    <Pill tone={t.change > 0 ? "good" : "bad"}>
                      {t.change > 0 ? "+" : ""}
                      {Math.round(t.change * 100)}%
                    </Pill>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground tabular-nums">
                  {fmtIndex(t.previous)} ({t.nPrev} posts) → {fmtIndex(t.recent)} ({t.nRecent}{" "}
                  posts)
                </p>
                {t.example && (
                  <button
                    onClick={() => openPost(t.example!.id)}
                    className="mt-2 truncate text-left text-xs underline underline-offset-2"
                  >
                    Best recent: {t.example.title || t.example.hook}
                  </button>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  Source: your imported analytics.
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      <TrendSection
        title="External research"
        subtitle="Researched trends with a source. These can feed Content Ideas."
        list={external}
        onEdit={setEditing}
        onDelete={deleteTrend}
        brandName={(id) => ws.brands.find((b) => b.id === id)?.name ?? ""}
      />
      <TrendSection
        title="Hypotheses & research to do"
        subtitle="Ideas that haven't been checked against current data. Not used in monthly plans."
        list={hypotheses}
        onEdit={setEditing}
        onDelete={deleteTrend}
        brandName={(id) => ws.brands.find((b) => b.id === id)?.name ?? ""}
      />

      {brand && (
        <Card
          className="mt-6"
          title={`Where to research for ${brand.name}`}
          subtitle="Places to check. These are suggestions, not trends."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {brand.platforms.includes("tiktok") && (
              <li>
                TikTok Creative Center → Trends (hashtags, songs, creators), filtered to your region
                and the {brand.industry || "relevant"} industry.
              </li>
            )}
            {brand.platforms.includes("instagram") && (
              <li>Instagram Reels audio tab (“Trending” arrow) and Meta's own trend reports.</li>
            )}
            {brand.platforms.includes("facebook") && (
              <li>Meta Business Suite → Inspiration hub for your page category.</li>
            )}
            <li>
              Google Trends for {brand.pillars.slice(0, 3).join(", ") || "your pillars"} in your
              country.
            </li>
            <li>
              Comments and DMs on your top posts: questions people repeat are content prompts.
            </li>
          </ul>
        </Card>
      )}

      {editing && (
        <Modal
          open
          onClose={() => setEditing(null)}
          title={editing.kind === "external" ? "Researched trend" : "Trend hypothesis"}
          wide
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Select
              label="Brand"
              value={editing.brandId}
              onChange={(e) => setEditing({ ...editing, brandId: e.target.value })}
            >
              {ws.brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
            <Select
              label="Type"
              value={editing.kind}
              onChange={(e) => setEditing({ ...editing, kind: e.target.value as Trend["kind"] })}
            >
              <option value="external">Researched (has a source)</option>
              <option value="hypothesis">Hypothesis (to verify)</option>
            </Select>
            <Input
              label="Topic *"
              value={editing.topic}
              onChange={(e) => setEditing({ ...editing, topic: e.target.value })}
            />
            <Select
              label="Priority"
              value={editing.priority}
              onChange={(e) =>
                setEditing({ ...editing, priority: e.target.value as Trend["priority"] })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
            <div className="md:col-span-2">
              <Textarea
                label="Relevance to the brand"
                value={editing.relevance}
                onChange={(e) => setEditing({ ...editing, relevance: e.target.value })}
                rows={2}
              />
            </div>
            <Input
              label="Potential format"
              value={editing.format}
              onChange={(e) => setEditing({ ...editing, format: e.target.value })}
            />
            <Input
              label="Suggested hook"
              value={editing.hook}
              onChange={(e) => setEditing({ ...editing, hook: e.target.value })}
            />
            <Input
              label="Suggested CTA"
              value={editing.cta}
              onChange={(e) => setEditing({ ...editing, cta: e.target.value })}
            />
            <Input
              label={
                editing.kind === "external" ? "Source (URL or publication) *" : "Source (optional)"
              }
              value={editing.source}
              onChange={(e) => setEditing({ ...editing, source: e.target.value })}
            />
            {editing.kind === "external" && (
              <Input
                label="Date checked *"
                type="date"
                value={editing.retrievedAt ?? ""}
                onChange={(e) => setEditing({ ...editing, retrievedAt: e.target.value })}
              />
            )}
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              disabled={
                !editing.topic.trim() ||
                !editing.brandId ||
                (editing.kind === "external" && (!editing.source.trim() || !editing.retrievedAt))
              }
              onClick={() => {
                saveTrend(editing);
                setEditing(null);
              }}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

function TrendSection({
  title,
  subtitle,
  list,
  onEdit,
  onDelete,
  brandName,
}: {
  title: string;
  subtitle: string;
  list: Trend[];
  onEdit: (t: Trend) => void;
  onDelete: (id: string) => void;
  brandName: (id: string) => string;
}) {
  const order = { high: 0, medium: 1, low: 2 };
  return (
    <section className="mb-8">
      <h2 className="mb-1 font-display text-2xl">{title}</h2>
      <p className="mb-3 text-sm text-muted-foreground">{subtitle}</p>
      {!list.length ? (
        <p className="rounded-[var(--radius)] border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
          None yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius)] border bg-card">
          <table className="w-full min-w-[820px] text-[13px]">
            <thead>
              <tr className="border-b text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {[
                  "Topic",
                  "Brand",
                  "Relevance",
                  "Format",
                  "Hook",
                  "CTA",
                  "Priority",
                  "Source",
                  "",
                ].map((h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...list]
                .sort((a, b) => order[a.priority] - order[b.priority])
                .map((t) => (
                  <tr key={t.id} className="border-b align-top last:border-0">
                    <td className="px-3 py-2 font-medium">{t.topic}</td>
                    <td className="px-3 py-2">{brandName(t.brandId)}</td>
                    <td className="px-3 py-2 text-muted-foreground">{t.relevance || "—"}</td>
                    <td className="px-3 py-2">{t.format || "—"}</td>
                    <td className="px-3 py-2">{t.hook || "—"}</td>
                    <td className="px-3 py-2">{t.cta || "—"}</td>
                    <td className="px-3 py-2">
                      <Pill
                        tone={
                          t.priority === "high"
                            ? "good"
                            : t.priority === "medium"
                              ? "brand"
                              : "neutral"
                        }
                      >
                        {t.priority}
                      </Pill>
                    </td>
                    <td className="max-w-[200px] px-3 py-2 text-xs break-words">
                      {t.source ? (
                        /^https?:/.test(t.source) ? (
                          <a className="underline" href={t.source} target="_blank" rel="noreferrer">
                            {t.source}
                          </a>
                        ) : (
                          t.source
                        )
                      ) : (
                        <span className="text-muted-foreground">Unsourced</span>
                      )}
                      {t.retrievedAt && (
                        <div className="text-muted-foreground">checked {t.retrievedAt}</div>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Button size="sm" variant="ghost" onClick={() => onEdit(t)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => confirm("Delete this trend?") && onDelete(t.id)}
                      >
                        ✕
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
