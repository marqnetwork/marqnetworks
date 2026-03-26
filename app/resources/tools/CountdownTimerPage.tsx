import { useState, useEffect, useRef } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Play, Pause, RotateCcw } from 'lucide-react';
export function CountdownTimerPage() {
  const [hours, setHours] = useState('0'); const [minutes, setMinutes] = useState('5'); const [seconds, setSeconds] = useState('0');
  const [remaining, setRemaining] = useState(0); const [running, setRunning] = useState(false); const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = () => { if (!running && remaining === 0) { const total = (parseInt(hours)||0)*3600 + (parseInt(minutes)||0)*60 + (parseInt(seconds)||0); if (total <= 0) return; setRemaining(total); setDone(false); setRunning(true); } else { setRunning(!running); } };
  const reset = () => { setRunning(false); setRemaining(0); setDone(false); if (intervalRef.current) clearInterval(intervalRef.current); };
  useEffect(() => {
    if (running && remaining > 0) { intervalRef.current = setInterval(() => setRemaining(r => { if (r <= 1) { setRunning(false); setDone(true); return 0; } return r - 1; }), 1000); }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);
  const h = Math.floor(remaining / 3600); const m = Math.floor((remaining % 3600) / 60); const s = remaining % 60;
  const display = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const totalSet = (parseInt(hours)||0)*3600 + (parseInt(minutes)||0)*60 + (parseInt(seconds)||0);
  const progress = totalSet > 0 ? ((totalSet - remaining) / totalSet) * 100 : 0;
  return (
    <ToolPageLayout toolId="countdown-timer">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-8 text-center relative overflow-hidden">
          {done && <div className="absolute inset-0 bg-[#39FF14]/5 animate-pulse" />}
          <p className={`text-6xl md:text-8xl font-black font-mono tracking-wider ${done ? 'text-[#39FF14] animate-pulse' : remaining > 0 ? 'text-white' : 'text-white/30'}`}>{remaining > 0 || done ? display : '--:--:--'}</p>
          {done && <p className="text-[#39FF14] text-sm mt-4 font-bold">Time's up!</p>}
          {remaining > 0 && <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#39FF14] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>}
        </div>
        {remaining === 0 && !done && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs text-white/50 mb-1.5 text-center uppercase tracking-wider">Hours</label><input type="number" value={hours} onChange={e => setHours(e.target.value)} min={0} max={99} className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-lg font-mono focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
              <div><label className="block text-xs text-white/50 mb-1.5 text-center uppercase tracking-wider">Minutes</label><input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} min={0} max={59} className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-lg font-mono focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
              <div><label className="block text-xs text-white/50 mb-1.5 text-center uppercase tracking-wider">Seconds</label><input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} min={0} max={59} className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-lg font-mono focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
            </div>
            <div className="flex gap-2 mt-4">
              {[1,5,10,15,25,30].map(n => <button key={n} onClick={() => { setMinutes(String(n)); setHours('0'); setSeconds('0'); }} className="flex-1 py-2 bg-white/5 hover:bg-[#39FF14]/15 border border-white/10 hover:border-[#39FF14]/30 rounded-lg text-xs text-white/50 hover:text-[#39FF14] transition-all">{n}m</button>)}
            </div>
          </div>
        )}
        <div className="flex gap-3 justify-center">
          <button onClick={start} className="flex items-center gap-2 px-8 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold text-sm transition-colors">{running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}{running ? 'Pause' : 'Start'}</button>
          <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 rounded-xl text-sm transition-colors"><RotateCcw className="w-4 h-4" /> Reset</button>
        </div>
      </div>
    </ToolPageLayout>
  );
}
