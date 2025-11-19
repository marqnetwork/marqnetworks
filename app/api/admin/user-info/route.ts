import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function GET() {
  const cookieStore = await cookies();
  const supaEmail = cookieStore.get('supabase_user_email')?.value || '';
  if (!supaEmail) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const admin = getSupabaseAdminClient();
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 200, page: 1 });
  const { data: profiles } = await admin.from('profiles').select('id, role, full_name, department');
  const profMap = new Map<string, { role: string; full_name?: string; department?: string }>();
  for (const p of profiles || []) profMap.set(p.id, { role: p.role || 'member', full_name: p.full_name || '', department: p.department || '' });
  const users = (list?.users || []).map((u: any) => ({
    id: u.id,
    userName: (profMap.get(u.id)?.full_name || u.user_metadata?.userName || ''),
    email: u.email,
    role: profMap.get(u.id)?.role || 'member',
    department: profMap.get(u.id)?.department || '',
    status: (u.user_metadata?.status as string) || 'active',
    last_login_at: u.last_sign_in_at || null,
    onboarding: u.user_metadata?.onboarding || null,
  }));
  return NextResponse.json({ users });
}