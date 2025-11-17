import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";
import { toCSV } from "../../../../lib/csv";
import { cookies } from "next/headers";
import { getSession } from "../../../../lib/authStore";
import { listPeriods } from "../../../../lib/payrollStore";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  if (!start || !end) {
    return NextResponse.json({ error: "start and end query params required (YYYY-MM-DD)" }, { status: 400 });
  }
  try {
    const supabase = getSupabaseAdminClient();
    const { role } = await resolveSupabaseUserBySession(request, supabase);
    if (!(role === "super_admin" || role === "team_manager")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { data, error } = await supabase
      .from("pay_periods")
      .select("id,user_id,period_start,period_end,scheduled_hours,actual_hours,hourly_rate,eligible_amount,override_amount,final_payable,status")
      .gte("period_start", start)
      .lte("period_end", end);
    if (error) throw error;
    const csv = toCSV(data || []);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=payroll_${start}_${end}.csv`,
      },
    });
  } catch {
    const cookieStore = await cookies();
    const sid = cookieStore.get("session_id")?.value || "";
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const rows = listPeriods(ses.userId, start, end);
    const csv = toCSV(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=payroll_${start}_${end}.csv`,
      },
    });
  }
}