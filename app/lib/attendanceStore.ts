import fs from "fs";
import path from "path";

export type AttendanceEventType =
  | "check_in"
  | "check_out"
  | "break_start"
  | "break_end"
  | "activity_ping"
  | "snapshot"
  | "idle_start"
  | "idle_end";

export interface AttendanceEvent {
  id: string;
  userName: string;
  type: AttendanceEventType;
  timestamp: number; // ms epoch
  metadata?: Record<string, any>;
}

export interface AttendanceData {
  events: AttendanceEvent[];
}

function resolveWritableDir(preferred: string) {
  try {
    if (!fs.existsSync(preferred)) fs.mkdirSync(preferred, { recursive: true });
    const test = path.join(preferred, ".write-test");
    fs.writeFileSync(test, "ok");
    fs.unlinkSync(test);
    return preferred;
  } catch {
    const alt = path.join("/tmp", "marq-data");
    try {
      if (!fs.existsSync(alt)) fs.mkdirSync(alt, { recursive: true });
      return alt;
    } catch {
      return preferred;
    }
  }
}
const dataDir = resolveWritableDir(path.join(process.cwd(), "data"));
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const dataPath = path.join(dataDir, "attendance.json");

export function ensureDataDirs() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(dataPath)) {
      const initial: AttendanceData = { events: [] };
      fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2), "utf-8");
    }
  } catch {}
}

export function readAttendance(): AttendanceData {
  ensureDataDirs();
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

export function appendEvent(event: AttendanceEvent): AttendanceData {
  ensureDataDirs();
  const current = readAttendance();
  current.events.push(event);
  try { fs.writeFileSync(dataPath, JSON.stringify(current, null, 2), "utf-8"); } catch {}
  return current;
}

export function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}