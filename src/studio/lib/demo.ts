/**
 * Opt-in SYNTHETIC sandbox: lets you click around before importing real data.
 * Everything is flagged (brand.isDemo, snapshot.source = "demo") and removed in one click.
 * It is not, and must never be presented as, real performance data.
 */
import { addMonths, currentMonth } from "./analytics";
import { blankPost, nowIso, uid } from "./store";
import type { Brand, Campaign, Format, Platform, Post, Workspace } from "./types";

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

export function demoWorkspace(ws: Workspace): Workspace {
  const r = rng(42);
  const brand: Brand = {
    id: uid(),
    name: "Demo Studio (synthetic)",
    description: "Synthetic sandbox brand for exploring the Command Center. Not real data.",
    audience: "Small business owners, 25–40",
    industry: "Design services",
    tone: "Warm, direct, expert",
    platforms: ["instagram", "facebook", "tiktok"],
    pillars: ["Education", "Behind the scenes", "Client work", "Offers"],
    createdAt: nowIso(),
    isDemo: true,
  };
  const camp: Campaign = {
    id: uid(),
    brandId: brand.id,
    name: "Spring launch (demo)",
    objective: "Awareness",
    notes: "",
  };
  const hooks = [
    [
      "Why does your logo look cheap?",
      "Education",
      "carousel",
      "Save this before your next rebrand",
    ],
    ["3 colour mistakes small brands make", "Education", "carousel", "Save this for later"],
    [
      "How to brief a designer in 5 steps",
      "Education",
      "reel",
      "Send this to a friend who's starting a business",
    ],
    ["Behind the scenes of a brand identity", "Behind the scenes", "reel", "Follow for part 2"],
    ["A day in the studio", "Behind the scenes", "video", "Tell us what you want to see"],
    [
      "Before & after: bakery rebrand",
      "Client work",
      "reel",
      "Send this to someone who needs a rebrand",
    ],
    ["Client review: what changed after the rebrand", "Client work", "static", "Link in bio"],
    ["New packages are live, 15% off", "Offers", "static", "Book via link in bio"],
    ["Spring offer: last 3 slots", "Offers", "story", "DM us"],
    ["What do customers notice first?", "Education", "video", ""],
  ] as const;
  const end = currentMonth();
  const posts: Post[] = [];
  for (let mi = 6; mi >= 1; mi--) {
    const ym = addMonths(end, -mi);
    for (let i = 0; i < 16; i++) {
      const [hook, pillar, fmt0, cta] = hooks[Math.floor(r() * hooks.length)]!;
      const platform: Platform = r() < 0.55 ? "instagram" : r() < 0.6 ? "tiktok" : "facebook";
      const format: Format = platform === "tiktok" ? "video" : (fmt0 as Format);
      const day = 1 + Math.floor(r() * 27);
      const hour = [9, 12, 18, 20][Math.floor(r() * 4)];
      let q = 0.6 + r() * 0.8;
      if (format === "carousel") q *= 1.45;
      if (pillar === "Offers") q *= 0.6;
      if (/before & after/i.test(hook)) q *= 1.6;
      if (hook.endsWith("?")) q *= 1.25;
      if (format === "reel" && mi <= 2) q *= 0.7;
      const reach = Math.round(
        (platform === "tiktok" ? 5200 : platform === "instagram" ? 2600 : 1100) *
          (0.5 + r()) *
          (format === "reel" || format === "video" ? 1.6 : 1),
      );
      const views = Math.round(reach * (1.2 + r() * 0.6));
      const eng = reach * 0.045 * q;
      const len =
        format === "reel" || format === "video"
          ? [9, 18, 27, 45, 75][Math.floor(r() * 5)]
          : undefined;
      posts.push(
        blankPost(brand.id, {
          date: `${ym}-${String(day).padStart(2, "0")}`,
          time: `${String(hour).padStart(2, "0")}:00`,
          platform,
          format,
          pillar,
          title: hook,
          topic: hook,
          hook,
          caption: `${hook}\n\nSynthetic demo caption. #branding #design`,
          cta,
          hashtags: ["#branding", "#design", ...(pillar === "Education" ? ["#designtips"] : [])],
          status: "published",
          videoLength: len,
          campaignId: pillar === "Offers" && mi <= 3 ? camp.id : undefined,
          metrics: [
            {
              id: uid(),
              source: "demo",
              capturedAt: nowIso(),
              values: {
                reach,
                views,
                likes: Math.round(eng * 0.7),
                comments: Math.round(eng * 0.08),
                shares: Math.round(eng * 0.1 * (/before|send/i.test(hook + cta) ? 2 : 1)),
                saves: Math.round(eng * 0.12 * (format === "carousel" ? 2 : 1)),
                ...(len ? { retention: Math.round(20 + r() * 40 - (len > 40 ? 12 : 0)) } : {}),
              },
            },
          ],
          notes: "SYNTHETIC DEMO DATA",
        }),
      );
    }
  }
  // A few upcoming planned items in the current month.
  for (let i = 0; i < 6; i++)
    posts.push(
      blankPost(brand.id, {
        date: `${end}-${String(3 + i * 4).padStart(2, "0")}`,
        platform: i % 2 ? "instagram" : "tiktok",
        format: i % 2 ? "carousel" : "video",
        pillar: brand.pillars[i % 4] ?? "",
        title: `Planned demo post ${i + 1}`,
        status:
          (["idea", "planned", "in_production", "ready", "planned", "idea"] as const)[i] ?? "idea",
        notes: "SYNTHETIC DEMO DATA",
      }),
    );
  return {
    ...ws,
    brands: [...ws.brands, brand],
    campaigns: [...ws.campaigns, camp],
    posts: [...ws.posts, ...posts],
  };
}

export function removeDemo(ws: Workspace): Workspace {
  const ids = new Set(ws.brands.filter((b) => b.isDemo).map((b) => b.id));
  return {
    ...ws,
    brands: ws.brands.filter((b) => !ids.has(b.id)),
    posts: ws.posts.filter((p) => !ids.has(p.brandId)),
    campaigns: ws.campaigns.filter((c) => !ids.has(c.brandId)),
    imports: ws.imports.filter((i) => !ids.has(i.brandId)),
    experiments: ws.experiments.filter((e) => !ids.has(e.brandId)),
    trends: ws.trends.filter((t) => !ids.has(t.brandId)),
  };
}
