import { cookies } from 'next/headers';
import { getSession, getUserById } from '../../lib/authStore';
import { getSupabaseServerClient, AttendanceEventRow } from '../../lib/supabase';
import { readAttendance, AttendanceEvent } from '../../lib/attendanceStore';
import '../../admin/style.css';
import type { SupabaseClient } from '@supabase/supabase-js';

export default async function EmployeeReportsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value || '';
  const session = sessionId ? getSession(sessionId) : null;
  const user = session ? getUserById(session.userId) : null;
  const userName = user?.userName || '';

  let events: AttendanceEvent[] = [];
  let usingSupabase = false;
  let client: SupabaseClient | null = null;
  try {
    client = getSupabaseServerClient();
  } catch {
    client = null;
  }
  if (client && userName) {
    const { data, error } = await client
      .from('attendance_events')
      .select('*')
      .eq('user_name', userName)
      .order('timestamp', { ascending: false });
    if (!error && data) {
      events = data.map((r: any) => ({
        id: r.id,
        userName: r.user_name,
        type: r.type,
        timestamp: r.timestamp,
        metadata: r.metadata || {},
      }));
      usingSupabase = true;
    }
  }
  if (!usingSupabase) {
    const local = readAttendance();
    events = local.events.filter((e) => e.userName === userName);
  }

  const totalSnapshots = events.filter(e => e.type === 'snapshot').length;
  const totalPings = events.filter(e => e.type === 'activity_ping').length;
  const totalSessions = events.filter(e => e.type === 'check_in').length;

  // Link to API-backed reports for a recent range
  const now = new Date();
  const endStr = now.toISOString().slice(0, 10);
  const startDate = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  const startStr = startDate.toISOString().slice(0, 10);

  let apiHours: number | null = null;
  let apiEarnings: number | null = null;
  let apiIdleCount: number | null = null;
  if (user?.id) {
    try {
      const [hRes, eRes, aRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/v1/reports/hours?start=${startStr}&end=${endStr}&user_id=${user.id}`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/v1/reports/earnings?start=${startStr}&end=${endStr}&user_id=${user.id}`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/v1/reports/activity?start=${startStr}&end=${endStr}&user_id=${user.id}`),
      ]);
      const hJson = await hRes.json();
      const eJson = await eRes.json();
      const aJson = await aRes.json();
      apiHours = hRes.ok ? hJson.total_hours ?? null : null;
      apiEarnings = eRes.ok ? eJson.total_earnings ?? null : null;
      apiIdleCount = aRes.ok ? aJson.idle_count ?? null : null;
    } catch {}
  }

  return (
    <div className="admin-wrap">
      <section className="admin-hero">
        <div className="tag-pill">Employee · Reports</div>
        <h1 className="admin-title">My Activity Summary</h1>
        <p className="admin-sub">User: {userName || 'Unknown'} — Source: {usingSupabase ? 'Supabase' : 'Local JSON'}</p>
      </section>
      <section className="admin-metrics">
        <div className="metric-card"><div className="metric-label">Sessions</div><div className="metric-value">{totalSessions}</div></div>
        <div className="metric-card"><div className="metric-label">Snapshots</div><div className="metric-value blue">{totalSnapshots}</div></div>
        <div className="metric-card"><div className="metric-label">Pings</div><div className="metric-value">{totalPings}</div></div>
        <div className="metric-card"><div className="metric-label">Approved Hours (7d)</div><div className="metric-value">{apiHours ?? '—'}</div></div>
        <div className="metric-card"><div className="metric-label">Total Earnings (7d)</div><div className="metric-value">{apiEarnings ?? '—'}</div></div>
        <div className="metric-card"><div className="metric-label">Idle Heartbeats (7d)</div><div className="metric-value">{apiIdleCount ?? '—'}</div></div>
      </section>
      <section style={{ marginTop: 16 }}>
        <div className="adm-card">
          <div className="adm-card-head">
            <div className="adm-user">Timeline</div>
          </div>
          <div className="adm-card-body">
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              {events.map((e) => (
                <div key={e.id} style={{ color: '#aab2c0', fontSize: 13 }}>
                  [{new Date(e.timestamp).toLocaleString()}] {e.type}
                  {e.type === 'snapshot' && e.metadata?.url ? (
                    <> — <a href={e.metadata.url} target="_blank" rel="noreferrer" style={{ color: '#9ad0ff' }}>view</a></>
                  ) : null}
                </div>
              ))}
              {events.length === 0 && (
                <div style={{ color: '#9aa3b2' }}>No events found.</div>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="admin-footer-note" style={{ marginTop: 12 }}>
        <a href="/employee" style={{ color: '#9ad0ff' }}>Back to Employee</a>
      </div>
    </div>
  );
}