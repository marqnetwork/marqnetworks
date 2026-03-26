import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';

export function CaseConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (type: string) => {
    let result = input;
    switch (type) {
      case 'upper': result = input.toUpperCase(); break;
      case 'lower': result = input.toLowerCase(); break;
      case 'title': result = input.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()); break;
      case 'sentence': result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
      case 'camel': result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()); break;
      case 'pascal': result = input.toLowerCase().replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, c) => c.toUpperCase()); break;
      case 'snake': result = input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''); break;
      case 'kebab': result = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); break;
      case 'toggle': result = input.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
    }
    setOutput(result);
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const modes = [
    { id: 'upper', label: 'UPPER CASE' }, { id: 'lower', label: 'lower case' },
    { id: 'title', label: 'Title Case' }, { id: 'sentence', label: 'Sentence case' },
    { id: 'camel', label: 'camelCase' }, { id: 'pascal', label: 'PascalCase' },
    { id: 'snake', label: 'snake_case' }, { id: 'kebab', label: 'kebab-case' },
    { id: 'toggle', label: 'tOGGLE cASE' },
  ];

  return (
    <ToolPageLayout toolId="case-converter">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input Text</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30"
            placeholder="Type or paste your text here..." />
          <div className="flex flex-wrap gap-2 mt-4">
            {modes.map(m => (
              <button key={m.id} onClick={() => convert(m.id)}
                className="px-3 py-1.5 bg-white/5 hover:bg-[#39FF14]/15 hover:text-[#39FF14] border border-white/10 hover:border-[#39FF14]/30 rounded-lg text-xs text-white/70 transition-all">
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Output</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                {copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea value={output} readOnly rows={8}
            className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm resize-none"
            placeholder="Converted text will appear here..." />
        </div>
      </div>
    </ToolPageLayout>
  );
}
