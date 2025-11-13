import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { role } = await resolveSupabaseUserBySession(request, supabase);
  if (!(role === "super_admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { data, error } = await supabase
    .from("audit_logs")
    .select("id, actor_id, action, entity, payload_json, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ logs: data || [] });
}