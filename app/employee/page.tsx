'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import MarqButton from '@/components/MarqButton/MarqButton';
import './style.css';

type EventType = 'check_in' | 'check_out' | 'break_start' | 'break_end' | 'snapshot';

type AttendanceEvent = {
  id: string;
  userName: string;
  type: EventType;
  timestamp: number; // ms epoch
};

type ClickEvent = {
  id: string;
  userName: string;
  timestamp: number;
  x: number;
  y: number;
  tagName: string;
  label?: string;
};

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readEvents(): AttendanceEvent[] {
  try {
    const raw = localStorage.getItem('attendanceEvents');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeEvents(events: AttendanceEvent[]) {
  try {
    localStorage.setItem('attendanceEvents', JSON.stringify(events));
  } catch {
    // ignore
  }
}

export default function EmployeePage() {
  const [userName, setUserName] = useState('');
  const [status, setStatus] = useState<'idle' | 'working' | 'on_break'>('idle');
  const [events, setEvents] = useState<AttendanceEvent[]>([]);
  const [checkInTs, setCheckInTs] = useState<number | null>(null);
  const [breakStartTs, setBreakStartTs] = useState<number | null>(null);
  const [totalBreakMs, setTotalBreakMs] = useState<number>(0);
  const [clickRecording, setClickRecording] = useState<boolean>(true);
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [monitoring, setMonitoring] = useState<boolean>(true);
  const [snapshotIntervalMin, setSnapshotIntervalMin] = useState<number>(5);
  const monitorIntervalRef = useRef<number | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Removed screen stream/video capture in favor of DOM snapshot to avoid permissions
  const [mouseMoves, setMouseMoves] = useState<number>(0);
  const [tick, setTick] = useState<number>(0); // force re-render every second during sessions
  const OFFICE_MS = 8 * 60 * 60 * 1000; // 8 hours standard office time
  // Idle detection state
  const [lastActivityTs, setLastActivityTs] = useState<number>(Date.now());
  const [idleVisible, setIdleVisible] = useState<boolean>(false);
  const [idleSecondsLeft, setIdleSecondsLeft] = useState<number>(60); // warn for 60s before auto-stop
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);

  useEffect(() => {
    setEvents(readEvents());
    try {
      const rawClicks = localStorage.getItem('employee_click_events');
      if (rawClicks) setClicks(JSON.parse(rawClicks));
      const rawSnaps = localStorage.getItem('employee_snapshots');
      if (rawSnaps) setSnapshots(JSON.parse(rawSnaps));
      const rawState = localStorage.getItem('employee_session_state');
      if (rawState) {
        const s = JSON.parse(rawState);
        if (s && typeof s === 'object') {
          if (s.status) setStatus(s.status);
          if (s.checkInTs) setCheckInTs(s.checkInTs);
          if (s.breakStartTs) setBreakStartTs(s.breakStartTs);
          if (typeof s.totalBreakMs === 'number') setTotalBreakMs(s.totalBreakMs);
        }
      }
    } catch {}
  }, []);

  // Load current user from session
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/session');
        const json = await res.json();
        if (res.ok) {
          setUserName(json?.user?.userName || '');
        }
      } catch {}
    })();
  }, []);

  // Track user activity to reset idle timers
  useEffect(() => {
    const resetActivity = () => {
      setLastActivityTs(Date.now());
      if (idleVisible) {
        setIdleVisible(false);
        setIdleSecondsLeft(60);
      }
    };
    const events: Array<[keyof WindowEventMap, (e: any) => void]> = [
      ['mousemove', resetActivity],
      ['mousedown', resetActivity],
      ['keydown', resetActivity],
      ['scroll', resetActivity],
      ['touchstart', resetActivity],
    ];
    events.forEach(([name, handler]) => window.addEventListener(name, handler as any, { passive: true }));
    return () => {
      events.forEach(([name, handler]) => window.removeEventListener(name, handler as any));
    };
  }, [idleVisible]);

  // Idle detection: after 7 minutes show popup, auto-stop after 8 minutes
  useEffect(() => {
    const warnMs = 7 * 60 * 1000;
    const stopMs = 8 * 60 * 1000;
    const id = window.setInterval(() => {
      if (status === 'idle') return; // only when in a session
      const now = Date.now();
      const idleMs = now - lastActivityTs;
      if (!idleVisible && idleMs >= warnMs) {
        setIdleVisible(true);
        setIdleSecondsLeft(Math.max(Math.floor((stopMs - idleMs) / 1000), 1));
        return;
      }
      if (idleVisible) {
        setIdleSecondsLeft((sec) => Math.max(sec - 1, 0));
        if (idleMs >= stopMs || idleSecondsLeft <= 0) {
          // Auto-stop: perform check-out
          handleCheckOut();
          setIdleVisible(false);
          setIdleSecondsLeft(60);
        }
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [status, lastActivityTs, idleVisible, idleSecondsLeft]);

  const todayStats = useMemo(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const today = events.filter((e) => e.timestamp >= startOfDay.getTime());
    const byUser = new Map<string, AttendanceEvent[]>();
    for (const e of today) {
      const list = byUser.get(e.userName) || [];
      list.push(e);
      byUser.set(e.userName, list);
    }
    return byUser;
  }, [events]);

  async function append(type: EventType, metadata?: Record<string, any>) {
    const ev: AttendanceEvent = {
      id: makeId(),
      userName: userName.trim() || 'Unknown',
      type,
      timestamp: Date.now(),
    };
    const next = [...events, ev];
    setEvents(next);
    writeEvents(next);
    // Also post to server to persist (Supabase if configured)
    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: ev.userName, type: ev.type, metadata: metadata || {} }),
      });
    } catch {
      // ignore network errors, local record remains
    }
  }

  const handleCheckIn = async () => {
    await append('check_in');
    setStatus('working');
    setCheckInTs(Date.now());
    setTotalBreakMs(0);
    setBreakStartTs(null);
    try { await startScreenCapture(); } catch {}
  };

  const handleCheckOut = async () => {
    await append('check_out');
    const end = Date.now();
    const workMs = checkInTs ? end - checkInTs - totalBreakMs : 0;
    const fmt = (ms: number) => {
      const m = Math.floor(ms / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      return `${m}m ${s}s`;
    };
    setSessionMessage(`Work: ${fmt(workMs)} | Breaks: ${fmt(totalBreakMs)}`);
    setStatus('idle');
    setCheckInTs(null);
    setBreakStartTs(null);
    setTotalBreakMs(0);
  };

  const handleBreakStart = async () => {
    await append('break_start');
    setStatus('on_break');
    setBreakStartTs(Date.now());
  };

  const handleBreakEnd = async () => {
    await append('break_end');
    setStatus('working');
    if (breakStartTs) {
      setTotalBreakMs((b) => b + (Date.now() - breakStartTs));
    }
    setBreakStartTs(null);
  };

  const handleLogout = async () => {
    // Consider logout as check out if currently working or on break
    if (status !== 'idle') {
      try {
        await append('check_out');
      } catch {}
      setStatus('idle');
      setCheckInTs(null);
      setBreakStartTs(null);
      setTotalBreakMs(0);
      try { localStorage.removeItem('employee_session_state'); } catch {}
    }
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    // Redirect to login page
    window.location.href = '/login';
  };

  const fmtTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}m ${s}s`;
  };

  const fmtHMS = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const fmtDateTime = (ts: number) => {
    try { return new Date(ts).toLocaleString(); } catch { return ''; }
  };

  const liveBreakMs = breakStartTs ? Date.now() - breakStartTs : 0;
  const breakMsTotal = totalBreakMs + liveBreakMs;
  const liveWorkMs = checkInTs ? Date.now() - checkInTs - breakMsTotal : 0;
  const remainingWorkMs = Math.max(OFFICE_MS - Math.max(liveWorkMs, 0), 0);
  const targetEndTs = checkInTs ? checkInTs + OFFICE_MS + breakMsTotal : null;

  // Live ticking to update timers every second while working or on break
  useEffect(() => {
    if (status === 'idle') return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  // Persist session timing state
  useEffect(() => {
    try {
      if (status === 'idle') {
        localStorage.removeItem('employee_session_state');
      } else {
        localStorage.setItem('employee_session_state', JSON.stringify({ status, checkInTs, breakStartTs, totalBreakMs }));
      }
    } catch {}
  }, [status, checkInTs, breakStartTs, totalBreakMs]);

  // Click recording
  useEffect(() => {
    if (!clickRecording) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName || 'UNKNOWN';
      const label = (target?.getAttribute('aria-label') || target?.textContent || '')
        .trim()
        .slice(0, 120);
      const ev: ClickEvent = {
        id: Math.random().toString(36).slice(2),
        userName: userName || 'Anonymous',
        timestamp: Date.now(),
        x: e.clientX,
        y: e.clientY,
        tagName,
        label: label || undefined,
      };
      setClicks((prev) => {
        const next = [ev, ...prev].slice(0, 200);
        try { localStorage.setItem('employee_click_events', JSON.stringify(next)); } catch {}
        return next;
      });
    };
    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true } as any);
  }, [clickRecording, userName]);

  async function captureSnapshot() {
    try {
      let blob: Blob | null = null;
      if (screenStream && videoRef.current) {
        const v = videoRef.current;
        const w = v.videoWidth || 1280;
        const h = v.videoHeight || 720;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(v, 0, 0, w, h);
          blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
        }
      } else {
        return;
      }
      if (!blob) throw new Error('Unable to capture snapshot');

      const form = new FormData();
      form.append('userName', userName || 'Unknown');
      form.append('file', blob, 'snapshot.png');
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Upload failed');
      const url = json?.url as string;
      setSnapshots((prev) => {
        const next = [url, ...prev].slice(0, 12);
        try { localStorage.setItem('employee_snapshots', JSON.stringify(next)); } catch {}
        return next;
      });

      // Record local event and persist
      const snapshotEvent: AttendanceEvent = {
        id: Math.random().toString(36).slice(2),
        userName: userName || 'Unknown',
        type: 'snapshot',
        timestamp: Date.now(),
      };
      const nextEvents = [...events, snapshotEvent];
      setEvents(nextEvents);
      try { localStorage.setItem('employee_events', JSON.stringify(nextEvents)); } catch {}
      try {
        await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName: userName || 'Unknown', type: 'snapshot', metadata: { url, source: 'screen' } }),
        });
      } catch {}
    } catch {}
  }
  async function startScreenCapture() {
    const s = await (navigator.mediaDevices as any).getDisplayMedia({ video: { displaySurface: 'monitor' } as any, audio: false });
    setScreenStream(s);
    if (!videoRef.current) videoRef.current = document.createElement('video');
    videoRef.current.srcObject = s as any;
    videoRef.current.muted = true;
    await videoRef.current.play();
    try {
      const track = s.getVideoTracks()[0];
      if (track) {
        track.addEventListener('ended', () => {
          stopScreenCapture();
        });
      }
    } catch {}
    await delay(200);
    await captureSnapshot();
  }
  function stopScreenCapture() {
    try { screenStream?.getTracks().forEach((t) => t.stop()); } catch {}
    setScreenStream(null);
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch {}
      videoRef.current.srcObject = null;
    }
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // 10-second interval single capture per cycle

  // Auto snapshot scheduler
  useEffect(() => {
    if (!monitoring || status === 'idle' || !screenStream) {
      if (monitorIntervalRef.current) {
        window.clearInterval(monitorIntervalRef.current);
        monitorIntervalRef.current = null;
      }
      return;
    }
    const ms = 10 * 1000;
    captureSnapshot();
    monitorIntervalRef.current = window.setInterval(() => {
      captureSnapshot();
    }, ms);
    return () => {
      if (monitorIntervalRef.current) {
        window.clearInterval(monitorIntervalRef.current);
        monitorIntervalRef.current = null;
      }
    };
  }, [monitoring, snapshotIntervalMin, status, screenStream]);

  useEffect(() => {
    if (status === 'idle' || screenStream) return;
    const handler = async () => {
      try { await startScreenCapture(); } catch {}
    };
    window.addEventListener('pointerdown', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [status, screenStream]);

  // Periodic activity ping based on clicks/mouse moves
  useEffect(() => {
    const moveHandler = () => setMouseMoves((n) => n + 1);
    window.addEventListener('mousemove', moveHandler);
    const pingInterval = window.setInterval(async () => {
      try {
        await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName: userName || 'Unknown', type: 'activity_ping', metadata: { clicks: clicks.length, mouseMoves } }),
        });
      } catch {}
    }, 60 * 1000);
    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.clearInterval(pingInterval);
    };
  }, [userName, clicks.length, mouseMoves]);

  return (
    <div className="employee-container">
      {/* Hero Section */}
      <section className="emp-hero-section">
        <div className="emp-hero-container">
          <div className="emp-hero-tag">
            <span className="emp-year">2025</span>
            <span className="emp-tag-text">Employee Portal</span>
          </div>
          <h1 className="emp-hero-heading">
            Manage Your Workday <span>With Clarity</span>
          </h1>
          <p className="emp-hero-subtext">
            Welcome{userName ? `, ${userName}` : ''}. Use the controls to Check In, take Breaks, and Check Out.
          </p>
          <div className="emp-hero-buttons">
            <MarqButton className="emp-btn primary">Book a Demo</MarqButton>
            <a href="/employee/reports" className="emp-btn secondary">View My Reports</a>
            <a href="/admin" className="emp-btn secondary">View Admin Dashboard</a>
          </div>
        </div>
      </section>

      {/* Controls & Stats */}
      <section className="employee-controls">
        <div className="emp-panel">
          <p className="emp-status">Events are stored locally for responsiveness and also persisted to the server.</p>

          <div className="emp-input-row" style={{ marginTop: '0.75rem' }}>
            <span className="emp-status">User: {userName || 'Unknown'}</span>
            <span className="emp-status">Status: {status}</span>
          </div>

          <div className="emp-actions">
            <button
              onClick={handleCheckIn}
              disabled={status !== 'idle'}
              className="emp-btn primary"
            >
              Check In
            </button>
            <button
              onClick={handleBreakStart}
              disabled={status !== 'working'}
              className="emp-btn secondary"
            >
              Break In
            </button>
            <button
              onClick={handleBreakEnd}
              disabled={status !== 'on_break'}
              className="emp-btn secondary"
            >
              Break Out
            </button>
            <button
              onClick={handleCheckOut}
              disabled={status === 'idle'}
              className="emp-btn secondary"
            >
              Check Out
            </button>
            <button onClick={captureSnapshot} className="emp-btn secondary" style={{ marginLeft: '0.5rem' }}>
              Capture Screen Snapshot
            </button>
            <button onClick={handleLogout} className="emp-btn secondary" style={{ marginLeft: 'auto' }}>
              Logout
            </button>
            {/* Auto-snapshot runs silently in the background; controls removed per requirement */}
          </div>

          <div className="emp-grid">
            <div className="emp-card">
              <div className="emp-card-title">Main Clock</div>
              <div className="emp-timer-main">{fmtHMS(Math.max(liveWorkMs, 0))}</div>
              {checkInTs && (
                <div className="emp-checkin-line">Checked in at {fmtDateTime(checkInTs)}</div>
              )}
              <div className="emp-timer-sub">
                <span className="emp-pill red">Remaining {fmtHMS(remainingWorkMs)}</span>
                <span className="emp-pill gray">Break {fmtHMS(Math.max(breakMsTotal, 0))}</span>
              </div>
              <div className="emp-timer-end">
                {targetEndTs ? `Estimated end ${new Date(targetEndTs).toLocaleTimeString()}` : 'Not checked in'}
              </div>
              {sessionMessage && (
                <div className="emp-checkin-line">{sessionMessage}</div>
              )}
            </div>
            <div className="emp-card">
              <div className="emp-card-title">Today (local)</div>
              <div className="space-y-2">
                {Array.from(todayStats.entries()).map(([name, list]) => (
                  <div key={name}>
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs" style={{ color: '#aaa' }}>{list.length} events</div>
                  </div>
                ))}
                {todayStats.size === 0 && (
                  <div className="text-sm" style={{ color: '#aaa' }}>No events yet today.</div>
                )}
              </div>
            </div>
            <div className="emp-card">
              <div className="emp-card-title">Activity Recorder</div>
              <div className="emp-input-row" style={{ marginBottom: '0.75rem' }}>
                <label className="emp-status">Click recording</label>
                <button
                  className="emp-btn secondary"
                  onClick={() => setClickRecording((v) => !v)}
                >
                  {clickRecording ? 'Pause' : 'Resume'}
                </button>
                <span className="emp-status">Total: {clicks.length}</span>
              </div>
              <div className="space-y-2" style={{ maxHeight: 220, overflow: 'auto' }}>
                {clicks.slice(0, 10).map((c) => (
                  <div key={c.id} className="text-xs" style={{ color: '#aaa' }}>
                    [{new Date(c.timestamp).toLocaleTimeString()}] click on {c.tagName.toLowerCase()}
                    {c.label ? ` — "${c.label}"` : ''} at ({c.x},{c.y})
                  </div>
                ))}
                {clicks.length === 0 && (
                  <div className="text-sm" style={{ color: '#aaa' }}>No clicks recorded yet.</div>
                )}
              </div>
            </div>
          <div className="emp-card">
            <div className="emp-card-title">Snapshots</div>
            <div className="emp-status" style={{ marginBottom: '0.5rem' }}>
              Latest captures (local + uploaded){' '}
              <span className="emp-pill gray" style={{ marginLeft: 8 }}>Auto: {monitoring ? '10s' : 'off'}</span>
              <span className="emp-pill gray" style={{ marginLeft: 8 }}>Screen: {screenStream ? 'on' : 'off'}</span>
            </div>
            {status !== 'idle' && !screenStream && (
              <div className="text-sm" style={{ color: '#aaa', marginBottom: '0.5rem' }}>
                Waiting for screen capture permission. When prompted, choose Entire Screen.
              </div>
            )}
            {/* Screen capture runs automatically after Check In; controls removed */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
              {snapshots.slice(0, 6).map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noreferrer">
                  <img src={url} alt="snapshot" style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }} />
                </a>
              ))}
              {snapshots.length === 0 && (
                <div className="text-sm" style={{ color: '#aaa' }}>No snapshots yet.</div>
              )}
            </div>
          </div>
          </div>

          <div className="emp-note">Note: Clear local storage to reset saved events.</div>
          {idleVisible && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '1rem 1.25rem', width: 'min(480px, 90vw)' }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Are you still there?</div>
                <div className="text-sm" style={{ color: '#aaa', marginBottom: 12 }}>
                  No activity detected. Auto-stopping in {idleSecondsLeft}s.
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="emp-btn primary"
                    onClick={() => {
                      setLastActivityTs(Date.now());
                      setIdleVisible(false);
                      setIdleSecondsLeft(60);
                    }}
                  >I'm here</button>
                  <button
                    className="emp-btn secondary"
                    onClick={() => {
                      handleCheckOut();
                      setIdleVisible(false);
                      setIdleSecondsLeft(60);
                    }}
                  >Stop Now</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}