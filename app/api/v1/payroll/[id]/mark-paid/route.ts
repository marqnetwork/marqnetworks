import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../../lib/supabaseAuthBridge";
import { auditLog } from "../../../../../lib/audit";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseAdminClient();
  const { role } = await resolveSupabaseUserBySession(request, supabase);
  if (!(role === "super_admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { data: updated, error } = await supabase
      .from("pay_periods")
      .update({ status: "paid" })
      .eq("id", params.id)
      .select("*")
      .maybeSingle();
    if (error || !updated) return NextResponse.json({ error: "Update failed" }, { status: 500 });
    await auditLog(request, "payroll_mark_paid", "pay_periods", { period_id: params.id });
    return NextResponse.json({ pay_period: updated });
  } catch (e: any) {
    console.error("mark-paid error", e);
    return NextResponse.json({ error: e.message || "Failed to mark as paid" }, { status: 500 });
  }
}