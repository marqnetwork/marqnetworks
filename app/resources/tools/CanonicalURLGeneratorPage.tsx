import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function CanonicalURLGeneratorPage() {
  const [url, setUrl] = useState(''); const [copied, setCopied] = useState(false); const [preferHttps, setPreferHttps] = useState(true); const [removeTrailing, setRemoveTrailing] = useState(true); const [removeWww, setRemoveWww] = useState(false); const [lowercasePath, setLowercasePath] = useState(true);
  const getCanonical = () => {
    let u = url.trim(); if (!u) return '';
    if (preferHttps) u = u.replace(/^http:\/\//, 'https://');
    if (removeWww) u = u.replace(/^(https?:\/\/)www\./, '$1');
    if (removeTrailing && u.endsWith('/') && u.split('/').length > 4) u = u.replace(/\/$/, '');
    if (lowercasePath) { try { const parsed = new URL(u); u = parsed.origin + parsed.pathname.toLowerCase() + parsed.search + parsed.hash; } catch {} }
    return u;
  };
  const canonical = getCanonical();
  const tag = canonical ? `<link rel="canonical" href="${canonical}" />` : '';
  const copy = () => { navigator.clipboard.writeText(tag); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="canonical-url-generator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Page URL *</label><input value={url} onChange={e => setUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="https://example.com/page/" /></div>
          <div className="space-y-2">
            <p className="text-xs text-white/50 uppercase tracking-wider">Options</p>
            {[{ label: 'Force HTTPS', state: preferHttps, set: setPreferHttps }, { label: 'Remove trailing slash', state: removeTrailing, set: setRemoveTrailing }, { label: 'Remove www', state: removeWww, set: setRemoveWww }, { label: 'Lowercase path', state: lowercasePath, set: setLowercasePath }].map(o => (
              <button key={o.label} onClick={() => o.set(!o.state)} className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs transition-all ${o.state ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20' : 'bg-white/3 text-white/40 border border-white/8'}`}>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${o.state ? 'bg-[#39FF14] border-[#39FF14]' : 'border-white/20'}`}>{o.state && <Check className="w-3 h-3 text-black" />}</div>{o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Canonical Tag</label>
            {tag && <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <pre className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-[#39FF14] text-sm font-mono whitespace-pre-wrap min-h-[60px]">{tag || 'Enter a URL to generate the canonical tag'}</pre>
          {canonical && <div className="mt-3 bg-white/3 rounded-lg p-3"><p className="text-xs text-white/40">Canonical URL:</p><p className="text-sm text-white font-mono mt-1 break-all">{canonical}</p></div>}
        </div>
      </div>
    </ToolPageLayout>
  );
}
