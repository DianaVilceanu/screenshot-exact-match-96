import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { buildRows, fmtNum, fmtPct, median, defined, monthLabel, monthOf } from "../lib/analytics";
import { nowIso, uid, useStore, useView } from "../lib/store";
import { PLATFORMS, PLATFORM_LABEL, type Brand, type Campaign } from "../lib/types";
import {
  Button,
  Card,
  Empty,
  Input,
  Modal,
  PageHeader,
  Pill,
  PlatformDot,
  Textarea,
} from "../components/ui";

export function BrandsList() {
  const { ws } = useStore();
  const [creating, setCreating] = useState(false);
  const rows = buildRows(ws);
  return (
    <>
      <PageHeader
        eyebrow="Workspaces"
        title="Brands"
        description="Each brand has its own profile, pillars, calendar, archive, analytics and recommendations."
        actions={
          <Button onClick={() => setCreating(true)}>
            <Plus className="size-4" /> New brand
          </Button>
        }
      />
      {!ws.brands.length ? (
        <Empty
          title="No brands yet"
          action={<Button onClick={() => setCreating(true)}>Create your first brand</Button>}
        >
          Start with the brand you know best. You can import its content plan and analytics next.
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ws.brands.map((b) => {
            const rs = rows.filter((r) => r.post.brandId === b.id);
            const planned = ws.posts.filter(
              (p) => p.brandId === b.id && p.status !== "published",
            ).length;
            const months = [...new Set(rs.map((r) => monthOf(r.post.date)).filter(Boolean))].sort();
            return (
              <Link
                key={b.id}
                to="/studio/brands/$brandId"
                params={{ brandId: b.id }}
                className="group rounded-[var(--radius)] border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Logo brand={b} size={44} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{b.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {b.industry || "Industry not set"}
                    </p>
                  </div>
                  {b.isDemo && <Pill tone="warn">Demo</Pill>}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <Mini label="Published" value={String(rs.length)} />
                  <Mini label="Planned" value={String(planned)} />
                  <Mini label="Median ER" value={fmtPct(median(defined(rs.map((r) => r.d.er))))} />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {b.platforms.map((p) => (
                    <PlatformDot key={p} platform={p} withLabel />
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {months.length
                    ? `Data: ${monthLabel(months[0]!)} – ${monthLabel(months.at(-1)!)}`
                    : "No performance history yet"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
      {creating && <BrandForm onClose={() => setCreating(false)} />}
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted/70 px-2 py-2">
      <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export function Logo({ brand, size = 32 }: { brand: Brand; size?: number | undefined }) {
  return brand.logo ? (
    <img
      src={brand.logo}
      alt=""
      className="shrink-0 rounded-md object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className="grid shrink-0 place-items-center rounded-md bg-primary font-display text-primary-foreground"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {brand.name[0]?.toUpperCase()}
    </span>
  );
}

async function resizeImage(file: File, max = 160): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
    img.src = url;
  });
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * scale);
  c.height = Math.round(img.height * scale);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return c.toDataURL("image/png");
}

export function BrandForm({ brand, onClose }: { brand?: Brand; onClose: () => void }) {
  const { saveBrand } = useStore();
  const { setBrandId } = useView();
  const navigate = useNavigate();
  const [b, setB] = useState<Brand>(
    brand ?? {
      id: uid(),
      name: "",
      description: "",
      audience: "",
      industry: "",
      tone: "",
      platforms: ["instagram"],
      pillars: [],
      createdAt: nowIso(),
    },
  );
  const [pillars, setPillars] = useState(b.pillars.join("\n"));
  const set = <K extends keyof Brand>(k: K, v: Brand[K]) => setB((x) => ({ ...x, [k]: v }));
  return (
    <Modal open onClose={onClose} title={brand ? "Edit brand profile" : "New brand"} wide>
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          label="Brand name *"
          value={b.name}
          onChange={(e) => set("name", e.target.value)}
          autoFocus
        />
        <Input
          label="Industry / niche"
          value={b.industry}
          onChange={(e) => set("industry", e.target.value)}
        />
        <div className="md:col-span-2">
          <Textarea
            label="Description"
            value={b.description}
            onChange={(e) => set("description", e.target.value)}
            rows={2}
          />
        </div>
        <Textarea
          label="Target audience"
          value={b.audience}
          onChange={(e) => set("audience", e.target.value)}
          rows={3}
          placeholder="Who you're talking to. The first phrase is used in generated hooks."
        />
        <Textarea
          label="Tone of voice"
          value={b.tone}
          onChange={(e) => set("tone", e.target.value)}
          rows={3}
          placeholder="e.g. warm, witty, expert, no jargon"
        />
        <Textarea
          label="Content pillars (one per line)"
          value={pillars}
          onChange={(e) => setPillars(e.target.value)}
          rows={5}
        />
        <div className="space-y-4">
          <fieldset>
            <legend className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Platforms
            </legend>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={b.platforms.includes(p)}
                    onChange={(e) =>
                      set(
                        "platforms",
                        e.target.checked ? [...b.platforms, p] : b.platforms.filter((x) => x !== p),
                      )
                    }
                  />
                  {PLATFORM_LABEL[p]}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Logo
            </p>
            <div className="flex items-center gap-3">
              {b.name && <Logo brand={b} size={48} />}
              <input
                type="file"
                accept="image/*"
                className="text-xs"
                onChange={async (e) =>
                  e.target.files?.[0] && set("logo", await resizeImage(e.target.files[0]))
                }
              />
              {b.logo && (
                <Button variant="ghost" size="sm" onClick={() => set("logo", undefined)}>
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={!b.name.trim()}
          onClick={() => {
            const next = {
              ...b,
              name: b.name.trim(),
              pillars: [
                ...new Set(
                  pillars
                    .split("\n")
                    .map((x) => x.trim())
                    .filter(Boolean),
                ),
              ],
            };
            saveBrand(next);
            onClose();
            if (!brand) {
              setBrandId(next.id);
              navigate({ to: "/studio/brands/$brandId", params: { brandId: next.id } });
            }
          }}
        >
          {brand ? "Save" : "Create brand"}
        </Button>
      </div>
    </Modal>
  );
}

export function BrandDetail({ brandId }: { brandId: string }) {
  const { ws, saveCampaign, deleteCampaign, deleteBrand } = useStore();
  const { setBrandId } = useView();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [camp, setCamp] = useState<Campaign | null>(null);
  const b = ws.brands.find((x) => x.id === brandId);
  if (!b)
    return (
      <Empty
        title="Brand not found"
        action={
          <Link to="/studio/brands" className="underline">
            Back to brands
          </Link>
        }
      />
    );
  const rows = buildRows(ws).filter((r) => r.post.brandId === b.id);
  const posts = ws.posts.filter((p) => p.brandId === b.id);
  const camps = ws.campaigns.filter((c) => c.brandId === b.id);
  const imports = ws.imports.filter((i) => i.brandId === b.id);
  const go = (to: string) => {
    setBrandId(b.id);
    navigate({ to });
  };
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo brand={b} size={64} />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Brand workspace
            </p>
            <h1 className="font-display text-[2.4rem] leading-none">{b.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{b.industry || "Industry not set"}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setEditing(true)}>
            Edit profile
          </Button>
          <Button onClick={() => navigate({ to: "/studio/import" }).then(() => setBrandId(b.id))}>
            Import data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Profile" className="lg:col-span-2">
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label="Description" value={b.description} />
            <Field label="Target audience" value={b.audience} />
            <Field label="Tone of voice" value={b.tone} />
            <div>
              <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Platforms
              </dt>
              <dd className="flex flex-wrap gap-3">
                {b.platforms.length ? (
                  b.platforms.map((p) => <PlatformDot key={p} platform={p} withLabel />)
                ) : (
                  <Missing />
                )}
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Content pillars
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {b.pillars.length ? (
                  b.pillars.map((p) => (
                    <Pill key={p} tone="brand">
                      {p}
                    </Pill>
                  ))
                ) : (
                  <Missing />
                )}
              </dd>
            </div>
          </dl>
        </Card>
        <Card title="At a glance">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Published posts</span>
              <span className="tabular-nums">{rows.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">With metrics</span>
              <span className="tabular-nums">{rows.filter((r) => r.d.hasMetrics).length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Planned / in progress</span>
              <span className="tabular-nums">{posts.length - rows.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Total views</span>
              <span className="tabular-nums">
                {fmtNum(rows.reduce((a, r) => a + (r.d.views ?? 0), 0) || undefined)}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Median ER</span>
              <span className="tabular-nums">{fmtPct(median(defined(rs(rows))))}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Imports</span>
              <span className="tabular-nums">
                {imports.filter((i) => i.status === "active").length}
              </span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          ["Calendar", "/studio/calendar"],
          ["Archive & analytics", "/studio/analytics"],
          ["What's working", "/studio/working"],
          ["What's not working", "/studio/not-working"],
          ["Content ideas & planner", "/studio/ideas"],
          ["Experiments", "/studio/experiments"],
          ["Trends", "/studio/trends"],
          ["Monthly report", "/studio/reports"],
        ].map(([l, to]) => (
          <button
            key={to}
            onClick={() => go(to!)}
            className="rounded-[var(--radius)] border bg-card px-4 py-3 text-left text-sm font-medium hover:bg-muted"
          >
            {l} →
          </button>
        ))}
      </div>

      <Card
        className="mt-4"
        title="Campaigns"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setCamp({ id: uid(), brandId: b.id, name: "", objective: "", notes: "" })
            }
          >
            <Plus className="size-3.5" /> Campaign
          </Button>
        }
      >
        {!camps.length ? (
          <p className="text-sm text-muted-foreground">
            No campaigns. Campaign names in imported files are created here automatically.
          </p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {camps.map((c) => {
                const n = posts.filter((p) => p.campaignId === c.id).length;
                return (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2 font-medium">{c.name}</td>
                    <td className="py-2 text-muted-foreground">{c.objective || "—"}</td>
                    <td className="py-2 text-muted-foreground tabular-nums">
                      {c.start || "?"} → {c.end || "?"}
                    </td>
                    <td className="py-2 tabular-nums">{n} posts</td>
                    <td className="py-2 text-right">
                      <Button size="sm" variant="ghost" onClick={() => setCamp(c)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      <Card className="mt-4" title="Danger zone">
        <Button
          variant="danger"
          onClick={() => {
            if (
              confirm(
                `Delete “${b.name}” and ALL of its posts, metrics, campaigns, experiments and import history? Export a backup first if unsure.`,
              )
            ) {
              deleteBrand(b.id);
              setBrandId("all");
              navigate({ to: "/studio/brands" });
            }
          }}
        >
          <Trash2 className="size-4" /> Delete brand
        </Button>
      </Card>

      {editing && <BrandForm brand={b} onClose={() => setEditing(false)} />}
      {camp && (
        <Modal
          open
          onClose={() => setCamp(null)}
          title={camp.name ? "Edit campaign" : "New campaign"}
        >
          <div className="grid gap-3">
            <Input
              label="Name"
              value={camp.name}
              onChange={(e) => setCamp({ ...camp, name: e.target.value })}
            />
            <Input
              label="Objective"
              value={camp.objective}
              onChange={(e) => setCamp({ ...camp, objective: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start"
                type="date"
                value={camp.start ?? ""}
                onChange={(e) => setCamp({ ...camp, start: e.target.value })}
              />
              <Input
                label="End"
                type="date"
                value={camp.end ?? ""}
                onChange={(e) => setCamp({ ...camp, end: e.target.value })}
              />
            </div>
            <Textarea
              label="Notes"
              value={camp.notes}
              onChange={(e) => setCamp({ ...camp, notes: e.target.value })}
            />
          </div>
          <div className="mt-5 flex justify-between gap-2">
            {ws.campaigns.some((c) => c.id === camp.id) ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  deleteCampaign(camp.id);
                  setCamp(null);
                }}
              >
                Delete
              </Button>
            ) : (
              <span />
            )}
            <Button
              disabled={!camp.name.trim()}
              onClick={() => {
                saveCampaign(camp);
                setCamp(null);
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

const rs = (rows: ReturnType<typeof buildRows>) => rows.map((r) => r.d.er);
const Missing = () => <span className="text-muted-foreground">Not set</span>;
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className="whitespace-pre-line">{value || <Missing />}</dd>
    </div>
  );
}
