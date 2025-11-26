import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../../lib/supabaseAuthBridge";
import { auditLog } from "../../../../../lib/audit";
import { cookies } from "next/headers";
import { getSession } from "../../../../../lib/authStore";
import { updateStatus } from "../../../../../lib/payrollStore";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseAdminClient();
    const { role } = await resolveSupabaseUserBySession();
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { data: updated, error } = await supabase
      .from("pay_periods")
      .update({ status: "approved" })
      .eq("id", params.id)
      .select("*")
      .maybeSingle();
    if (error || !updated) return NextResponse.json({ error: "Update failed" }, { status: 500 });
    await auditLog(request, "payroll_approve", "pay_periods", { period_id: params.id });
    return NextResponse.json({ pay_period: updated });
  } catch {
    const cookieStore = await cookies();
    const sid = cookieStore.get("session_id")?.value || "";
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const row = updateStatus(params.id, "approved");
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ pay_period: row });
  }
}
