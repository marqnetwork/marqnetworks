import { useState, useEffect } from 'react';
import { Clock, RefreshCw, Copy, Check, ArrowRightLeft } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'America/Sao_Paulo', 'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Europe/Moscow', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Bangkok',
  'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland'
];

export function TimestampConverterPage() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [unix, setUnix] = useState(String(Math.floor(Date.now() / 1000)));
  const [humanDate, setHumanDate] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [copied, setCopied] = useState<string | null>(null);
  const [liveMode, setLiveMode] = useState(true);

  useEffect(() => {
    if (!liveMode) return;
    const interval = setInterval(() => {
      const t = Math.floor(Date.now() / 1000);
      setNow(t);
      setUnix(String(t));
    }, 1000);
    return () => clearInterval(interval);
  }, [liveMode]);

  const handleUnixChange = (val: string) => {
    setUnix(val);
    setLiveMode(false);
    const ts = parseInt(val);
    if (!isNaN(ts)) setNow(ts);
  };

  const handleDateChange = (val: string) => {
    setHumanDate(val);
    setLiveMode(false);
    if (val) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        const ts = Math.floor(d.getTime() / 1000);
        setNow(ts);
        setUnix(String(ts));
      }
    }
  };

  const formatDate = (ts: number, tz: string, format: string): string => {
    try {
      const d = new Date(ts * 1000);
      if (format === 'iso') return d.toISOString();
      if (format === 'rfc') return d.toUTCString();
      if (format === 'local') return d.toLocaleString('en-US', { timeZone: tz });
      if (format === 'date') return d.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      if (format === 'time') return d.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      return d.toString();
    } catch {
      return 'Invalid timestamp';
    }
  };

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn = ({ val, id }: { val: string; id: string }) => (
    <button onClick={() => handleCopy(val, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0">
      {copied === id ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5 text-white/30" />}
    </button>
  );

  const OutputRow = ({ label, val, id }: { label: string; val: string; id: string }) => (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-white/5 last:border-0">
      <div>
        <div className="text-xs text-white/35 mb-0.5">{label}</div>
        <div className="text-sm font-mono text-white/75 break-all">{val}</div>
      </div>
      <CopyBtn val={val} id={id} />
    </div>
  );

  const ts = parseInt(unix) || now;

  return (
    <ToolPageLayout toolId="timestamp-converter">
      {/* Live Current Time */}
      {liveMode && (
        <div className="bg-black border border-white/10 rounded-2xl p-5 mb-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
          <div>
            <p className="text-white/35 text-xs mb-1 uppercase tracking-wider">Current Unix Timestamp (live)</p>
            <p className="text-3xl font-black font-mono text-[#39FF14]">{now}</p>
          </div>
          <div className="text-right">
            <p className="text-white/35 text-xs mb-1 uppercase tracking-wider">UTC Date & Time</p>
            <p className="text-sm font-mono text-white/70">{new Date(now * 1000).toISOString().replace('T', ' ').slice(0, 19)} UTC</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white mb-5 text-sm">Convert From</h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>Unix Timestamp (seconds)</span>
                <button onClick={() => { const t = Math.floor(Date.now() / 1000); setUnix(String(t)); setNow(t); setLiveMode(true); }}
                  className="text-xs text-[#39FF14] flex items-center gap-1 hover:text-[#2de010] transition-colors normal-case tracking-normal">
                  <RefreshCw className="w-3 h-3" /> Now
                </button>
              </label>
              <input
                type="number"
                value={unix}
                onChange={e => handleUnixChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm font-mono"
                placeholder="e.g. 1700000000"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <ArrowRightLeft className="w-4 h-4 text-white/25" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Human-Readable Date</label>
              <input
                type="datetime-local"
                value={humanDate}
                onChange={e => handleDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Timezone</label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white text-sm [&>option]:bg-[#1a1a1a]"
                style={{ colorScheme: 'dark' }}
              >
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white mb-5 text-sm">Converted Formats</h2>
          <div className="flex flex-col">
            <OutputRow label="Unix Timestamp (s)" val={String(ts)} id="unix" />
            <OutputRow label="Unix Timestamp (ms)" val={String(ts * 1000)} id="unix-ms" />
            <OutputRow label="ISO 8601" val={formatDate(ts, timezone, 'iso')} id="iso" />
            <OutputRow label="RFC 2822 (Email)" val={formatDate(ts, timezone, 'rfc')} id="rfc" />
            <OutputRow label={`Local (${timezone})`} val={formatDate(ts, timezone, 'local')} id="local" />
            <OutputRow label="Date Only" val={formatDate(ts, timezone, 'date')} id="date" />
            <OutputRow label="Time Only (24h)" val={formatDate(ts, timezone, 'time')} id="time" />
          </div>
        </div>
      </div>

      {/* World Clock */}
      <div className="mt-6 bg-[#111111] border border-white/8 rounded-2xl p-6">
        <h2 className="font-bold text-white mb-4 text-sm">World Clock for This Timestamp</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['America/New_York', 'Europe/London', 'Asia/Dubai', 'Asia/Singapore', 'America/Los_Angeles', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'].map(tz => (
            <div key={tz} className="bg-white/3 border border-white/5 rounded-xl p-3">
              <p className="text-xs text-white/35 mb-1">{tz.split('/').pop()?.replace('_', ' ')}</p>
              <p className="text-sm font-mono font-semibold text-white/80">{formatDate(ts, tz, 'time')}</p>
              <p className="text-xs text-white/30">{new Date(ts * 1000).toLocaleDateString('en-US', { timeZone: tz, month: 'short', day: 'numeric' })}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}