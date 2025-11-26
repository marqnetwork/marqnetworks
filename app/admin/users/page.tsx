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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [invOpen, setInvOpen] = useState(false);
  const [invFirst, setInvFirst] = useState('');
  const [invLast, setInvLast] = useState('');
  const [invEmail, setInvEmail] = useState('');
  const [invResult, setInvResult] = useState<string | null>(null);
  const [invSalary, setInvSalary] = useState('');
  const [invDept, setInvDept] = useState('');
  const [invDays, setInvDays] = useState('');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load users');
      setUsers(json.users || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function update(id: string, patch: Partial<{ role: Role; status: Status }>) {
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

  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Admin</div>
        <h1 className="admin-title">Users</h1>
        <p className="admin-sub">Search, filter, invite, and manage access.</p>
      </div>

      {error && <div style={{ marginTop: 12, color: '#ffd27a' }}>{error}</div>}

      <div className="admin-actions" style={{ marginTop: 16 }}>
        <div className="adm-actions-bar">
          <input className="adm-input" placeholder="Search name or email" value={query} onChange={e => setQuery(e.target.value)} style={{ minWidth: 220 }} />
          <select className="adm-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
            <option value="all">All status</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
          <button className="adm-btn primary" onClick={() => { setInvOpen(true); setInvResult(null); }} disabled={loading}>Invite user</button>
        </div>
      </div>

      {invOpen && (
        <div style={{ marginTop: 14, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 12, background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10 }}>
            <input className="adm-input" placeholder="First name" value={invFirst} onChange={e => setInvFirst(e.target.value)} />
            <input className="adm-input" placeholder="Last name" value={invLast} onChange={e => setInvLast(e.target.value)} />
            <input className="adm-input" placeholder="Email" value={invEmail} onChange={e => setInvEmail(e.target.value)} />
            <input className="adm-input" placeholder="Salary (monthly)" type="number" value={invSalary} onChange={e => setInvSalary(e.target.value)} />
            <input className="adm-input" placeholder="Department" value={invDept} onChange={e => setInvDept(e.target.value)} />
            <input className="adm-input" placeholder="Total Days" type="number" value={invDays} onChange={e => setInvDays(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button className="adm-btn primary" disabled={loading || !invEmail} onClick={async () => {
              setError(null);
              setInvResult(null);
              setLoading(true);
              try {
                const res = await fetch('/api/auth/invite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ first_name: invFirst, last_name: invLast, email: invEmail, salary_monthly: invSalary ? Number(invSalary) : undefined, department: invDept, total_days: invDays ? Number(invDays) : undefined }) });
                const json = await res.json();
                if (!res.ok || !json.ok) throw new Error(json.error || 'Invite failed');
                setInvResult(`Invite created. Token: ${json.invite_token}`);
                setInvFirst(''); setInvLast(''); setInvEmail(''); setInvSalary(''); setInvDept(''); setInvDays('');
                await load();
              } catch (e: any) {
                setError(e?.message || 'Invite failed');
              } finally {
                setLoading(false);
              }
            }}>Send invite</button>
            <button className="adm-btn" onClick={() => setInvOpen(false)}>Close</button>
          </div>
          {invResult && <div style={{ marginTop: 8, color: '#9ad0ff' }}>{invResult}</div>}
        </div>
      )}

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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => {
                  const q = query.trim().toLowerCase();
                  const matches = !q || u.userName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                  const statOk = statusFilter === 'all' || u.status === statusFilter;
                  return matches && statOk;
                }).length === 0 && (
                  <tr><td colSpan={6}><div className="adm-empty">No users</div></td></tr>
                )}
                {users.filter(u => {
                  const q = query.trim().toLowerCase();
                  const matches = !q || u.userName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                  const statOk = statusFilter === 'all' || u.status === statusFilter;
                  return matches && statOk;
                }).map(u => (
                  <tr key={u.id}>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={`adm-badge ${u.status === 'active' ? 'green' : 'gray'}`}>{u.status}</span>
                        <select className="adm-input" value={u.status} onChange={e => update(u.id, { status: e.target.value as Status })} disabled={loading}>
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </div>
                    </td>
                    <td>{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '-'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="adm-btn" onClick={() => update(u.id, { status: u.status === 'active' ? 'inactive' : 'active' })} disabled={loading}>{u.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                        <button className="adm-btn warn" disabled={loading} onClick={async () => {
                          setError(null);
                          setLoading(true);
                          try {
                            const res = await fetch('/api/auth/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'request', email: u.email }) });
                            const json = await res.json();
                            if (!res.ok || !json.ok) throw new Error(json.error || 'Reset failed');
                            setInvResult(`Reset token for ${u.email}: ${json.reset_token}`);
                          } catch (e: any) {
                            setError(e?.message || 'Reset failed');
                          } finally {
                            setLoading(false);
                          }
                        }}>Reset Password</button>
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
