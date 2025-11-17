import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getUserById, inviteUser, hasSuperAdmin } from '../../../lib/authStore';
import { sendEmail } from '../../../lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || '').trim();
    const firstName = (body?.first_name || '').trim();
    const lastName = (body?.last_name || '').trim();
    const role = (body?.role || 'member') as 'super_admin' | 'manager' | 'member';
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
    const cookieStore = await cookies();
    const sid = cookieStore.get('session_id')?.value || '';
    const ses = sid ? getSession(sid) : null;
    if (!ses) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    const actor = getUserById(ses.userId);
    const actorRole = actor?.role || 'member';
    const superReady = hasSuperAdmin();
    if (superReady) {
      if (!(actorRole === 'super_admin' || actorRole === 'manager')) {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
      if (role === 'super_admin' && actorRole !== 'super_admin') {
        return NextResponse.json({ ok: false, error: 'Only super_admin can assign super_admin' }, { status: 403 });
      }
    }
    const { user, token } = inviteUser(email, firstName, lastName, role);
    const origin = new URL((req as any).url).origin;
    const link = `${origin}/onboarding/${token}`;
    const subject = `Your MarQ Networks onboarding link`;
    const html = `<p>Hello ${firstName || ''},</p><p>Please complete your onboarding here:</p><p><a href="${link}">${link}</a></p>`;
    const result = await sendEmail(email, subject, html, `Complete onboarding: ${link}`);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, first_name: user.firstName || '', last_name: user.lastName || '', role: user.role, status: user.status }, invite_token: token, email_sent: !!result.ok, email_error: result.ok ? undefined : result.error });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Invite failed' }, { status: 400 });
  }
}