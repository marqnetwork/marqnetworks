import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function DuplicateLineRemoverPage() {
  const [input, setInput] = useState(''); const [output, setOutput] = useState(''); const [copied, setCopied] = useState(false); const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
  const remove = (caseSensitive: boolean) => {
    const lines = input.split('\n');
    const seen = new Set<string>(); const unique: string[] = [];
    lines.forEach(l => { const key = caseSensitive ? l : l.toLowerCase(); if (!seen.has(key)) { seen.add(key); unique.push(l); } });
    setOutput(unique.join('\n')); setStats({ original: lines.length, unique: unique.length, removed: lines.length - unique.length });
  };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="duplicate-line-remover">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input Text</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Paste text with duplicate lines..." />
          <div className="flex gap-2 mt-4">
            <button onClick={() => remove(true)} className="flex-1 py-2.5 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl text-xs font-semibold transition-colors">Remove Duplicates (Case-Sensitive)</button>
            <button onClick={() => remove(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 rounded-xl text-xs font-medium transition-colors">Ignore Case</button>
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Result</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <textarea value={output} readOnly rows={10} className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm resize-none" />
          {stats.original > 0 && (
            <div className="flex gap-3 mt-3">
              <div className="bg-white/5 rounded-lg px-3 py-2 text-center flex-1"><p className="text-xs text-white/40">Original</p><p className="text-sm font-bold text-white">{stats.original}</p></div>
              <div className="bg-[#39FF14]/10 rounded-lg px-3 py-2 text-center flex-1"><p className="text-xs text-[#39FF14]">Unique</p><p className="text-sm font-bold text-white">{stats.unique}</p></div>
              <div className="bg-red-500/10 rounded-lg px-3 py-2 text-center flex-1"><p className="text-xs text-red-400">Removed</p><p className="text-sm font-bold text-white">{stats.removed}</p></div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
