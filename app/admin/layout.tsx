"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './style.css';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/employees', label: 'Employees' },
  { href: '/admin/agents', label: 'Agents' },
  { href: '/admin/payroll', label: 'Payroll' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
        {children}
      </main>
    </div>
  );
}