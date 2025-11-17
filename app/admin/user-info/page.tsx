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
  onboarding: Record<string, any> | null;
};

export default function AdminUserInfoPage() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

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
    return !q || u.userName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
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

      <div className="admin-grid" style={{ marginTop: 18 }}>
        {filtered.length === 0 && (
          <div className="adm-card" style={{ gridColumn: '1/-1' }}>
            <div className="adm-card-body"><div className="adm-empty">No users</div></div>
          </div>
        )}
        {filtered.map(u => (
          <div className="adm-card" key={u.id}>
            <div className="adm-card-body" style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'grid' }}>
                  <div style={{ fontWeight: 600 }}>{u.userName}</div>
                  <div style={{ fontSize: 12, color: '#9aa3b2' }}>{u.email}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`adm-badge ${u.status === 'active' ? 'green' : 'gray'}`}>{u.status}</span>
                </div>
              </div>

              {u.onboarding ? (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(u.onboarding).map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ width: 220 }}>{k}</td>
                        <td>
                          {typeof v === 'string' && v.startsWith('/uploads/') ? (
                            <img src={v} alt={k} style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)' }} />
                          ) : (
                            Array.isArray(v) ? v.join(', ') : String(v ?? '')
                          )}
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
        ))}
      </div>
    </div>
  );
}