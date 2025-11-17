import { listUsers } from '../lib/authStore';
import '../admin/style.css';

export default async function PublicUserInfoPage() {
  const users = listUsers();
  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Public</div>
        <h1 className="admin-title">User Info</h1>
        <p className="admin-sub">Onboarding details visible to everyone.</p>
      </div>

      <div className="admin-grid" style={{ marginTop: 18 }}>
        {users.length === 0 && (
          <div className="adm-card" style={{ gridColumn: '1/-1' }}>
            <div className="adm-card-body"><div className="adm-empty">No users</div></div>
          </div>
        )}
        {users.map((u) => (
          <div className="adm-card" key={u.id}>
            <div className="adm-card-body" style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'grid' }}>
                  <div style={{ fontWeight: 600 }}>{u.userName}</div>
                  <div style={{ fontSize: 12, color: '#9aa3b2' }}>{u.email}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`adm-badge ${u.status === 'active' ? 'green' : 'gray'}`}>{u.status || 'active'}</span>
                  <span className="adm-badge blue">{u.role || 'member'}</span>
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
                            Array.isArray(v) ? (v as any[]).join(', ') : String(v ?? '')
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