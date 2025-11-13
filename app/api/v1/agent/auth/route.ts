import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../../../lib/supabaseAuthBridge";
import { signHS256 } from "../../../../lib/jwt";

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { user } = await resolveSupabaseUserBySession(request, supabase);
  const body = await request.json().catch(() => ({}));
  const { device_id, os, version } = body;
  if (!device_id) return NextResponse.json({ error: "device_id required" }, { status: 400 });
  const secret = process.env.AGENT_JWT_SECRET;
  if (!secret) return NextResponse.json({ error: "AGENT_JWT_SECRET not configured" }, { status: 500 });
  try {
    // upsert device
    await supabase
      .from("agent_devices")
      .upsert({ user_id: user.id, device_id, os: os || null, version: version || null, last_seen_at: new Date().toISOString() }, { onConflict: "user_id,device_id" });

    const token = signHS256({ sub: user.id, device_id }, secret, 3600); // 1 hour
    return NextResponse.json({ token, expires_in: 3600 });
  } catch (e: any) {
    console.error("agent auth error", e);
    return NextResponse.json({ error: e.message || "Failed to issue token" }, { status: 500 });
  }
}