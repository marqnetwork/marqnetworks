import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../../lib/supabaseAuthBridge";
import { auditLog } from "../../../../../lib/audit";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseAdminClient();
  const { user, role } = await resolveSupabaseUserBySession();
  if (role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const { amount, reason } = body;
  if (typeof amount !== "number" || isNaN(amount)) {
    return NextResponse.json({ error: "amount (number) required" }, { status: 400 });
  }

  try {
    const payPeriodId = params.id;
    const { data: period, error: periodErr } = await supabase
      .from("pay_periods")
      .select("id, eligible_amount")
      .eq("id", payPeriodId)
      .maybeSingle();
    if (periodErr || !period) return NextResponse.json({ error: "Pay period not found" }, { status: 404 });

    // Insert override
    const { error: insertErr } = await supabase.from("salary_overrides").insert({
      pay_period_id: payPeriodId,
      decider_id: user.id,
      amount,
      reason: reason || null,
    });
    if (insertErr) throw insertErr;

    // Update pay_periods with override and final_payable
    const final = Number(amount.toFixed(2));
    const { data: updated, error: updErr } = await supabase
      .from("pay_periods")
      .update({ override_amount: final, final_payable: final })
      .eq("id", payPeriodId)
      .select("*")
      .maybeSingle();
    if (updErr) throw updErr;

    await auditLog(request, "payroll_override", "pay_periods", { period_id: payPeriodId, amount, reason });
    return NextResponse.json({ pay_period: updated });
  } catch (e: any) {
    console.error("override error", e);
    return NextResponse.json({ error: e.message || "Failed to override" }, { status: 500 });
  }
}
