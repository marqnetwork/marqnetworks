import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function GET() {
  const cookieStore = await cookies();
  const supaEmail = cookieStore.get('supabase_user_email')?.value || '';
  if (!supaEmail) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const admin = getSupabaseAdminClient();
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 200, page: 1 });
  const { data: employees } = await admin.from('employees').select('user_id, full_name, department, role_title, phone');
  const empMap = new Map<string, { full_name?: string; department?: string; role_title?: string; phone?: string }>();
  for (const e of employees || []) empMap.set(e.user_id, { full_name: e.full_name || '', department: e.department || '', role_title: e.role_title || '', phone: e.phone || '' });
  const users = (list?.users || []).map((u: any) => ({
    id: u.id,
    userName: (empMap.get(u.id)?.full_name || u.user_metadata?.userName || ''),
    email: u.email,
    role: ((empMap.get(u.id)?.role_title || '').toLowerCase() === 'admin' ? 'super_admin' : (empMap.get(u.id)?.role_title || '').toLowerCase() === 'manager' ? 'team_manager' : 'member'),
    department: empMap.get(u.id)?.department || '',
    title: empMap.get(u.id)?.role_title || '',
    phone: empMap.get(u.id)?.phone || '',
    status: (u.user_metadata?.status as string) || 'active',
    last_login_at: u.last_sign_in_at || null,
    onboarding: u.user_metadata?.onboarding || null,
  }));
  return NextResponse.json({ users });
}