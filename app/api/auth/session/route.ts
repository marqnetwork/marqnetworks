import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";

export async function GET() {
  try {
    const { user, role } = await resolveSupabaseUserBySession();
    const admin = getSupabaseAdminClient();
    const { data: emp } = await admin.from('employees').select('user_id, full_name').eq('user_id', user.id).maybeSingle();
    const userName = emp?.full_name || user.email || '';
    const hasAccount = !!emp;
    return NextResponse.json({ user: { id: user.id, userName, email: user.email, role }, has_account: hasAccount }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}