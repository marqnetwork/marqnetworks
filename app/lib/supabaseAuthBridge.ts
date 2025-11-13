import { getSupabaseAdminClient } from './supabase';
import { getSession, getUserById } from './authStore';
import { cookies } from 'next/headers';

type Role = 'super_admin' | 'team_manager' | 'member';

export async function resolveSupabaseUserBySession(_request?: Request, _supabase?: any): Promise<{
  user: { id: string; email: string };
  role: Role;
}> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value || '';
  if (!sessionId) throw new Error('No session');
  const localSession = getSession(sessionId);
  if (!localSession) throw new Error('Invalid session');
  const localUser = getUserById(localSession.userId);
  if (!localUser?.email) throw new Error('User email missing');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Supabase admin not configured');

  // Try to find existing Supabase user by email; if not, create one.
  const perPage = 200;
  const { data: listData, error: listErr } = await admin.auth.admin.listUsers({ perPage, page: 1 });
  if (listErr) throw new Error('Failed to list users');
  const found = (listData?.users || []).find(u => u.email?.toLowerCase() === localUser.email.toLowerCase());
  const userId = found?.id;
  let ensuredId = userId;
  if (!ensuredId) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({ email: localUser.email });
    if (createErr || !created?.user?.id) throw new Error('Failed to ensure Supabase user');
    ensuredId = created.user.id;
  }

  // Resolve role from profiles table
  const { data: profile, error: roleErr } = await admin
    .from('profiles')
    .select('role')
    .eq('id', ensuredId)
    .maybeSingle();
  if (roleErr) throw new Error('Failed to load role');
  const role: Role = (profile?.role as Role) || 'member';

  return { user: { id: ensuredId, email: localUser.email }, role };
}

export async function getUserRole(userId: string): Promise<Role | null> {
  const admin = getSupabaseAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.from('profiles').select('role').eq('id', userId).maybeSingle();
  if (error) return null;
  const role = (data?.role as Role) || null;
  return role;
}