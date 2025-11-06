import fs from "fs";
import path from "path";

export type AttendanceEventType =
  | "check_in"
  | "check_out"
  | "break_start"
  | "break_end"
  | "activity_ping"
  | "snapshot";

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

const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const dataPath = path.join(dataDir, "attendance.json");

export function ensureDataDirs() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(dataPath)) {
    const initial: AttendanceData = { events: [] };
    fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2), "utf-8");
  }
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
  fs.writeFileSync(dataPath, JSON.stringify(current, null, 2), "utf-8");
  return current;
}

export function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}