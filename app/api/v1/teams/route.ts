import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../lib/supabaseAuthBridge';

export async function POST(request: Request) {
  try {
    const admin = getSupabaseAdminClient();
    const { user, role } = await resolveSupabaseUserBySession(request, admin);
    if (role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const name = (body?.name || '').trim();
    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

    const { data: team, error } = await admin
      .from('teams')
      .insert({ name, created_by: user.id })
      .select('*')
      .single();
    if (error) throw error;

    // Make creator a manager of the team
    await admin.from('team_members').insert({ team_id: team.id, user_id: user.id, is_manager: true });

    return NextResponse.json({ ok: true, team }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Create team failed' }, { status: 400 });
  }
}