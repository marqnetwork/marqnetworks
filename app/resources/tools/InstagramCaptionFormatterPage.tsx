import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function InstagramCaptionFormatterPage() {
  const [input, setInput] = useState(''); const [copied, setCopied] = useState(false);
  const formatted = input.replace(/\n/g, '\n\u200B\n');
  const charCount = input.length;
  const copy = () => { navigator.clipboard.writeText(formatted); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="instagram-caption-formatter">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Write Your Caption</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder={"First line of caption\n\nSecond paragraph\n\nHashtags here"} />
          <div className="flex justify-between mt-2">
            <span className={`text-xs ${charCount > 2200 ? 'text-red-400' : 'text-white/30'}`}>{charCount} / 2,200</span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className={`h-full rounded-full ${charCount > 2200 ? 'bg-red-400' : 'bg-[#39FF14]'}`} style={{ width: `${Math.min(100, (charCount / 2200) * 100)}%` }} /></div>
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Formatted (with line breaks)</label>
            {formatted && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div className="px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm whitespace-pre-wrap min-h-[250px]">{formatted || 'Formatted caption will appear here...'}</div>
          <p className="text-xs text-white/20 mt-2">Line breaks are preserved using invisible characters so Instagram shows them correctly.</p>
        </div>
      </div>
    </ToolPageLayout>
  );
}
