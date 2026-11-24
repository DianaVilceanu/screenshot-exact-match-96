import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Total } from "../lib/analytics";
import { PLATFORM_LABEL, STATUS_LABEL, type Platform, type Status } from "../lib/types";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: ReactNode | undefined;
  actions?: ReactNode | undefined;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[2.1rem] leading-none tracking-[-0.01em] md:text-[2.5rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className,
  title,
  subtitle,
  action,
}: {
  children: ReactNode;
  className?: string | undefined;
  title?: ReactNode | undefined;
  subtitle?: ReactNode | undefined;
  action?: ReactNode | undefined;
}) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius)] border bg-card p-5 shadow-[0_1px_0_rgb(0_0_0/0.02)]",
        className,
      )}
    >
      {(title || action) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/** KPI tile. Shows coverage when not every post carried the metric. */
export function Stat({
  label,
  value,
  total,
  hint,
  delta,
}: {
  label: string;
  value: ReactNode;
  total?: Total | undefined;
  hint?: ReactNode | undefined;
  delta?: ReactNode | undefined;
}) {
  const partial = total && total.of > 0 && total.n < total.of;
  const none = total && total.n === 0;
  return (
    <div className="rounded-[var(--radius)] border bg-card px-4 py-3.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 text-[1.6rem] font-semibold leading-none tracking-tight tabular-nums">
        {none ? (
          <span className="text-base font-normal text-muted-foreground">Unavailable</span>
        ) : (
          value
        )}
      </p>
      <div className="mt-1.5 min-h-4 text-[11px] text-muted-foreground">
        {delta}
        {none
          ? "No imported data for this metric"
          : partial
            ? `Based on ${total!.n} of ${total!.of} posts`
            : hint}
      </div>
    </div>
  );
}

export function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[calc(var(--radius)-2px)] font-medium transition-colors disabled:pointer-events-none disabled:opacity-45",
        size === "sm" ? "h-8 px-2.5 text-xs" : "h-9 px-3.5 text-sm",
        variant === "default" && "bg-primary text-primary-foreground hover:opacity-90",
        variant === "outline" && "border bg-card hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        variant === "danger" &&
          "border border-[var(--bad)]/40 text-[var(--bad)] hover:bg-[var(--bad)]/10",
        className,
      )}
    />
  );
}

export function Select({
  label,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string | undefined }) {
  const el = (
    <select
      {...props}
      className={cn(
        "h-9 w-full min-w-0 rounded-[calc(var(--radius)-2px)] border border-input bg-card px-2.5 pr-7 text-sm text-foreground focus-visible:outline-2",
        className,
      )}
    >
      {children}
    </select>
  );
  if (!label) return el;
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      {el}
    </label>
  );
}

export function Input({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string | undefined }) {
  const el = (
    <input
      {...props}
      className={cn(
        "h-9 w-full min-w-0 rounded-[calc(var(--radius)-2px)] border border-input bg-card px-2.5 text-sm placeholder:text-muted-foreground/70",
        className,
      )}
    />
  );
  if (!label) return el;
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      {el}
    </label>
  );
}

export function Textarea({
  label,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string | undefined }) {
  const el = (
    <textarea
      {...props}
      className={cn(
        "min-h-20 w-full rounded-[calc(var(--radius)-2px)] border border-input bg-card px-2.5 py-2 text-sm placeholder:text-muted-foreground/70",
        className,
      )}
    />
  );
  if (!label) return el;
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      {el}
    </label>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad" | "brand";
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4",
        tone === "neutral" && "bg-muted text-muted-foreground",
        tone === "good" && "border-[var(--good)]/30 bg-[var(--good)]/10 text-[var(--good)]",
        tone === "warn" && "border-[var(--warn)]/35 bg-[var(--warn)]/10 text-[var(--warn)]",
        tone === "bad" && "border-[var(--bad)]/30 bg-[var(--bad)]/10 text-[var(--bad)]",
        tone === "brand" && "border-primary/25 bg-primary/10 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

export const PLATFORM_COLOR: Record<Platform, string> = {
  facebook: "var(--series-2)",
  instagram: "var(--series-3)",
  tiktok: "var(--series-4)",
  other: "var(--series-5)",
};

export function PlatformDot({
  platform,
  withLabel,
}: {
  platform: Platform;
  withLabel?: boolean | undefined;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ background: PLATFORM_COLOR[platform] }}
        aria-hidden
      />
      {withLabel && PLATFORM_LABEL[platform]}
    </span>
  );
}

const STATUS_TONE: Record<Status, "neutral" | "good" | "warn" | "brand"> = {
  idea: "neutral",
  planned: "brand",
  in_production: "warn",
  ready: "good",
  published: "good",
};
export function StatusPill({ status }: { status: Status }) {
  return <Pill tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Pill>;
}

export function Tentative({
  n,
  label = "Tentative",
}: {
  n?: number | undefined;
  label?: string | undefined;
}) {
  return (
    <Pill tone="warn">
      <AlertTriangle className="size-3" aria-hidden /> {label}
      {n != null ? ` · n=${n}` : ""}
    </Pill>
  );
}

export function Notice({
  children,
  tone = "info",
  className,
}: {
  children: ReactNode;
  tone?: "info" | "warn";
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "flex gap-2.5 rounded-[var(--radius)] border px-3.5 py-2.5 text-[13px] leading-relaxed",
        tone === "warn" ? "border-[var(--warn)]/35 bg-[var(--warn)]/8" : "bg-muted/60",
        className,
      )}
    >
      {tone === "warn" ? (
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--warn)]" aria-hidden />
      ) : (
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
      )}
      <div>{children}</div>
    </div>
  );
}

export function Empty({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode | undefined;
  action?: ReactNode | undefined;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-dashed bg-card/50 px-6 py-12 text-center">
      <p className="font-display text-2xl">{title}</p>
      {children && <div className="mt-2 max-w-md text-sm text-muted-foreground">{children}</div>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Tabs<T extends string>({
  value,
  onChange,
  tabs,
}: {
  value: T;
  onChange: (v: T) => void;
  tabs: { value: T; label: ReactNode }[];
}) {
  return (
    <div role="tablist" className="mb-5 flex gap-1 overflow-x-auto border-b">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={value === t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "-mb-px shrink-0 border-b-2 px-3 py-2 text-sm transition-colors",
            value === t.value
              ? "border-primary font-medium text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** A value that may be placeholder text in [SQUARE BRACKETS] gets a dashed frame. */
export function Draft({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[.*\]$/.test(p) ? (
          <span
            key={i}
            className="rounded-sm border border-dashed border-[var(--placeholder)] px-1 text-[var(--placeholder)]"
          >
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean | undefined;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 md:p-10"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "w-full rounded-[var(--radius)] border bg-card p-5 shadow-xl",
          wide ? "max-w-4xl" : "max-w-xl",
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
