import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../lib/supabaseAuthBridge';

export async function POST(request: Request) {
  try {
    const admin = getSupabaseAdminClient();
    const { user } = await resolveSupabaseUserBySession(request, admin);

    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const now = new Date().toISOString();

    const { data, error } = await admin
      .from('attendance')
      .upsert({ user_id: user.id, date: dateStr, clock_in_at: now, status: 'working' }, { onConflict: 'user_id,date' })
      .select('*')
      .single();
    if (error) throw error;

    return NextResponse.json({ ok: true, attendance: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Clock-in failed' }, { status: 400 });
  }
}