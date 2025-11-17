import { NextResponse } from 'next/server';

export async function GET() {
  const resend = {
    api_key: !!process.env.RESEND_API_KEY,
    from_email: process.env.RESEND_FROM_EMAIL || null,
  };
  const sendgrid = {
    api_key: !!process.env.SENDGRID_API_KEY,
    from_email: process.env.SENDGRID_FROM_EMAIL || null,
  };
  const smtp = {
    host: process.env.SMTP_HOST || null,
    port: process.env.SMTP_PORT || null,
    user_present: !!process.env.SMTP_USER,
    from_email: process.env.SMTP_FROM || null,
  };
  const admin = process.env.ADMIN_NOTIFY_EMAIL || null;
  let provider: 'smtp' | 'sendgrid' | 'resend' | 'unknown' = 'unknown';
  if (process.env.SMTP_HOST && process.env.SMTP_USER) provider = 'smtp';
  else if (process.env.SENDGRID_API_KEY && (process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL)) provider = 'sendgrid';
  else if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) provider = 'resend';
  return NextResponse.json({ ok: true, provider, resend, sendgrid, smtp, admin_notify_email: admin });
}