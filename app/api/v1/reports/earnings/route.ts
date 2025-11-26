import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { user, role } = await resolveSupabaseUserBySession();
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  const targetUserId = url.searchParams.get("user_id") || user.id;
  if (!start || !end) {
    return NextResponse.json({ error: "start and end query params required (YYYY-MM-DD)" }, { status: 400 });
  }
  if (targetUserId !== user.id && role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { data, error } = await supabase
      .from("pay_periods")
      .select("id,user_id,period_start,period_end,eligible_amount,override_amount,final_payable,status")
      .eq("user_id", targetUserId)
      .gte("period_start", start)
      .lte("period_end", end);
    if (error) throw error;
    const total = Number(((data || []).reduce((acc: number, r: any) => acc + (r.final_payable || 0), 0)).toFixed(2));
    return NextResponse.json({ user_id: targetUserId, start, end, total_earnings: total, periods: data || [] });
  } catch (e: any) {
    console.error("earnings report error", e);
    return NextResponse.json({ error: e.message || "Failed to fetch earnings" }, { status: 500 });
  }
}
