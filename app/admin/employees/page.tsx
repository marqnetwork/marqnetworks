"use client";
import { useEffect, useState } from 'react';
import '../style.css';

type Role = 'super_admin' | 'manager' | 'member';
type Status = 'active' | 'inactive';

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

export default function AdminEmployeesPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load employees');
      const members = (json.users || []).filter((u: UserRow) => u.role === 'member');
      setUsers(members);
    } catch (e: any) {
      setError(e?.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function update(id: string, patch: Partial<{ status: Status }>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Update failed');
      await load();
    } catch (e: any) {
      setError(e?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  const filtered = users.filter(u => {
    const q = query.trim().toLowerCase();
    return !q || u.userName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Admin</div>
        <h1 className="admin-title">Employees</h1>
        <p className="admin-sub">Active and inactive employees. Search and manage status.</p>
      </div>

      {error && <div style={{ marginTop: 12, color: '#ffd27a' }}>{error}</div>}

      <div className="admin-actions" style={{ marginTop: 16 }}>
        <div className="adm-actions-bar">
          <input className="adm-input" placeholder="Search name or email" value={query} onChange={e => setQuery(e.target.value)} style={{ minWidth: 240 }} />
          <button className="adm-btn" onClick={load} disabled={loading}>Refresh</button>
        </div>
      </div>

      <div className="admin-grid" style={{ marginTop: 18 }}>
        <div className="adm-card" style={{ gridColumn: '1/-1' }}>
          <div className="adm-card-body">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={5}><div className="adm-empty">No employees</div></td></tr>
                )}
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`adm-badge ${u.status === 'active' ? 'green' : 'gray'}`}>{u.status}</span>
                    </td>
                    <td>{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '-'}</td>
                    <td>
                      <a className="adm-btn" href={`/admin/employees/${u.id}`}>Open</a>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="adm-btn" onClick={() => update(u.id, { status: u.status === 'active' ? 'inactive' : 'active' })} disabled={loading}>{u.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}