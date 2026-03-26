import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function JSMinifierPage() {
  const [input, setInput] = useState(''); const [output, setOutput] = useState(''); const [copied, setCopied] = useState(false);
  const minify = () => {
    let result = input.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1').replace(/\n/g, '').trim();
    setOutput(result);
  };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const savings = input.length > 0 && output.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;
  return (
    <ToolPageLayout toolId="js-minifier">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input JavaScript</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder={"// A sample function\nfunction greet(name) {\n  console.log('Hello, ' + name);\n}"} />
          <button onClick={minify} className="w-full mt-4 py-2.5 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl text-xs font-semibold transition-colors">Minify JavaScript</button>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2"><label className="text-xs text-white/50 uppercase tracking-wider">Minified Output</label>{output && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}</div>
          <pre className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-[#39FF14] text-xs font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto min-h-[300px]">{output || 'Minified JS will appear here...'}</pre>
          {savings > 0 && <div className="mt-3 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-lg p-3 text-center"><p className="text-xs text-[#39FF14]">Reduced by {savings}% — {input.length} → {output.length} characters</p></div>}
        </div>
      </div>
    </ToolPageLayout>
  );
}
