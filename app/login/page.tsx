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
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName, email, password }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || 'Registration failed');
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
        <p style={{ color: '#aab2c0' }}>Log in or create an account to access the employee tools.</p>
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
          </>
        ) : (
          <>
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Username</label>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
            <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
          </>
        )}
        <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff' }} />

        {error && <div style={{ marginTop: 10, color: '#ffd27a' }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ marginTop: 12, width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', color: '#fff', fontWeight: 600 }}>
          {loading ? (mode === 'login' ? 'Signing in…' : 'Creating account…') : (mode === 'login' ? 'Sign In' : 'Create Account')}
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