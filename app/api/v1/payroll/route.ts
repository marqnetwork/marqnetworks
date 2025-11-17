import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";
import { cookies } from "next/headers";
import { getSession, getUserById } from "../../../lib/authStore";
import { upsertPeriod, listPeriods } from "../../../lib/payrollStore";

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdminClient();
    const { user, role } = await resolveSupabaseUserBySession(request, supabase);
    const url = new URL(request.url);
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");
    const targetUserId = url.searchParams.get("user_id") || user.id;
    if (targetUserId !== user.id && !(role === "super_admin" || role === "team_manager")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    let query = supabase
      .from("pay_periods")
      .select(
        "id,user_id,period_start,period_end,scheduled_hours,actual_hours,hourly_rate,eligible_amount,override_amount,final_payable,status"
      )
      .eq("user_id", targetUserId)
      .order("period_start", { ascending: false });
    const urlStart = start || undefined;
    const urlEnd = end || undefined;
    if (urlStart) query = query.gte("period_start", urlStart);
    if (urlEnd) query = query.lte("period_end", urlEnd);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ pay_periods: data || [], user_id: targetUserId, start, end });
  } catch {
    const url = new URL(request.url);
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");
    const cookieStore = await cookies();
    const sid = cookieStore.get("session_id")?.value || "";
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const targetUserId = url.searchParams.get("user_id") || ses.userId;
    const user = getUserById(targetUserId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (start && end) upsertPeriod(targetUserId, start, end);
    const rows = listPeriods(targetUserId, start, end);
    return NextResponse.json({ pay_periods: rows, user_id: targetUserId, start, end });
  }
}