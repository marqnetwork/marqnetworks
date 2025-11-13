import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../lib/supabaseAuthBridge";

export async function GET(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { role } = await resolveSupabaseUserBySession(request, supabase);
  if (!(role === "super_admin" || role === "team_manager")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { data, error } = await supabase.from("settings").select("key, value, updated_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ settings: data || [] });
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { role } = await resolveSupabaseUserBySession(request, supabase);
  if (!(role === "super_admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "JSON body required: { key, value }" }, { status: 400 });
  }
  const { key, value } = body;
  if (!key) return NextResponse.json({ error: "key is required" }, { status: 400 });
  const { data, error } = await supabase
    .from("settings")
    .upsert({ key, value })
    .select("*")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ setting: data });
}