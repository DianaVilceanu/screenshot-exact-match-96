import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmtIndex, fmtNum, fmtPct, type Row } from "../lib/analytics";
import { useStore } from "../lib/store";
import { FORMAT_LABEL } from "../lib/types";
import { usePostEditor } from "./PostEditor";
import { PlatformDot, StatusPill } from "./ui";

export type Col =
  | "date"
  | "brand"
  | "platform"
  | "format"
  | "pillar"
  | "title"
  | "hook"
  | "status"
  | "views"
  | "reach"
  | "engagement"
  | "er"
  | "index"
  | "shares"
  | "saves"
  | "meaningful"
  | "retention";

const LABEL: Record<Col, string> = {
  date: "Date",
  brand: "Brand",
  platform: "Platform",
  format: "Format",
  pillar: "Pillar",
  title: "Content",
  hook: "Hook",
  status: "Status",
  views: "Views",
  reach: "Reach",
  engagement: "Eng.",
  er: "ER",
  index: "vs typical",
  shares: "Shares",
  saves: "Saves",
  meaningful: "C+S+S",
  retention: "Retention",
};
const NUMERIC: Col[] = [
  "views",
  "reach",
  "engagement",
  "er",
  "index",
  "shares",
  "saves",
  "meaningful",
  "retention",
];

function value(r: Row, c: Col): string | number | undefined {
  switch (c) {
    case "date":
      return r.post.date;
    case "brand":
      return r.post.brandId;
    case "platform":
      return r.post.platform;
    case "format":
      return r.post.format;
    case "pillar":
      return r.post.pillar;
    case "title":
      return r.post.title || r.post.hook;
    case "hook":
      return r.post.hook;
    case "status":
      return r.post.status;
    case "views":
      return r.d.views;
    case "reach":
      return r.d.reach;
    case "engagement":
      return r.d.engagement;
    case "er":
      return r.d.er;
    case "index":
      return r.erIndex;
    case "shares":
      return r.d.m.shares;
    case "saves":
      return r.d.m.saves;
    case "meaningful":
      return r.d.meaningful;
    case "retention":
      return r.d.m.retention;
  }
}

export function PostTable({
  rows,
  cols = [
    "date",
    "brand",
    "platform",
    "format",
    "title",
    "views",
    "reach",
    "er",
    "index",
    "shares",
    "saves",
  ],
  initialSort,
  limit,
  rank,
  empty = "No content matches these filters.",
}: {
  rows: Row[];
  cols?: Col[] | undefined;
  initialSort?: { col: Col; dir: "asc" | "desc" };
  limit?: number | undefined;
  rank?: boolean | undefined;
  empty?: string | undefined;
}) {
  const { ws } = useStore();
  const { openPost } = usePostEditor();
  const [sort, setSort] = useState(initialSort ?? { col: "date" as Col, dir: "desc" as const });
  const [showAll, setShowAll] = useState(false);
  const sorted = useMemo(() => {
    const s = [...rows].sort((a, b) => {
      const x = value(a, sort.col);
      const y = value(b, sort.col);
      if (x == null && y == null) return 0;
      if (x == null) return 1; // missing values always last
      if (y == null) return -1;
      const c =
        typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return sort.dir === "asc" ? c : -c;
    });
    return s;
  }, [rows, sort]);
  const shown = limit && !showAll ? sorted.slice(0, limit) : sorted;
  const brandName = (id: string) => ws.brands.find((b) => b.id === id)?.name ?? "—";

  if (!rows.length)
    return <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>;

  return (
    <div>
      <div className="-mx-1 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-[13px]">
          <thead>
            <tr className="border-b text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {rank && <th className="w-8 px-1 py-2 font-medium">#</th>}
              {cols.map((c) => (
                <th
                  key={c}
                  className={cn("px-2 py-2 font-medium", NUMERIC.includes(c) && "text-right")}
                >
                  <button
                    className="inline-flex items-center gap-1 hover:text-foreground"
                    onClick={() =>
                      setSort((s) => ({
                        col: c,
                        dir: s.col === c && s.dir === "desc" ? "asc" : "desc",
                      }))
                    }
                  >
                    {LABEL[c]}
                    {sort.col === c &&
                      (sort.dir === "desc" ? (
                        <ArrowDown className="size-3" />
                      ) : (
                        <ArrowUp className="size-3" />
                      ))}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr
                key={r.post.id}
                className="cursor-pointer border-b last:border-0 hover:bg-muted/60"
                onClick={() => openPost(r.post.id)}
              >
                {rank && <td className="px-1 py-2 text-muted-foreground tabular-nums">{i + 1}</td>}
                {cols.map((c) => (
                  <td
                    key={c}
                    className={cn(
                      "px-2 py-2 align-top",
                      NUMERIC.includes(c) && "text-right tabular-nums",
                    )}
                  >
                    {cell(r, c, brandName)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {limit && rows.length > limit && (
        <button
          className="mt-2 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show fewer" : `Show all ${rows.length}`}
        </button>
      )}
    </div>
  );
}

function cell(r: Row, c: Col, brandName: (id: string) => string) {
  const p = r.post;
  switch (c) {
    case "date":
      return (
        <span className="whitespace-nowrap tabular-nums">
          {p.date || <span className="text-muted-foreground">Undated</span>}
        </span>
      );
    case "brand":
      return <span className="whitespace-nowrap">{brandName(p.brandId)}</span>;
    case "platform":
      return <PlatformDot platform={p.platform} withLabel />;
    case "format":
      return FORMAT_LABEL[p.format];
    case "pillar":
      return p.pillar || <span className="text-muted-foreground">—</span>;
    case "title":
      return (
        <span className="line-clamp-2 max-w-[340px]">
          {p.title || p.hook || <span className="text-muted-foreground">Untitled</span>}
        </span>
      );
    case "hook":
      return <span className="line-clamp-2 max-w-[300px]">{p.hook || "—"}</span>;
    case "status":
      return <StatusPill status={p.status} />;
    case "views":
      return fmtNum(r.d.views);
    case "reach":
      return fmtNum(r.d.reach);
    case "engagement":
      return fmtNum(r.d.engagement);
    case "er":
      return (
        <span
          title={
            r.d.erBasis
              ? `Engagement ÷ ${r.d.erBasis}${r.d.erFallback ? " (fallback)" : ""}`
              : "Not enough data"
          }
        >
          {fmtPct(r.d.er, 2)}
          {r.d.erFallback ? "*" : ""}
        </span>
      );
    case "index":
      return (
        <span
          className={cn(
            r.erIndex != null && r.erIndex >= 1.2 && "text-[var(--good)]",
            r.erIndex != null && r.erIndex < 0.8 && "text-[var(--bad)]",
          )}
        >
          {fmtIndex(r.erIndex)}
        </span>
      );
    case "shares":
      return fmtNum(r.d.m.shares);
    case "saves":
      return fmtNum(r.d.m.saves);
    case "meaningful":
      return fmtNum(r.d.meaningful);
    case "retention":
      return r.d.m.retention != null ? `${r.d.m.retention}%` : "—";
  }
}
