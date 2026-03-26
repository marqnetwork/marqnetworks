import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function HTMLFormatterPage() {
  const [input, setInput] = useState(''); const [output, setOutput] = useState(''); const [copied, setCopied] = useState(false);
  const format = () => {
    let indent = 0; const tab = '  ';
    const result = input.replace(/>\s*</g, '>\n<').split('\n').map(line => {
      line = line.trim(); if (!line) return '';
      if (line.match(/^<\//)) indent = Math.max(0, indent - 1);
      const formatted = tab.repeat(indent) + line;
      if (line.match(/^<[^/!].*[^/]>$/) && !line.match(/^<(br|hr|img|input|meta|link)/i)) indent++;
      return formatted;
    }).filter(Boolean).join('\n');
    setOutput(result);
  };
  const minify = () => { setOutput(input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').replace(/\s+>/g, '>').trim()); };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="html-formatter">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input HTML</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="<div><h1>Hello</h1><p>World</p></div>" />
          <div className="flex gap-2 mt-4">
            <button onClick={format} className="flex-1 py-2.5 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl text-xs font-semibold transition-colors">Format / Beautify</button>
            <button onClick={minify} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 rounded-xl text-xs font-medium transition-colors">Minify</button>
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Output</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <pre className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-[#39FF14] text-xs font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto min-h-[300px]">{output || 'Formatted HTML will appear here...'}</pre>
          {output && <div className="flex gap-3 mt-3"><div className="bg-white/5 rounded-lg px-3 py-2 text-center flex-1"><p className="text-xs text-white/40">Input</p><p className="text-sm font-bold text-white">{input.length} chars</p></div><div className="bg-white/5 rounded-lg px-3 py-2 text-center flex-1"><p className="text-xs text-white/40">Output</p><p className="text-sm font-bold text-white">{output.length} chars</p></div><div className="bg-white/5 rounded-lg px-3 py-2 text-center flex-1"><p className="text-xs text-white/40">Diff</p><p className={`text-sm font-bold ${output.length < input.length ? 'text-[#39FF14]' : 'text-white'}`}>{output.length < input.length ? '-' : '+'}{Math.abs(output.length - input.length)}</p></div></div>}
        </div>
      </div>
    </ToolPageLayout>
  );
}
