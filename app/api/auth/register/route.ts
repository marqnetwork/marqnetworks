import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userName, email, password } = body || {};
    if (!userName || !email || !password) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    const admin = getSupabaseAdminClient();
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { userName } } as any);
    if (error || !data?.user) return NextResponse.json({ ok: false, error: error?.message || 'Registration failed' }, { status: 400 });

    try {
      await admin.from('employees').upsert({
        user_id: data.user.id,
        full_name: userName,
        email,
      }, { onConflict: 'user_id' });
    } catch {}

    const res = NextResponse.json({ ok: true, user: { id: data.user.id, userName, email } });
    res.cookies.set('supabase_user_id', data.user.id, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    res.cookies.set('supabase_user_email', email, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Registration failed' }, { status: 400 });
  }
}