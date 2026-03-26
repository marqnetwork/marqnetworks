import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check, RefreshCw } from 'lucide-react';
export function RandomNumberGeneratorPage() {
  const [min, setMin] = useState('1'); const [max, setMax] = useState('100'); const [count, setCount] = useState('1'); const [unique, setUnique] = useState(false); const [results, setResults] = useState<number[]>([]); const [copied, setCopied] = useState(false);
  const generate = () => {
    const lo = parseInt(min) || 0; const hi = parseInt(max) || 100; const n = Math.min(parseInt(count) || 1, unique ? hi - lo + 1 : 1000);
    if (unique) { const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; } setResults(pool.slice(0, n)); }
    else { setResults(Array.from({ length: n }, () => Math.floor(Math.random() * (hi - lo + 1)) + lo)); }
  };
  const copy = () => { navigator.clipboard.writeText(results.join(', ')); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="random-number-generator">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Min</label><input type="number" value={min} onChange={e => setMin(e.target.value)} className="w-28 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Max</label><input type="number" value={max} onChange={e => setMax(e.target.value)} className="w-28 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Count</label><input type="number" value={count} onChange={e => setCount(e.target.value)} min={1} max={1000} className="w-24 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
            <button onClick={() => setUnique(!unique)} className={`px-3 py-2.5 rounded-xl text-xs transition-all ${unique ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>{unique ? '✓ Unique' : 'Unique'}</button>
            <button onClick={generate} className="flex items-center gap-2 px-6 py-2.5 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl text-xs font-semibold transition-colors"><RefreshCw className="w-3.5 h-3.5" /> Generate</button>
          </div>
        </div>
        {results.length > 0 && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center justify-between mb-3"><p className="text-xs text-white/50 uppercase tracking-wider">{results.length} Number{results.length > 1 ? 's' : ''}</p><button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy All'}</button></div>
            <div className="flex flex-wrap gap-2">{results.map((n, i) => <span key={i} className="bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] px-3 py-1.5 rounded-lg text-sm font-mono font-bold">{n}</span>)}</div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
