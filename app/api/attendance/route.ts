import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  appendEvent,
  readAttendance,
  makeId,
  AttendanceEventType,
  AttendanceEvent,
} from "../../lib/attendanceStore";
import { getSupabaseServerClient, AttendanceEventRow } from "../../lib/supabase";

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
    // Fallback to local JSON
    const local = readAttendance();
    return NextResponse.json({ events: local.events, source: "local" }, { status: 200 });
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
      client = getSupabaseServerClient();
    } catch {
      client = null;
    }
    if (client) {
      if (event.type === "idle_start" || event.type === "idle_end") {
        const updated = appendEvent(event);
        return NextResponse.json({ ok: true, event, count: updated.events.length }, { status: 201 });
      }
      const row: AttendanceEventRow = {
        id: event.id,
        user_name: event.userName,
        type: event.type,
        timestamp: event.timestamp,
        metadata: event.metadata || null,
      };
      const { error } = await client.from("attendance_events").insert(row);
      if (error) throw error;
      return NextResponse.json({ ok: true, event }, { status: 201 });
    }
    // Fallback to local JSON
    const updated = appendEvent(event);
    return NextResponse.json({ ok: true, event, count: updated.events.length }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to append" }, { status: 500 });
  }
}