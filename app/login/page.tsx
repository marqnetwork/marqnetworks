'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function LoginContent() {
  const search = useSearchParams();
  const next = search.get('next') || '/employee';
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  // reset flow now email-only; confirmation happens on /reset/[token]
  const [failCount, setFailCount] = useState(0);
  const [allowReset, setAllowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [onboardingLink, setOnboardingLink] = useState<string | null>(null);
  const [emailProvider, setEmailProvider] = useState<string | null>(null);
  const [emailErrors, setEmailErrors] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/session', { credentials: 'include' });
        const json = await res.json();
        if (res.ok && json?.user?.id) {
          const nextParam = (typeof window !== 'undefined') ? new URL(window.location.href).searchParams.get('next') : null;
          const target = nextParam || '/employee';
          router.replace(target);
          setTimeout(() => { try { window.location.assign(target); } catch {} }, 100);
        }
      } catch {}
    })();
  }, [next, router]);

  useEffect(() => {
    try {
      const key = `login_fail_count:${identifier.trim().toLowerCase()}`;
      const n = Number(localStorage.getItem(key) || '0');
      setFailCount(isNaN(n) ? 0 : n);
      setAllowReset((isNaN(n) ? 0 : n) >= 5);
    } catch {}
  }, [identifier]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ identifier, password }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || 'Login failed');
        try {
          const key = `login_fail_count:${identifier.trim().toLowerCase()}`;
          localStorage.setItem(key, '0');
          setFailCount(0);
          setAllowReset(false);
        } catch {}
      } else if (mode === 'register') {
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
        setOnboardingLink(null);
        setMessage(null);
        setToast('Request received. Check your email for the onboarding link.');
        setTimeout(() => setToast(null), 4000);
        setEmail('');
        return;
      } else {
        return;
      }
      {
        const nextParam = (typeof window !== 'undefined') ? new URL(window.location.href).searchParams.get('next') : null;
        const target = nextParam || '/employee';
        try { window.location.href = target; } catch {}
        router.replace(target);
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      if (mode === 'login') {
        try {
          const key = `login_fail_count:${identifier.trim().toLowerCase()}`;
          const n = Number(localStorage.getItem(key) || '0');
          const nextN = (isNaN(n) ? 0 : n) + 1;
          localStorage.setItem(key, String(nextN));
          setFailCount(nextN);
          setAllowReset(nextN >= 5);
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  }

  async function sendReset() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'request', email: resetEmail }) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Reset failed');
      setMessage('Reset link sent to email');
    } catch (e: any) {
      setError(e?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  }

  // confirmation handled on /reset/[token]

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: 12, color: '#9ad0ff', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>Access</div>
        <h1 style={{ marginTop: 10, fontSize: 28, fontWeight: 700, letterSpacing: 0.2, background: 'linear-gradient(90deg, #e5f3ff, #a8d8ff 50%, #e5f3ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Sign in to continue</h1>
        <p style={{ color: '#aab2c0' }}>Log in or request access to the employee tools.</p>
      </div>
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, background: 'rgba(17,17,17,0.95)', border: '1px solid rgba(255,255,255,0.12)', color: '#e5f3ff', padding: '10px 12px', borderRadius: 8, zIndex: 1000 }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setMode('login')} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: mode === 'login' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#e5f3ff' }}>Login</button>
        <button onClick={() => setMode('register')} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: mode === 'register' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#e5f3ff' }}>Create Account</button>
        {allowReset && (
          <button onClick={() => setMode('reset')} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: mode === 'reset' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#e5f3ff' }}>Reset Password</button>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, background: 'rgba(255,255,255,0.03)' }}>
        {mode === 'login' ? (
          <>
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Username or Email</label>
            <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
          <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff' }} />
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={() => setMode('reset')} style={{ fontSize: 12, color: '#9ad0ff', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
          </div>
          {!allowReset && failCount > 0 && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#9aa3b2' }}>Attempts: {failCount}/5</div>
          )}
          </>
        ) : mode === 'register' ? (
          <>
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
            {emailErrors && (
              <div style={{ marginTop: 6, color: '#ff8a8a' }}>Email error: {emailErrors}</div>
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'grid', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Email</label>
                <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff' }} />
                <button type="button" onClick={sendReset} disabled={loading || !resetEmail} style={{ marginTop: 8, width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(59,130,246,0.25)', color: '#e5f3ff' }}>Send Reset Email</button>
                {message && <div style={{ marginTop: 6, color: '#9ad0ff' }}>{message}</div>}
              </div>
            </div>
          </>
        )}

        {error && <div style={{ marginTop: 10, color: '#ffd27a' }}>{error}</div>}
        {mode !== 'reset' && (
          <button type="submit" disabled={loading} style={{ marginTop: 12, width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', color: '#fff', fontWeight: 600 }}>
            {loading ? (mode === 'login' ? 'Signing in…' : 'Requesting access…') : (mode === 'login' ? 'Sign In' : 'Request Access')}
          </button>
        )}
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