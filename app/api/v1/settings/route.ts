import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { getSession } from "../../../lib/authStore";

type Setting = { key: string; value: any };

const dataDir = path.join(process.cwd(), "data");
const settingsPath = path.join(dataDir, "settings.json");

function ensureLocal() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(settingsPath)) fs.writeFileSync(settingsPath, JSON.stringify({ settings: [] as Setting[] }, null, 2), "utf-8");
}
function readLocal(): { settings: Setting[] } {
  ensureLocal();
  const raw = fs.readFileSync(settingsPath, "utf-8");
  return JSON.parse(raw);
}
function writeLocal(data: { settings: Setting[] }) {
  fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdminClient();
    await resolveSupabaseUserBySession(request, supabase);
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
    await resolveSupabaseUserBySession(request, supabase);
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