/** File → table of string cells. Runs in the browser only. */

export interface Table {
  headers: string[];
  rows: string[][];
  sheetNames?: string[] | undefined;
  sheet?: string | undefined;
  warnings: string[];
}

/* ---------------- CSV / TSV (RFC 4180, quoted fields, embedded newlines) ---------------- */

export function parseDelimited(text: string): string[][] {
  const src = text.replace(/^\uFEFF/, "");
  const firstLine = src.split(/\r?\n/, 1)[0] ?? "";
  const counts = { ",": 0, ";": 0, "\t": 0 } as Record<string, number>;
  for (const ch of firstLine) if (ch in counts) counts[ch] = (counts[ch] ?? 0) + 1;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]!;
  const delim = top[1] > 0 ? top[0] : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (q) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else q = false;
      } else cell += c;
      continue;
    }
    if (c === '"' && cell === "") q = true;
    else if (c === delim) {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/* ---------------- header detection ---------------- */

/** Picks the first row (within the first 15) that looks most like a header. */
export function toTable(
  grid: string[][],
  isHeaderish: (cell: string) => boolean,
  warnings: string[] = [],
): Table {
  if (!grid.length)
    return { headers: [], rows: [], warnings: [...warnings, "No rows found in the file."] };
  let bestIdx = 0;
  let bestScore = -1;
  grid.slice(0, 15).forEach((r, i) => {
    const filled = r.filter((c) => c.trim()).length;
    const known = r.filter((c) => isHeaderish(c)).length;
    const score = known * 3 + (filled >= 2 ? 1 : 0);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  });
  if (bestIdx > 0) warnings.push(`Skipped ${bestIdx} row(s) above the detected header row.`);
  const width = Math.max(...grid.map((r) => r.length));
  const headers = Array.from(
    { length: width },
    (_, i) => (grid[bestIdx]![i] ?? "").trim() || `Column ${i + 1}`,
  );
  // De-duplicate header names so mapping keys are unique.
  const seen = new Map<string, number>();
  const uniq = headers.map((h) => {
    const n = (seen.get(h) ?? 0) + 1;
    seen.set(h, n);
    return n > 1 ? `${h} (${n})` : h;
  });
  const rows = grid
    .slice(bestIdx + 1)
    .map((r: string[]) => Array.from({ length: width }, (_, i) => (r[i] ?? "").toString().trim()));
  return { headers: uniq, rows: rows.filter((r) => r.some(Boolean)), warnings };
}

/* ---------------- XLSX ---------------- */

async function readXlsx(file: File, sheet?: string) {
  const mod = await import("read-excel-file");
  const readXlsxFile = mod.default;
  const sheetNames = (await mod.readSheetNames(file)) as string[];
  const target = sheet && sheetNames.includes(sheet) ? sheet : sheetNames[0];
  const data = (await readXlsxFile(
    file,
    target ? { sheet: target } : {},
  )) as unknown as unknown[][];
  const grid = data.map((r) =>
    r.map((c: unknown) => {
      if (c == null) return "";
      if (c instanceof Date) return c.toISOString();
      return String(c);
    }),
  );
  return { grid, sheetNames, sheet: target };
}

/* ---------------- PDF (text layer → rows by y, columns by x gaps) ---------------- */

async function readPdf(file: File): Promise<{ grid: string[][]; warnings: string[] }> {
  const pdfjs = await import("pdfjs-dist");
  const worker = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = worker;
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const grid: string[][] = [];
  let anyText = false;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    type It = { str: string; x: number; y: number; w: number };
    const items: It[] = [];
    for (const it of content.items as {
      str?: string | undefined;
      transform?: number[];
      width?: number | undefined;
    }[]) {
      if (!it.str?.trim() || !it.transform) continue;
      anyText = true;
      items.push({
        str: it.str.trim(),
        x: it.transform[4] ?? 0,
        y: it.transform[5] ?? 0,
        w: it.width ?? 0,
      });
    }
    // Group into lines (y within 3pt), top to bottom.
    items.sort((a, b) => b.y - a.y || a.x - b.x);
    const lines: It[][] = [];
    for (const it of items) {
      const line = lines.find((l) => Math.abs(l[0]!.y - it.y) < 3);
      if (line) line.push(it);
      else lines.push([it]);
    }
    for (const l of lines) {
      l.sort((a, b) => a.x - b.x);
      const cells: string[] = [];
      let last: It | undefined;
      for (const it of l) {
        // A gap wider than ~12pt starts a new cell; otherwise join with a space.
        if (last && it.x - (last.x + last.w) < 12) cells[cells.length - 1] += " " + it.str;
        else cells.push(it.str);
        last = it;
      }
      grid.push(cells);
    }
  }
  const warnings = [
    "PDF tables are read from the text layer by position. Columns can merge or split, so check the preview and mapping carefully before importing.",
  ];
  if (!anyText)
    warnings.push(
      "This PDF has no text layer (it's probably an image or a flattened Canva export). Export the plan from Canva as CSV, or copy the table and use “Paste table” instead.",
    );
  return { grid, warnings };
}

export async function parseFile(
  file: File,
  isHeaderish: (c: string) => boolean,
  sheet?: string,
): Promise<Table> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".xlsx") || name.endsWith(".xlsm")) {
    const { grid, sheetNames, sheet: s } = await readXlsx(file, sheet);
    return { ...toTable(grid, isHeaderish), sheetNames, sheet: s };
  }
  if (name.endsWith(".xls")) {
    return {
      headers: [],
      rows: [],
      warnings: ["Old .xls files aren't supported. Re-save the file as .xlsx or CSV."],
    };
  }
  if (name.endsWith(".pdf")) {
    const { grid, warnings } = await readPdf(file);
    return toTable(grid, isHeaderish, warnings);
  }
  const text = await file.text();
  return toTable(parseDelimited(text), isHeaderish);
}
