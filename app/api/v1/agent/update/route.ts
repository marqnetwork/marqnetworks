import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  await resolveSupabaseUserBySession(request, supabase); // ensure logged in
  // Fetch latest agent version and download URL from settings
  const { data, error } = await supabase.from("settings").select("key, value").in("key", ["agent_latest_version", "agent_download_url"]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const map = new Map<string, any>();
  for (const row of data || []) map.set(row.key, row.value);
  return NextResponse.json({
    latest_version: map.get("agent_latest_version") ?? null,
    download_url: map.get("agent_download_url") ?? null,
  });
}