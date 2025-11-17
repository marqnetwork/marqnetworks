'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function LoginContent() {
  const search = useSearchParams();
  const next = search.get('next') || '/employee';
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [onboardingLink, setOnboardingLink] = useState<string | null>(null);
  const [emailProvider, setEmailProvider] = useState<string | null>(null);
  const [emailErrors, setEmailErrors] = useState<string | null>(null);

  useEffect(() => {
    // If already has a session cookie, just go to next
    if (document.cookie.split(';').some(c => c.trim().startsWith('session_id='))) {
      router.replace(next);
    }
  }, [next, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || 'Login failed');
      } else {
        const res = await fetch('/api/auth/request-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || 'Request failed');
        let link = json.onboarding_link || null;
        if (!link && json.invite_token && typeof window !== 'undefined') {
          try { link = `${window.location.origin}/onboarding/${json.invite_token}`; } catch {}
        }
        setEmailProvider(json.provider || null);
        const errs = [json.admin_email_error, json.user_ack_error].filter(Boolean).join(' | ');
        setEmailErrors(errs || null);
        setOnboardingLink(link);
        setMessage(link ? 'Access granted for demo. Open the onboarding form below.' : 'Thanks! We will email you an onboarding link soon.');
        setEmail('');
        return;
      }
      router.replace(next);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: 12, color: '#9ad0ff', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>Access</div>
        <h1 style={{ marginTop: 10, fontSize: 28, fontWeight: 700, letterSpacing: 0.2, background: 'linear-gradient(90deg, #e5f3ff, #a8d8ff 50%, #e5f3ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Sign in to continue</h1>
        <p style={{ color: '#aab2c0' }}>Log in or request access to the employee tools.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setMode('login')} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: mode === 'login' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#e5f3ff' }}>Login</button>
        <button onClick={() => setMode('register')} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: mode === 'register' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#e5f3ff' }}>Create Account</button>
      </div>

      <form onSubmit={handleSubmit} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, background: 'rgba(255,255,255,0.03)' }}>
        {mode === 'login' ? (
          <>
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Username or Email</label>
            <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff' }} />
          </>
        ) : (
          <>
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
            {message && <div style={{ marginTop: 6, color: '#9ad0ff' }}>{message}</div>}
            {emailProvider && (
              <div style={{ marginTop: 6, fontSize: 12, color: '#9aa3b2' }}>Email provider: {emailProvider}</div>
            )}
            {emailErrors && (
              <div style={{ marginTop: 6, color: '#ff8a8a' }}>Email error: {emailErrors}</div>
            )}
            {onboardingLink && (
              <div style={{ marginTop: 10, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: 10, background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize: 12, color: '#9aa3b2', marginBottom: 6 }}>Onboarding link</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <a href={onboardingLink} target="_blank" rel="noreferrer" style={{ color: '#9ad0ff', textDecoration: 'underline', wordBreak: 'break-all' }}>{onboardingLink}</a>
                  <button type="button" onClick={() => { try { navigator.clipboard.writeText(onboardingLink); } catch {} }} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(59,130,246,0.25)', color: '#e5f3ff' }}>Copy</button>
                </div>
              </div>
            )}
          </>
        )}

        {error && <div style={{ marginTop: 10, color: '#ffd27a' }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ marginTop: 12, width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', color: '#fff', fontWeight: 600 }}>
          {loading ? (mode === 'login' ? 'Signing in…' : 'Requesting access…') : (mode === 'login' ? 'Sign In' : 'Request Access')}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
      <LoginContent />
    </Suspense>
  );
}