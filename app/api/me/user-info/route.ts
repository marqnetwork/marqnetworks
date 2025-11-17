import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getUserById } from '../../../lib/authStore';

export async function GET() {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';
  const ses = sid ? getSession(sid) : null;
  if (!ses) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = getUserById(ses.userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role || 'member',
      status: user.status || 'active',
      last_login_at: user.lastLoginAt || null,
      onboarding: user.onboarding || null,
    }
  });
}