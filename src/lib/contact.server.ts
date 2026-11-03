import { z } from "zod";

/** Same limits as the contact_messages table and the form on the page. */
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  project_type: z.string().trim().min(1).max(80),
  budget: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10).max(5000),
});
export type ContactInput = z.infer<typeof contactSchema>;

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Plain-text and HTML bodies for the notification email. Visitor input is escaped and never reaches a header unfiltered. */
export function buildEmail(d: ContactInput) {
  const budget = d.budget || "not specified";
  const text = [`New message from the website`, ``, `Name: ${d.name}`, `Email: ${d.email}`, `Project type: ${d.project_type}`, `Budget: ${budget}`, ``, d.message].join("\n");
  const html = `<p><strong>New message from the website</strong></p><p>Name: ${esc(d.name)}<br>Email: ${esc(d.email)}<br>Project type: ${esc(d.project_type)}<br>Budget: ${esc(budget)}</p><p style="white-space:pre-wrap">${esc(d.message)}</p>`;
  return { subject: `Website message from ${oneLine(d.name).slice(0, 80)}`, text, html };
}

type Env = Record<string, string | undefined>;

/** Sends the notification through Resend. Returns false (and logs) when the key is missing or Resend refuses; the message is already saved by then. */
export async function sendNotification(d: ContactInput, env: Env, to: string, doFetch: typeof fetch = fetch): Promise<boolean> {
  const key = env["RESEND_API_KEY"];
  if (!key) {
    console.warn("[contact] RESEND_API_KEY is not set, notification email skipped");
    return false;
  }
  const mail = buildEmail(d);
  const res = await doFetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env["CONTACT_FROM"] || "Digital Muse <onboarding@resend.dev>",
      to: [env["CONTACT_TO"] || to],
      reply_to: d.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
  }).catch((e) => {
    console.error("[contact] email request failed", e);
    return undefined;
  });
  if (!res?.ok) {
    if (res) console.error("[contact] Resend refused the email", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

const hits = new Map<string, number[]>();
/** At most `max` submissions per IP in the window. In-memory, so it is a speed bump, not a guarantee. */
export function rateLimited(ip: string, now = Date.now(), max = 5, windowMs = 10 * 60 * 1000): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 2000) hits.clear();
  return false;
}
