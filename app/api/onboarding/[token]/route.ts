import { NextResponse } from 'next/server';
import { completeOnboarding } from '../../../lib/authStore';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function GET(req: Request, ctx: { params?: { token?: string } }) {
  const url = new URL((req as any).url);
  const token = (ctx?.params?.token || url.pathname.split('/').pop() || '').trim();
  if (!token) return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request, ctx: { params?: { token?: string } }) {
  try {
    const url = new URL((req as any).url);
    const token = (ctx?.params?.token || url.pathname.split('/').pop() || '').trim();
    const body = await req.json().catch(() => ({}));
    const password = (body?.password || '').trim();
    const payload = body?.onboarding || {};
    if (!token || !password) return NextResponse.json({ ok: false, error: 'token_and_password_required' }, { status: 400 });
    const user = completeOnboarding(token, password, payload);
    if (!user) return NextResponse.json({ ok: false, error: 'invalid_or_expired_token' }, { status: 400 });

    try {
      const supa = getSupabaseAdminClient();
      const { data: list } = await supa.auth.admin.listUsers({ perPage: 200, page: 1 });
      const found = (list?.users || []).find((u: any) => (u.email || '').toLowerCase() === user.email.toLowerCase());
      if (found?.id) {
        await supa.auth.admin.updateUserById(found.id, {
          password,
          user_metadata: { userName: user.userName, onboarding: payload || {} },
        } as any);
        const fullName = (payload?.preferredName || payload?.fullName || user.userName || '').trim();
        const department = (payload?.department || '').trim();
        try { await supa.from('employees').upsert({ user_id: found.id, full_name: fullName || null, email: user.email, department: department || null, details: payload || {} }, { onConflict: 'user_id' }); } catch {}
      }

    } catch {}

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, userName: user.userName } });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'onboarding_failed' }, { status: 400 });
  }
}