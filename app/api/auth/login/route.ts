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
    let email = String(identifier || '').trim();
    if (!email.includes('@')) {
      try {
        const admin = getSupabaseAdminClient();
        const { data: list } = await admin.auth.admin.listUsers({ perPage: 500, page: 1 });
        const matched = (list?.users || []).find((u: any) => (u.user_metadata?.userName || '').toLowerCase() === email.toLowerCase());
        if (matched?.email) email = matched.email;
      } catch {}
    }
    const { data, error } = await supa.auth.signInWithPassword({ email, password });
    if (error || !data?.user) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }
    const admin = getSupabaseAdminClient();
    const { data: emp } = await admin.from('employees').select('role, role_title').eq('user_id', data.user.id).maybeSingle();
    const role = (emp?.role as any) || ((emp?.role_title || '').toLowerCase() === 'admin' ? 'super_admin' : (emp?.role_title || '').toLowerCase() === 'manager' ? 'team_manager' : 'member');
    const res = NextResponse.json({ ok: true, user: { id: data.user.id, userName: data.user.user_metadata?.userName || '', email: data.user.email || '', role } });
    res.cookies.set('supabase_user_id', data.user.id, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    res.cookies.set('supabase_user_email', data.user.email || '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 10 * 60 * 60 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Login failed' }, { status: 400 });
  }
}