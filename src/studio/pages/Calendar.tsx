import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { addMonths, buildRows, currentMonth, monthLabel, type Row } from "../lib/analytics";
import { downloadCsv } from "../lib/importer";
import { useStore, useView } from "../lib/store";
import {
  FORMAT_LABEL,
  PLATFORMS,
  PLATFORM_LABEL,
  STATUSES,
  STATUS_LABEL,
  type Post,
} from "../lib/types";
import { usePostEditor } from "../components/PostEditor";
import { PostTable } from "../components/PostTable";
import {
  Button,
  Card,
  Empty,
  Input,
  PageHeader,
  PlatformDot,
  PLATFORM_COLOR,
  Select,
  StatusPill,
  Tabs,
} from "../components/ui";

type View = "calendar" | "table" | "list";

export function Calendar() {
  const { ws, editPost } = useStore();
  const { brandId, setBrandId } = useView();
  const { openPost, newPost } = usePostEditor();
  const [view, setView] = useState<View>("calendar");
  const [month, setMonth] = useState(() => {
    try {
      return sessionStorage.getItem("dmcc:calmonth") || currentMonth();
    } catch {
      return currentMonth();
    }
  });
  const [allTime, setAllTime] = useState(false);
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");
  const [pillar, setPillar] = useState("all");
  const [q, setQ] = useState("");
  const changeMonth = (m: string) => {
    setMonth(m);
    try {
      sessionStorage.setItem("dmcc:calmonth", m);
    } catch {
      /* ignore */
    }
  };

  const brandOk = ws.brands.some((b) => b.id === brandId);
  const posts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ws.posts.filter((p) => {
      if (brandOk && p.brandId !== brandId) return false;
      if (platform !== "all" && p.platform !== platform) return false;
      if (status !== "all" && p.status !== status) return false;
      if (pillar !== "all" && p.pillar !== pillar) return false;
      if (!(allTime && view !== "calendar") && !p.date.startsWith(month)) return false;
      if (
        needle &&
        ![p.title, p.topic, p.hook, p.caption, p.cta, p.hashtags.join(" "), p.brief, p.pillar]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
        return false;
      return true;
    });
  }, [ws.posts, brandId, brandOk, platform, status, pillar, month, q, allTime, view]);
  const undated = ws.posts.filter((p) => !p.date && (!brandOk || p.brandId === brandId));
  const pillars = [
    ...new Set(
      (brandOk ? ws.brands.filter((b) => b.id === brandId) : ws.brands).flatMap((b) => b.pillars),
    ),
  ];
  const brandName = (id: string) => ws.brands.find((b) => b.id === id)?.name ?? "";

  if (!ws.brands.length)
    return <Empty title="Create a brand first">The calendar is organised by brand.</Empty>;

  const rowsAll: Row[] = buildRows(
    ws,
    posts.map((p) => ({ ...p, status: "published" as const })),
  );
  // ^ table view wants derived metrics for every row; restore the real status for display.
  const rows = rowsAll.map((r) => ({ ...r, post: posts.find((p) => p.id === r.post.id)! }));

  return (
    <>
      <PageHeader
        eyebrow="Plan & archive"
        title="Content Calendar"
        description="Every planned and published item. Click an item to edit it, click a day to add one, or drag an item to another day."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() =>
                downloadCsv(`content-${allTime ? "all" : month}.csv`, [
                  [
                    "Brand",
                    "Date",
                    "Time",
                    "Platform",
                    "Format",
                    "Pillar",
                    "Campaign",
                    "Title",
                    "Topic",
                    "Hook",
                    "Caption",
                    "CTA",
                    "Hashtags",
                    "Creative brief",
                    "Canva link",
                    "Status",
                    "Post URL",
                  ],
                  ...posts.map((p) => [
                    brandName(p.brandId),
                    p.date,
                    p.time,
                    PLATFORM_LABEL[p.platform],
                    FORMAT_LABEL[p.format],
                    p.pillar,
                    ws.campaigns.find((c) => c.id === p.campaignId)?.name,
                    p.title,
                    p.topic,
                    p.hook,
                    p.caption,
                    p.cta,
                    p.hashtags.join(" "),
                    p.brief,
                    p.canvaUrl,
                    STATUS_LABEL[p.status],
                    p.postUrl,
                  ]),
                ])
              }
            >
              Export CSV
            </Button>
            <Button
              onClick={() => newPost({ date: `${month}-01`, status: "idea" })}
              disabled={!ws.brands.length}
            >
              <Plus className="size-4" /> New content
            </Button>
          </>
        }
      />

      <div className="no-print mb-4 grid grid-cols-2 gap-2.5 rounded-[var(--radius)] border bg-card p-3 md:grid-cols-6">
        <Select
          label="Brand"
          value={brandOk ? brandId : "all"}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="all">All brands</option>
          {ws.brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
        <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="all">All</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_LABEL[p]}
            </option>
          ))}
        </Select>
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </Select>
        <Select label="Pillar" value={pillar} onChange={(e) => setPillar(e.target.value)}>
          <option value="all">All</option>
          {pillars.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
        <div className="col-span-2 flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            Search
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Title, hook, caption, hashtag…"
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeMonth(addMonths(month, -1))}
            aria-label="Previous month"
            disabled={allTime && view !== "calendar"}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="min-w-36 text-center font-display text-2xl">
            {allTime && view !== "calendar" ? "All time" : monthLabel(month)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeMonth(addMonths(month, 1))}
            aria-label="Next month"
            disabled={allTime && view !== "calendar"}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => changeMonth(currentMonth())}>
            Today
          </Button>
          {view !== "calendar" && (
            <label className="ml-2 flex items-center gap-1.5 text-xs">
              <input
                type="checkbox"
                checked={allTime}
                onChange={(e) => setAllTime(e.target.checked)}
              />{" "}
              Search the whole archive
            </label>
          )}
        </div>
        <div className="w-full sm:w-auto">
          <Tabs
            value={view}
            onChange={setView}
            tabs={[
              { value: "calendar", label: "Calendar" },
              { value: "table", label: "Table" },
              { value: "list", label: "List" },
            ]}
          />
        </div>
      </div>

      {view === "calendar" && (
        <MonthGrid
          month={month}
          posts={posts}
          onOpen={openPost}
          onNew={(date) => newPost({ date, status: "idea" })}
          onMove={(id, date) => editPost(id, { date })}
          brandName={brandName}
        />
      )}
      {view === "table" && (
        <Card>
          <PostTable
            rows={rows}
            cols={[
              "date",
              "brand",
              "platform",
              "format",
              "pillar",
              "title",
              "status",
              "views",
              "er",
              "saves",
            ]}
            initialSort={{ col: "date", dir: "asc" }}
            empty="Nothing here yet. Add content or import a plan."
          />
        </Card>
      )}
      {view === "list" && <ListView posts={posts} onOpen={openPost} brandName={brandName} />}

      {undated.length > 0 && (
        <Card
          className="mt-4"
          title={`${undated.length} item(s) without a date`}
          subtitle="Imported or created without a date. Open one to schedule it."
        >
          <div className="flex flex-wrap gap-2">
            {undated.slice(0, 30).map((p) => (
              <button
                key={p.id}
                onClick={() => openPost(p.id)}
                className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
              >
                {p.title || "Untitled"}
              </button>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}

function MonthGrid({
  month,
  posts,
  onOpen,
  onNew,
  onMove,
  brandName,
}: {
  month: string;
  posts: Post[];
  onOpen: (id: string) => void;
  onNew: (date: string) => void;
  onMove: (id: string, date: string) => void;
  brandName: (id: string) => string;
}) {
  const [y, m] = month.split("-").map(Number) as [number, number];
  const first = new Date(y, m - 1, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(y, m, 0).getDate();
  const cells = Array.from({ length: Math.ceil((lead + days) / 7) * 7 }, (_, i) => i - lead + 1);
  const today = new Date().toISOString().slice(0, 10);
  const [over, setOver] = useState<string | null>(null);
  return (
    <div className="overflow-x-auto rounded-[var(--radius)] border bg-card">
      <div className="grid min-w-[760px] grid-cols-7 border-b text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="px-2 py-2">
            {d}
          </div>
        ))}
      </div>
      <div className="grid min-w-[760px] grid-cols-7">
        {cells.map((d, i) => {
          const date = d >= 1 && d <= days ? `${month}-${String(d).padStart(2, "0")}` : "";
          const items = date
            ? posts
                .filter((p) => p.date === date)
                .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""))
            : [];
          return (
            <div
              key={i}
              className={cn(
                "group min-h-28 border-r border-b p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0",
                !date && "bg-muted/40",
                over === date && date && "bg-accent",
              )}
              onDragOver={(e) => {
                if (!date) return;
                e.preventDefault();
                setOver(date);
              }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => {
                setOver(null);
                const id = e.dataTransfer.getData("text/plain");
                if (date && id) onMove(id, date);
              }}
            >
              {date && (
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full text-xs tabular-nums",
                      date === today && "bg-primary text-primary-foreground",
                    )}
                  >
                    {d}
                  </span>
                  <button
                    className="rounded px-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted focus:opacity-100"
                    onClick={() => onNew(date)}
                    aria-label={`Add content on ${date}`}
                  >
                    +
                  </button>
                </div>
              )}
              <div className="space-y-1">
                {items.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)}
                    onClick={() => onOpen(p.id)}
                    className="block w-full truncate rounded border-l-[3px] bg-muted/70 px-1.5 py-1 text-left text-[11px] leading-tight hover:bg-muted"
                    style={{ borderLeftColor: PLATFORM_COLOR[p.platform] }}
                    title={`${brandName(p.brandId)} · ${PLATFORM_LABEL[p.platform]} · ${FORMAT_LABEL[p.format]} · ${STATUS_LABEL[p.status]}`}
                  >
                    <span
                      className={cn(
                        "mr-1 inline-block size-1.5 rounded-full align-middle",
                        p.status === "published"
                          ? "bg-[var(--good)]"
                          : p.status === "ready"
                            ? "bg-[var(--series-1)]"
                            : p.status === "in_production"
                              ? "bg-[var(--warn)]"
                              : "bg-muted-foreground/40",
                      )}
                    />
                    {p.title || p.hook || FORMAT_LABEL[p.format]}
                  </button>
                ))}
                {items.length > 4 && (
                  <p className="px-1 text-[10px] text-muted-foreground">+{items.length - 4} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 border-t px-3 py-2 text-[11px] text-muted-foreground">
        {PLATFORMS.map((p) => (
          <PlatformDot key={p} platform={p} withLabel />
        ))}
        <span className="ml-auto">
          Dot = status (green published · teal ready · amber in production · grey idea/planned)
        </span>
      </div>
    </div>
  );
}

function ListView({
  posts,
  onOpen,
  brandName,
}: {
  posts: Post[];
  onOpen: (id: string) => void;
  brandName: (id: string) => string;
}) {
  const byDate = [...new Set(posts.map((p) => p.date))].sort();
  if (!posts.length) return <Empty title="Nothing scheduled">Add content or import a plan.</Empty>;
  return (
    <div className="space-y-4">
      {byDate.map((d) => (
        <div key={d}>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
            {d
              ? new Date(d + "T12:00:00").toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Undated"}
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            {posts
              .filter((p) => p.date === d)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => onOpen(p.id)}
                  className="rounded-[var(--radius)] border bg-card p-3 text-left hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <PlatformDot platform={p.platform} withLabel /> · {FORMAT_LABEL[p.format]}{" "}
                      {p.pillar && `· ${p.pillar}`} · {brandName(p.brandId)}
                    </span>
                    <StatusPill status={p.status} />
                  </div>
                  <p className="mt-1.5 font-medium">{p.title || "Untitled"}</p>
                  {p.hook && (
                    <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                      Hook: {p.hook}
                    </p>
                  )}
                  {p.cta && (
                    <p className="line-clamp-1 text-xs text-muted-foreground">CTA: {p.cta}</p>
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
