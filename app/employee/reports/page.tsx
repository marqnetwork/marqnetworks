import { cookies } from 'next/headers';
import { getSession, getUserById } from '../../lib/authStore';
import { getSupabaseServerClient, AttendanceEventRow } from '../../lib/supabase';
import { readAttendance, AttendanceEvent } from '../../lib/attendanceStore';

export default async function EmployeeReportsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value || '';
  const session = sessionId ? getSession(sessionId) : null;
  const user = session ? getUserById(session.userId) : null;
  const userName = user?.userName || '';

  let events: AttendanceEvent[] = [];
  let usingSupabase = false;
  const client = getSupabaseServerClient();
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

  return (
    <div className="employee-container" style={{ padding: '2rem' }}>
      <h1 className="emp-hero-heading">My Reports</h1>
      <p className="emp-hero-subtext">User: {userName || 'Unknown'} — Source: {usingSupabase ? 'Supabase' : 'Local JSON'}</p>

      <div className="emp-grid" style={{ marginTop: '1rem' }}>
        <div className="emp-card">
          <div className="emp-card-title">Summary</div>
          <div className="text-sm">Sessions: {totalSessions}</div>
          <div className="text-sm">Snapshots: {totalSnapshots}</div>
          <div className="text-sm">Activity Pings: {totalPings}</div>
        </div>
        <div className="emp-card" style={{ gridColumn: 'span 2' }}>
          <div className="emp-card-title">Timeline</div>
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {events.map((e) => (
              <div key={e.id} className="text-sm" style={{ color: '#aaa' }}>
                [{new Date(e.timestamp).toLocaleString()}] {e.type}
                {e.type === 'snapshot' && e.metadata?.url ? (
                  <> — <a href={e.metadata.url} target="_blank" rel="noreferrer">view</a></>
                ) : null}
              </div>
            ))}
            {events.length === 0 && (
              <div className="text-sm" style={{ color: '#aaa' }}>No events found.</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <a href="/employee" className="emp-btn secondary">Back to Employee</a>
      </div>
    </div>
  );
}