import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { listUsers } from '../../../../lib/authStore';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = String(body?.action || '').trim();
    const email = String(body?.email || '').trim();
    const role = String(body?.role || '').trim() as 'super_admin' | 'manager' | 'member';
    if (action === 'remove_admins') {
      const admin = getSupabaseAdminClient();
      const { data, error } = await admin
        .from('employees')
        .update({ role_title: null })
        .eq('role_title', 'admin')
        .select('user_id');
      if (error) return NextResponse.json({ ok: false, error: error.message || 'remove_admins_failed' }, { status: 500 });
      return NextResponse.json({ ok: true, removed: (data || []).length });
    }
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });

    const localUser = listUsers().find(u => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
    if (!localUser) return NextResponse.json({ ok: false, error: 'local_user_not_found' }, { status: 404 });

    const admin = getSupabaseAdminClient();
    let supaUser: any = null;
    let page = 1;
    const perPage = 200;
    while (!supaUser) {
      const { data: list } = await admin.auth.admin.listUsers({ perPage, page });
      const users = (list?.users || []);
      const match = users.find((u: any) => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
      if (match) { supaUser = match; break; }
      if (users.length < perPage) break;
      page++;
    }
    if (!supaUser) {
      const tempPassword = Math.random().toString(36).slice(2) + "A1!";
      const { data: created, error: createErr } = await admin.auth.admin.createUser({ email, password: tempPassword, email_confirm: true } as any);
      if (createErr) return NextResponse.json({ ok: false, error: createErr.message || 'supabase_user_create_failed' }, { status: 500 });
      supaUser = created?.user || null;
    }
    if (!supaUser?.id) return NextResponse.json({ ok: false, error: 'supabase_user_create_failed' }, { status: 500 });

    const fullName = String(localUser.onboarding?.preferredName || localUser.onboarding?.fullLegalName || localUser.email || '').trim();
    const department = String(localUser.onboarding?.department || '').trim();
    const roleTitleFromOnboarding = String(localUser.onboarding?.accessLevel || '').trim();
    const roleTitleOverride = role === 'super_admin' ? 'admin' : role === 'manager' ? 'manager' : role ? 'staff' : '';

    const { error: metaErr } = await admin.auth.admin.updateUserById(supaUser.id, {
      user_metadata: { userName: fullName || localUser.email, onboarding: localUser.onboarding || {} },
    } as any);
    if (metaErr) return NextResponse.json({ ok: false, error: metaErr.message || 'metadata_update_failed' }, { status: 500 });

    const { error: upErr } = await admin
      .from('employees')
      .upsert(
        { user_id: supaUser.id, full_name: fullName || null, email: email, department: department || null, role_title: (roleTitleOverride || roleTitleFromOnboarding || null), details: localUser.onboarding || {} },
        { onConflict: 'user_id' }
      );
    if (upErr) return NextResponse.json({ ok: false, error: upErr.message || 'upsert_failed' }, { status: 500 });

    try {
      if (role) {
        const { error: updErr } = await admin.from('profiles').update({ role }).eq('id', supaUser.id);
        if (updErr) {
          await admin.from('profiles').upsert({ id: supaUser.id, role }, { onConflict: 'id' });
        }
      } else {
        await admin.from('profiles').upsert({ id: supaUser.id }, { onConflict: 'id' });
      }
    } catch {}

    return NextResponse.json({ ok: true, supabase_user_id: supaUser.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'sync_failed' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL((req as any).url);
    const email = (url.searchParams.get('email') || '').trim();
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });

    const localUser = listUsers().find(u => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
    if (!localUser) return NextResponse.json({ ok: false, error: 'local_user_not_found' }, { status: 404 });

    const admin = getSupabaseAdminClient();
    let supaUser: any = null;
    let page = 1;
    const perPage = 200;
    while (!supaUser) {
      const { data: list } = await admin.auth.admin.listUsers({ perPage, page });
      const users = (list?.users || []);
      const match = users.find((u: any) => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
      if (match) { supaUser = match; break; }
      if (users.length < perPage) break;
      page++;
    }
    if (!supaUser) {
      const tempPassword = Math.random().toString(36).slice(2) + "A1!";
      const { data: created, error: createErr } = await admin.auth.admin.createUser({ email, password: tempPassword, email_confirm: true } as any);
      if (createErr) return NextResponse.json({ ok: false, error: createErr.message || 'supabase_user_create_failed' }, { status: 500 });
      supaUser = created?.user || null;
    }
    if (!supaUser?.id) return NextResponse.json({ ok: false, error: 'supabase_user_create_failed' }, { status: 500 });

    const fullName = String(localUser.onboarding?.preferredName || localUser.onboarding?.fullLegalName || localUser.email || '').trim();
    const department = String(localUser.onboarding?.department || '').trim();
    const roleTitle = String(localUser.onboarding?.accessLevel || '').trim();

    const { error: metaErr } = await admin.auth.admin.updateUserById(supaUser.id, {
      user_metadata: { userName: fullName || localUser.email, onboarding: localUser.onboarding || {} },
    } as any);
    if (metaErr) return NextResponse.json({ ok: false, error: metaErr.message || 'metadata_update_failed' }, { status: 500 });

    const { error: upErr } = await admin
      .from('employees')
      .upsert(
        { user_id: supaUser.id, full_name: fullName || null, email: email, department: department || null, role_title: roleTitle || null, details: localUser.onboarding || {} },
        { onConflict: 'user_id' }
      );
    if (upErr) return NextResponse.json({ ok: false, error: upErr.message || 'upsert_failed' }, { status: 500 });

    try {
      await admin.from('profiles').upsert({ id: supaUser.id }, { onConflict: 'id' });
    } catch {}

    return NextResponse.json({ ok: true, supabase_user_id: supaUser.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'sync_failed' }, { status: 500 });
  }
}
