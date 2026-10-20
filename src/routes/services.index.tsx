import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/chrome";
import { Arrow, Eyebrow, Pic, Reveal } from "@/components/site/primitives";
import { services } from "@/content/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Services — Branding, Social Media Design & Art Direction",
      description:
        "Branding & visual identity, social media design, content creation & art direction, plus ads, print, newsletters, UX/UI and 2D animation.",
      path: "/services",
    }),
  component: Services,
});

function Services() {
  const core = services.filter((s) => s.group === "core");
  const spec = services.filter((s) => s.group === "specialist");
  return (
    <>
      <section className="container-editorial pt-32 pb-16 md:pt-44">
        <Eyebrow n="08">Services · Disciplines</Eyebrow>
        <h1 className="display-xl mt-6 max-w-[11ch]">
          Visuals with a <em className="text-accent">point of view.</em>
        </h1>
        <p className="lede mt-8 max-w-2xl text-muted-foreground">
          Three core disciplines that work best together — and specialist services for campaigns, print, newsletters, interfaces and motion.
        </p>
      </section>

      <section aria-label="Core services">
        {core.map((s, i) => (
          <Reveal key={s.slug} as="article" className="border-t border-border">
            <div className="container-editorial grid gap-10 py-16 md:grid-cols-12 md:py-24">
              <div className={i % 2 ? "md:order-2 md:col-span-5 md:col-start-8" : "md:col-span-5"}>
                <p className="display-lg text-accent">{s.number}</p>
                <h2 className="display-md mt-4">{s.title}</h2>
                <p className="lede mt-5 text-muted-foreground">{s.intro}</p>
                <ul className="mt-6 space-y-2">
                  {s.offerings.map((o) => (
                    <li key={o} className="flex gap-3 border-b border-border pb-2 text-sm">
                      <span className="text-accent">✶</span>
                      {o}
                    </li>
                  ))}
                </ul>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group link-underline mt-8 inline-flex items-center gap-3 font-medium">
                  Explore {s.title.split(" ")[0]!.toLowerCase()} <Arrow />
                </Link>
              </div>
              <div className={`grid grid-cols-2 gap-3 ${i % 2 ? "md:order-1 md:col-span-6" : "md:col-span-6 md:col-start-7"}`}>
                {s.images.slice(0, 2).map((im, j) => (
                  <div key={im.key} className={j === 1 ? "mt-12" : ""}>
                    <Pic k={im.key} alt={im.alt} className="aspect-[4/5]" sizes="25vw" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section data-theme="ink" className="bg-background py-20 text-foreground md:py-28" aria-labelledby="spec-h">
        <div className="container-editorial">
          <Eyebrow>Specialist services</Eyebrow>
          <h2 id="spec-h" className="display-lg mt-5">
            And everything <em className="text-accent">around it.</em>
          </h2>
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {spec.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex min-h-64 flex-col bg-background p-8 transition-colors hover:bg-card">
                <span className="eyebrow text-accent">{s.number}</span>
                <h3 className="display-sm mt-6">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-auto pt-6">
                  <Arrow className="text-xl" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Not sure which service fits?" text="Tell me about the brand and the goal — we'll find the right mix." />
    </>
  );
}
