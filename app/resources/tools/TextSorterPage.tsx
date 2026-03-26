import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';

export function TextSorterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const sort = (type: string) => {
    const lines = input.split('\n').filter(l => l.trim());
    let sorted: string[];
    switch (type) {
      case 'az': sorted = [...lines].sort((a, b) => a.localeCompare(b)); break;
      case 'za': sorted = [...lines].sort((a, b) => b.localeCompare(a)); break;
      case 'short': sorted = [...lines].sort((a, b) => a.length - b.length); break;
      case 'long': sorted = [...lines].sort((a, b) => b.length - a.length); break;
      case 'num': sorted = [...lines].sort((a, b) => parseFloat(a) - parseFloat(b)); break;
      case 'random': sorted = [...lines].sort(() => Math.random() - 0.5); break;
      case 'reverse': sorted = [...lines].reverse(); break;
      default: sorted = lines;
    }
    setOutput(sorted.join('\n'));
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const modes = [
    { id: 'az', label: 'A → Z' }, { id: 'za', label: 'Z → A' },
    { id: 'short', label: 'Shortest First' }, { id: 'long', label: 'Longest First' },
    { id: 'num', label: 'Numeric' }, { id: 'random', label: 'Randomize' }, { id: 'reverse', label: 'Reverse Lines' },
  ];

  return (
    <ToolPageLayout toolId="text-sorter">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input (one item per line)</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30"
            placeholder={"banana\napple\ncherry\ndate"} />
          <div className="flex flex-wrap gap-2 mt-4">
            {modes.map(m => (
              <button key={m.id} onClick={() => sort(m.id)}
                className="px-3 py-1.5 bg-white/5 hover:bg-[#39FF14]/15 hover:text-[#39FF14] border border-white/10 hover:border-[#39FF14]/30 rounded-lg text-xs text-white/70 transition-all">
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Sorted Output</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <textarea value={output} readOnly rows={10} className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm resize-none" placeholder="Sorted text will appear here..." />
        </div>
      </div>
    </ToolPageLayout>
  );
}
