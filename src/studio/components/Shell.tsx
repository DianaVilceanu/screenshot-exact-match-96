import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import {
  BarChart3,
  CalendarDays,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Settings,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Upload,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StoreProvider, useStore, useView, ViewProvider } from "../lib/store";
import { PostEditorProvider } from "./PostEditor";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string | undefined }>;
  exact?: boolean | undefined;
};
const NAV: (NavItem | "sep")[] = [
  { to: "/studio", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/studio/brands", label: "Brands", icon: Users },
  { to: "/studio/calendar", label: "Content Calendar", icon: CalendarDays },
  { to: "/studio/analytics", label: "Analytics", icon: BarChart3 },
  "sep",
  { to: "/studio/working", label: "What's Working", icon: ThumbsUp },
  { to: "/studio/not-working", label: "What's Not Working", icon: ThumbsDown },
  { to: "/studio/trends", label: "Trends", icon: TrendingUp },
  { to: "/studio/ideas", label: "Content Ideas", icon: Lightbulb },
  { to: "/studio/experiments", label: "Content Experiments", icon: FlaskConical },
  "sep",
  { to: "/studio/reports", label: "Reports", icon: FileText },
  { to: "/studio/import", label: "Import data", icon: Upload },
  { to: "/studio/settings", label: "Settings", icon: Settings },
];

export function StudioShell() {
  return (
    <StoreProvider>
      <ViewProvider>
        <PostEditorProvider>
          <Frame />
        </PostEditorProvider>
      </ViewProvider>
    </StoreProvider>
  );
}

function Frame() {
  const { ws, ready, saveError } = useStore();
  const { brandId, setBrandId } = useView();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  // Theme tokens live on <html> so dialogs rendered outside this tree match.
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.dataset["theme"];
    el.dataset["theme"] = "studio";
    return () => {
      if (prev) el.dataset["theme"] = prev;
      else delete el.dataset["theme"];
      delete el.dataset["mode"];
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset["mode"] = ws.settings.mode;
  }, [ws.settings.mode]);
  useEffect(() => setOpen(false), [pathname]);

  const brand = ws.brands.find((b) => b.id === brandId);
  const hasDemo = ws.brands.some((b) => b.isDemo);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <div className="no-print sticky top-0 z-30 flex items-center justify-between border-b bg-[var(--sidebar-bg)] px-4 py-3 text-[var(--sidebar-fg)] lg:hidden">
        <span className="font-display text-xl">Command Center</span>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="rounded p-1 hover:bg-white/10"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        className={cn(
          "no-print fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)] transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-5 pt-6 pb-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sidebar-muted)]">
            Social media
          </p>
          <p className="font-display text-[1.7rem] leading-none">Command Center</p>
        </div>
        <div className="px-3 pb-3">
          <label
            className="mb-1 block px-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--sidebar-muted)]"
            htmlFor="brand-switch"
          >
            Workspace
          </label>
          <div className="flex items-center gap-2 rounded-md bg-white/8 px-2 py-1.5">
            {brand?.logo ? (
              <img src={brand.logo} alt="" className="size-6 rounded object-cover" />
            ) : (
              <span className="grid size-6 place-items-center rounded bg-white/15 text-[11px] font-semibold">
                {brand ? brand.name[0] : "∑"}
              </span>
            )}
            <select
              id="brand-switch"
              value={brand ? brandId : "all"}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm font-medium text-[var(--sidebar-fg)] outline-none [&>option]:text-black"
            >
              <option value="all">All brands (consolidated)</option>
              {ws.brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-6" aria-label="Command Center">
          {NAV.map((item, i) =>
            item === "sep" ? (
              <div key={i} className="mx-2 my-2 h-px bg-white/10" />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: !!item.exact }}
                className="group flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-[var(--sidebar-fg)]/80 transition-colors hover:bg-white/8 hover:text-[var(--sidebar-fg)] data-[status=active]:bg-white/12 data-[status=active]:font-medium data-[status=active]:text-[var(--sidebar-fg)]"
              >
                <item.icon className="size-4 opacity-75" />
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="border-t border-white/10 px-5 py-3 text-[11px] leading-relaxed text-[var(--sidebar-muted)]">
          <Sparkles className="mr-1 inline size-3" /> Data is stored in this browser only. Back it
          up in Settings.
        </div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div className="lg:pl-64">
        {hasDemo && (
          <div className="no-print border-b border-[var(--warn)]/30 bg-[var(--warn)]/10 px-4 py-2 text-center text-xs text-foreground md:px-8">
            <strong>Synthetic demo data is loaded</strong> (“{ws.brands.find((b) => b.isDemo)?.name}
            ”). It is not real performance data. Remove it in{" "}
            <Link to="/studio/settings" className="underline">
              Settings
            </Link>{" "}
            before you rely on consolidated numbers.
          </div>
        )}
        {saveError && (
          <div className="no-print bg-[var(--bad)]/10 px-4 py-2 text-center text-xs text-[var(--bad)]">
            Couldn't save to browser storage: {saveError}. Export a backup from Settings.
          </div>
        )}
        <main className="print-full mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
          {ready ? <Outlet /> : <Loading />}
        </main>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
