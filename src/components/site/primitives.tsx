import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, type ReactNode } from "react";
import { img, type ImgKey } from "@/content/images";
import { cn } from "@/lib/utils";

/** Image with intrinsic dimensions to avoid layout shift. */
export function Pic({
  k,
  alt,
  className,
  eager,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  k: ImgKey;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const i = img[k];
  return (
    <img
      src={i.src}
      width={i.w}
      height={i.h}
      alt={alt}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}

/** Fades content in once it scrolls into view. Respects reduced motion via CSS. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.dataset["visible"] = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export const btn = cva(
  "group inline-flex items-center gap-3 font-medium transition-all duration-500 focus-visible:outline-2",
  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground px-6 py-3.5 hover:bg-accent hover:text-accent-foreground",
        outline: "border border-current px-6 py-3.5 hover:bg-foreground hover:text-background",
        coral: "bg-coral text-ink px-6 py-3.5 hover:bg-background hover:text-foreground",
        text: "link-underline pb-1",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);
export type BtnVariant = VariantProps<typeof btn>["variant"];

export function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-block transition-transform duration-500 group-hover:translate-x-1.5", className)}>
      →
    </span>
  );
}

export function Eyebrow({ children, className, n }: { children: ReactNode; className?: string; n?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-muted-foreground", className)}>
      {n && <span className="text-accent">{n}</span>}
      <span className="h-px w-8 bg-current opacity-40" />
      {children}
    </p>
  );
}

/** Visibly marks content that still needs verified information. */
export function Placeholder({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return (
    <div className={cn("placeholder-block rounded-sm p-5", className)} data-placeholder="true">
      <p className="eyebrow mb-2 text-placeholder">Placeholder — to be replaced</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export const isPlaceholder = (s: string) => /\[[^\]]+\]/.test(s);

/** Renders text normally, or as a Placeholder when it contains [BRACKETS]. */
export function MaybePlaceholder({ text, className }: { text: string; className?: string | undefined }) {
  if (isPlaceholder(text)) return <Placeholder>{text}</Placeholder>;
  return <p className={className}>{text}</p>;
}

export function Breadcrumbs({ items }: { items: { name: string; to?: string; params?: Record<string, string> }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.to ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link to={it.to as any} params={it.params as any} className="link-underline hover:text-foreground">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {it.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
