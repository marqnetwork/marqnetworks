import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { user, role } = await resolveSupabaseUserBySession(request, supabase);
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  const targetUserId = url.searchParams.get("user_id") || user.id;
  if (!start || !end) {
    return NextResponse.json({ error: "start and end query params required (YYYY-MM-DD)" }, { status: 400 });
  }
  if (targetUserId !== user.id && !(role === "super_admin" || role === "team_manager")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { data, error } = await supabase
      .from("app_heartbeats")
      .select("captured_at, app_name, window_title, idle")
      .eq("user_id", targetUserId)
      .gte("captured_at", start)
      .lte("captured_at", end)
      .order("captured_at", { ascending: true });
    if (error) throw error;
    const total = (data || []).length;
    const idleCount = (data || []).filter((r: any) => r.idle).length;
    return NextResponse.json({ user_id: targetUserId, start, end, total_pings: total, idle_pings: idleCount, events: data || [] });
  } catch (e: any) {
    console.error("activity report error", e);
    return NextResponse.json({ error: e.message || "Failed to fetch activity" }, { status: 500 });
  }
}