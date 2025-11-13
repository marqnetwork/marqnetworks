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
  const { time_entry_id, image_base64, blurred } = body;
  if (!image_base64) return NextResponse.json({ error: "image_base64 required" }, { status: 400 });
  try {
    const bucket = "agent-screenshots";
    const bytes = Buffer.from(image_base64, "base64");
    const ts = Date.now();
    const path = `${payload.sub}/${time_entry_id || "no_entry"}/${ts}.jpg`;
    const { data: up, error: upErr } = await supabase.storage.from(bucket).upload(path, bytes, { contentType: "image/jpeg" });
    if (upErr) throw upErr;
    const { data: url } = await supabase.storage.from(bucket).getPublicUrl(up.path);
    const file_url = url.publicUrl;
    const { error: insErr } = await supabase
      .from("desktop_screenshots")
      .insert({ user_id: payload.sub, time_entry_id: time_entry_id || null, file_url, blurred: !!blurred });
    if (insErr) throw insErr;
    return NextResponse.json({ file_url });
  } catch (e: any) {
    console.error("screenshot error", e);
    return NextResponse.json({ error: e.message || "Failed to upload screenshot" }, { status: 500 });
  }
}