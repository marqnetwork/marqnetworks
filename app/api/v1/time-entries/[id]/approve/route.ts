import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../../../lib/supabaseAuthBridge';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getSupabaseAdminClient();
    const { role } = await resolveSupabaseUserBySession();
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const id = params.id;
    const { data, error } = await admin
      .from('time_entries')
      .update({ approved: true })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, entry: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Approve failed' }, { status: 400 });
  }
}
