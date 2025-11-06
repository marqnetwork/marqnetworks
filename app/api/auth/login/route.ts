import { NextResponse } from 'next/server';
import { verifyLogin, createSession } from '../../../lib/authStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body || {};
    if (!identifier || !password) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    const user = verifyLogin(identifier, password);
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }
    const session = createSession(user.id);
    const res = NextResponse.json({ ok: true, user: { id: user.id, userName: user.userName, email: user.email } });
    // Set cookie to expire in 10 hours (aligns with session lifetime)
    res.cookies.set('session_id', session.id, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Login failed' }, { status: 400 });
  }
}