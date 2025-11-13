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
      .from("time_entries")
      .select("start_time, end_time, duration")
      .eq("user_id", targetUserId)
      .eq("approved", true)
      .gte("start_time", start)
      .lte("end_time", end);
    if (error) throw error;
    const totalSeconds = (data || []).reduce((acc: number, r: any) => acc + (r.duration || 0), 0);
    const totalHours = Number((totalSeconds / 3600).toFixed(2));
    return NextResponse.json({ user_id: targetUserId, start, end, total_hours: totalHours });
  } catch (e: any) {
    console.error("hours report error", e);
    return NextResponse.json({ error: e.message || "Failed to fetch hours" }, { status: 500 });
  }
}