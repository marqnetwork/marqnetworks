import fs from "fs";
import path from "path";

export type ShortLink = {
  code: string;
  original: string;
  createdAt: number;
  clicks: number;
};

export interface ShortLinksData {
  links: Record<string, ShortLink>;
}

const dataDir = path.join(process.cwd(), "data");
const dataPath = path.join(dataDir, "shortlinks.json");

export function ensureShortlinksFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataPath)) {
    const initial: ShortLinksData = { links: {} };
    fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2), "utf-8");
  }
}

export function readShortlinks(): ShortLinksData {
  ensureShortlinksFile();
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

export function writeShortlinks(data: ShortLinksData) {
  ensureShortlinksFile();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

export function getShortLink(code: string): ShortLink | undefined {
  const data = readShortlinks();
  return data.links[code];
}

export function upsertShortLink(link: ShortLink): ShortLink {
  const data = readShortlinks();
  data.links[link.code] = link;
  writeShortlinks(data);
  return link;
}

export function incrementClicks(code: string) {
  const data = readShortlinks();
  const existing = data.links[code];
  if (existing) {
    existing.clicks += 1;
    writeShortlinks(data);
  }
}

export function makeCode(length = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}