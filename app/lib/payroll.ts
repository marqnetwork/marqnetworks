import { SupabaseClient } from "@supabase/supabase-js";

export type PayrollSettings = {
  user_id: string;
  salary_type: "monthly" | "hourly";
  monthly_salary: number;
  salary_currency: string;
  hours_per_day: number;
  workdays: number[]; // 0=Sun..6=Sat
  effective_from: string; // date
};

export function countWorkdaysBetween(start: Date, end: Date, dows: number[]): number {
  let d = new Date(start);
  let cnt = 0;
  while (d <= end) {
    const dow = d.getDay();
    if (dows.includes(dow)) cnt++;
    d.setDate(d.getDate() + 1);
  }
  return cnt;
}

export function diffHours(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / 3600000;
}

export async function getApprovedActualHours(
  supabase: SupabaseClient,
  user_id: string,
  period_start: Date,
  period_end: Date
): Promise<number> {
  const { data, error } = await supabase
    .from("time_entries")
    .select("start_time, end_time, duration")
    .eq("user_id", user_id)
    .eq("approved", true)
    .gte("start_time", period_start.toISOString())
    .lte("end_time", period_end.toISOString());
  if (error) throw error;
  let hours = 0;
  (data || []).forEach((row: any) => {
    if (row.duration) {
      hours += row.duration / 3600; // seconds to hours
    } else if (row.start_time && row.end_time) {
      hours += diffHours(new Date(row.start_time), new Date(row.end_time));
    }
  });
  return Number(hours.toFixed(2));
}

export function computeHourlyRate(settings: PayrollSettings, workdaysInMonth: number): number {
  const denom = settings.hours_per_day * workdaysInMonth;
  if (!denom || denom <= 0) return 0;
  return Number((settings.monthly_salary / denom).toFixed(4));
}

export async function loadPayrollSettings(
  supabase: SupabaseClient,
  user_id: string
): Promise<PayrollSettings | null> {
  const { data, error } = await supabase
    .from("payroll_settings")
    .select("user_id, salary_type, monthly_salary, salary_currency, hours_per_day, workdays, effective_from")
    .eq("user_id", user_id)
    .maybeSingle();
  if (error) throw error;
  return data as PayrollSettings | null;
}

export function clampEligibleHours(actual: number, scheduled: number): number {
  return Math.min(actual, scheduled);
}