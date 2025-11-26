import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getUserById, inviteUser, hasSuperAdmin } from '../../../lib/authStore';
import { sendEmail } from '../../../lib/mailer';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import { resolveSupabaseUserBySession } from '../../../lib/supabaseAuthBridge';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || '').trim();
    const firstName = (body?.first_name || '').trim();
    const lastName = (body?.last_name || '').trim();
    const role = (body?.role || 'member') as 'super_admin' | 'manager' | 'member';
    const salaryMonthly = Number(body?.salary_monthly || 0) || undefined;
    const department = (body?.department || '').trim();
    const totalDays = Number(body?.total_days || 0) || undefined;
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
    let actorRole: 'admin' | 'employee' = 'employee';
    try {
      const { role } = await resolveSupabaseUserBySession();
      actorRole = role;
    } catch {
      const cookieStore = await cookies();
      const sid = cookieStore.get('session_id')?.value || '';
      const ses = sid ? getSession(sid) : null;
      if (!ses) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
      const actor = getUserById(ses.userId);
      actorRole = ((actor?.role as any) === 'admin') ? 'admin' : 'employee';
    }
    const superReady = hasSuperAdmin();
    if (superReady) {
      if (actorRole !== 'admin') {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
      if (role === 'super_admin' && actorRole !== 'admin') {
        return NextResponse.json({ ok: false, error: 'Only admin can assign admin' }, { status: 403 });
      }
    }
    const { user, token } = inviteUser(email, firstName, lastName, role);
    try {
      const supa = getSupabaseAdminClient();
      const { data: list } = await supa.auth.admin.listUsers({ perPage: 200, page: 1 });
      const found = (list?.users || []).find((u: any) => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
      const userMeta: any = { invite_token: token, invite_expires: Date.now() + 7 * 24 * 60 * 60 * 1000, onboarding_preset: { salaryMonthly, department, workingDays: totalDays } };
      if (!found) {
        await supa.auth.admin.createUser({ email, user_metadata: userMeta } as any);
      } else {
        await supa.auth.admin.updateUserById(found.id, { user_metadata: userMeta } as any);
      }
    } catch {}
    const origin = new URL((req as any).url).origin;
    const link = `${origin}/onboarding/${token}`;
    const subject = `Your MarQ Networks onboarding link`;
    const html = `<p>Hello ${firstName || ''},</p><p>Please complete your onboarding here:</p><p><a href="${link}">${link}</a></p><hr /><p>Preset details:</p><ul>${salaryMonthly ? `<li>Salary (monthly): ${salaryMonthly}</li>` : ''}${department ? `<li>Department: ${department}</li>` : ''}${totalDays ? `<li>Total days: ${totalDays}</li>` : ''}</ul>`;
    const result = await sendEmail(email, subject, html, `Complete onboarding: ${link}`);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, first_name: user.firstName || '', last_name: user.lastName || '', role: user.role, status: user.status }, invite_token: token, email_sent: !!result.ok, email_error: result.ok ? undefined : result.error });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Invite failed' }, { status: 400 });
  }
}
