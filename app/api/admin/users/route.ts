import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { listUsers, getSession, getUserById } from '../../../lib/authStore';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../lib/supabaseAuthBridge';

export async function GET() {
  try {
    const admin = getSupabaseAdminClient();
    const { role } = await resolveSupabaseUserBySession();
    if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { data, error } = await admin
      .from('employees')
      .select('user_id, full_name, email, role_title, details')
      .order('created_at', { ascending: false });
    if (error) throw error;
    const users = (data || []).map((r: any) => ({
      id: r.user_id,
      userName: String(r.full_name || r.email || '').trim(),
      email: r.email || '',
      role: ((r.role_title || '').toLowerCase() === 'admin' ? 'admin' : 'employee'),
      status: (r.details && (r.details as any).status) || 'active',
      first_name: '',
      last_name: '',
      last_login_at: null,
    }));
    return NextResponse.json({ users });
  } catch {
    const cookieStore = await cookies();
    const sid = cookieStore.get('session_id')?.value || '';
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const users = listUsers().map(u => ({ id: u.id, userName: u.userName, email: u.email, role: u.role || 'member', status: u.status || 'active', first_name: u.firstName || '', last_name: u.lastName || '', last_login_at: u.lastLoginAt || null }));
    return NextResponse.json({ users });
  }
}
