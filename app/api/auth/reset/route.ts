import { NextResponse } from 'next/server';
import { requestPasswordReset, resetPasswordByToken } from '../../../lib/authStore';
import { sendEmail } from '../../../lib/mailer';
import { getSupabaseServerClient } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = (body?.mode || 'request') as 'request' | 'confirm';
    if (mode === 'request') {
      const email = (body?.email || '').trim();
      if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });

      let supabaseOk = false;
      try {
        const supa = getSupabaseServerClient();
        const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || new URL(req.url).origin;
        const redirectTo = `${origin}/login`;
        const { error } = await supa.auth.resetPasswordForEmail(email, { redirectTo });
        if (!error) supabaseOk = true;
      } catch {}

      if (supabaseOk) {
        return NextResponse.json({ ok: true, via: 'supabase' }, { status: 200 });
      }

      const { token } = requestPasswordReset(email);
      if (!token) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || new URL(req.url).origin;
      const link = `${baseUrl}/reset/${encodeURIComponent(token)}`;
      const subject = `Password reset`;
      const html = `<p>Click the link below to reset your password:</p><p><a href="${link}">${link}</a></p>`;
      const result = await sendEmail(email, subject, html, `Reset link: ${link}`);
      return NextResponse.json({ ok: true, email_sent: !!result.ok, email_error: result.ok ? undefined : result.error, via: 'local' });
    }
    const token = (body?.token || '').trim();
    const newPassword = (body?.new_password || '').trim();
    if (!token || !newPassword) return NextResponse.json({ ok: false, error: 'token and new_password required' }, { status: 400 });
    const ok = resetPasswordByToken(token, newPassword);
    if (!ok) return NextResponse.json({ ok: false, error: 'invalid_or_expired' }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Reset failed' }, { status: 400 });
  }
}