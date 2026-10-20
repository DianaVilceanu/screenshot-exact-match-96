import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { contact, nav, person } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { Arrow, btn } from "./primitives";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent bg-background",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-baseline gap-2" aria-label="Diana Marrie Designs — home">
          <span className="font-display text-2xl leading-none italic md:text-[1.7rem]">Diana Marrie</span>
          <span className="eyebrow hidden text-muted-foreground sm:inline">Designs</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn("relative text-sm tracking-wide transition-colors hover:text-accent", isActive(n.to) && "text-foreground")}
            >
              {n.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-500",
                  isActive(n.to) ? "w-full" : "w-0",
                )}
              />
            </Link>
          ))}
          <Link to="/contact" className={btn({ variant: "solid", className: "py-2.5 text-sm" })}>
            Contact <Arrow />
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("absolute h-px w-6 bg-current transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
          <span className={cn("absolute h-px w-6 bg-current transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
        </button>
      </div>

      <div
        id="mobile-menu"
        data-theme="ink"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background px-6 pt-24 pb-10 text-foreground transition-[clip-path] duration-700 md:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {[...nav, { to: "/contact", label: "Contact" } as const].map((n, i) => (
            <Link key={n.to} to={n.to} tabIndex={open ? 0 : -1} className="flex items-baseline gap-4 border-b border-border py-3">
              <span className="eyebrow text-accent">0{i + 1}</span>
              <span className="display-md">{n.label}</span>
            </Link>
          ))}
        </nav>
        <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1} className="mt-auto text-sm text-muted-foreground">
          {contact.email}
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer data-theme="ink" className="bg-background text-foreground">
      <div className="container-editorial pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-muted-foreground">Have a good project in mind?</p>
            <Link to="/contact" className="group mt-4 block">
              <span className="display-lg block transition-colors group-hover:text-accent">
                Let's make it <em>worth looking at.</em>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-6 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-4 text-muted-foreground">Site</p>
              <ul className="space-y-2">
                {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="link-underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-muted-foreground">Services</p>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link to="/services/$slug" params={{ slug: s.slug }} className="link-underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-muted-foreground">Elsewhere</p>
              <ul className="space-y-2">
                {contact.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${contact.email}`} className="link-underline break-all">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {person.fullName} · {person.handle}
          </p>
          <p>Graphic design · Art direction · Social media</p>
        </div>
      </div>
    </footer>
  );
}

export function CtaBand({ title = "Have a good project in mind?", text = "Let's turn it into something worth looking at." }: { title?: string; text?: string }) {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="container-editorial grid gap-8 py-20 md:grid-cols-12 md:items-end md:py-28">
        <h2 className="display-lg md:col-span-8">{title}</h2>
        <div className="md:col-span-4">
          <p className="lede mb-6">{text}</p>
          <Link to="/contact" className={btn({ variant: "solid" })}>
            Let's work together <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
