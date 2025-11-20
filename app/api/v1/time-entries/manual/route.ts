import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../lib/supabaseAuthBridge';

export async function POST(request: Request) {
  try {
    const admin = getSupabaseAdminClient();
    const { user } = await resolveSupabaseUserBySession();

    const body = await request.json();
    const startIso = body?.start_time;
    const endIso = body?.end_time;
    const duration = body?.duration;
    if (!startIso || !endIso || typeof duration !== 'number') {
      return NextResponse.json({ error: 'start_time, end_time, duration required' }, { status: 400 });
    }

    const { data, error } = await admin
      .from('time_entries')
      .insert({ user_id: user.id, start_time: startIso, end_time: endIso, duration, source: 'manual', approved: false })
      .select('*')
      .single();
    if (error) throw error;

    return NextResponse.json({ ok: true, entry: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Manual add failed' }, { status: 400 });
  }
}