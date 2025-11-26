"use client";
import { useEffect, useState } from 'react';
import '../style.css';

type UserInfo = {
  id: string;
  userName: string;
  email: string;
  role: string;
  status: string;
  last_login_at: number | null;
  department?: string;
  title?: string;
  phone?: string;
  onboarding: Record<string, any> | null;
};

export default function AdminUserInfoPage() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/user-info');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load');
      setUsers(json.users || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = users.filter(u => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const base = [u.userName, u.email, u.role, u.department || '', u.title || '', u.phone || ''].join(' ').toLowerCase();
    if (base.includes(q)) return true;
    if (u.onboarding) {
      for (const [k, v] of Object.entries(u.onboarding)) {
        const str = Array.isArray(v) ? v.join(', ') : String(v ?? '');
        if ((k + ' ' + str).toLowerCase().includes(q)) return true;
      }
    }
    return false;
  });

  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Admin</div>
        <h1 className="admin-title">User Info</h1>
        <p className="admin-sub">Onboarding details for each user.</p>
      </div>

      {error && <div style={{ marginTop: 12, color: '#ffd27a' }}>{error}</div>}

      <div className="admin-actions" style={{ marginTop: 16 }}>
        <div className="adm-actions-bar">
          <input className="adm-input" placeholder="Search name or email" value={query} onChange={e => setQuery(e.target.value)} style={{ minWidth: 240 }} />
          <button className="adm-btn" onClick={load} disabled={loading}>Refresh</button>
        </div>
      </div>

      <div className="admin-grid grid-2" style={{ marginTop: 18 }}>
        {filtered.length === 0 && (
          <div className="adm-card" style={{ gridColumn: '1/-1' }}>
            <div className="adm-card-body"><div className="adm-empty">No users</div></div>
          </div>
        )}
        {filtered.map(u => (
          <div className="adm-card" key={u.id}>
            <div className="adm-card-body" style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                    {(u.userName || u.email || '').slice(0,1).toUpperCase()}
                  </div>
                  <div style={{ display: 'grid' }}>
                    <div style={{ fontWeight: 600 }}>{u.userName || u.email}</div>
                    <div style={{ fontSize: 12, color: '#9aa3b2' }}>{u.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`adm-badge ${u.role === 'super_admin' ? 'blue' : u.role === 'team_manager' ? 'amber' : 'gray'}`}>{u.role}</span>
                  {u.department && <span className="adm-badge">{u.department}</span>}
                  <span className={`adm-badge ${u.status === 'active' ? 'green' : 'gray'}`}>{u.status}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
                {u.phone && <div className="adm-row"><span className="adm-label">Phone</span><span className="adm-value">{u.phone}</span></div>}
                {u.title && <div className="adm-row"><span className="adm-label">Title</span><span className="adm-value">{u.title}</span></div>}
                <div className="adm-row"><span className="adm-label">Last Login</span><span className="adm-value">{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '-'}</span></div>
              </div>

              {u.onboarding ? (
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Uploads</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                      {Object.entries(u.onboarding).filter(([_, v]) => typeof v === 'string' && (v.startsWith('/uploads/') || (/^https?:\/\//.test(v) && /\.(png|jpe?g|gif|webp)$/i.test(v)))).map(([k, v]) => (
                        <a key={k} href={String(v)} target="_blank" rel="noreferrer">
                          <img src={String(v)} alt={k} style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }} />
                        </a>
                      ))}
                      {Object.entries(u.onboarding).filter(([_, v]) => typeof v === 'string' && (v.startsWith('/uploads/') || (/^https?:\/\//.test(v) && /\.(png|jpe?g|gif|webp)$/i.test(v)))).length === 0 && (
                        <div className="adm-empty">No uploads</div>
                      )}
                    </div>
                  </div>

                  <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ fontWeight: 600 }}>Details</div>
                      <button className="adm-btn" onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}>{expandedUser === u.id ? 'Hide' : 'Show'} details</button>
                      </div>
                    {expandedUser === u.id && (
                      <div className="adm-table-wrap">
                        <table className="adm-table">
                          <thead>
                            <tr>
                              <th>Field</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(u.onboarding).filter(([_, v]) => !(typeof v === 'string' && (v.startsWith('/uploads/') || (/^https?:\/\//.test(String(v)) && /\.(png|jpe?g|gif|webp)$/i.test(String(v)))))).map(([k, v]) => (
                              <tr key={k}>
                                <td style={{ width: 220 }}>{k}</td>
                                <td>
                                  {/^https?:\/\//.test(String(v)) && !String(v).startsWith('/uploads/') ? (
                                    <a href={String(v)} target="_blank" style={{ color: '#9ad0ff' }}>{String(v)}</a>
                                  ) : Array.isArray(v) ? v.join(', ') : String(v ?? '')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="adm-empty">No onboarding info</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
