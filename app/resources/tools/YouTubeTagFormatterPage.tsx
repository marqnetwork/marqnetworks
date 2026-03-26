import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function YouTubeTagFormatterPage() {
  const [input, setInput] = useState(''); const [copied, setCopied] = useState('');
  const tags = input.split(',').map(t => t.trim()).filter(Boolean);
  const totalChars = tags.join(',').length;
  const commaFormat = tags.join(', ');
  const quoteFormat = tags.map(t => `"${t}"`).join(', ');
  const hashFormat = tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
  const copy = (text: string, key: string) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(''), 1500); };
  return (
    <ToolPageLayout toolId="youtube-tag-formatter">
      <div className="space-y-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Enter Tags (comma-separated)</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none placeholder-white/30" placeholder="marketing tips, social media, growth hacking, SEO, content strategy" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/30">{tags.length} tags</span>
            <span className={`text-xs ${totalChars > 500 ? 'text-red-400' : 'text-white/30'}`}>{totalChars}/500 characters</span>
          </div>
        </div>
        {tags.length > 0 && (
          <div className="space-y-3">
            {[{ label: 'Comma Separated', value: commaFormat, key: 'comma' }, { label: 'Quoted Format', value: quoteFormat, key: 'quote' }, { label: 'Hashtag Format', value: hashFormat, key: 'hash' }].map(f => (
              <div key={f.key} className="bg-[#111111] rounded-xl border border-white/8 p-4">
                <div className="flex items-center justify-between mb-2"><span className="text-xs text-white/40 uppercase tracking-wider">{f.label}</span><button onClick={() => copy(f.value, f.key)} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied === f.key ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied === f.key ? 'Copied!' : 'Copy'}</button></div>
                <p className="text-sm text-white/70 bg-white/3 rounded-lg p-3 break-words">{f.value}</p>
              </div>
            ))}
            <div className="bg-[#111111] rounded-xl border border-white/8 p-4">
              <span className="text-xs text-white/40 uppercase tracking-wider">Tag Preview</span>
              <div className="flex flex-wrap gap-1.5 mt-2">{tags.map((t, i) => <span key={i} className="bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded text-xs">{t}</span>)}</div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
