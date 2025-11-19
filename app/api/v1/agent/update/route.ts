import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  let supabase: ReturnType<typeof getSupabaseAdminClient> | null = null;
  try {
    supabase = getSupabaseAdminClient();
  } catch {
    supabase = null;
  }
  if (!supabase) {
    return NextResponse.json({ latest_version: null, download_url: null });
  }
  await resolveSupabaseUserBySession(); // ensure logged in
  const { data, error } = await supabase.from("settings").select("key, value").in("key", ["agent_latest_version", "agent_download_url"]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const map = new Map<string, any>();
  for (const row of data || []) map.set(row.key, row.value);
  return NextResponse.json({
    latest_version: map.get("agent_latest_version") ?? null,
    download_url: map.get("agent_download_url") ?? null,
  });
}