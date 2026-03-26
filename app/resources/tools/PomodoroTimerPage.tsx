import { useState, useEffect, useRef } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
export function PomodoroTimerPage() {
  const [mode, setMode] = useState<'work'|'break'|'longBreak'>('work');
  const [workMin, setWorkMin] = useState(25); const [breakMin, setBreakMin] = useState(5); const [longBreakMin, setLongBreakMin] = useState(15);
  const [remaining, setRemaining] = useState(25*60); const [running, setRunning] = useState(false); const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const durations = { work: workMin*60, break: breakMin*60, longBreak: longBreakMin*60 };
  useEffect(() => {
    if (running && remaining > 0) { intervalRef.current = setInterval(() => setRemaining(r => { if (r <= 1) { setRunning(false); if (mode === 'work') { const newSessions = sessions + 1; setSessions(newSessions); setMode(newSessions % 4 === 0 ? 'longBreak' : 'break'); setRemaining(newSessions % 4 === 0 ? longBreakMin*60 : breakMin*60); } else { setMode('work'); setRemaining(workMin*60); } return 0; } return r - 1; }), 1000); }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);
  const switchMode = (m: typeof mode) => { setMode(m); setRemaining(durations[m]); setRunning(false); };
  const reset = () => { setRunning(false); setRemaining(durations[mode]); };
  const resetAll = () => { setRunning(false); setMode('work'); setRemaining(workMin*60); setSessions(0); };
  const m = Math.floor(remaining/60); const s = remaining%60;
  const total = durations[mode]; const pct = total > 0 ? ((total - remaining) / total) * 100 : 0;
  const modeStyles = { work: { bg: 'bg-red-500/10', border: 'border-red-500/20', color: '#ef4444', label: 'Focus Time' }, break: { bg: 'bg-green-500/10', border: 'border-green-500/20', color: '#39FF14', label: 'Short Break' }, longBreak: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', color: '#60a5fa', label: 'Long Break' } };
  const ms = modeStyles[mode];
  return (
    <ToolPageLayout toolId="pomodoro-timer">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex gap-2 justify-center">
          {[{ id: 'work' as const, icon: <Zap className="w-3 h-3" />, label: 'Focus' }, { id: 'break' as const, icon: <Coffee className="w-3 h-3" />, label: 'Short Break' }, { id: 'longBreak' as const, icon: <Coffee className="w-3 h-3" />, label: 'Long Break' }].map(b => (
            <button key={b.id} onClick={() => switchMode(b.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${mode === b.id ? `${modeStyles[b.id].bg} ${modeStyles[b.id].border} border` : 'bg-white/5 text-white/40 border border-white/10'}`} style={mode === b.id ? { color: modeStyles[b.id].color } : {}}>{b.icon}{b.label}</button>
          ))}
        </div>
        <div className={`${ms.bg} ${ms.border} border rounded-2xl p-10 text-center relative overflow-hidden`}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: ms.color }}>{ms.label}</p>
          <p className="text-7xl font-black font-mono tracking-wider text-white">{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</p>
          <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: ms.color }} /></div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setRunning(!running)} className="flex items-center gap-2 px-8 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold text-sm transition-colors">{running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}{running ? 'Pause' : 'Start'}</button>
          <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 rounded-xl text-sm transition-colors"><RotateCcw className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center justify-center gap-6 text-center">
          <div><p className="text-2xl font-black text-white">{sessions}</p><p className="text-xs text-white/30">Sessions</p></div>
          <div className="h-8 w-px bg-white/10" />
          <div><p className="text-2xl font-black text-white">{sessions * workMin}</p><p className="text-xs text-white/30">Focus Mins</p></div>
          <div className="h-8 w-px bg-white/10" />
          <button onClick={resetAll} className="text-xs text-white/30 hover:text-[#39FF14]">Reset All</button>
        </div>
      </div>
    </ToolPageLayout>
  );
}
