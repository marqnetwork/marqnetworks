"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import './style.css';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/employees', label: 'Employees' },
  { href: '/admin/user-info', label: 'User Info' },
  { href: '/admin/agents', label: 'Agents' },
  { href: '/admin/payroll', label: 'Payroll' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<'admin' | 'employee' | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/session', { credentials: 'include' });
        const json = await res.json();
        const r = (json?.user?.role || 'employee') as 'admin' | 'employee';
        setRole(r);
        if (r === 'employee' && pathname !== '/admin/user-info') {
          try { window.location.assign('/admin/user-info'); } catch {}
        }
      } catch {
        setRole(null);
        try { window.location.assign('/login?next=/dashboard/my-info'); } catch {}
      }
    })();
  }, []);
  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <div className="admin-brand">Admin</div>
        <nav className="admin-nav-list">
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`admin-nav-link${active ? ' active' : ''}`}>{item.label}</Link>
            );
          })}
        </nav>
      </aside>
      <main className="admin-content">
        {role === null ? (
          <div style={{ padding: 16 }}>Loading…</div>
        ) : (
          <>
            <aside className="admin-nav">
              <div className="admin-brand">Admin</div>
              <nav className="admin-nav-list">
                {(role === 'admin' ? NAV : [{ href: '/admin/user-info', label: 'User Info' }]).map(item => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} className={`admin-nav-link${active ? ' active' : ''}`}>{item.label}</Link>
                  );
                })}
              </nav>
            </aside>
            <main className="admin-content">{children}</main>
          </>
        )}
      </main>
    </div>
  );
}
