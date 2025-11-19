import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function GET() {
  const cookieStore = await cookies();
  const supaId = cookieStore.get('supabase_user_id')?.value || '';
  const supaEmail = cookieStore.get('supabase_user_email')?.value || '';
  if (!supaEmail) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const admin = getSupabaseAdminClient();
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 200, page: 1 });
  const { data: profiles } = await admin.from('profiles').select('id, role');
  const roleMap = new Map<string, string>();
  for (const p of profiles || []) roleMap.set(p.id, p.role || 'member');
  const users = (list?.users || []).map((u: any) => ({
    id: u.id,
    userName: u.user_metadata?.userName || '',
    email: u.email,
    role: roleMap.get(u.id) || 'member',
    status: (u.user_metadata?.status as string) || 'active',
    last_login_at: u.last_sign_in_at || null,
    onboarding: u.user_metadata?.onboarding || null,
  }));
  return NextResponse.json({ users });
}