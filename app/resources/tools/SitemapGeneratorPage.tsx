import { useState } from 'react';
import { ToolPageLayout } from '../../components/ToolPageLayout';
import { Copy, Check, Plus, X } from 'lucide-react';
export function SitemapGeneratorPage() {
  const [urls, setUrls] = useState([{ loc: 'https://example.com/', priority: '1.0', changefreq: 'daily' }]);
  const [copied, setCopied] = useState(false);
  const add = () => setUrls([...urls, { loc: '', priority: '0.5', changefreq: 'weekly' }]);
  const remove = (i: number) => setUrls(urls.filter((_, j) => j !== i));
  const update = (i: number, field: string, value: string) => { const n = [...urls]; (n[i] as any)[field] = value; setUrls(n); };
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.filter(u => u.loc).map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}\n</urlset>`;
  const copy = () => { navigator.clipboard.writeText(xml); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolPageLayout toolId="sitemap-generator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 space-y-3">
          <label className="block text-xs text-white/50 uppercase tracking-wider">URLs</label>
          {urls.map((u, i) => (
            <div key={i} className="bg-white/3 border border-white/5 rounded-xl p-3 space-y-2">
              <div className="flex gap-2"><input value={u.loc} onChange={e => update(i, 'loc', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30" placeholder="https://example.com/page" />{urls.length > 1 && <button onClick={() => remove(i)} className="text-white/30 hover:text-red-400"><X className="w-4 h-4" /></button>}</div>
              <div className="flex gap-2">
                <select value={u.changefreq} onChange={e => update(i, 'changefreq', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}><option value="always">Always</option><option value="hourly">Hourly</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option><option value="never">Never</option></select>
                <select value={u.priority} onChange={e => update(i, 'priority', e.target.value)} className="w-24 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none [&>option]:bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>{['1.0','0.9','0.8','0.7','0.6','0.5','0.4','0.3','0.2','0.1'].map(p => <option key={p} value={p}>{p}</option>)}</select>
              </div>
            </div>
          ))}
          <button onClick={add} className="flex items-center gap-1 text-xs text-[#39FF14] hover:text-[#2de010]"><Plus className="w-3 h-3" /> Add URL</button>
        </div>
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-white/50 uppercase tracking-wider">Generated XML Sitemap</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs text-white/40 hover:text-[#39FF14]">{copied ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <pre className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/5 text-[#39FF14] text-xs font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto">{xml}</pre>
        </div>
      </div>
    </ToolPageLayout>
  );
}
