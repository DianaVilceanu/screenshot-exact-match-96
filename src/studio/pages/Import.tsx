import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, FileUp, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { autoMap, FIELDS, isKnownHeader, type DateOrder, type FieldKey } from "../lib/mapping";
import {
  ANALYTICS_TEMPLATE,
  commitImport,
  conflicts,
  downloadCsv,
  mapRows,
  matchRows,
  PLAN_TEMPLATE,
  type RowPlan,
} from "../lib/importer";
import { parseDelimited, parseFile, toTable, type Table } from "../lib/parse";
import { useStore, useView } from "../lib/store";
import {
  FORMAT_LABEL,
  PLATFORMS,
  PLATFORM_LABEL,
  type ImportKind,
  type ImportRecord,
  type Platform,
} from "../lib/types";
import {
  Button,
  Card,
  Empty,
  Notice,
  PageHeader,
  Pill,
  Select,
  Tabs,
  Textarea,
} from "../components/ui";

type Step = "setup" | "map" | "review" | "done";

export function Import() {
  const { ws, update, revertImport } = useStore();
  const { brandId, setBrandId } = useView();
  const [step, setStep] = useState<Step>("setup");
  const [kind, setKind] = useState<ImportKind>("plan");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [file, setFile] = useState<File | null>(null);
  const [paste, setPaste] = useState("");
  const [mode, setMode] = useState<"file" | "paste">("file");
  const [table, setTable] = useState<Table | null>(null);
  const [mapping, setMapping] = useState<Record<string, FieldKey>>({});
  const [dateOrder, setDateOrder] = useState<DateOrder>("auto");
  const [plans, setPlans] = useState<RowPlan[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<ImportRecord | null>(null);
  const brand = ws.brands.find((b) => b.id === brandId);

  const load = async (sheet?: string) => {
    setError(null);
    setBusy(true);
    try {
      const t =
        mode === "paste"
          ? toTable(parseDelimited(paste), isKnownHeader)
          : await parseFile(file!, isKnownHeader, sheet);
      if (!t.headers.length || !t.rows.length)
        throw new Error(t.warnings.join(" ") || "No rows found.");
      setTable(t);
      setMapping(autoMap(t.headers));
      setStep("map");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const mapped = useMemo(
    () => (table ? mapRows(table, { mapping, dateOrder, defaultPlatform: platform, kind }) : null),
    [table, mapping, dateOrder, platform, kind],
  );
  const reset = () => {
    setStep("setup");
    setTable(null);
    setFile(null);
    setPaste("");
    setPlans([]);
    setRecord(null);
  };
  const history = ws.imports.filter((i) => !brand || i.brandId === brand.id);

  if (!ws.brands.length)
    return (
      <>
        <PageHeader eyebrow="Data" title="Import data" />
        <Empty
          title="Create a brand first"
          action={
            <Link
              to="/studio/brands"
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm text-primary-foreground"
            >
              Create a brand
            </Link>
          }
        >
          Every import belongs to a brand.
        </Empty>
      </>
    );

  return (
    <>
      <PageHeader
        eyebrow="Data"
        title="Import data"
        description="Content plans and analytics exports from CSV, Excel (.xlsx), PDF or a pasted table. Nothing is saved until you confirm, and existing data is never silently overwritten."
      />
      <Stepper step={step} />

      {step === "setup" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2" title="What are you importing?">
            <div className="grid gap-3 md:grid-cols-3">
              <Select
                label="Brand"
                value={brand ? brandId : ""}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value="" disabled>
                  Choose…
                </option>
                {ws.brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </Select>
              <Select
                label="Data type"
                value={kind}
                onChange={(e) => setKind(e.target.value as ImportKind)}
              >
                <option value="plan">Content plan (Canva / planning sheet)</option>
                <option value="analytics">Analytics export (published posts + metrics)</option>
              </Select>
              <Select
                label="Platform if the file has no column"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {PLATFORM_LABEL[p]}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mt-4">
              <Tabs
                value={mode}
                onChange={setMode}
                tabs={[
                  { value: "file", label: "Upload file" },
                  { value: "paste", label: "Paste table" },
                ]}
              />
              {mode === "file" ? (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed bg-muted/30 px-6 py-10 text-center hover:bg-muted/60">
                  <FileUp className="size-6 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {file ? file.name : "Choose a CSV, TSV, XLSX or PDF file"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {file
                      ? `${(file.size / 1024).toFixed(0)} KB`
                      : "Files are read in your browser and never uploaded."}
                  </span>
                  <input
                    type="file"
                    accept=".csv,.tsv,.txt,.xlsx,.xlsm,.pdf"
                    className="sr-only"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              ) : (
                <Textarea
                  value={paste}
                  onChange={(e) => setPaste(e.target.value)}
                  rows={8}
                  placeholder="Copy a table from Canva, Google Sheets, Excel or Notion (including the header row) and paste it here."
                  className="font-mono text-xs"
                />
              )}
            </div>
            {error && (
              <Notice tone="warn" className="mt-3">
                {error}
              </Notice>
            )}
            <div className="mt-4 flex justify-end">
              <Button
                disabled={!brand || busy || (mode === "file" ? !file : !paste.trim())}
                onClick={() => load()}
              >
                {busy ? "Reading…" : "Read file →"}
              </Button>
            </div>
          </Card>
          <Card title="Where to get the files">
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Canva content plan:</strong> if the plan is a
                Canva Sheet or a table, use Download → CSV, or select the table, copy it and use
                “Paste table”. A PDF export works if it has real text (not flattened images). Canva
                links in the plan are kept on each post.
              </p>
              <p>
                <strong className="text-foreground">Instagram & Facebook:</strong> Meta Business
                Suite → Insights → Content → Export data (CSV or XLSX), one export per platform.
              </p>
              <p>
                <strong className="text-foreground">TikTok:</strong> TikTok Studio → Analytics →
                Content → Download data, or a third-party export.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadCsv("content-plan-template.csv", [PLAN_TEMPLATE])}
                >
                  Plan template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadCsv("analytics-template.csv", [ANALYTICS_TEMPLATE])}
                >
                  Analytics template
                </Button>
              </div>
              <p className="text-xs">The templates contain column headers only, no example data.</p>
            </div>
          </Card>
        </div>
      )}

      {step === "map" && table && mapped && (
        <MapStep
          table={table}
          mapping={mapping}
          setMapping={setMapping}
          dateOrder={dateOrder}
          setDateOrder={setDateOrder}
          mapped={mapped}
          kind={kind}
          fileName={file?.name ?? "Pasted table"}
          onSheet={(s) => load(s)}
          onBack={reset}
          onNext={() => {
            setPlans(matchRows(mapped.rows, ws, brandId, kind));
            setStep("review");
          }}
        />
      )}

      {step === "review" && (
        <ReviewStep
          plans={plans}
          setPlans={setPlans}
          kind={kind}
          onBack={() => setStep("map")}
          onCommit={() => {
            const res = commitImport({
              ws,
              brandId,
              kind,
              fileName: file?.name ?? "Pasted table",
              fileType: mode === "paste" ? "paste" : (file?.name.split(".").pop() ?? ""),
              headers: table!.headers,
              mapping,
              plans,
            });
            update(() => res.ws);
            setRecord(res.record);
            setStep("done");
          }}
        />
      )}

      {step === "done" && record && (
        <Card>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-6 text-[var(--good)]" />
            <div>
              <h2 className="font-display text-2xl">Import complete</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {record.fileName}: {record.rows} rows → {record.created} created,{" "}
                {record.kind === "analytics"
                  ? `${record.matched} matched to existing posts`
                  : `${record.merged} merged into existing items`}
                , {record.skipped} skipped.
              </p>
              {record.notes.map((n) => (
                <p key={n} className="text-sm text-muted-foreground">
                  {n}
                </p>
              ))}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={reset}>Import another file</Button>
                <Link
                  to="/studio/calendar"
                  className="inline-flex h-9 items-center rounded-md border px-3.5 text-sm"
                >
                  Open calendar
                </Link>
                <Link
                  to="/studio"
                  className="inline-flex h-9 items-center rounded-md border px-3.5 text-sm"
                >
                  See overview
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card
        className="mt-8"
        title="Import history"
        subtitle="Every dataset and where it came from. Reverting removes posts created by that import and its metric snapshots. Everything else stays."
      >
        {!history.length ? (
          <p className="text-sm text-muted-foreground">No imports yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-[13px]">
              <thead>
                <tr className="border-b text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {[
                    "When",
                    "Brand",
                    "File",
                    "Type",
                    "Rows",
                    "Created",
                    "Matched / merged",
                    "Skipped",
                    "Status",
                    "",
                  ].map((h) => (
                    <th key={h} className="px-2 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((i) => (
                  <tr key={i.id} className="border-b last:border-0">
                    <td className="px-2 py-2 whitespace-nowrap tabular-nums">
                      {new Date(i.importedAt).toLocaleString("en-GB")}
                    </td>
                    <td className="px-2 py-2">{ws.brands.find((b) => b.id === i.brandId)?.name}</td>
                    <td
                      className="max-w-[220px] truncate px-2 py-2"
                      title={`Columns: ${i.headers.join(", ")}`}
                    >
                      {i.fileName}
                    </td>
                    <td className="px-2 py-2">
                      {i.kind === "plan" ? "Content plan" : "Analytics"}
                    </td>
                    <td className="px-2 py-2 tabular-nums">{i.rows}</td>
                    <td className="px-2 py-2 tabular-nums">{i.created}</td>
                    <td className="px-2 py-2 tabular-nums">{i.matched + i.merged}</td>
                    <td className="px-2 py-2 tabular-nums">{i.skipped}</td>
                    <td className="px-2 py-2">
                      {i.status === "active" ? (
                        <Pill tone="good">Active</Pill>
                      ) : (
                        <Pill tone="bad">Reverted</Pill>
                      )}
                    </td>
                    <td className="px-2 py-2 text-right">
                      {i.status === "active" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            confirm(
                              `Revert “${i.fileName}”? Posts it created (${i.created}) and its metric snapshots will be removed.`,
                            ) && revertImport(i.id)
                          }
                        >
                          <Undo2 className="size-3.5" /> Revert
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: [Step, string][] = [
    ["setup", "Source"],
    ["map", "Map columns"],
    ["review", "Review matches"],
    ["done", "Done"],
  ];
  const idx = steps.findIndex(([s]) => s === step);
  return (
    <ol className="mb-5 flex flex-wrap gap-2 text-xs">
      {steps.map(([s, l], i) => (
        <li
          key={s}
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1",
            i === idx && "border-primary bg-primary text-primary-foreground",
            i < idx && "text-muted-foreground",
          )}
        >
          <span className="tabular-nums">{i + 1}</span> {l}
        </li>
      ))}
    </ol>
  );
}

function MapStep({
  table,
  mapping,
  setMapping,
  dateOrder,
  setDateOrder,
  mapped,
  kind,
  fileName,
  onSheet,
  onBack,
  onNext,
}: {
  table: Table;
  mapping: Record<string, FieldKey>;
  setMapping: (m: Record<string, FieldKey>) => void;
  dateOrder: DateOrder;
  setDateOrder: (d: DateOrder) => void;
  mapped: ReturnType<typeof mapRows>;
  kind: ImportKind;
  fileName: string;
  onSheet: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const used = Object.values(mapping).filter((v) => v !== "ignore");
  const hasDate = used.includes("date") || used.includes("datetime");
  const hasMetric = used.some((v) => FIELDS.find((f) => f.key === v)?.group === "Metrics");
  const hasIdentity = used.some((v) =>
    ["title", "caption", "topic", "hook", "postUrl", "postId"].includes(v),
  );
  const warnRows = mapped.rows.filter((r) => r.warnings.length);
  const blockers = [
    !hasIdentity &&
      "Map at least one identifying column (title, caption, topic, hook, post URL or post ID).",
    kind === "analytics" && !hasMetric && "An analytics import needs at least one metric column.",
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-4">
      <Card
        title={`Map columns · ${fileName}`}
        subtitle={`${table.rows.length} rows, ${table.headers.length} columns. Columns were matched automatically by name. Check each one.`}
      >
        {table.sheetNames && table.sheetNames.length > 1 && (
          <div className="mb-3 max-w-xs">
            <Select label="Sheet" value={table.sheet} onChange={(e) => onSheet(e.target.value)}>
              {table.sheetNames.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
        )}
        {table.warnings.map((w) => (
          <Notice key={w} tone="warn" className="mb-2">
            {w}
          </Notice>
        ))}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-[13px]">
            <thead>
              <tr className="border-b text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <th className="py-2 pr-2 font-medium">Column in file</th>
                <th className="px-2 font-medium">Sample values</th>
                <th className="px-2 font-medium">Import as</th>
              </tr>
            </thead>
            <tbody>
              {table.headers.map((h, i) => {
                const dupe =
                  mapping[h] !== "ignore" &&
                  Object.entries(mapping).filter(([, v]) => v === mapping[h]).length > 1 &&
                  !["caption", "notes", "brief"].includes(mapping[h] ?? "");
                return (
                  <tr key={h} className="border-b last:border-0">
                    <td className="py-2 pr-2 font-medium">{h}</td>
                    <td className="max-w-[360px] px-2 text-xs text-muted-foreground">
                      <span className="line-clamp-2">
                        {table.rows
                          .slice(0, 3)
                          .map((r) => r[i])
                          .filter(Boolean)
                          .join(" · ") || "—"}
                      </span>
                    </td>
                    <td className="w-56 px-2 py-1.5">
                      <Select
                        value={mapping[h]}
                        onChange={(e) =>
                          setMapping({ ...mapping, [h]: e.target.value as FieldKey })
                        }
                        aria-label={`Map ${h}`}
                        className={cn(
                          mapping[h] === "ignore" && "text-muted-foreground",
                          dupe && "border-[var(--warn)]",
                        )}
                      >
                        {(["Other", "Identity", "Content", "Metrics"] as const).map((g) => (
                          <optgroup key={g} label={g}>
                            {FIELDS.filter((f) => f.group === g).map((f) => (
                              <option key={f.key} value={f.key}>
                                {f.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </Select>
                      {dupe && (
                        <p className="mt-0.5 text-[10px] text-[var(--warn)]">
                          Also mapped from another column. Values will be joined.
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {hasDate && (
          <div className="mt-4 grid max-w-md gap-1">
            <Select
              label="Date format"
              value={dateOrder}
              onChange={(e) => setDateOrder(e.target.value as DateOrder)}
            >
              <option value="auto">Detect automatically</option>
              <option value="dmy">Day/Month/Year (31/12/2025)</option>
              <option value="mdy">Month/Day/Year (12/31/2025, Meta exports)</option>
            </Select>
            {mapped.dateAmbiguous && (
              <p className="text-xs text-[var(--warn)]">
                Every date could be read either way (e.g. 03/04). Choose the format explicitly. Meta
                exports are usually Month/Day/Year.
              </p>
            )}
          </div>
        )}
      </Card>

      <Card
        title="Preview"
        subtitle="How the first rows will be read. Check dates, platforms and numbers."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-xs">
            <thead>
              <tr className="border-b text-left text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                {[
                  "Row",
                  "Date",
                  "Platform",
                  "Format",
                  "Title / caption",
                  "Pillar",
                  "Metrics",
                  "Warnings",
                ].map((h) => (
                  <th key={h} className="px-2 py-1.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mapped.rows.slice(0, 6).map((r) => (
                <tr key={r.index} className="border-b align-top last:border-0">
                  <td className="px-2 py-1.5 tabular-nums">{r.index + 1}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap tabular-nums">
                    {r.post.date ? (
                      `${r.post.date}${r.post.time ? " " + r.post.time : ""}`
                    ) : (
                      <span className="text-[var(--warn)]">none</span>
                    )}
                  </td>
                  <td className="px-2 py-1.5">{PLATFORM_LABEL[r.post.platform!]}</td>
                  <td className="px-2 py-1.5">
                    {r.post.format ? (
                      FORMAT_LABEL[r.post.format]
                    ) : (
                      <span className="text-muted-foreground">Static (default)</span>
                    )}
                  </td>
                  <td className="max-w-[240px] px-2 py-1.5">
                    <span className="line-clamp-2">{r.post.title || "—"}</span>
                  </td>
                  <td className="px-2 py-1.5">{r.post.pillar || "—"}</td>
                  <td className="px-2 py-1.5 tabular-nums">
                    {Object.entries(r.metrics)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(", ") || "—"}
                  </td>
                  <td className="px-2 py-1.5 text-[var(--warn)]">{r.warnings.join("; ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {warnRows.length > 0 && (
          <p className="mt-2 text-xs text-[var(--warn)]">
            {warnRows.length} row(s) have warnings. Those values will be left empty. You can fix
            them after import.
          </p>
        )}
      </Card>

      {blockers.map((b) => (
        <Notice key={b} tone="warn">
          {b}
        </Notice>
      ))}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Start over
        </Button>
        <Button disabled={blockers.length > 0} onClick={onNext}>
          Match against existing content →
        </Button>
      </div>
    </div>
  );
}

const CERT: Record<
  RowPlan["certainty"],
  { label: string; tone: "good" | "warn" | "neutral" | "brand" | "bad" }
> = {
  certain: { label: "Exact match", tone: "good" },
  likely: { label: "Likely match", tone: "brand" },
  uncertain: { label: "Needs review", tone: "warn" },
  none: { label: "New", tone: "neutral" },
  "duplicate-metrics": { label: "Already imported", tone: "bad" },
};

function ReviewStep({
  plans,
  setPlans,
  kind,
  onBack,
  onCommit,
}: {
  plans: RowPlan[];
  setPlans: (p: RowPlan[]) => void;
  kind: ImportKind;
  onBack: () => void;
  onCommit: () => void;
}) {
  const [filter, setFilter] = useState<"review" | "all" | RowPlan["certainty"]>(
    plans.some((p) => p.certainty === "uncertain") ? "review" : "all",
  );
  const pending = plans.filter((p) => !p.action).length;
  const counts = (c: RowPlan["certainty"]) => plans.filter((p) => p.certainty === c).length;
  const shown = plans.filter((p) =>
    filter === "all"
      ? true
      : filter === "review"
        ? p.certainty === "uncertain"
        : p.certainty === filter,
  );
  const setOne = (i: number, patch: Partial<RowPlan>) =>
    setPlans(plans.map((p) => (p.row.index === i ? { ...p, ...patch } : p)));
  const createLabel = kind === "analytics" ? "Create as new published post" : "Create new item";
  const mergeLabel =
    kind === "analytics" ? "Attach metrics to" : "Merge into (fill empty fields only)";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {(["certain", "likely", "uncertain", "none", "duplicate-metrics"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-[var(--radius)] border bg-card px-4 py-3 text-left",
              filter === c && "ring-2 ring-[var(--ring)]",
            )}
          >
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              {CERT[c].label}
            </p>
            <p className="text-2xl font-semibold tabular-nums">{counts(c)}</p>
          </button>
        ))}
      </div>
      <Notice tone={pending ? "warn" : "info"}>
        {pending ? (
          <>
            <strong>{pending} row(s) need your decision.</strong> They might match existing content,
            but not clearly enough to merge automatically. Pick the right post, create a new item,
            or skip.
          </>
        ) : (
          <>
            All rows have a decision. Exact and likely matches were pre-selected. Change any of them
            below. Existing non-empty fields are never overwritten: differences are listed so you
            can correct them later.
          </>
        )}
      </Notice>
      <div className="flex flex-wrap items-center gap-2">
        <Tabs
          value={filter}
          onChange={setFilter}
          tabs={[
            { value: "review", label: `Needs review (${counts("uncertain")})` },
            { value: "all", label: `All rows (${plans.length})` },
          ]}
        />
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPlans(plans.map((p) => (p.action ? p : { ...p, action: "skip" })))}
            disabled={!pending}
          >
            Skip all undecided
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {shown.slice(0, 200).map((p) => {
          const target = p.candidates.find((c) => c.post.id === p.targetId)?.post;
          const conf = target && p.action === "merge" ? conflicts(target, p.row) : [];
          return (
            <div
              key={p.row.index}
              className={cn(
                "rounded-[var(--radius)] border bg-card p-3",
                !p.action && "border-[var(--warn)]/50",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground tabular-nums">
                    Row {p.row.index + 1} · {p.row.post.date || "no date"} ·{" "}
                    {PLATFORM_LABEL[p.row.post.platform!]}{" "}
                    {p.row.post.format ? `· ${FORMAT_LABEL[p.row.post.format]}` : ""}
                  </p>
                  <p className="truncate text-sm font-medium">
                    {p.row.post.title || "Untitled row"}
                  </p>
                  {Object.keys(p.row.metrics).length > 0 && (
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {Object.entries(p.row.metrics)
                        .map(([k, v]) => `${k} ${v}`)
                        .join(" · ")}
                    </p>
                  )}
                </div>
                <Pill tone={CERT[p.certainty].tone}>{CERT[p.certainty].label}</Pill>
              </div>
              <div className="mt-2 grid gap-1 text-sm">
                {p.candidates.slice(0, 3).map((c) => (
                  <label
                    key={c.post.id}
                    className="flex cursor-pointer items-start gap-2 rounded px-1.5 py-1 hover:bg-muted"
                  >
                    <input
                      type="radio"
                      name={`r${p.row.index}`}
                      checked={p.action === "merge" && p.targetId === c.post.id}
                      onChange={() => setOne(p.row.index, { action: "merge", targetId: c.post.id })}
                      className="mt-1"
                    />
                    <span className="min-w-0">
                      <span className="text-muted-foreground">{mergeLabel}: </span>
                      <span className="font-medium">
                        {c.post.title || c.post.hook || "Untitled"}
                      </span>{" "}
                      <span className="text-xs text-muted-foreground tabular-nums">
                        ({c.post.date || "no date"} · {PLATFORM_LABEL[c.post.platform]} ·{" "}
                        {Math.round(c.score * 100)}% · {c.reasons.join(", ")})
                      </span>
                    </span>
                  </label>
                ))}
                <label className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-muted">
                  <input
                    type="radio"
                    name={`r${p.row.index}`}
                    checked={p.action === "create"}
                    onChange={() => setOne(p.row.index, { action: "create", targetId: undefined })}
                  />
                  {createLabel}
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-muted">
                  <input
                    type="radio"
                    name={`r${p.row.index}`}
                    checked={p.action === "skip"}
                    onChange={() => setOne(p.row.index, { action: "skip", targetId: undefined })}
                  />
                  Skip this row
                  {p.certainty === "duplicate-metrics"
                    ? " (these exact metrics are already on the matched post)"
                    : ""}
                </label>
              </div>
              {conf.length > 0 && (
                <details className="mt-1 text-xs">
                  <summary className="cursor-pointer text-[var(--warn)]">
                    {conf.length} field(s) differ from the existing item and will NOT be overwritten
                  </summary>
                  <ul className="mt-1 space-y-0.5">
                    {conf.map((c) => (
                      <li key={c.field}>
                        <strong>{c.field}</strong>: keeps “{c.existing.slice(0, 80)}”, file has “
                        {c.incoming.slice(0, 80)}”
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          );
        })}
        {shown.length > 200 && (
          <p className="text-xs text-muted-foreground">
            Showing the first 200 rows of {shown.length}. Decisions for the rest keep their
            defaults.
          </p>
        )}
        {!shown.length && (
          <p className="py-6 text-center text-sm text-muted-foreground">No rows in this view.</p>
        )}
      </div>
      <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t bg-background/95 py-3 backdrop-blur">
        <Button variant="outline" onClick={onBack}>
          ← Back to mapping
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {plans.filter((p) => p.action === "create").length} create ·{" "}
            {plans.filter((p) => p.action === "merge").length}{" "}
            {kind === "analytics" ? "attach" : "merge"} ·{" "}
            {plans.filter((p) => p.action === "skip").length} skip
          </span>
          <Button disabled={pending > 0} onClick={onCommit}>
            Import {plans.length - plans.filter((p) => p.action === "skip").length} rows
          </Button>
        </div>
      </div>
    </div>
  );
}
