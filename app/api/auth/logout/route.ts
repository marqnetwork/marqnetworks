import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteSession } from '../../../lib/authStore';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value || '';
    if (sessionId) {
      deleteSession(sessionId);
    }
    const res = NextResponse.json({ ok: true });
    // Clear the cookie
    res.cookies.delete('session_id');
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Logout failed' }, { status: 500 });
  }
}