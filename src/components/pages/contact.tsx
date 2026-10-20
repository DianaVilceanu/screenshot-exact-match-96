import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Arrow, Eyebrow, btn } from "@/components/site/primitives";
import { contact } from "@/content/site";
import { supabase } from "@/integrations/supabase/client";
import { content, hrefFor, useContent, type Locale } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export function contactHead(locale: Locale) {
  const { t } = content(locale);
  return seo({ title: t.contact.seoTitle, description: t.contact.seoDesc, path: hrefFor(locale, { kind: "contact" }), locale, ref: { kind: "contact" } });
}

type Field = "name" | "email" | "project_type" | "budget" | "message";
type Errors = Partial<Record<Field, string>>;

export function ContactPage() {
  const { t } = useContent();
  const c = t.contact;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const schema = z.object({
    name: z.string().trim().min(1, c.errName).max(120),
    email: z.string().trim().email(c.errEmail).max(255),
    project_type: z.string().min(1, c.errType),
    budget: z.string().max(80).optional(),
    message: z.string().trim().min(10, c.errMessage).max(5000),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return setStatus("sent");
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as Field] ??= i.message;
      setErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = parsed.data;
    const { error } = await supabase.from("contact_messages").insert({ name: d.name, email: d.email, project_type: d.project_type, budget: d.budget || null, message: d.message });
    setStatus(error ? "error" : "sent");
  }

  const field = "w-full border-b border-input bg-transparent py-3 text-lg outline-none transition-colors focus:border-foreground aria-[invalid=true]:border-destructive";
  const Err = ({ k }: { k: Field }) => (errors[k] ? <p id={`e-${k}`} className="mt-2 text-sm text-destructive">{errors[k]}</p> : null);

  return (
    <section className="container-editorial grid gap-16 pt-32 pb-24 md:grid-cols-12 md:pt-44">
      <div className="md:col-span-5">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="display-xl mt-6">
          {c.h1a}
          <em className="text-accent">{c.h1b}</em>
        </h1>
        <p className="lede mt-8 text-muted-foreground">{c.lede}</p>
        <dl className="mt-12 space-y-6 border-t border-border pt-8">
          <div>
            <dt className="eyebrow text-muted-foreground">{c.email}</dt>
            <dd className="mt-1 text-lg">
              <a className="link-underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">WhatsApp</dt>
            <dd className="mt-1 text-lg">
              <a className="link-underline" href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer">
                {contact.whatsapp.label}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">{c.elsewhere}</dt>
            <dd className="mt-2 flex flex-wrap gap-4">
              {contact.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {s.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="md:col-span-6 md:col-start-7">
        {status === "sent" ? (
          <div role="status" className="bg-secondary p-10">
            <p className="display-md">{c.thanks}</p>
            <p className="mt-4 text-muted-foreground">{c.reply}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-8">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <div>
              <label htmlFor="f-name" className="eyebrow text-muted-foreground">
                {c.name}
              </label>
              <input id="f-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="e-name" />
              <Err k="name" />
            </div>
            <div>
              <label htmlFor="f-email" className="eyebrow text-muted-foreground">
                {c.emailLabel}
              </label>
              <input id="f-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="e-email" />
              <Err k="email" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="f-project_type" className="eyebrow text-muted-foreground">
                  {c.type}
                </label>
                <select id="f-project_type" name="project_type" defaultValue="" className={field} aria-invalid={!!errors.project_type} aria-describedby="e-project_type">
                  <option value="" disabled>
                    {c.choose}
                  </option>
                  {c.projectTypes.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <Err k="project_type" />
              </div>
              <div>
                <label htmlFor="f-budget" className="eyebrow text-muted-foreground">
                  {c.budget}
                </label>
                <select id="f-budget" name="budget" defaultValue="" className={field}>
                  <option value="">{c.noSay}</option>
                  {c.budgets.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="f-message" className="eyebrow text-muted-foreground">
                {c.message}
              </label>
              <textarea id="f-message" name="message" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby="e-message" />
              <Err k="message" />
            </div>
            {status === "error" && (
              <p role="alert" className="text-destructive">
                {c.failed}
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className={btn({ variant: "solid", className: "disabled:opacity-60" })}>
              {status === "sending" ? c.sending : c.send} <Arrow />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
