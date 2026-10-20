import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Arrow, Eyebrow, btn } from "@/components/site/primitives";
import { contact } from "@/content/site";
import { supabase } from "@/integrations/supabase/client";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact — Start a Project",
      description: "Get in touch with Diana Vîlceanu about branding, social media design, campaigns, print or UX/UI projects.",
      path: "/contact",
    }),
  component: Contact,
});

const projectTypes = ["Branding & visual identity", "Social media design", "Content creation & art direction", "Ads & campaigns", "Printed media", "Newsletter", "UX / UI design", "2D animation", "Something else"];
const budgets = ["Not sure yet", "Under €500", "€500 – €1,500", "€1,500 – €5,000", "€5,000+"];

const schema = z.object({
  name: z.string().trim().min(1, "Please tell me your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  project_type: z.string().min(1, "Please choose a project type."),
  budget: z.string().max(80).optional(),
  message: z.string().trim().min(10, "Please write at least a few words (10+ characters).").max(5000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return setStatus("sent"); // honeypot: bots fill hidden field
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
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
  const Err = ({ k }: { k: keyof Errors }) => (errors[k] ? <p id={`e-${k}`} className="mt-2 text-sm text-destructive">{errors[k]}</p> : null);

  return (
    <section className="container-editorial grid gap-16 pt-32 pb-24 md:grid-cols-12 md:pt-44">
      <div className="md:col-span-5">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="display-xl mt-6">
          Let's <em className="text-accent">talk.</em>
        </h1>
        <p className="lede mt-8 text-muted-foreground">
          I'm open to brand identities, social media and content partnerships, campaigns, print and interface projects — with brands that want a recognisable point of view.
        </p>
        <dl className="mt-12 space-y-6 border-t border-border pt-8">
          <div>
            <dt className="eyebrow text-muted-foreground">Email</dt>
            <dd className="mt-1 text-lg"><a className="link-underline" href={`mailto:${contact.email}`}>{contact.email}</a></dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">WhatsApp</dt>
            <dd className="mt-1 text-lg"><a className="link-underline" href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer">{contact.whatsapp.label}</a></dd>
          </div>
          <div>
            <dt className="eyebrow text-muted-foreground">Elsewhere</dt>
            <dd className="mt-2 flex flex-wrap gap-4">
              {contact.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">{s.label}</a>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="md:col-span-6 md:col-start-7">
        {status === "sent" ? (
          <div role="status" className="bg-secondary p-10">
            <p className="display-md">Thank you — message received.</p>
            <p className="mt-4 text-muted-foreground">I'll get back to you by email as soon as I can.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-8">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <div>
              <label htmlFor="f-name" className="eyebrow text-muted-foreground">Name *</label>
              <input id="f-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="e-name" />
              <Err k="name" />
            </div>
            <div>
              <label htmlFor="f-email" className="eyebrow text-muted-foreground">Email *</label>
              <input id="f-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="e-email" />
              <Err k="email" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="f-project_type" className="eyebrow text-muted-foreground">Project type *</label>
                <select id="f-project_type" name="project_type" defaultValue="" className={field} aria-invalid={!!errors.project_type} aria-describedby="e-project_type">
                  <option value="" disabled>Choose…</option>
                  {projectTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
                <Err k="project_type" />
              </div>
              <div>
                <label htmlFor="f-budget" className="eyebrow text-muted-foreground">Budget range</label>
                <select id="f-budget" name="budget" defaultValue="" className={field}>
                  <option value="">Prefer not to say</option>
                  {budgets.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="f-message" className="eyebrow text-muted-foreground">About the project *</label>
              <textarea id="f-message" name="message" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby="e-message" />
              <Err k="message" />
            </div>
            {status === "error" && <p role="alert" className="text-destructive">Something went wrong sending your message. Please try again, or email me directly.</p>}
            <button type="submit" disabled={status === "sending"} className={btn({ variant: "solid", className: "disabled:opacity-60" })}>
              {status === "sending" ? "Sending…" : "Send message"} <Arrow />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
