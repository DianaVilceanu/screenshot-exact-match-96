import { describe, expect, it } from "vitest";
import { buildRows, derive, total } from "../analytics";
import { commitImport, mapRows, matchRows } from "../importer";
import { autoMap, detectDateOrder, parseDate, parseNumber } from "../mapping";
import { parseDelimited, toTable } from "../parse";
import { isKnownHeader } from "../mapping";
import { findPatterns } from "../insights";
import { blankPost } from "../store";
import { emptyWorkspace, type Brand, type Workspace } from "../types";

const brand: Brand = {
  id: "b1",
  name: "Test",
  description: "",
  audience: "",
  industry: "",
  tone: "",
  platforms: ["instagram"],
  pillars: [],
  createdAt: "",
};
const ws0 = (): Workspace => ({ ...emptyWorkspace(), brands: [brand] });

function importCsv(ws: Workspace, csv: string, kind: "plan" | "analytics") {
  const table = toTable(parseDelimited(csv), isKnownHeader);
  const mapping = autoMap(table.headers);
  const { rows } = mapRows(table, {
    mapping,
    dateOrder: "auto",
    defaultPlatform: "instagram",
    kind,
  });
  const plans = matchRows(rows, ws, "b1", kind);
  return {
    plans,
    run: () =>
      commitImport({
        ws,
        brandId: "b1",
        kind,
        fileName: "t.csv",
        fileType: "csv",
        headers: table.headers,
        mapping,
        plans,
      }),
  };
}

describe("parsing", () => {
  it("handles quoted fields, embedded newlines and semicolons", () => {
    const g = parseDelimited('a;b\n"x;1";"line1\nline2"\n');
    expect(g).toEqual([
      ["a", "b"],
      ["x;1", "line1\nline2"],
    ]);
  });
  it("parses numbers in several formats and never invents zeros", () => {
    expect(parseNumber("1,234")).toBe(1234);
    expect(parseNumber("1.234")).toBe(1234);
    expect(parseNumber("12.5K")).toBe(12500);
    expect(parseNumber("4,5%")).toBe(4.5);
    expect(parseNumber("")).toBeUndefined();
    expect(parseNumber("n/a")).toBeUndefined();
  });
  it("detects day-first vs month-first from the whole column", () => {
    expect(detectDateOrder(["03/04/2025", "25/04/2025"]).order).toBe("dmy");
    expect(detectDateOrder(["03/04/2025", "04/25/2025"]).order).toBe("mdy");
    expect(detectDateOrder(["03/04/2025"]).ambiguous).toBe(true);
    expect(parseDate("04/25/2025 14:05", "mdy")).toEqual({ date: "2025-04-25", time: "14:05" });
    expect(parseDate("not a date", "dmy")).toBeNull();
  });
  it("auto-maps Meta export headers", () => {
    const m = autoMap(["Publish time", "Permalink", "Reach", "Likes", "Saves", "Description"]);
    expect(m).toMatchObject({
      "Publish time": "datetime",
      Permalink: "postUrl",
      Reach: "reach",
      Likes: "likes",
      Saves: "saves",
      Description: "caption",
    });
  });
});

describe("import integrity", () => {
  const plan =
    "Date,Platform,Format,Title,Hook,Canva link\n2025-03-03,Instagram,Carousel,Logo mistakes,Why does your logo look cheap?,https://www.canva.com/design/abc\n";
  const analytics =
    "Publish time,Permalink,Description,Reach,Likes,Comments,Shares,Saves\n03/03/2025 10:00,https://instagram.com/p/XYZ/,Why does your logo look cheap? Logo mistakes,1000,50,5,10,20\n";

  it("creates plan items, then sends a fuzzy analytics match to review instead of merging", () => {
    const a = importCsv(ws0(), plan, "plan");
    expect(a.plans[0]!.action).toBe("create");
    const ws1 = a.run().ws;
    const b = importCsv(ws1, analytics, "analytics");
    // Same date + similar text but no URL on the plan item → not certain.
    expect(["uncertain", "likely"]).toContain(b.plans[0]!.certainty);
  });

  it("matches by URL exactly and never double-counts a re-imported export", () => {
    const ws = ws0();
    ws.posts.push(
      blankPost("b1", {
        id: "p1",
        date: "2025-03-03",
        postUrl: "https://www.instagram.com/p/XYZ",
        status: "published",
        title: "Logo mistakes",
      }),
    );
    const first = importCsv(ws, analytics, "analytics");
    expect(first.plans[0]!.certainty).toBe("certain");
    const ws2 = first.run().ws;
    const second = importCsv(ws2, analytics, "analytics");
    expect(second.plans[0]!.certainty).toBe("duplicate-metrics");
    expect(second.plans[0]!.action).toBe("skip");
    // Even if forced, snapshots are not summed: totals use the latest snapshot only.
    second.plans[0]!.action = "merge";
    const ws3 = second.run().ws;
    const rows = buildRows(ws3);
    expect(rows[0]!.post.metrics).toHaveLength(2);
    expect(total(rows, (r) => r.d.reach).value).toBe(1000);
  });

  it("never overwrites existing non-empty fields on merge, and logs the status change", () => {
    const ws = ws0();
    ws.posts.push(
      blankPost("b1", {
        id: "p1",
        date: "2025-03-03",
        postUrl: "https://instagram.com/p/XYZ",
        status: "ready",
        caption: "Original caption",
      }),
    );
    const ws2 = importCsv(ws, analytics, "analytics").run().ws;
    const p = ws2.posts[0]!;
    expect(p.caption).toBe("Original caption");
    expect(p.status).toBe("published");
    expect(p.edits.some((e) => e.field === "status")).toBe(true);
    expect(p.sources[0]!.raw["Reach"]).toBe("1000");
  });

  it("marks missing metrics as unavailable rather than zero", () => {
    const p = blankPost("b1", {
      status: "published",
      metrics: [{ id: "s", source: "manual", capturedAt: "2025-01-01", values: { views: 100 } }],
    });
    const d = derive(p, emptyWorkspace().settings);
    expect(d.engagement).toBeUndefined();
    expect(d.er).toBeUndefined();
  });
});

describe("patterns", () => {
  it("reports nothing below the minimum sample", () => {
    const ws = ws0();
    for (let i = 0; i < 6; i++)
      ws.posts.push(
        blankPost("b1", {
          date: `2025-03-0${i + 1}`,
          status: "published",
          format: i < 3 ? "carousel" : "static",
          metrics: [
            {
              id: String(i),
              source: "manual",
              capturedAt: "x",
              values: { reach: 1000, likes: i < 3 ? 100 : 10 },
            },
          ],
        }),
      );
    expect(findPatterns(buildRows(ws), 5)).toEqual([]);
  });
});
