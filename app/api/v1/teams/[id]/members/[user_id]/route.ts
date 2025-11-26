import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../../../lib/supabaseAuthBridge';

export async function DELETE(request: Request, { params }: { params: { id: string; user_id: string } }) {
  try {
    const admin = getSupabaseAdminClient();
    const { user, role } = await resolveSupabaseUserBySession();

    const teamId = params.id;
    const targetUserId = params.user_id;

    let canRemove = false;
    if (role === 'admin') {
      canRemove = true;
    } else {
      const { data: tm } = await admin
        .from('team_members')
        .select('is_manager')
        .eq('team_id', teamId)
        .eq('user_id', user.id)
        .maybeSingle();
      canRemove = !!tm?.is_manager;
    }
    if (!canRemove) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { error } = await admin
      .from('team_members')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', targetUserId);
    if (error) throw error;

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    const msg = typeof err?.message === 'string' ? err.message : 'Remove member failed';
    const status = msg.includes('Supabase admin client not configured') || msg.includes('No session') ? 401 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
