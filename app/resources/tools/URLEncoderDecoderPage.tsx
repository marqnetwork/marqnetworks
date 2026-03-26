import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function URLEncoderDecoderPage() {
  const [input, setInput] = useState(''); const [output, setOutput] = useState(''); const [copied, setCopied] = useState(false);
  const encode = () => { try { setOutput(encodeURIComponent(input)); } catch { setOutput('Error encoding'); } };
  const decode = () => { try { setOutput(decodeURIComponent(input)); } catch { setOutput('Error decoding — invalid encoded string'); } };
  const encodeAll = () => { try { setOutput(encodeURI(input)); } catch { setOutput('Error'); } };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="url-encoder-decoder">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="Enter URL or text to encode/decode..." />
          <div className="flex gap-2 mt-4">
            <button onClick={encode} className="flex-1 py-2.5 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl text-xs font-semibold transition-colors">Encode Component</button>
            <button onClick={decode} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 rounded-xl text-xs font-medium transition-colors">Decode</button>
            <button onClick={encodeAll} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 rounded-xl text-xs font-medium transition-colors">Encode URI</button>
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Result</label>
            {output && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <textarea value={output} readOnly rows={6} className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm resize-none" />
        </div>
      </div>
    </ToolPageLayout>
  );
}
