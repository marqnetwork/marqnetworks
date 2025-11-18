"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import "../style.css";

type PayPeriod = {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  scheduled_hours: number | null;
  actual_hours: number | null;
  hourly_rate: number | null;
  eligible_amount: number | null;
  override_amount: number | null;
  final_payable: number | null;
  status: string;
};

export default function AdminPayrollPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [userId, setUserId] = useState("");
  const [rows, setRows] = useState<PayPeriod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("8");
  const [workdaysPerMonth, setWorkdaysPerMonth] = useState<string>("26");
  const [userName, setUserName] = useState<string>("");
  const [todayHours, setTodayHours] = useState<number>(0);
  const [weekHours, setWeekHours] = useState<number>(0);
  const [monthHours, setMonthHours] = useState<number>(0);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (start) qs.set("start", start);
      if (end) qs.set("end", end);
      if (userId) qs.set("user_id", userId);
      const res = await fetch(`/api/v1/payroll?${qs.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setRows(json.pay_periods || []);
      await loadSettings();
      await loadAggregates();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Optionally auto-load current pay periods
  }, []);

  async function approve(id: string) {
    setError(null);
    try {
      const res = await fetch(`/api/v1/payroll/${id}/approve`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Approve failed");
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function markPaid(id: string) {
    setError(null);
    try {
      const res = await fetch(`/api/v1/payroll/${id}/mark-paid`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Mark paid failed");
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function exportCsv() {
    try {
      const qs = new URLSearchParams();
      if (start) qs.set("start", start);
      if (end) qs.set("end", end);
      const res = await fetch(`/api/v1/payroll/export?${qs.toString()}`);
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Export failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payroll_${start}_${end}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert((e as any).message || "Failed to export");
    }
  }

  async function loadSettings() {
    try {
      const res = await fetch("/api/v1/settings");
      const json = await res.json();
      const list: Array<{ key: string; value: any }> = json.settings || [];
      const ms = list.find(s => s.key === `payroll_${userId}_monthly_salary`);
      const hpd = list.find(s => s.key === `payroll_${userId}_hours_per_day`);
      const wpm = list.find(s => s.key === `payroll_${userId}_workdays_per_month`);
      setMonthlySalary(ms ? String(ms.value) : monthlySalary || "50000");
      setHoursPerDay(hpd ? String(hpd.value) : hoursPerDay || "8");
      setWorkdaysPerMonth(wpm ? String(wpm.value) : workdaysPerMonth || "26");
    } catch {}
  }

  async function saveSettings() {
    setError(null);
    try {
      if (!userId) throw new Error("Enter User ID");
      const entries = [
        { key: `payroll_${userId}_monthly_salary`, value: Number(monthlySalary || 0) },
        { key: `payroll_${userId}_hours_per_day`, value: Number(hoursPerDay || 0) },
        { key: `payroll_${userId}_workdays_per_month`, value: Number(workdaysPerMonth || 0) },
      ];
      for (const e of entries) {
        await fetch("/api/v1/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e) });
      }
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  function computeHours(events: Array<{ id: string; userName: string; type: string; timestamp: number }>, from: Date, to: Date): number {
    const list = events.filter(e => e.timestamp >= from.getTime() && e.timestamp <= to.getTime()).sort((a,b) => a.timestamp - b.timestamp);
    let h = 0;
    let ci: any = null;
    let brk: any = null;
    let breakMs = 0;
    for (const ev of list) {
      if (ev.type === "check_in") { ci = ev; breakMs = 0; brk = null; }
      else if (ev.type === "break_start") { if (ci && !brk) brk = ev; }
      else if (ev.type === "break_end") { if (ci && brk) { breakMs += Math.max(0, ev.timestamp - brk.timestamp); brk = null; } }
      else if (ev.type === "check_out") { if (ci) { const span = Math.max(0, ev.timestamp - ci.timestamp); const work = Math.max(0, span - breakMs); h += Number((work / 3600000).toFixed(2)); ci = null; brk = null; breakMs = 0; } }
    }
    return Number(h.toFixed(2));
  }

  async function loadAggregates() {
    try {
      let name = userName;
      if (!name) {
        if (userId) {
          const resUsers = await fetch('/api/admin/users');
          const jsonUsers = await resUsers.json();
          const u = (jsonUsers.users || []).find((x: any) => x.id === userId);
          name = u?.userName || '';
        } else {
          const resSes = await fetch('/api/auth/session');
          const jsonSes = await resSes.json();
          name = jsonSes?.user?.userName || '';
        }
        setUserName(name);
      }
      const res = await fetch('/api/attendance');
      const json = await res.json();
      const events: Array<{ id: string; userName: string; type: string; timestamp: number }> = (json.events || []).filter((e: any) => e.userName === name);
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - ((now.getDay()+6)%7)); startOfWeek.setHours(0,0,0,0);
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      setTodayHours(computeHours(events, startOfDay, now));
      setWeekHours(computeHours(events, startOfWeek, now));
      setMonthHours(computeHours(events, startOfMonth, now));
    } catch {}
  }

  const totals = useMemo(() => {
    const count = rows.length;
    const approved = rows.filter(r => r.status === 'approved').length;
    const paid = rows.filter(r => r.status === 'paid').length;
    const sum = rows.reduce((acc, r) => acc + (r.final_payable || 0), 0);
    return { count, approved, paid, sum };
  }, [rows]);

  function statusBadge(s: string) {
    const cls = s === 'approved' ? 'badge approved' : s === 'paid' ? 'badge paid' : 'badge pending';
    return <span className={cls}>{s}</span>;
  }

  return (
    <div className="admin-wrap">
      <section className="admin-hero">
        <div className="tag-pill">Admin · Payroll</div>
        <h1 className="admin-title">Payroll Periods</h1>
        <p className="admin-sub">Filter, approve, mark paid, and export CSV.</p>
      </section>

      <section className="admin-actions" style={{ marginTop: 12 }}>
        <div className="adm-actions-bar">
          <div>
            <div className="metric-label">Monthly Salary</div>
            <input className="adm-input" value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} placeholder="50000" />
          </div>
          <div>
            <div className="metric-label">Hours per Day</div>
            <input className="adm-input" value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} placeholder="8" />
          </div>
          <div>
            <div className="metric-label">Workdays per Month</div>
            <input className="adm-input" value={workdaysPerMonth} onChange={e => setWorkdaysPerMonth(e.target.value)} placeholder="26" />
          </div>
          <button className="adm-btn primary" onClick={saveSettings} disabled={!userId}>Save Settings</button>
        </div>
      </section>

      <section className="admin-metrics">
        <div className="metric-card"><div className="metric-label">Loaded Periods</div><div className="metric-value">{totals.count}</div></div>
        <div className="metric-card"><div className="metric-label">Approved</div><div className="metric-value green">{totals.approved}</div></div>
        <div className="metric-card"><div className="metric-label">Paid</div><div className="metric-value blue">{totals.paid}</div></div>
        <div className="metric-card"><div className="metric-label">Total Final</div><div className="metric-value">{totals.sum.toFixed(2)}</div></div>
        <div className="metric-card"><div className="metric-label">Hours Today</div><div className="metric-value">{todayHours.toFixed(2)}</div></div>
        <div className="metric-card"><div className="metric-label">Hours This Week</div><div className="metric-value">{weekHours.toFixed(2)}</div></div>
        <div className="metric-card"><div className="metric-label">Hours This Month</div><div className="metric-value">{monthHours.toFixed(2)}</div></div>
      </section>

      <section className="admin-actions">
        <div className="adm-actions-bar">
          <div>
            <div className="metric-label">Start</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="date" ref={startRef} className="adm-input" value={start} onChange={e => setStart(e.target.value)} onClick={e => (e.target as any).showPicker?.()} />
              <button className="adm-btn" onClick={() => startRef.current && (startRef.current as any).showPicker?.()}>📅</button>
            </div>
          </div>
          <div>
            <div className="metric-label">End</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="date" ref={endRef} className="adm-input" value={end} onChange={e => setEnd(e.target.value)} onClick={e => (e.target as any).showPicker?.()} />
              <button className="adm-btn" onClick={() => endRef.current && (endRef.current as any).showPicker?.()}>📅</button>
            </div>
          </div>
          <div>
            <div className="metric-label">User ID (optional)</div>
            <input className="adm-input" value={userId} onChange={e => setUserId(e.target.value)} placeholder="uuid" />
          </div>
          <button className="adm-btn" onClick={load}>Load</button>
          <button className="adm-btn primary" onClick={exportCsv} disabled={!start || !end}>Export CSV</button>
        </div>
      </section>

      {error && <div style={{ color: '#ff8a8a', marginTop: 12 }}>{error}</div>}

      <section style={{ marginTop: 16 }}>
        <div className="overflow-auto">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Hours (sched/actual)</th>
                <th>Rate</th>
                <th>Eligible</th>
                <th>Override</th>
                <th>Final</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.period_start} → {r.period_end}</td>
                  <td>{r.scheduled_hours ?? 0} / {r.actual_hours ?? 0}</td>
                  <td>{r.hourly_rate ?? 0}</td>
                  <td>{r.eligible_amount ?? 0}</td>
                  <td>{r.override_amount ?? 0}</td>
                  <td style={{ fontWeight: 600 }}>{r.final_payable ?? 0}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="adm-btn" onClick={() => approve(r.id)} disabled={r.status === 'approved' || r.status === 'paid'}>Approve</button>
                      <button className="adm-btn warn" onClick={() => markPaid(r.id)} disabled={r.status !== 'approved'}>Mark Paid</button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ color: '#9aa3b2', padding: 18 }}>No pay periods loaded. Set a range and click Load.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}