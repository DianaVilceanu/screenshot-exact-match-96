import { createFileRoute } from "@tanstack/react-router";
import { articles, categories, isPublished } from "@/content/journal";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { SITE_URL } from "@/content/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          "/",
          "/portfolio",
          ...projects.filter((p) => !p.draft).map((p) => `/portfolio/${p.slug}`),
          "/services",
          ...services.map((s) => `/services/${s.slug}`),
          "/journal",
          ...categories.map((c) => `/journal/category/${c.slug}`),
          ...articles.filter(isPublished).map((a) => `/journal/${a.slug}`),
          "/contact",
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
