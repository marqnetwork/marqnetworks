export function toCSV(rows: any[], headers?: string[]): string {
  if (!rows || rows.length === 0) return "";
  const cols = headers || Object.keys(rows[0]);
  const escape = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (s.includes(",") || s.includes("\n") || s.includes("\"")) {
      return `"${s.replace(/\"/g, '""')}"`;
    }
    return s;
  };
  const lines = [] as string[];
  lines.push(cols.join(","));
  for (const row of rows) {
    lines.push(cols.map((c) => escape(row[c])).join(","));
  }
  return lines.join("\n");
}