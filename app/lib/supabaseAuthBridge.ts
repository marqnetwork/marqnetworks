import { getSupabaseAdminClient } from './supabase';
import { cookies } from 'next/headers';

type Role = 'admin' | 'employee';

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

  const { data: emp } = await admin.from('employees').select('role_title, details').eq('user_id', ensuredId).maybeSingle();
  const roleText = (emp?.role_title || (emp?.details as any)?.role || '').toLowerCase();
  const role: Role = roleText === 'admin' ? 'admin' : 'employee';
  return { user: { id: ensuredId, email: supaEmail }, role };
}

export async function getUserRole(userId: string): Promise<Role | null> {
  const admin = getSupabaseAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.from('employees').select('role_title, details').eq('user_id', userId).maybeSingle();
  if (error) return null;
  const roleText = (data?.role_title || (data?.details as any)?.role || '').toLowerCase();
  const role: Role | null = roleText === 'admin' ? 'admin' : 'employee';
  return role;
}
