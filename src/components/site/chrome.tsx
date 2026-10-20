import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { contact } from "@/content/site";
import { hrefFor, idOf, LOCALES, refFromPath, useContent, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { L } from "./llink";
import { Arrow, btn } from "./primitives";
import logo from "@/assets/dm-studio-logo.png";
import logoLight from "@/assets/dm-studio-logo-light.png";

function useNav() {
  const { locale, t } = useContent();
  const main = [
    { to: hrefFor(locale, { kind: "home" }), label: t.nav.home },
    { to: hrefFor(locale, { kind: "portfolio" }), label: t.nav.portfolio },
    { to: hrefFor(locale, { kind: "services" }), label: t.nav.services },
    { to: hrefFor(locale, { kind: "journal" }), label: t.nav.journal },
  ];
  const contactLink = { to: hrefFor(locale, { kind: "contact" }), label: t.nav.contact };
  return { main, contactLink, all: [...main, contactLink] };
}

/** RO / EN switcher: goes to the same page in the other language (or the closest fallback). */
export function LanguageSwitcher({ className, tabIndex }: { className?: string; tabIndex?: number }) {
  const { locale, t } = useContent();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ref = refFromPath(pathname);
  return (
    <div role="group" aria-label={t.switcherLabel} className={cn("flex items-center gap-1.5 text-xs tracking-[0.18em]", className)}>
      {LOCALES.map((l: Locale, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-muted-foreground">/</span>}
          {l === locale ? (
            <span aria-current="true" className="font-semibold text-foreground underline decoration-accent underline-offset-4" title={t.langLabel[l]}>
              {l.toUpperCase()}
            </span>
          ) : (
            <L
              to={hrefFor(l, ref)}
              hrefLang={l}
              lang={l}
              aria-label={t.langLabel[l]}
              tabIndex={tabIndex}
              onClick={() => {
                try {
                  localStorage.setItem("dm-lang", l);
                } catch {
                  /* preference is optional */
                }
              }}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              {l.toUpperCase()}
            </L>
          )}
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { locale, t } = useContent();
  const { main, contactLink, all } = useNav();
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

  const home = hrefFor(locale, { kind: "home" });
  const isActive = (to: string) => (to === home ? pathname === home || pathname === home + "/" : pathname.startsWith(to));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent bg-background",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <L to={home} className="group flex items-center" aria-label={t.homeAria}>
          <img src={logo} alt={t.logoAlt} width={672} height={585} className="h-11 w-auto transition-opacity group-hover:opacity-80 md:h-14" />
        </L>

        <nav aria-label={t.mainNav} className="hidden items-center gap-8 md:flex">
          {main.map((n) => (
            <L key={n.to} to={n.to} className={cn("relative text-sm tracking-wide transition-colors hover:text-accent", isActive(n.to) && "text-foreground")}>
              {n.label}
              <span className={cn("absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-500", isActive(n.to) ? "w-full" : "w-0")} />
            </L>
          ))}
          <LanguageSwitcher />
          <L to={contactLink.to} className={btn({ variant: "solid", className: "py-2.5 text-sm" })}>
            {contactLink.label} <Arrow />
          </L>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={cn("absolute h-px w-6 bg-current transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
            <span className={cn("absolute h-px w-6 bg-current transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
          </button>
        </div>
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
        <img src={logoLight} alt={t.logoAlt} width={672} height={585} className="mb-8 h-12 w-auto self-start" aria-hidden />
        <nav aria-label={t.mobileNav} className="flex flex-col gap-2">
          {all.map((n, i) => (
            <L key={n.to} to={n.to} tabIndex={open ? 0 : -1} className="flex items-baseline gap-4 border-b border-border py-3">
              <span className="eyebrow text-accent">0{i + 1}</span>
              <span className="display-md">{n.label}</span>
            </L>
          ))}
        </nav>
        <LanguageSwitcher className="mt-8 text-sm" tabIndex={open ? 0 : -1} />
        <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1} className="mt-auto text-sm text-muted-foreground">
          {contact.email}
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { locale, t, services, person } = useContent();
  const { all, contactLink } = useNav();
  return (
    <footer data-theme="ink" className="bg-background text-foreground">
      <div className="container-editorial pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-muted-foreground">{t.footer.eyebrow}</p>
            <L to={contactLink.to} className="group mt-4 block">
              <span className="display-lg block transition-colors group-hover:text-accent">
                {t.footer.title1}
                <em>{t.footer.title2}</em>
              </span>
            </L>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-6 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-4 text-muted-foreground">{t.footer.site}</p>
              <ul className="space-y-2">
                {all.map((n) => (
                  <li key={n.to}>
                    <L to={n.to} className="link-underline">
                      {n.label}
                    </L>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-muted-foreground">{t.footer.services}</p>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <L to={hrefFor(locale, { kind: "service", id: idOf(s) })} className="link-underline">
                      {s.title}
                    </L>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-muted-foreground">{t.footer.elsewhere}</p>
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
                    {t.footer.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <img src={logoLight} alt={t.logoAlt} width={672} height={585} className="h-10 w-auto" />
          <p>
            © {new Date().getFullYear()} {person.fullName} · {person.handle}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

export function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { locale, t } = useContent();
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="container-editorial grid gap-8 py-20 md:grid-cols-12 md:items-end md:py-28">
        <h2 className="display-lg md:col-span-8">{title ?? t.cta.title}</h2>
        <div className="md:col-span-4">
          <p className="lede mb-6">{text ?? t.cta.text}</p>
          <L to={hrefFor(locale, { kind: "contact" })} className={btn({ variant: "solid" })}>
            {t.cta.button} <Arrow />
          </L>
        </div>
      </div>
    </section>
  );
}
