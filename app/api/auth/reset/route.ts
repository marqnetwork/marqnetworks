import { NextResponse } from 'next/server';
import { requestPasswordReset, resetPasswordByToken } from '../../../lib/authStore';
import { sendEmail } from '../../../lib/mailer';
import { getSupabaseServerClient, getSupabaseAdminClient } from '../../../lib/supabase';
import { listUsers } from '../../../lib/authStore';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = (body?.mode || 'request') as 'request' | 'confirm';
    if (mode === 'request') {
      const email = (body?.email || '').trim();
      const prefer = String(body?.prefer || '').trim().toLowerCase();
      const providerParam = String(body?.provider || '').trim().toLowerCase();
      const forceLocal = prefer === 'local' || providerParam === 'local';
      if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
      if (!forceLocal) {
        const supa = getSupabaseServerClient();
        const h = (req as any).headers as Headers;
        const host = h?.get('x-forwarded-host') || h?.get('host') || new URL(req.url).host;
        const proto = h?.get('x-forwarded-proto') || (req.url.startsWith('https') ? 'https' : 'http');
        const origin = `${proto}://${host}`;
        const redirectTo = `${origin}/reset`;
        const { error } = await supa.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) return NextResponse.json({ ok: false, error: error.message, via: 'supabase' }, { status: 400 });
        return NextResponse.json({ ok: true, via: 'supabase' }, { status: 200 });
      }

      const { token } = requestPasswordReset(email);
      if (!token) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
      const h = (req as any).headers as Headers;
      const host = h?.get('x-forwarded-host') || h?.get('host') || new URL(req.url).host;
      const proto = h?.get('x-forwarded-proto') || (req.url.startsWith('https') ? 'https' : 'http');
      const baseUrl = `${proto}://${host}`;
      const link = `${baseUrl}/reset/${encodeURIComponent(token)}`;
      const subject = `Password reset`;
      const html = `<p>Click the link below to reset your password:</p><p><a href="${link}">${link}</a></p>`;
      const result = await sendEmail(email, subject, html, `Reset link: ${link}`);
      let provider: 'smtp' | 'sendgrid' | 'resend' | 'unknown' = 'unknown';
      if (process.env.SMTP_HOST && process.env.SMTP_USER) provider = 'smtp';
      else if (process.env.SENDGRID_API_KEY && (process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL)) provider = 'sendgrid';
      else if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) provider = 'resend';
      if (!result.ok) {
        return NextResponse.json({ ok: false, error: result.error || 'email_not_configured', provider }, { status: 400 });
      }
      return NextResponse.json({ ok: true, email_sent: true, via: 'local', provider });
    }
    const token = (body?.token || '').trim();
    const newPassword = (body?.new_password || '').trim();
    if (!token || !newPassword) return NextResponse.json({ ok: false, error: 'token and new_password required' }, { status: 400 });
    const localUser = listUsers().find(u => (u.resetToken || '') === token && (u.resetTokenExpires || 0) > Date.now()) || null;
    const ok = resetPasswordByToken(token, newPassword);
    if (!ok) return NextResponse.json({ ok: false, error: 'invalid_or_expired' }, { status: 400 });
    if (localUser?.email) {
      try {
        const admin = getSupabaseAdminClient();
        let found: any = null;
        let page = 1;
        const perPage = 200;
        while (!found) {
          const { data: list } = await admin.auth.admin.listUsers({ perPage, page });
          const users = (list?.users || []);
          const match = users.find((u: any) => (u.email || '').toLowerCase() === localUser.email.toLowerCase()) || null;
          if (match) { found = match; break; }
          if (users.length < perPage) break;
          page++;
        }
        if (found?.id) {
          await admin.auth.admin.updateUserById(found.id, { password: newPassword } as any);
        }
      } catch {}
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Reset failed' }, { status: 400 });
  }
}