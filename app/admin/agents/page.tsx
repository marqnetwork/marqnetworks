"use client";
import { useEffect, useMemo, useState } from "react";
import "../style.css";

type Device = { device_id: string; os: string | null; version: string | null; last_seen_at: string };

export default function AdminAgentsPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [userId, setUserId] = useState("");
  const [latest, setLatest] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (userId) qs.set("user_id", userId);
      const res = await fetch(`/api/v1/agent/devices?${qs.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load devices");
      setDevices(json.devices || []);
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function loadUpdateInfo() {
    try {
      const res = await fetch(`/api/v1/agent/update`);
      const json = await res.json();
      if (res.ok) {
        setLatest(json.latest_version || null);
        setDownloadUrl(json.download_url || null);
      }
    } catch {}
  }

  useEffect(() => { load(); loadUpdateInfo(); }, []);

  const now = Date.now();
  function online(lastSeen: string) {
    const ts = Date.parse(lastSeen);
    return !isNaN(ts) && (now - ts) < 5 * 60 * 1000; // 5 minutes
  }

  return (
    <div className="admin-wrap">
      <section className="admin-hero">
        <div className="tag-pill">Admin · Agents</div>
        <h1 className="admin-title">Windows Agent Devices</h1>
        <p className="admin-sub">Registered devices, versions, and last activity.</p>
      </section>
      <section className="admin-actions">
        <div className="adm-actions-bar">
          <div>
            <div className="metric-label">User ID (optional)</div>
            <input className="adm-input" value={userId} onChange={e => setUserId(e.target.value)} placeholder="uuid" />
          </div>
          <button className="adm-btn" onClick={load}>Load Devices</button>
          {latest && (
            <div className="metric-label" style={{ marginLeft: 'auto' }}>Latest: {latest} {downloadUrl && (<a style={{ color: '#9ad0ff' }} href={downloadUrl} target="_blank">Download</a>)}</div>
          )}
        </div>
      </section>
      {error && <div style={{ color: '#ff8a8a', marginTop: 12 }}>{error}</div>}
      <section style={{ marginTop: 16 }}>
        <div className="admin-grid">
          {devices.map(d => (
            <div className="adm-card" key={d.device_id}>
              <div className="adm-card-head">
                <div className="adm-user">{d.device_id}</div>
                <span className={`adm-badge ${online(d.last_seen_at) ? 'green' : 'gray'}`}>{online(d.last_seen_at) ? 'Online' : 'Offline'}</span>
              </div>
              <div className="adm-card-body">
                <div className="adm-row"><span className="adm-label">OS</span><span className="adm-value">{d.os || '-'}</span></div>
                <div className="adm-row"><span className="adm-label">Version</span><span className="adm-value">{d.version || '-'}</span></div>
                <div className="adm-row"><span className="adm-label">Last Seen</span><span className="adm-value">{d.last_seen_at}</span></div>
              </div>
            </div>
          ))}
          {devices.length === 0 && (
            <div className="adm-empty">No devices found.</div>
          )}
        </div>
      </section>
    </div>
  );
}