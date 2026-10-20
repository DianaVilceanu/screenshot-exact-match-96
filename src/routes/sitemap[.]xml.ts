import { createFileRoute } from "@tanstack/react-router";
import { isPublished } from "@/content/journal";
import { absolute, alternatesFor, content, idOf, LOCALES, type PageRef } from "@/lib/i18n";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const refs: PageRef[] = [{ kind: "home" }, { kind: "portfolio" }, { kind: "services" }, { kind: "journal" }, { kind: "contact" }];
        const seen = new Set<string>();
        for (const l of LOCALES) {
          const c = content(l);
          c.publicProjects.forEach((p) => refs.push({ kind: "project", id: idOf(p) }));
          c.services.forEach((s) => refs.push({ kind: "service", id: idOf(s) }));
          c.categories.forEach((x) => refs.push({ kind: "category", id: idOf(x) }));
          c.articles.filter(isPublished).forEach((a) => refs.push({ kind: "article", id: idOf(a) }));
        }
        const urls: string[] = [];
        for (const r of refs) {
          const key = JSON.stringify(r);
          if (seen.has(key)) continue;
          seen.add(key);
          const alts = alternatesFor(r);
          const links = alts.length > 1 ? alts.map((a) => `<xhtml:link rel="alternate" hreflang="${a.locale}" href="${absolute(a.path)}"/>`).join("") : "";
          for (const a of alts) urls.push(`  <url><loc>${absolute(a.path)}</loc>${links}</url>`);
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
