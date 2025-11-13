"use client";
import { useEffect, useState, useMemo } from "react";
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

      <section className="admin-metrics">
        <div className="metric-card"><div className="metric-label">Loaded Periods</div><div className="metric-value">{totals.count}</div></div>
        <div className="metric-card"><div className="metric-label">Approved</div><div className="metric-value green">{totals.approved}</div></div>
        <div className="metric-card"><div className="metric-label">Paid</div><div className="metric-value blue">{totals.paid}</div></div>
        <div className="metric-card"><div className="metric-label">Total Final</div><div className="metric-value">{totals.sum.toFixed(2)}</div></div>
      </section>

      <section className="admin-actions">
        <div className="adm-actions-bar">
          <div>
            <div className="metric-label">Start (YYYY-MM-DD)</div>
            <input className="adm-input" value={start} onChange={e => setStart(e.target.value)} placeholder="2025-01-01" />
          </div>
          <div>
            <div className="metric-label">End (YYYY-MM-DD)</div>
            <input className="adm-input" value={end} onChange={e => setEnd(e.target.value)} placeholder="2025-01-31" />
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