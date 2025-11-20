import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function GET(req: Request, ctx: { params?: { token?: string } }) {
  const url = new URL((req as any).url);
  const token = (ctx?.params?.token || url.pathname.split('/').pop() || '').trim();
  if (!token) return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 400 });
  try {
    const supa = getSupabaseAdminClient();
    const { data: list } = await supa.auth.admin.listUsers({ perPage: 500, page: 1 });
    const found = (list?.users || []).find((u: any) => (u.user_metadata?.invite_token || '') === token);
    const expires = Number(found?.user_metadata?.invite_expires || 0);
    if (found && expires > Date.now()) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: 'invalid_or_expired_token' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'lookup_failed' }, { status: 400 });
  }
}

export async function POST(req: Request, ctx: { params?: { token?: string } }) {
  try {
    const url = new URL((req as any).url);
    const token = (ctx?.params?.token || url.pathname.split('/').pop() || '').trim();
    const body = await req.json().catch(() => ({}));
    const password = (body?.password || '').trim();
    const payload = body?.onboarding || {};
    if (!token || !password) return NextResponse.json({ ok: false, error: 'token_and_password_required' }, { status: 400 });
    try {
      const supa = getSupabaseAdminClient();
      const { data: list } = await supa.auth.admin.listUsers({ perPage: 500, page: 1 });
      const found = (list?.users || []).find((u: any) => (u.user_metadata?.invite_token || '') === token);
      const expires = Number(found?.user_metadata?.invite_expires || 0);
      if (!found || expires <= Date.now()) return NextResponse.json({ ok: false, error: 'invalid_or_expired_token' }, { status: 400 });

      await supa.auth.admin.updateUserById(found.id, {
        password,
        user_metadata: { userName: payload?.preferredName || payload?.fullName || (found.email || ''), onboarding: payload || {}, invite_token: null, invite_expires: null },
      } as any);
      const fullName = (payload?.preferredName || payload?.fullName || (found.email || '')).trim();
      const department = (payload?.department || '').trim();
      try { await supa.from('employees').upsert({ user_id: found.id, full_name: fullName || null, email: found.email, department: department || null, details: payload || {} }, { onConflict: 'user_id' }); } catch {}

      return NextResponse.json({ ok: true, user: { id: found.id, email: found.email, userName: fullName } });
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: e?.message || 'onboarding_failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'onboarding_failed' }, { status: 400 });
  }
}