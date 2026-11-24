import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DAYS, fmtIndex, fmtNum, fmtPct, median, weekday, type Row } from "../lib/analytics";
import { cn } from "@/lib/utils";

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

function Tip({
  active,
  payload,
  label,
  fmt,
}: {
  active?: boolean | undefined;
  payload?: { value: number; payload: Record<string, unknown>; name: string }[];
  label?: string | undefined;
  fmt: (v: number, p: Record<string, unknown>) => string;
}) {
  if (!active || !payload?.length) return null;
  const first = payload[0]!;
  const p = first.payload as { label?: unknown; n?: unknown; sufficient?: unknown };
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{label ?? String(p.label ?? "")}</p>
      <p className="tabular-nums text-muted-foreground">
        {fmt(first.value, p as Record<string, unknown>)}
      </p>
      {p.n != null && (
        <p className="text-muted-foreground">
          n = {String(p.n)} posts{p.sufficient === false ? " · small sample" : ""}
        </p>
      )}
    </div>
  );
}

/** Horizontal bars, one value per category. Color per bar is optional (entity colour, e.g. platform). */
export function HBar({
  data,
  fmt = fmtNum,
  height,
}: {
  data: {
    label: string;
    value?: number | undefined;
    n?: number | undefined;
    color?: string | undefined;
    sufficient?: boolean | undefined;
  }[];
  fmt?: (v: number) => string;
  height?: number | undefined;
}) {
  const d = data.filter((x) => x.value != null);
  if (!d.length)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">No data for this metric yet.</p>
    );
  return (
    <ResponsiveContainer width="100%" height={height ?? Math.max(120, d.length * 34 + 24)}>
      <BarChart
        data={d}
        layout="vertical"
        margin={{ left: 4, right: 48, top: 4, bottom: 4 }}
        barCategoryGap={6}
      >
        <CartesianGrid horizontal={false} stroke="var(--grid)" />
        <XAxis type="number" {...axis} tickFormatter={(v) => fmt(v)} />
        <YAxis
          type="category"
          dataKey="label"
          {...axis}
          width={130}
          tick={{ fill: "var(--foreground)", fontSize: 12 }}
        />
        <Tooltip cursor={{ fill: "var(--muted)" }} content={<Tip fmt={(v) => fmt(v)} />} />
        <Bar
          dataKey="value"
          radius={[0, 4, 4, 0]}
          maxBarSize={22}
          label={{
            position: "right",
            fontSize: 11,
            fill: "var(--muted-foreground)",
            formatter: (v: number) => fmt(v),
          }}
        >
          {d.map((x, i) => (
            <Cell
              key={i}
              fill={x.color ?? "var(--series-1)"}
              fillOpacity={x.sufficient === false ? 0.45 : 1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthBars({
  data,
  fmt = fmtNum,
  height = 220,
}: {
  data: { label: string; value?: number | undefined; n?: number | undefined }[];
  fmt?: (v: number) => string;
  height?: number | undefined;
}) {
  if (!data.some((x) => x.value != null))
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">No data for this metric yet.</p>
    );
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--grid)" />
        <XAxis dataKey="label" {...axis} />
        <YAxis {...axis} tickFormatter={(v) => fmt(v)} width={48} />
        <Tooltip cursor={{ fill: "var(--muted)" }} content={<Tip fmt={(v) => fmt(v)} />} />
        <Bar dataKey="value" fill="var(--series-1)" radius={[4, 4, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthLine({
  data,
  fmt = fmtPct,
  height = 220,
}: {
  data: { label: string; value?: number | undefined; n?: number | undefined }[];
  fmt?: (v: number) => string;
  height?: number | undefined;
}) {
  if (data.filter((x) => x.value != null).length < 2)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Needs at least two months with data.
      </p>
    );
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--grid)" />
        <XAxis dataKey="label" {...axis} />
        <YAxis {...axis} tickFormatter={(v) => fmt(v)} width={48} />
        <Tooltip content={<Tip fmt={(v) => fmt(v)} />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--series-1)"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2, stroke: "var(--card)", fill: "var(--series-1)" }}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Day × time-band heatmap of median engagement index. Cells under minSample are hatched out. */
export function TimingHeatmap({ rows, minSample }: { rows: Row[]; minSample: number }) {
  const bands = [
    ["00–06", 0, 6],
    ["06–11", 6, 11],
    ["11–15", 11, 15],
    ["15–19", 15, 19],
    ["19–24", 19, 24],
  ] as const;
  const timed = rows.filter((r) => r.post.date && r.post.time && r.erIndex != null);
  const cells = DAYS.map((_, di) =>
    bands.map(([, a, b]) => {
      const rs = timed.filter(
        (r) =>
          weekday(r.post.date) === di &&
          +r.post.time!.slice(0, 2) >= a &&
          +r.post.time!.slice(0, 2) < b,
      );
      return { n: rs.length, v: median(rs.map((r) => r.erIndex!)) };
    }),
  );
  const shade = (v?: number) => {
    if (v == null) return "transparent";
    const t = Math.max(0, Math.min(1, (v - 0.5) / 1.2));
    return `color-mix(in oklab, var(--series-1) ${Math.round(12 + t * 78)}%, var(--card))`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px] border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th />
            {bands.map(([l]) => (
              <th key={l} className="pb-1 font-medium text-muted-foreground">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cells.map((row, di) => (
            <tr key={di}>
              <th className="pr-2 text-left font-medium text-muted-foreground">{DAYS[di]}</th>
              {row.map((c, bi) => {
                const ok = c.n >= minSample;
                return (
                  <td
                    key={bi}
                    title={`${DAYS[di]} ${bands[bi]![0]} · ${c.n} posts${c.v != null ? ` · median ${fmtIndex(c.v)}` : ""}${!ok && c.n ? " · too few posts" : ""}`}
                    className={cn(
                      "h-10 rounded text-center tabular-nums",
                      !ok && "text-muted-foreground",
                    )}
                    style={{
                      background: ok
                        ? shade(c.v)
                        : c.n
                          ? "repeating-linear-gradient(45deg, var(--muted), var(--muted) 3px, transparent 3px, transparent 6px)"
                          : "var(--muted)",
                      color: ok && c.v != null && c.v > 1.2 ? "white" : undefined,
                    }}
                  >
                    {c.n ? (ok ? fmtIndex(c.v) : `n=${c.n}`) : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Median engagement index (1.00× = typical for the brand and platform). Hatched cells have
        fewer than {minSample} posts and are not ranked. Times are as recorded in your exports.{" "}
        {timed.length} of {rows.length} posts have a posting time.
      </p>
    </div>
  );
}
