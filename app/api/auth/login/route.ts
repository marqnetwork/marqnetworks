import { NextResponse } from 'next/server';
import { getSupabaseServerClient, getSupabaseAdminClient } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body || {};
    if (!identifier || !password) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    const supa = getSupabaseServerClient();
    const { data, error } = await supa.auth.signInWithPassword({ email: identifier, password });
    if (error || !data?.user) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }
    const admin = getSupabaseAdminClient();
    const { data: profile } = await admin.from('profiles').select('role').eq('id', data.user.id).maybeSingle();
    const res = NextResponse.json({ ok: true, user: { id: data.user.id, userName: data.user.user_metadata?.userName || '', email: data.user.email || '', role: (profile?.role || 'member') } });
    res.cookies.set('supabase_user_id', data.user.id, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    res.cookies.set('supabase_user_email', data.user.email || '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Login failed' }, { status: 400 });
  }
}