import { NextResponse } from 'next/server';
import { requestPasswordReset, resetPasswordByToken } from '../../../lib/authStore';
import { sendEmail } from '../../../lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = (body?.mode || 'request') as 'request' | 'confirm';
    if (mode === 'request') {
      const email = (body?.email || '').trim();
      if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
      const { token } = requestPasswordReset(email);
      if (!token) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
      const subject = `Password reset`;
      const html = `<p>Your reset token: <b>${token}</b></p>`;
      const result = await sendEmail(email, subject, html, `Reset token: ${token}`);
      return NextResponse.json({ ok: true, reset_token: token, email_sent: !!result.ok, email_error: result.ok ? undefined : result.error });
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