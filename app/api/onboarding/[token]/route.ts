import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import { listUsers, completeOnboarding, forceCompleteOnboarding } from '../../../lib/authStore';

export async function GET(req: Request, ctx: { params?: { token?: string } }) {
  const url = new URL((req as any).url);
  const token = (ctx?.params?.token || url.pathname.split('/').pop() || '').trim();
  if (!token) return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 400 });
  try {
    const supa = getSupabaseAdminClient();
    let found: any = null;
    let page = 1;
    const perPage = 200;
    while (!found) {
      const { data: list } = await supa.auth.admin.listUsers({ perPage, page });
      const users = (list?.users || []);
      const match = users.find((u: any) => (u.user_metadata?.invite_token || '') === token) || null;
      if (match) { found = match; break; }
      if (users.length < perPage) break;
      page++;
    }
    const expires = Number(found?.user_metadata?.invite_expires || 0);
    if (found && expires > Date.now()) return NextResponse.json({ ok: true });
    const localUser = listUsers().find(u => (u.inviteToken || '') === token && (u.inviteTokenExpires || 0) > Date.now());
    if (localUser) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: 'invalid_or_expired_token' }, { status: 400 });
  } catch (e: any) {
    const localUser = listUsers().find(u => (u.inviteToken || '') === token && (u.inviteTokenExpires || 0) > Date.now());
    if (localUser) return NextResponse.json({ ok: true });
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
    const localFirst = completeOnboarding(token, password, payload);
    if (localFirst) {
      try {
        const supa = getSupabaseAdminClient();
        let foundByEmail: any = null;
        let pageE = 1;
        const perPageE = 200;
        while (!foundByEmail) {
          const { data: list } = await supa.auth.admin.listUsers({ perPage: perPageE, page: pageE });
          const users = (list?.users || []);
          const match = users.find((u: any) => (u.email || '').toLowerCase() === localFirst.email.toLowerCase()) || null;
          if (match) { foundByEmail = match; break; }
          if (users.length < perPageE) break;
          pageE++;
        }
        if (!foundByEmail) {
          const { data: created } = await supa.auth.admin.createUser({ email: localFirst.email, email_confirm: true } as any);
          foundByEmail = created?.user || null;
        }
        if (foundByEmail?.id) {
          await supa.auth.admin.updateUserById(foundByEmail.id, {
            password,
            email_confirm: true,
            user_metadata: { userName: payload?.preferredName || payload?.fullName || (foundByEmail.email || ''), onboarding: payload || {}, invite_token: null, invite_expires: null },
          } as any);
          const fullName = (payload?.preferredName || payload?.fullName || (foundByEmail.email || '')).trim();
          const department = (payload?.department || '').trim();
          const roleTitle = (payload?.accessLevel || '').trim();
          {
            const { error: upErr } = await supa.from('employees').upsert({ user_id: foundByEmail.id, full_name: fullName || null, email: foundByEmail.email, department: department || null, role_title: roleTitle || null, details: payload || {} }, { onConflict: 'user_id' });
            if (upErr) throw upErr;
          }
          try {
            await supa.from('profiles').upsert({ id: foundByEmail.id }, { onConflict: 'id' });
          } catch {}
        }
      } catch {}
      return NextResponse.json({ ok: true, user: { id: localFirst.id, email: localFirst.email, userName: localFirst.userName } });
    }
    try {
      const supa = getSupabaseAdminClient();
      let found: any = null;
      let page = 1;
      const perPage = 200;
      while (!found) {
        const { data: list } = await supa.auth.admin.listUsers({ perPage, page });
        const users = (list?.users || []);
        const match = users.find((u: any) => (u.user_metadata?.invite_token || '') === token) || null;
        if (match) { found = match; break; }
        if (users.length < perPage) break;
        page++;
      }
      const expires = Number(found?.user_metadata?.invite_expires || 0);
      if (!found || expires <= Date.now()) {
        const forced = forceCompleteOnboarding(token, password, payload);
        if (forced) return NextResponse.json({ ok: true, user: { id: forced.id, email: forced.email, userName: forced.userName } });
        return NextResponse.json({ ok: false, error: 'invalid_or_expired_token' }, { status: 400 });
      }
      await supa.auth.admin.updateUserById(found.id, {
        password,
        email_confirm: true,
        user_metadata: { userName: payload?.preferredName || payload?.fullName || (found.email || ''), onboarding: payload || {}, invite_token: null, invite_expires: null },
      } as any);
      const fullName = (payload?.preferredName || payload?.fullName || (found.email || '')).trim();
      const department = (payload?.department || '').trim();
      const roleTitle = (payload?.accessLevel || '').trim();
      {
        const { error: upErr } = await supa.from('employees').upsert({ user_id: found.id, full_name: fullName || null, email: found.email, department: department || null, role_title: roleTitle || null, details: payload || {} }, { onConflict: 'user_id' });
        if (upErr) throw upErr;
      }
      try {
        await supa.from('profiles').upsert({ id: found.id }, { onConflict: 'id' });
      } catch {}
      return NextResponse.json({ ok: true, user: { id: found.id, email: found.email, userName: fullName } });
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: e?.message || 'onboarding_failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'onboarding_failed' }, { status: 400 });
  }
}