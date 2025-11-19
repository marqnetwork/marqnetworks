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
    return NextResponse.json({ devices: [], user_id: null });
  }
  try {
    const { user, role } = await resolveSupabaseUserBySession();
    const url = new URL(request.url);
    const targetUserId = url.searchParams.get("user_id") || user.id;
    if (targetUserId !== user.id && !(role === "super_admin" || role === "team_manager")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { data, error } = await supabase
      .from("agent_devices")
      .select("device_id, os, version, last_seen_at")
      .eq("user_id", targetUserId)
      .order("last_seen_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ devices: data || [], user_id: targetUserId });
  } catch (e: any) {
    console.error("agent devices list error", e);
    return NextResponse.json({ devices: [], user_id: null });
  }
}