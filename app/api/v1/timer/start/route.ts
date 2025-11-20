import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../lib/supabaseAuthBridge';

export async function POST(request: Request) {
  try {
    const admin = getSupabaseAdminClient();
    const { user } = await resolveSupabaseUserBySession();

    const now = new Date().toISOString();
    const { data, error } = await admin
      .from('time_entries')
      .insert({ user_id: user.id, start_time: now, source: 'timer', approved: true })
      .select('*')
      .single();
    if (error) throw error;

    return NextResponse.json({ ok: true, entry: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Timer start failed' }, { status: 400 });
  }
}