import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { listUsers, getSession, getUserById } from '../../../lib/authStore';

export async function GET() {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';
  const ses = sid ? getSession(sid) : null;
  if (!ses) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const actor = getUserById(ses.userId);
  if (!actor || !(actor.role === 'super_admin' || actor.role === 'manager')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const users = listUsers().map(u => ({ id: u.id, userName: u.userName, email: u.email, role: u.role || 'member', status: u.status || 'active', first_name: u.firstName || '', last_name: u.lastName || '', last_login_at: u.lastLoginAt || null }));
  return NextResponse.json({ users });
}