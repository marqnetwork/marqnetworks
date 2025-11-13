import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = (body?.email || '').trim();
    const role: 'super_admin' | 'team_manager' | 'member' = body?.role || 'member';
    const origin = new URL(req.url).origin;
    const redirectTo: string = body?.redirectTo || `${origin}/login`;

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json({ ok: false, error: 'Supabase admin not configured' }, { status: 500 });
    }

    // Try inviting the user (sends signup email). Fallback to createUser if invite not supported.
    let userId: string | null = null;
    try {
      const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo });
      if (error) throw error;
      userId = data?.user?.id || null;
    } catch (err) {
      const { data, error } = await admin.auth.admin.createUser({ email });
      if (error) throw error;
      userId = data?.user?.id || null;
    }

    // Upsert the user's role into profiles (default seed may exist, this ensures desired role)
    if (userId) {
      const { error: upsertErr } = await admin.from('profiles').upsert({ id: userId, role });
      if (upsertErr) {
        // Non-fatal: role can be set later by an admin
        console.warn('Failed to upsert role for invited user:', upsertErr.message);
      }
    }

    return NextResponse.json({ ok: true, userId, email }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Invite failed' }, { status: 400 });
  }
}