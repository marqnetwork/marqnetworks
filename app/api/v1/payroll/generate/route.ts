import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";
import { auditLog } from "../../../../lib/audit";
import {
  loadPayrollSettings,
  countWorkdaysBetween,
  getApprovedActualHours,
  computeHourlyRate,
  clampEligibleHours,
} from "../../../../lib/payroll";

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { user, role } = await resolveSupabaseUserBySession(request, supabase);
  const body = await request.json().catch(() => ({}));
  const { period_start, period_end, user_id } = body;

  if (!period_start || !period_end) {
    return NextResponse.json({ error: "period_start and period_end are required (YYYY-MM-DD)" }, { status: 400 });
  }

  const targetUserId = user_id || user.id;
  const start = new Date(period_start);
  const end = new Date(period_end);

  try {
    const settings = await loadPayrollSettings(supabase, targetUserId);
    if (!settings) {
      return NextResponse.json({ error: "No payroll settings found for user" }, { status: 404 });
    }

    const workdaysInPeriod = countWorkdaysBetween(start, end, settings.workdays);
    const scheduledHours = Number((settings.hours_per_day * workdaysInPeriod).toFixed(2));
    const actualHours = await getApprovedActualHours(supabase, targetUserId, start, end);
    const hourlyRate = computeHourlyRate(settings, workdaysInPeriod);
    const eligibleHours = clampEligibleHours(actualHours, scheduledHours);
    const eligibleAmount = Number((eligibleHours * hourlyRate).toFixed(2));

    // Upsert pay_period
    const upsertPayload = {
      user_id: targetUserId,
      period_start,
      period_end,
      scheduled_hours: scheduledHours,
      actual_hours: actualHours,
      hourly_rate: hourlyRate,
      eligible_amount: eligibleAmount,
      final_payable: eligibleAmount,
      status: "pending",
    };

    const { data: periodRow, error: upsertErr } = await supabase
      .from("pay_periods")
      .upsert(upsertPayload, { onConflict: "user_id,period_start,period_end" })
      .select("*")
      .maybeSingle();
    if (upsertErr) throw upsertErr;

    await auditLog(request, "payroll_generate", "pay_periods", { period_id: periodRow?.id, payload: upsertPayload });
    return NextResponse.json({ pay_period: periodRow });
  } catch (e: any) {
    console.error("payroll generate error", e);
    return NextResponse.json({ error: e.message || "Failed to generate payroll" }, { status: 500 });
  }
}