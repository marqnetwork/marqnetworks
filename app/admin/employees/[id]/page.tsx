"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import "../../style.css";

type Role = "super_admin" | "manager" | "member";
type Status = "active" | "inactive";

type UserRow = {
  id: string;
  userName: string;
  email: string;
  role: Role;
  status: Status;
  first_name: string;
  last_name: string;
  last_login_at: number | null;
};

type AttendanceEvent = {
  id: string;
  userName: string;
  type: "check_in" | "check_out" | "break_start" | "break_end" | "activity_ping" | "snapshot";
  timestamp: number;
  metadata?: Record<string, any>;
};

export default function EmployeeProfilePage() {
  const params = useParams() as { id?: string };
  const id = (params?.id || "").trim();
  const [user, setUser] = useState<UserRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<AttendanceEvent[]>([]);
  const [onboarding, setOnboarding] = useState<Record<string, any> | null>(null);

  async function loadUser() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load user");
      const found = (json.users || []).find((u: UserRow) => u.id === id) || null;
      setUser(found);
    } catch (e: any) {
      setError(e?.message || "Failed to load user");
    } finally {
      setLoading(false);
    }
  }

  async function loadEvents() {
    try {
      const res = await fetch("/api/attendance");
      const json = await res.json();
      if (!res.ok || !json?.events) throw new Error(json.error || "Failed to load events");
      setEvents(json.events as AttendanceEvent[]);
    } catch {}
  }

  async function loadOnboarding() {
    try {
      const res = await fetch("/api/admin/user-info");
      const json = await res.json();
      if (!res.ok || !json?.users) throw new Error(json.error || "Failed to load onboarding");
      const found = (json.users || []).find((u: any) => u.id === id) || null;
      setOnboarding(found?.onboarding || null);
    } catch {}
  }

  useEffect(() => { loadUser(); }, [id]);
  useEffect(() => { loadEvents(); }, []);
  useEffect(() => { loadOnboarding(); }, [id]);

  const userEvents = useMemo(() => {
    if (!user) return [] as AttendanceEvent[];
    return events.filter((e) => e.userName === user.userName);
  }, [user, events]);

  const snapshots = userEvents.filter((e) => e.type === "snapshot" && e.metadata?.url).map((e) => e.metadata!.url as string);
  const checkins = userEvents.filter((e) => e.type === "check_in");
  const checkouts = userEvents.filter((e) => e.type === "check_out");
  const breaksStart = userEvents.filter((e) => e.type === "break_start");
  const breaksEnd = userEvents.filter((e) => e.type === "break_end");
  const pings = userEvents.filter((e) => e.type === "activity_ping");

  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Admin · Employee</div>
        <h1 className="admin-title">Profile</h1>
        <p className="admin-sub">Screenshots, sessions, and activity.</p>
      </div>

      {error && <div style={{ marginTop: 12, color: "#ffd27a" }}>{error}</div>}
      {loading && <div style={{ marginTop: 12 }}>Loading…</div>}

      {user && (
        <div className="admin-grid" style={{ marginTop: 18 }}>
          <div className="adm-card" style={{ gridColumn: "1/-1" }}>
            <div className="adm-card-head">
              <div className="adm-user">{user.userName}</div>
            </div>
            <div className="adm-card-body">
              <div className="adm-row"><span className="adm-label">Email</span><span className="adm-value">{user.email}</span></div>
              <div className="adm-row"><span className="adm-label">Status</span><span className="adm-value">{user.status}</span></div>
              <div className="adm-row"><span className="adm-label">Last Login</span><span className="adm-value">{user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "-"}</span></div>
              <div className="adm-row"><span className="adm-label">Total Snapshots</span><span className="adm-value">{snapshots.length}</span></div>
              <div className="adm-row"><span className="adm-label">Activity Pings</span><span className="adm-value">{pings.length}</span></div>
              <div className="adm-row"><span className="adm-label">Check-ins</span><span className="adm-value">{checkins.length}</span></div>
              <div className="adm-row"><span className="adm-label">Check-outs</span><span className="adm-value">{checkouts.length}</span></div>
            </div>
          </div>

          <div className="adm-card" style={{ gridColumn: "1/-1" }}>
            <div className="adm-card-head"><div className="adm-user">Onboarding Details</div></div>
            <div className="adm-card-body">
              {onboarding ? (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(onboarding).map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ width: 220 }}>{k}</td>
                        <td>
                          {typeof v === "string" && v.startsWith("/uploads/") ? (
                            <img src={v} alt={k} style={{ maxWidth: "100%", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)" }} />
                          ) : Array.isArray(v) ? v.join(", ") : String(v ?? "")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="adm-empty">No onboarding info</div>
              )}
            </div>
          </div>

          <div className="adm-card" style={{ gridColumn: "1/-1" }}>
            <div className="adm-card-head"><div className="adm-user">Snapshots</div></div>
            <div className="adm-card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                {snapshots.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="snapshot" style={{ width: "100%", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }} />
                  </a>
                ))}
                {snapshots.length === 0 && <div className="adm-empty">No snapshots</div>}
              </div>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-head"><div className="adm-user">Sessions</div></div>
            <div className="adm-card-body">
              <div style={{ maxHeight: 300, overflow: "auto" }}>
                {userEvents.filter(e => e.type === "check_in" || e.type === "check_out" || e.type === "break_start" || e.type === "break_end").map(ev => (
                  <div key={ev.id} style={{ color: "#aab2c0", fontSize: 13 }}>
                    [{new Date(ev.timestamp).toLocaleString()}] {ev.type}
                  </div>
                ))}
                {userEvents.filter(e => e.type === "check_in" || e.type === "check_out" || e.type === "break_start" || e.type === "break_end").length === 0 && (
                  <div className="adm-empty">No session events</div>
                )}
              </div>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-head"><div className="adm-user">Activity</div></div>
            <div className="adm-card-body">
              <div style={{ maxHeight: 300, overflow: "auto" }}>
                {pings.map(ev => (
                  <div key={ev.id} style={{ color: "#aab2c0", fontSize: 13 }}>
                    [{new Date(ev.timestamp).toLocaleString()}] activity_ping {ev.metadata && (typeof ev.metadata.clicks === "number" || typeof ev.metadata.mouseMoves === "number") ? `— clicks: ${ev.metadata.clicks ?? 0}, moves: ${ev.metadata.mouseMoves ?? 0}` : ""}
                  </div>
                ))}
                {pings.length === 0 && <div className="adm-empty">No activity pings</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
