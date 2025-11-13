import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = (body?.email || '').trim();
    const origin = new URL(req.url).origin;
    const redirectTo: string = body?.redirectTo || `${origin}/login`;

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    const client = getSupabaseServerClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 500 });
    }

    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Reset failed' }, { status: 400 });
  }
}