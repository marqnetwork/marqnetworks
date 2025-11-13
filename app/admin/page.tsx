import { AttendanceEvent, readAttendance } from "../lib/attendanceStore";
import { getSupabaseServerClient, AttendanceEventRow } from "../lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import './style.css';

// Load attendance from Supabase if configured, otherwise fallback to local JSON
async function getAttendance(): Promise<{ events: AttendanceEvent[]; usingSupabase: boolean }> {
  let client: SupabaseClient | null = null;
  try {
    client = getSupabaseServerClient();
  } catch {
    client = null;
  }
  if (client) {
    const { data, error } = await client
      .from('attendance_events')
      .select('*')
      .order('timestamp', { ascending: true });
    if (!error && data) {
      const events: AttendanceEvent[] = data.map((r) => ({
        id: r.id,
        userName: r.user_name,
        type: r.type,
        timestamp: r.timestamp,
        metadata: r.metadata || {},
      }));
      return { events, usingSupabase: true };
    }
  }
  const local = readAttendance();
  return { events: local.events, usingSupabase: false };
}

type UserStatus = 'idle' | 'working' | 'on_break';

function computeStatus(events: AttendanceEvent[]) {
  const byUser: Record<string, AttendanceEvent[]> = {};
  for (const e of events) {
    byUser[e.userName] ||= [];
    byUser[e.userName].push(e);
  }
  const users: Array<{
    userName: string;
    status: UserStatus;
    lastActive: string;
    breaksTodayMinutes: number;
    pingsToday: number;
    snapshotsToday: number;
  }> = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfDay = today.getTime();

  for (const [userName, list] of Object.entries(byUser)) {
    list.sort((a, b) => a.timestamp - b.timestamp);
    let status: UserStatus = 'idle';
    let lastActiveTs = 0;
    let pingsToday = 0;
    let snapshotsToday = 0;
    let breaksTodayMinutes = 0;
    let lastBreakStart: number | null = null;

    for (const e of list) {
      if (e.timestamp > lastActiveTs) lastActiveTs = e.timestamp;
      if (e.type === 'check_in') status = 'working';
      if (e.type === 'break_start') status = 'on_break', lastBreakStart = e.timestamp;
      if (e.type === 'break_end') {
        status = 'working';
        if (lastBreakStart && e.timestamp >= startOfDay) {
          breaksTodayMinutes += Math.round((e.timestamp - Math.max(lastBreakStart, startOfDay)) / 60000);
        }
        lastBreakStart = null;
      }
      if (e.type === 'check_out') status = 'idle';
      if (e.type === 'activity_ping' && e.timestamp >= startOfDay) pingsToday += 1;
      if (e.type === 'snapshot' && e.timestamp >= startOfDay) snapshotsToday += 1;
    }

    users.push({
      userName,
      status,
      lastActive: new Date(lastActiveTs).toLocaleString(),
      breaksTodayMinutes,
      pingsToday,
      snapshotsToday,
    });
  }
  users.sort((a, b) => a.userName.localeCompare(b.userName));
  return users;
}

export default async function AdminPage() {
  const data = await getAttendance();
  const users = computeStatus(data.events);
  const total = users.length;
  const working = users.filter(u => u.status === 'working').length;
  const onBreak = users.filter(u => u.status === 'on_break').length;
  const idle = users.filter(u => u.status === 'idle').length;
  const snapshotsToday = users.reduce((acc, u) => acc + u.snapshotsToday, 0);

  function badge(status: typeof users[number]['status']) {
    if (status === 'working') return <span className="adm-badge green">Working</span>;
    if (status === 'on_break') return <span className="adm-badge amber">On Break</span>;
    return <span className="adm-badge gray">Idle</span>;
  }

  return (
    <div className="admin-wrap">
      <section className="admin-hero">
        <div className="tag-pill">Admin</div>
        <h1 className="admin-title">Workforce Monitoring Dashboard</h1>
        <p className="admin-sub">A high-level view of employee activity, breaks, and snapshots.</p>
        <div className="admin-note">
          {data.usingSupabase
            ? 'Data is loaded from Supabase (attendance_events table).'
            : 'Data uses a local dummy JSON source (fallback).'}
        </div>
      </section>

      <section className="admin-metrics">
        <div className="metric-card">
          <div className="metric-label">Total Employees</div>
          <div className="metric-value">{total}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Working</div>
          <div className="metric-value green">{working}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">On Break</div>
          <div className="metric-value amber">{onBreak}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Idle</div>
          <div className="metric-value gray">{idle}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Snapshots Today</div>
          <div className="metric-value blue">{snapshotsToday}</div>
        </div>
      </section>

      <section className="admin-actions">
        <div className="adm-actions-bar">
          <a href="/admin/payroll" className="adm-action-link">Payroll</a>
          <a href="/admin/settings" className="adm-action-link">Settings</a>
          <a href="/admin/agents" className="adm-action-link">Agents</a>
          <a href="/employee/reports" className="adm-action-link">Employee Reports</a>
        </div>
      </section>

      <section className="admin-grid">
        {users.map((u) => (
          <div className="adm-card" key={u.userName}>
            <div className="adm-card-head">
              <div className="adm-user">{u.userName}</div>
              {badge(u.status)}
            </div>
            <div className="adm-card-body">
              <div className="adm-row">
                <span className="adm-label">Last Active</span>
                <span className="adm-value">{u.lastActive}</span>
              </div>
              <div className="adm-row">
                <span className="adm-label">Breaks Today</span>
                <span className="adm-value">{u.breaksTodayMinutes} min</span>
              </div>
              <div className="adm-row">
                <span className="adm-label">Activity Pings</span>
                <span className="adm-value">{u.pingsToday}</span>
              </div>
              <div className="adm-row">
                <span className="adm-label">Snapshots</span>
                <span className="adm-value">{u.snapshotsToday}</span>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="adm-empty">No employees found in the dummy dataset.</div>
        )}
      </section>

      <div className="admin-footer-note">
        Tip: Snapshot images are saved under <code>/public/uploads</code> and served from <code>/uploads</code>.
      </div>
    </div>
  );
}