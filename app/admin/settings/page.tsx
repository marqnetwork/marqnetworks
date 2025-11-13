"use client";
import { useEffect, useState } from "react";
import "../style.css";

type Setting = { key: string; value: any };

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [k, setK] = useState("");
  const [v, setV] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const res = await fetch("/api/v1/settings");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load settings");
      setSettings(json.settings || []);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function save() {
    setError(null);
    try {
      const res = await fetch("/api/v1/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: k, value: v }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setK("");
      setV("");
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div className="admin-wrap">
      <section className="admin-hero">
        <div className="tag-pill">Admin · Settings</div>
        <h1 className="admin-title">Application Settings</h1>
        <p className="admin-sub">Global toggles and key-value configurations.</p>
      </section>
      {error && <div style={{ color: '#ff8a8a', marginTop: 12 }}>{error}</div>}

      <section className="admin-actions">
        <div className="adm-actions-bar">
          <div>
            <div className="metric-label">Key</div>
            <input className="adm-input" value={k} onChange={e => setK(e.target.value)} placeholder="agent_latest_version" />
          </div>
          <div>
            <div className="metric-label">Value</div>
            <input className="adm-input" value={v} onChange={e => setV(e.target.value)} placeholder="1.0.0" />
          </div>
          <button className="adm-btn primary" onClick={save} disabled={!k}>Save</button>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <div className="overflow-auto">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {settings.map(s => (
                <tr key={s.key}>
                  <td style={{ fontWeight: 600 }}>{s.key}</td>
                  <td>{String(s.value)}</td>
                </tr>
              ))}
              {settings.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ color: '#9aa3b2', padding: 18 }}>No settings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}