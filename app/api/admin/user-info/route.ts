import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { listUsers, getSession, getUserById } from '../../../lib/authStore';

export async function GET() {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';
  const ses = sid ? getSession(sid) : null;
  if (!ses) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const users = listUsers().map(u => ({
    id: u.id,
    userName: u.userName,
    email: u.email,
    role: u.role || 'member',
    status: u.status || 'active',
    last_login_at: u.lastLoginAt || null,
    onboarding: u.onboarding || null,
  }));
  return NextResponse.json({ users });
}