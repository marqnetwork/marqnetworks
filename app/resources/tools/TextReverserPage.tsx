import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function TextReverserPage() {
  const [input, setInput] = useState(''); const [output, setOutput] = useState(''); const [copied, setCopied] = useState(false);
  const reverse = (mode: string) => {
    switch (mode) {
      case 'chars': setOutput(input.split('').reverse().join('')); break;
      case 'words': setOutput(input.split(' ').reverse().join(' ')); break;
      case 'lines': setOutput(input.split('\n').reverse().join('\n')); break;
      case 'each': setOutput(input.split(' ').map(w => w.split('').reverse().join('')).join(' ')); break;
    }
  };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="text-reverser">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Enter text to reverse..." />
          <div className="flex flex-wrap gap-2 mt-4">
            {[{ id: 'chars', label: 'Reverse Characters' }, { id: 'words', label: 'Reverse Words' }, { id: 'lines', label: 'Reverse Lines' }, { id: 'each', label: 'Reverse Each Word' }].map(m => (
              <button key={m.id} onClick={() => reverse(m.id)} className="px-3 py-2 bg-white/5 hover:bg-[#39FF14]/15 hover:text-[#39FF14] border border-white/10 hover:border-[#39FF14]/30 rounded-lg text-xs text-white/70 transition-all">{m.label}</button>
            ))}
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Reversed Output</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <textarea value={output} readOnly rows={8} className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm resize-none" />
        </div>
      </div>
    </ToolPageLayout>
  );
}
