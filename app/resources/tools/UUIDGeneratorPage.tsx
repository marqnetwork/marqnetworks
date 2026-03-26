import { useState, useCallback } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check, RefreshCw } from 'lucide-react';
function uuidv4() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); }); }
export function UUIDGeneratorPage() {
  const [count, setCount] = useState(5); const [uuids, setUuids] = useState<string[]>([]); const [format, setFormat] = useState<'standard'|'upper'|'nohyphens'>('standard'); const [copied, setCopied] = useState('');
  const generate = useCallback(() => {
    const list = Array.from({ length: count }, () => { let id = uuidv4(); if (format === 'upper') id = id.toUpperCase(); else if (format === 'nohyphens') id = id.replace(/-/g, ''); return id; });
    setUuids(list);
  }, [count, format]);
  const copyOne = (id: string) => { navigator.clipboard.writeText(id); setCopied(id); setTimeout(() => setCopied(''), 1500); };
  const copyAll = () => { navigator.clipboard.writeText(uuids.join('\n')); setCopied('all'); setTimeout(() => setCopied(''), 1500); };
  return (
    <ToolPageLayout toolId="uuid-generator">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Count</label><input type="number" value={count} onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} min={1} max={100} className="w-24 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" style={{ colorScheme: 'dark' }} /></div>
            <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Format</label><select value={format} onChange={e => setFormat(e.target.value as any)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}><option value="standard">Standard (lowercase)</option><option value="upper">UPPERCASE</option><option value="nohyphens">No Hyphens</option></select></div>
            <button onClick={generate} className="flex items-center gap-2 px-6 py-2.5 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl text-xs font-semibold transition-colors"><RefreshCw className="w-3.5 h-3.5" /> Generate UUIDs</button>
            {uuids.length > 0 && <button onClick={copyAll} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14] ml-auto">{copied === 'all' ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied === 'all' ? 'Copied All!' : 'Copy All'}</button>}
          </div>
        </div>
        {uuids.length > 0 && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-1.5">
            {uuids.map((id, i) => (
              <div key={i} className="flex items-center justify-between bg-white/3 rounded-lg px-4 py-2.5 group">
                <code className="text-sm text-[#39FF14] font-mono">{id}</code>
                <button onClick={() => copyOne(id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-[#39FF14]">{copied === id ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
