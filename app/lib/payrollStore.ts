import fs from "fs";
import path from "path";
import { readAttendance, AttendanceEvent } from "./attendanceStore";
import { listUsers } from "./authStore";

export type PayStatus = "pending" | "approved" | "paid";

export interface PayPeriodRow {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  scheduled_hours: number;
  actual_hours: number;
  hourly_rate: number | null;
  eligible_amount: number | null;
  override_amount?: number | null;
  final_payable: number | null;
  status: PayStatus;
}

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "pay_periods.json");
const settingsPath = path.join(dataDir, "settings.json");

function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ pay_periods: [] }, null, 2), "utf-8");
  if (!fs.existsSync(settingsPath)) fs.writeFileSync(settingsPath, JSON.stringify({ settings: [] }, null, 2), "utf-8");
}

function readAll(): { pay_periods: PayPeriodRow[] } {
  ensure();
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeAll(data: { pay_periods: PayPeriodRow[] }) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function msToHours(ms: number): number {
  return Number((ms / 3600000).toFixed(2));
}

function readSettings(): { settings: { key: string; value: any }[] } {
  ensure();
  const raw = fs.readFileSync(settingsPath, "utf-8");
  return JSON.parse(raw);
}

function getUserPayrollConfig(user_id: string) {
  const data = readSettings();
  const map = new Map<string, any>();
  for (const s of data.settings || []) map.set(s.key, s.value);
  const ms = Number(map.get(`payroll_${user_id}_monthly_salary`) || 50000);
  const hpd = Number(map.get(`payroll_${user_id}_hours_per_day`) || 8);
  const wpm = Number(map.get(`payroll_${user_id}_workdays_per_month`) || 26);
  return { monthly_salary: ms, hours_per_day: hpd, workdays_per_month: wpm };
}

function computeActualHours(user_id: string, start: Date, end: Date): number {
  const users = listUsers();
  const u = users.find(x => x.id === user_id);
  if (!u) return 0;
  const name = u.userName;
  const all = readAttendance().events
    .filter(e => e.userName === name && e.timestamp >= start.getTime() && e.timestamp <= end.getTime())
    .sort((a, b) => a.timestamp - b.timestamp);
  let hours = 0;
  let ci: AttendanceEvent | null = null;
  let brk: AttendanceEvent | null = null;
  let breakMs = 0;
  for (const ev of all) {
    if (ev.type === "check_in") {
      ci = ev; breakMs = 0; brk = null;
    } else if (ev.type === "break_start") {
      if (ci && !brk) brk = ev;
    } else if (ev.type === "break_end") {
      if (ci && brk) { breakMs += Math.max(0, ev.timestamp - brk.timestamp); brk = null; }
    } else if (ev.type === "check_out") {
      if (ci) {
        const span = Math.max(0, ev.timestamp - ci.timestamp);
        const work = Math.max(0, span - breakMs);
        hours += msToHours(work);
        ci = null; brk = null; breakMs = 0;
      }
    }
  }
  return Number(hours.toFixed(2));
}

function countDays(start: Date, end: Date): number {
  let d = new Date(start);
  let cnt = 0;
  while (d <= end) { cnt++; d.setDate(d.getDate() + 1); }
  return cnt;
}

export function upsertPeriod(user_id: string, period_start: string, period_end: string): PayPeriodRow {
  const start = new Date(period_start);
  const end = new Date(period_end);
  const actual = computeActualHours(user_id, start, end);
  const cfg = getUserPayrollConfig(user_id);
  const scheduled = countDays(start, end) * cfg.hours_per_day;
  const denom = cfg.hours_per_day * cfg.workdays_per_month;
  const hourly = denom > 0 ? Number((cfg.monthly_salary / denom).toFixed(4)) : 0;
  const eligible = Number((actual * hourly).toFixed(2));
  const final = eligible;
  const data = readAll();
  const key = `${user_id}_${period_start}_${period_end}`;
  let row = data.pay_periods.find(x => x.id === key);
  if (!row) {
    row = { id: key, user_id, period_start, period_end, scheduled_hours: scheduled, actual_hours: actual, hourly_rate: hourly, eligible_amount: eligible, override_amount: null, final_payable: final, status: "pending" };
    data.pay_periods.push(row);
  } else {
    row.scheduled_hours = scheduled;
    row.actual_hours = actual;
    row.hourly_rate = hourly;
    row.eligible_amount = eligible;
    row.final_payable = final;
  }
  writeAll(data);
  return row;
}

export function listPeriods(user_id: string, start?: string | null, end?: string | null): PayPeriodRow[] {
  ensure();
  const data = readAll();
  let items = data.pay_periods.filter(x => x.user_id === user_id);
  if (start) items = items.filter(x => x.period_start >= start);
  if (end) items = items.filter(x => x.period_end <= end);
  items.sort((a, b) => (a.period_start < b.period_start ? 1 : -1));
  return items;
}

export function updateStatus(id: string, status: PayStatus): PayPeriodRow | null {
  const data = readAll();
  const row = data.pay_periods.find(x => x.id === id) || null;
  if (!row) return null;
  row.status = status;
  writeAll(data);
  return row;
}