import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../../lib/supabaseAuthBridge';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getSupabaseAdminClient();
    const teamId = params.id;
    const { data, error } = await admin
      .from('team_members')
      .select('user_id, is_manager')
      .eq('team_id', teamId);
    if (error) throw error;
    return NextResponse.json({ members: data || [] }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Fetch members failed' }, { status: 400 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getSupabaseAdminClient();
    const { user, role } = await resolveSupabaseUserBySession();
    const teamId = params.id;

    // Check if actor is a manager of this team or admin
    let isManager = false;
    if (role === 'admin') {
      isManager = true;
    } else {
      const { data: tm } = await admin
        .from('team_members')
        .select('is_manager')
        .eq('team_id', teamId)
        .eq('user_id', user.id)
        .maybeSingle();
      isManager = !!tm?.is_manager;
    }
    if (!isManager) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const userId = (body?.userId || '').trim();
    const is_manager = !!body?.is_manager;
    if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });

    const { error } = await admin
      .from('team_members')
      .upsert({ team_id: teamId, user_id: userId, is_manager });
    if (error) throw error;

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Add member failed' }, { status: 400 });
  }
}
