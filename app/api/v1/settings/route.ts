import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { getSession } from "../../../lib/authStore";

type Setting = { key: string; value: any };

function resolveWritableDir(preferred: string) {
  try {
    if (!fs.existsSync(preferred)) fs.mkdirSync(preferred, { recursive: true });
    const test = path.join(preferred, ".write-test");
    fs.writeFileSync(test, "ok");
    fs.unlinkSync(test);
    return preferred;
  } catch {
    const alt = path.join("/tmp", "marq-data");
    try {
      if (!fs.existsSync(alt)) fs.mkdirSync(alt, { recursive: true });
      return alt;
    } catch {
      return preferred;
    }
  }
}
const dataDir = resolveWritableDir(path.join(process.cwd(), "data"));
const settingsPath = path.join(dataDir, "settings.json");

function ensureLocal() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(settingsPath)) fs.writeFileSync(settingsPath, JSON.stringify({ settings: [] as Setting[] }, null, 2), "utf-8");
  } catch {}
}
function readLocal(): { settings: Setting[] } {
  ensureLocal();
  const raw = fs.readFileSync(settingsPath, "utf-8");
  return JSON.parse(raw);
}
function writeLocal(data: { settings: Setting[] }) {
  try { fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2), "utf-8"); } catch {}
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdminClient();
    await resolveSupabaseUserBySession();
    const { data, error } = await supabase.from("settings").select("key, value");
    if (error) throw error;
    const rows: Setting[] = (data || []).map((r: any) => ({ key: r.key, value: r.value }));
    return NextResponse.json({ settings: rows });
  } catch {
    const cookieStore = await cookies();
    const sid = cookieStore.get("session_id")?.value || "";
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = readLocal();
    return NextResponse.json({ settings: data.settings });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdminClient();
    await resolveSupabaseUserBySession();
    const body = await request.json().catch(() => ({}));
    const key = (body?.key || '').trim();
    const value = body?.value ?? null;
    if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });
    const { error } = await supabase.from("settings").upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    const cookieStore = await cookies();
    const sid = cookieStore.get("session_id")?.value || "";
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => ({}));
    const key = (body?.key || '').trim();
    const value = body?.value ?? null;
    if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });
    const data = readLocal();
    const existing = data.settings.find(s => s.key === key);
    if (existing) {
      existing.value = value;
    } else {
      data.settings.push({ key, value });
    }
    writeLocal(data);
    return NextResponse.json({ ok: true });
  }
}