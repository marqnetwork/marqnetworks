import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../lib/supabaseAuthBridge';

export async function POST(req: Request) {
  try {
    const { user: actor, role: actorRole } = await resolveSupabaseUserBySession();
    if (actorRole !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const adminEmail = String(body?.admin_email || '').trim().toLowerCase();
    if (!adminEmail) return NextResponse.json({ ok: false, error: 'admin_email_required' }, { status: 400 });

    const supa = getSupabaseAdminClient();

    let targetUser: any = null;
    let page = 1;
    const perPage = 200;
    while (!targetUser) {
      const { data: list } = await supa.auth.admin.listUsers({ perPage, page });
      const users = (list?.users || []);
      const match = users.find((u: any) => (u.email || '').toLowerCase() === adminEmail) || null;
      if (match) { targetUser = match; break; }
      if (users.length < perPage) break;
      page++;
    }
    if (!targetUser) {
      const { data: created, error: createErr } = await supa.auth.admin.createUser({ email: adminEmail, email_confirm: true } as any);
      if (createErr) return NextResponse.json({ ok: false, error: createErr.message || 'supabase_user_create_failed' }, { status: 500 });
      targetUser = created?.user || null;
    }
    if (!targetUser?.id) return NextResponse.json({ ok: false, error: 'supabase_user_missing' }, { status: 500 });

    const adminId: string = targetUser.id;

    const fullName = String(targetUser.user_metadata?.userName || targetUser.email || '').trim();

    const { error: upErr } = await supa
      .from('employees')
      .upsert({ user_id: adminId, full_name: fullName || null, email: adminEmail, role_title: 'admin' }, { onConflict: 'user_id' });
    if (upErr) return NextResponse.json({ ok: false, error: upErr.message || 'employees_upsert_failed' }, { status: 500 });

    const { error: demoteErr } = await supa
      .from('employees')
      .update({ role_title: 'employee' })
      .neq('user_id', adminId);
    if (demoteErr) return NextResponse.json({ ok: false, error: demoteErr.message || 'employees_update_failed' }, { status: 500 });

    return NextResponse.json({ ok: true, admin_user_id: adminId });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'normalize_failed' }, { status: 500 });
  }
}

