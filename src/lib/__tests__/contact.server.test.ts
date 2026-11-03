import { describe, expect, it, vi } from "vitest";
import { buildEmail, contactSchema, rateLimited, sendNotification } from "../contact.server";

const sample = { name: "Ana <b>Pop</b>", email: "ana@example.com", project_type: "Branding", budget: "", message: "Hello, I would like a new identity.\nSecond line." };

describe("contact notification", () => {
  it("escapes visitor input in the HTML body and keeps the subject on one line", () => {
    const m = buildEmail({ ...sample, name: "Ana\r\nBcc: x@y.z <script>" });
    expect(m.subject).not.toMatch(/[\r\n]/);
    expect(m.html).not.toContain("<script>");
    expect(m.text).toContain("Hello, I would like");
  });

  it("validates like the table constraints", () => {
    expect(contactSchema.safeParse(sample).success).toBe(true);
    expect(contactSchema.safeParse({ ...sample, email: "nope" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...sample, message: "short" }).success).toBe(false);
  });

  it("skips silently when no API key is configured", async () => {
    const f = vi.fn();
    expect(await sendNotification(contactSchema.parse(sample), {}, "owner@example.com", f as unknown as typeof fetch)).toEqual({ ok: false, reason: "no_api_key" });
    expect(f).not.toHaveBeenCalled();
  });

  it("posts to Resend with the reply-to set to the visitor", async () => {
    const f = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    const r = await sendNotification(contactSchema.parse(sample), { RESEND_API_KEY: "re_test" }, "owner@example.com", f as unknown as typeof fetch);
    expect(r).toEqual({ ok: true });
    const [url, init] = f.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.to).toEqual(["owner@example.com"]);
    expect(body.reply_to).toBe("ana@example.com");
    expect((init as RequestInit & { headers: Record<string, string> }).headers["Authorization"]).toBe("Bearer re_test");
  });

  it("reports why Resend refused", async () => {
    const f = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "You can only send testing emails to your own email address" }), { status: 403 }));
    const r = await sendNotification(contactSchema.parse(sample), { RESEND_API_KEY: "k" }, "o@e.com", f as unknown as typeof fetch);
    expect(r).toMatchObject({ ok: false });
    expect(r.ok === false && r.reason).toContain("resend_403");
    expect(r.ok === false && r.reason).toContain("your own email");
  });

  it("reports a network failure without throwing", async () => {
    const f = vi.fn().mockRejectedValue(new Error("boom"));
    expect(await sendNotification(contactSchema.parse(sample), { RESEND_API_KEY: "k" }, "o@e.com", f as unknown as typeof fetch)).toEqual({ ok: false, reason: "network_error" });
  });

  it("rate limits after five submissions from one address", () => {
    const t = 1_000_000;
    for (let i = 0; i < 5; i++) expect(rateLimited("1.2.3.4", t + i)).toBe(false);
    expect(rateLimited("1.2.3.4", t + 6)).toBe(true);
    expect(rateLimited("9.9.9.9", t + 6)).toBe(false);
    expect(rateLimited("1.2.3.4", t + 11 * 60 * 1000)).toBe(false);
  });
});
