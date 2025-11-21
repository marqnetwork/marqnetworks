"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) setStatus(error.message);
      setReady(!!data.session);
      if (!data.session) setStatus("Open the latest reset link from your email.");
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) { setStatus("Invalid or expired reset link."); return; }
    if (!password || password.length < 6) { setStatus("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setStatus("Passwords do not match."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setStatus(error.message || "Failed to update password."); return; }
    setStatus("Password updated. Redirecting to login…");
    setTimeout(() => window.location.assign("/login"), 1200);
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 20, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }}>
      <h2 style={{ marginBottom: 6 }}>Reset Password</h2>
      <p style={{ color: "#9aa3b2", marginBottom: 18 }}>Enter your new password.</p>
      {status && <div style={{ color: "#9ad0ff", marginBottom: 12 }}>{status}</div>}
      <form onSubmit={submit}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontSize: 12, color: "#fff", marginBottom: 6 }}>New password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} style={{ width: "100%", padding: 10, borderRadius: 8 ,color:"#fff" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, color: "#fff", marginBottom: 6 }}>Confirm password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6} style={{ width: "100%", padding: 10, borderRadius: 8 ,color:"#fff" }} />
        </div>
        <button type="submit" disabled={busy} style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(59,130,246,0.35)", color: "#e5f3ff" }}>
          Update Password
        </button>
      </form>
    </div>
  );
}