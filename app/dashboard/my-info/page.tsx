"use client";
import { useEffect, useState } from 'react';
import '../../admin/style.css';

export default function MyInfoPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/me/user-info');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load');
      setUser(json.user || null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Dashboard</div>
        <h1 className="admin-title">My Info</h1>
        <p className="admin-sub">Your onboarding details.</p>
      </div>

      {error && <div style={{ marginTop: 12, color: '#ffd27a' }}>{error}</div>}

      {!user && !error && (
        <div className="adm-card" style={{ gridColumn: '1/-1' }}>
          <div className="adm-card-body"><div className="adm-empty">No info</div></div>
        </div>
      )}

      {user && (
        <div className="admin-grid" style={{ marginTop: 18 }}>
          <div className="adm-card" style={{ gridColumn: '1/-1' }}>
            <div className="adm-card-body" style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'grid' }}>
                  <div style={{ fontWeight: 600 }}>{user.userName}</div>
                  <div style={{ fontSize: 12, color: '#9aa3b2' }}>{user.email}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`adm-badge ${user.status === 'active' ? 'green' : 'gray'}`}>{user.status}</span>
                  <span className="adm-badge blue">{user.role}</span>
                </div>
              </div>

              {user.onboarding ? (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(user.onboarding).map(([k, v]: any) => (
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
        </div>
      )}
    </div>
  );
}