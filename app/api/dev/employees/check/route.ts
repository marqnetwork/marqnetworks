import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase';

export async function GET(req: Request) {
  try {
    const url = new URL((req as any).url);
    const email = (url.searchParams.get('email') || '').trim();
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });

    const admin = getSupabaseAdminClient();
    let found: any = null;
    let page = 1;
    const perPage = 200;
    while (!found) {
      const { data: list } = await admin.auth.admin.listUsers({ perPage, page });
      const users = (list?.users || []);
      const match = users.find((u: any) => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
      if (match) { found = match; break; }
      if (users.length < perPage) break;
      page++;
    }

    const supabase_user_id = found?.id || null;
    const { data: emp, error } = supabase_user_id
      ? await admin.from('employees').select('*').eq('user_id', supabase_user_id).maybeSingle()
      : { data: null, error: null } as any;
    const { data: prof, error: profErr } = supabase_user_id
      ? await admin.from('profiles').select('*').eq('id', supabase_user_id).maybeSingle()
      : { data: null, error: null } as any;

    return NextResponse.json({ ok: true, supabase_user_id, employee: emp || null, profile: prof || null, error: error ? error.message : undefined, profile_error: profErr ? profErr.message : undefined });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'check_failed' }, { status: 500 });
  }
}