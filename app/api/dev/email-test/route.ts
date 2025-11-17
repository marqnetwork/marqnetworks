import { NextResponse } from 'next/server';
import { sendEmail, sendViaSMTP } from '../../../lib/mailer';

export async function GET(req: Request) {
  const url = new URL((req as any).url);
  const to = (url.searchParams.get('to') || '').trim();
  if (!to) return NextResponse.json({ ok: false, error: 'missing_to' }, { status: 400 });
  const subject = 'Email test';
  const html = '<p>This is a test email from the dev endpoint.</p>';
  const providerParam = (url.searchParams.get('provider') || '').trim();
  let result: any;
  let provider: 'sendgrid' | 'resend' | 'smtp' | 'unknown' = 'unknown';
  if (providerParam === 'smtp') {
    provider = 'smtp';
    result = await sendViaSMTP(to, subject, html, 'This is a test email.');
  } else {
    result = await sendEmail(to, subject, html, 'This is a test email.');
    if (process.env.SMTP_HOST && process.env.SMTP_USER) provider = 'smtp';
    else if (process.env.SENDGRID_API_KEY && (process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL)) provider = 'sendgrid';
    else if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) provider = 'resend';
  }
  return NextResponse.json({ ok: !!result.ok, provider, error: result.ok ? undefined : result.error });
}