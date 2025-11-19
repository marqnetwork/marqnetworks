import { getSupabaseAdminClient } from './supabase';
import { cookies } from 'next/headers';

type Role = 'super_admin' | 'team_manager' | 'member';

export async function resolveSupabaseUserBySession(): Promise<{
  user: { id: string; email: string };
  role: Role;
}> {
  const cookieStore = await cookies();
  const supaId = cookieStore.get('supabase_user_id')?.value || '';
  const supaEmail = cookieStore.get('supabase_user_email')?.value || '';
  if (!supaEmail) throw new Error('User email missing');

  const admin = getSupabaseAdminClient();
  const perPage = 200;
  const { data: listData } = await admin.auth.admin.listUsers({ perPage, page: 1 });
  let ensuredId = supaId || (listData?.users || []).find(u => (u.email || '').toLowerCase() === supaEmail.toLowerCase())?.id || '';
  if (!ensuredId) {
    const { data: created } = await admin.auth.admin.createUser({ email: supaEmail });
    ensuredId = created?.user?.id || '';
  }

  const { data: profile } = await admin.from('profiles').select('role').eq('id', ensuredId).maybeSingle();
  const role: Role = (profile?.role as Role) || 'member';
  return { user: { id: ensuredId, email: supaEmail }, role };
}

export async function getUserRole(userId: string): Promise<Role | null> {
  const admin = getSupabaseAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.from('profiles').select('role').eq('id', userId).maybeSingle();
  if (error) return null;
  const role = (data?.role as Role) || null;
  return role;
}