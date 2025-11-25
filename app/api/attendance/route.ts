import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  appendEvent,
  readAttendance,
  makeId,
  AttendanceEventType,
  AttendanceEvent,
} from "../../lib/attendanceStore";
import { getSupabaseServerClient, AttendanceEventRow, getSupabaseAdminClient } from "../../lib/supabase";
import { resolveSupabaseUserBySession } from "../../lib/supabaseAuthBridge";

const allowedTypes: AttendanceEventType[] = [
  "check_in",
  "check_out",
  "break_start",
  "break_end",
  "activity_ping",
  "snapshot",
  "idle_start",
  "idle_end",
];

export async function GET() {
  try {
    let client: SupabaseClient | null = null;
    try {
      client = getSupabaseServerClient();
    } catch {
      client = null;
    }
    if (client) {
      const { data, error } = await client
        .from("attendance_events")
        .select("*")
        .order("timestamp", { ascending: true });
      if (!error && data) {
        const events: AttendanceEvent[] = (data || []).map((r) => ({
          id: r.id,
          userName: r.user_name,
          type: r.type,
          timestamp: r.timestamp,
          metadata: r.metadata || {},
        }));
        return NextResponse.json({ events, source: "supabase" }, { status: 200 });
      }
    }
    return NextResponse.json({ events: [], source: "supabase_unavailable" }, { status: 503 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to read" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userName = (body?.userName || "").trim();
    const type: AttendanceEventType = body?.type;
    const metadata = body?.metadata ?? {};

    if (!userName) {
      return NextResponse.json({ error: "userName is required" }, { status: 400 });
    }
    if (!allowedTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const event: AttendanceEvent = {
      id: makeId(),
      userName,
      type,
      timestamp: Date.now(),
      metadata,
    };

    let client: SupabaseClient | null = null;
    try {
      client = getSupabaseAdminClient();
    } catch {
      client = null;
    }
    if (client) {
      let supaUserId: string | null = null;
      try {
        const { user } = await resolveSupabaseUserBySession();
        supaUserId = user.id;
      } catch {
        return NextResponse.json({ error: "user_id_unavailable" }, { status: 401 });
      }
      const row: AttendanceEventRow = {
        id: event.id,
        user_id: supaUserId || undefined,
        user_name: event.userName,
        type: event.type,
        timestamp: event.timestamp,
        metadata: event.metadata || null,
      };
      const { error } = await client.from("attendance_events").insert(row);
      if (error) throw error;
      return NextResponse.json({ ok: true, event }, { status: 201 });
    }
    return NextResponse.json({ ok: false, error: "supabase_unavailable" }, { status: 503 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to append" }, { status: 500 });
  }
}
