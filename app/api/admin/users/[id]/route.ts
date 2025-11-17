import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getUserById, setUserRole, setUserStatus } from '../../../../lib/authStore';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
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
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Update failed' }, { status: 400 });
  }
}