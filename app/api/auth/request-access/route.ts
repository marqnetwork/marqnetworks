import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { makeId, inviteUser } from '../../../lib/authStore';
import { sendEmail } from '../../../lib/mailer';

function ensureFile(p: string) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(p)) fs.writeFileSync(p, JSON.stringify({ requests: [] }, null, 2), 'utf-8');
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || '').trim();
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
    const dataPath = path.join(process.cwd(), 'data', 'access_requests.json');
    ensureFile(dataPath);
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(raw);
    const exists = (data.requests || []).find((r: any) => (r.email || '').toLowerCase() === email.toLowerCase() && r.status === 'pending');
    const rec = exists || { id: makeId(), email, status: 'pending', createdAt: Date.now() };
    data.requests = Array.isArray(data.requests) ? data.requests : [];
    if (!exists) data.requests.push(rec);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

    // Create a dummy invite immediately so the user can open the onboarding form without email
    const { token } = inviteUser(email, '', '', 'member');
    const origin = new URL((req as any).url).origin;
    const link = `${origin}/onboarding/${token}`;
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_FROM || process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || '';
    let notifyResult: any = null;
    if (adminEmail) {
      const subject = `Access request`;
      const html = `<p>New access request</p><p>Email: ${email}</p>`;
      notifyResult = await sendEmail(adminEmail, subject, html, `New access request: ${email}`);
    }
    let ackResult: any = null;
    {
      const subject = `Access request received – complete onboarding`;
      const html = `
        <p>Thanks for requesting access to MarQ Networks.</p>
        <p>Please complete your onboarding here:</p>
        <p><a href="${link}">${link}</a></p>
        <hr />
        <p>Information to prepare:</p>
        <ul>
          <li>Full legal name; Preferred name</li>
          <li>Personal email; Phone number (WhatsApp)</li>
          <li>CNIC/Passport number; CNIC/Passport front + back</li>
          <li>Date of birth; Full home address</li>
          <li>Emergency contact (name, relation, phone)</li>
          <li>Bank name; Account title; Account number/IBAN; Branch code; Bank city</li>
          <li>Role joining; Department; Salary (monthly)</li>
          <li>Working days; Working hours; Work mode (remote/hybrid/office)</li>
          <li>Laptop specs; Company assets checklist</li>
          <li>Social links; CV; Portfolio</li>
          <li>Past experience summary</li>
          <li>Tax status/NTN; Medical conditions</li>
          <li>T-shirt size; Profile picture</li>
          <li>Preferred MarQ email username; Tools required; Access level</li>
          <li>How you heard about the job; Availability to start; Expected growth (6–12 months)</li>
        </ul>
      `;
      const text = `Complete onboarding: ${link}`;
      ackResult = await sendEmail(email, subject, html, text);
    }
    let provider: 'smtp' | 'sendgrid' | 'resend' | 'unknown' = 'unknown';
    if (process.env.SMTP_HOST && process.env.SMTP_USER) provider = 'smtp';
    else if (process.env.SENDGRID_API_KEY && (process.env.SENDGRID_FROM_EMAIL || process.env.RESEND_FROM_EMAIL)) provider = 'sendgrid';
    else if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) provider = 'resend';
    return NextResponse.json({ ok: true, provider, onboarding_link: link, invite_token: token, admin_email_sent: !!(notifyResult && notifyResult.ok), admin_email_error: notifyResult && !notifyResult.ok ? notifyResult.error : undefined, user_ack_sent: !!(ackResult && ackResult.ok), user_ack_error: ackResult && !ackResult.ok ? ackResult.error : undefined });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'request_failed' }, { status: 400 });
  }
}