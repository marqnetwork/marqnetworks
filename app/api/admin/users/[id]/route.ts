import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getUserById, setUserRole, setUserStatus } from '../../../../lib/authStore';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../lib/supabaseAuthBridge';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getSupabaseAdminClient();
    const { role: actorRole } = await resolveSupabaseUserBySession();
    if (!(actorRole === 'super_admin' || actorRole === 'team_manager')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const body = await req.json().catch(() => ({}));
    const role = body?.role as 'super_admin' | 'manager' | 'member' | undefined;
    const status = body?.status as 'active' | 'inactive' | undefined;
    const id = params.id;
    let updated: any = null;
    if (typeof status === 'string') {
      const { data: existing } = await admin.from('employees').select('details, full_name, email, role_title').eq('user_id', id).maybeSingle();
      const details = { ...(existing?.details || {}), status };
      const { data, error } = await admin
        .from('employees')
        .update({ details })
        .eq('user_id', id)
        .select('user_id, full_name, email, role_title, details')
        .maybeSingle();
      if (error || !data) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
      updated = data;
    }
    if (role) {
      if (actorRole !== 'super_admin' && role === 'super_admin') return NextResponse.json({ error: 'Only super_admin can assign super_admin' }, { status: 403 });
      const { error: upErr } = await admin.from('profiles').update({ role }).eq('id', id);
      if (upErr) return NextResponse.json({ error: upErr.message || 'Role update failed' }, { status: 500 });
      const { data } = await admin.from('employees').select('user_id, full_name, email, role_title, details').eq('user_id', id).maybeSingle();
      updated = data || updated;
    }
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const mapped = {
      id: updated.user_id,
      email: updated.email,
      role: role || (((updated.role_title || '').toLowerCase() === 'admin') ? 'super_admin' : ((updated.role_title || '').toLowerCase() === 'manager') ? 'team_manager' : 'member'),
      status: (updated.details && (updated.details as any).status) || 'active',
    };
    return NextResponse.json({ ok: true, user: mapped });
  } catch (err: any) {
    try {
      const cookieStore = await cookies();
      const sid = cookieStore.get('session_id')?.value || '';
      const ses = sid ? getSession(sid) : null;
      if (!ses) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const actor = getUserById(ses.userId);
      if (!actor || !(actor.role === 'super_admin' || actor.role === 'manager')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      const body = await req.json().catch(() => ({}));
      const role = body?.role as 'super_admin' | 'manager' | 'member' | undefined;
      const status = body?.status as 'active' | 'inactive' | undefined;
      const id = params.id;
      let updated: any = null;
      if (role) {
        if (actor.role !== 'super_admin' && role === 'super_admin') return NextResponse.json({ error: 'Only super_admin can assign super_admin' }, { status: 403 });
        updated = setUserRole(id, role);
      }
      if (status) {
        updated = setUserStatus(id, status);
      }
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true, user: { id: updated.id, email: updated.email, role: updated.role, status: updated.status } });
    } catch (e: any) {
      return NextResponse.json({ error: e?.message || 'Update failed' }, { status: 400 });
    }
  }
}