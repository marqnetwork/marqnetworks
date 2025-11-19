import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  await resolveSupabaseUserBySession(); 
  const { data, error } = await supabase.from("settings").select("key, value");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const settings: Record<string, any> = {};
  for (const row of data || []) settings[row.key] = row.value;
  const interval = settings.screenshot_interval_minutes ?? 10;
  const blur = settings.blur_screenshots ?? false;
  const idleTimeout = settings.idle_timeout_minutes ?? 8;
  return NextResponse.json({ screenshot_interval_minutes: interval, blur_screenshots: blur, idle_timeout_minutes: idleTimeout });
}