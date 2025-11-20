import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const res = NextResponse.json({ ok: true });
    // Clear auth cookies
    try { res.cookies.delete('supabase_user_id'); } catch {}
    try { res.cookies.delete('supabase_user_email'); } catch {}
    try { res.cookies.delete('session_id'); } catch {}
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Logout failed' }, { status: 500 });
  }
}