import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { verifyHS256 } from "../../../../lib/jwt";

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.substring(7) : "";
  const secret = process.env.AGENT_JWT_SECRET || "";
  if (!token || !secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { valid, payload } = verifyHS256(token, secret);
  if (!valid || !payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const { time_entry_id, app_name, window_title, idle } = body;
  try {
    const insert = {
      user_id: payload.sub,
      time_entry_id: time_entry_id || null,
      app_name: app_name || null,
      window_title: window_title || null,
      idle: !!idle,
    };
    const { error } = await supabase.from("app_heartbeats").insert(insert);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("heartbeat error", e);
    return NextResponse.json({ error: e.message || "Failed to record" }, { status: 500 });
  }
}