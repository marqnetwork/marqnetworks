import { NextResponse } from 'next/server';
import { createUser, createSession } from '../../../lib/authStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userName, email, password } = body || {};
    if (!userName || !email || !password) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    const user = createUser(userName, email, password);
    const session = createSession(user.id);
    const res = NextResponse.json({ ok: true, user: { id: user.id, userName: user.userName, email: user.email } });
    // Set cookie to expire in 10 hours (aligns with session lifetime)
    res.cookies.set('session_id', session.id, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Registration failed' }, { status: 400 });
  }
}