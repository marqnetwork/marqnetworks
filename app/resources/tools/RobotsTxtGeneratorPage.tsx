import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check } from 'lucide-react';
export function RobotsTxtGeneratorPage() {
  const [sitemapUrl, setSitemapUrl] = useState(''); const [copied, setCopied] = useState(false);
  const [rules, setRules] = useState([{ agent: '*', disallow: ['/admin/', '/private/'], allow: ['/'] }]);
  const [crawlDelay, setCrawlDelay] = useState('');
  const generate = () => {
    let out = '';
    rules.forEach(r => { out += `User-agent: ${r.agent}\n`; r.allow.filter(Boolean).forEach(a => { out += `Allow: ${a}\n`; }); r.disallow.filter(Boolean).forEach(d => { out += `Disallow: ${d}\n`; }); if (crawlDelay) out += `Crawl-delay: ${crawlDelay}\n`; out += '\n'; });
    if (sitemapUrl) out += `Sitemap: ${sitemapUrl}\n`;
    return out.trim();
  };
  const output = generate();
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const updateRule = (i: number, field: string, value: string) => {
    const nr = [...rules]; if (field === 'agent') nr[i].agent = value;
    else if (field === 'disallow') nr[i].disallow = value.split('\n');
    else if (field === 'allow') nr[i].allow = value.split('\n');
    setRules(nr);
  };
  return (
    <ToolPageLayout toolId="robots-txt-generator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Sitemap URL</label>
            <input value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="https://example.com/sitemap.xml" />
          </div>
          {rules.map((r, i) => (
            <div key={i} className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-3">
              <div><label className="block text-xs text-white/40 mb-1">User-agent</label><input value={r.agent} onChange={e => updateRule(i, 'agent', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50" /></div>
              <div><label className="block text-xs text-white/40 mb-1">Disallow (one per line)</label><textarea value={r.disallow.join('\n')} onChange={e => updateRule(i, 'disallow', e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none" /></div>
              <div><label className="block text-xs text-white/40 mb-1">Allow (one per line)</label><textarea value={r.allow.join('\n')} onChange={e => updateRule(i, 'allow', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 resize-none" /></div>
            </div>
          ))}
          <div><label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Crawl Delay (seconds)</label><input value={crawlDelay} onChange={e => setCrawlDelay(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="e.g. 10" type="number" style={{ colorScheme: 'dark' }} /></div>
          <button onClick={() => setRules([...rules, { agent: 'Googlebot', disallow: [], allow: ['/'] }])} className="text-xs text-[#39FF14] hover:text-[#2de010]">+ Add another user-agent rule</button>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Generated robots.txt</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-[#39FF14] text-sm font-mono whitespace-pre-wrap min-h-[200px]">{output}</pre>
        </div>
      </div>
    </ToolPageLayout>
  );
}
