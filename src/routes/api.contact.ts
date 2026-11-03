import { createFileRoute } from "@tanstack/react-router";
import { contact } from "@/content/site";
import { contactSchema, rateLimited, sendNotification } from "@/lib/contact.server";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      // Safe self-check: reports only whether the two server settings exist, never their values.
      GET: () =>
        new Response(JSON.stringify({ ok: true, emailKeyConfigured: !!process.env["RESEND_API_KEY"], saveConfigured: !!process.env["SUPABASE_SERVICE_ROLE_KEY"] }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        }),
      POST: async ({ request }) => {
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "bad_json" }, 400);
        }
        // Honeypot: bots fill the hidden "website" field. Pretend it worked.
        if (raw && typeof raw === "object" && (raw as Record<string, unknown>)["website"]) return json({ ok: true });
        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);
        const d = parsed.data;
        let saved = true;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("contact_messages").insert({ name: d.name, email: d.email, project_type: d.project_type, budget: d.budget || null, message: d.message });
          if (error) throw new Error(error.message);
        } catch (e) {
          saved = false;
          console.error("[contact] could not save the message", e);
        }
        // Send the email even when saving failed, so the message still reaches the inbox.
        const sent = await sendNotification(d, process.env as Record<string, string | undefined>, contact.email);
        if (!saved && !sent.ok) return json({ ok: false, error: "save_failed", emailError: sent.reason }, 500);
        return json({ ok: true, saved, emailed: sent.ok, ...(sent.ok ? {} : { emailError: sent.reason }) });
      },
    },
  },
});
