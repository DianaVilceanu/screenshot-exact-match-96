import { createFileRoute } from "@tanstack/react-router";
import { contact } from "@/content/site";
import { contactSchema, rateLimited, sendNotification } from "@/lib/contact.server";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
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
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("contact_messages").insert({ name: d.name, email: d.email, project_type: d.project_type, budget: d.budget || null, message: d.message });
          if (error) throw new Error(error.message);
        } catch (e) {
          console.error("[contact] could not save the message", e);
          return json({ ok: false, error: "save_failed" }, 500);
        }
        const emailed = await sendNotification(d, process.env as Record<string, string | undefined>, contact.email);
        return json({ ok: true, emailed });
      },
    },
  },
});
