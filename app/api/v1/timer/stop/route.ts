import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../lib/supabaseAuthBridge';

export async function POST(request: Request) {
  try {
    const admin = getSupabaseAdminClient();
    const { user } = await resolveSupabaseUserBySession(request, admin);

    const body = await request.json();
    const id = (body?.id || '').trim();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const nowIso = new Date().toISOString();
    const { data: entry, error } = await admin
      .from('time_entries')
      .update({ end_time: nowIso })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('*')
      .single();
    if (error) throw error;

    const startMs = new Date(entry.start_time).getTime();
    const endMs = new Date(entry.end_time).getTime();
    const duration = Math.max(0, Math.round((endMs - startMs) / 1000));
    const { error: durErr, data: finalEntry } = await admin
      .from('time_entries')
      .update({ duration })
      .eq('id', id)
      .select('*')
      .single();
    if (durErr) throw durErr;

    return NextResponse.json({ ok: true, entry: finalEntry }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Timer stop failed' }, { status: 400 });
  }
}