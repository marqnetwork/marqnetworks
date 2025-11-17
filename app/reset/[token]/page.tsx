"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '../../admin/style.css';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams() as { token?: string };
  const token = (params?.token || '').trim();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (!token) throw new Error('Invalid reset link');
      if (!newPassword || newPassword.length < 6) throw new Error('Password must be at least 6 characters');
      if (newPassword !== confirmPassword) throw new Error('Passwords do not match');
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'confirm', token, new_password: newPassword })
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Reset failed');
      setMessage('Password updated. You can now sign in.');
      setTimeout(() => router.replace('/login'), 800);
    } catch (e: any) {
      setError(e?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adm-container">
      <div className="adm-card" style={{ maxWidth: 520, margin: '40px auto' }}>
        <div className="adm-card-head">
          <div className="adm-user">Reset Password</div>
        </div>
        <div className="adm-card-body">
          <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff', marginBottom: 10 }} />
          <label style={{ display: 'block', fontSize: 12, color: '#9aa3b2', marginBottom: 4 }}>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={6} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e5f3ff' }} />
          {error && <div style={{ marginTop: 10, color: '#ffd27a' }}>{error}</div>}
          {message && <div style={{ marginTop: 10, color: '#9ad0ff' }}>{message}</div>}
        </div>
        <div className="adm-card-body" style={{ display: 'flex', gap: 10 }}>
          <button className="adm-btn primary" disabled={loading || !newPassword || !confirmPassword} onClick={submit}>Update Password</button>
          <button className="adm-btn" onClick={() => router.replace('/login')}>Back to Login</button>
        </div>
      </div>
    </div>
  );
}