import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  try {
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
    if (start) query = query.gte("period_start", start);
    if (end) query = query.lte("period_end", end);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ pay_periods: data || [], user_id: targetUserId, start, end });
  } catch (e: any) {
    console.error("payroll list error", e);
    return NextResponse.json({ error: e.message || "Failed to fetch pay periods" }, { status: 500 });
  }
}