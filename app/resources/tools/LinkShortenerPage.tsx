import { useState } from 'react';
import { Link2, Copy, Check, Plus, Trash2, ExternalLink } from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

interface ShortLink {
  id: string;
  original: string;
  short: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  created: string;
}

function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}

export function LinkShortenerPage() {
  const [url, setUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'shortener' | 'utm'>('shortener');

  const buildUTMUrl = () => {
    if (!url) return '';
    let result = url;
    const params = new URLSearchParams();
    if (utmSource) params.set('utm_source', utmSource);
    if (utmMedium) params.set('utm_medium', utmMedium);
    if (utmCampaign) params.set('utm_campaign', utmCampaign);
    if (utmContent) params.set('utm_content', utmContent);
    const qs = params.toString();
    if (qs) result += (result.includes('?') ? '&' : '?') + qs;
    return result;
  };

  const handleCreate = () => {
    if (!url.trim()) { setError('Please enter a URL'); return; }
    if (!url.startsWith('http')) { setError('URL must start with http:// or https://'); return; }
    setError('');

    const fullUrl = activeTab === 'utm' ? buildUTMUrl() : url;
    const short = `https://mrq.co/${generateShortCode()}`;

    const newLink: ShortLink = {
      id: Date.now().toString(),
      original: fullUrl,
      short,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      created: new Date().toLocaleDateString(),
    };

    setLinks(prev => [newLink, ...prev]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const utmFull = buildUTMUrl();

  return (
    <ToolPageLayout toolId="link-shortener">
      <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['shortener', 'utm'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                activeTab === tab ? 'bg-[#39FF14] text-black' : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
              }`}
            >
              {tab === 'shortener' ? '🔗 Link Shortener' : '📊 UTM Builder'}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Destination URL *</label>
            <input
              type="url"
              value={url}
              onChange={e => { setUrl(e.target.value); setError(''); }}
              placeholder="https://yourwebsite.com/page"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          {activeTab === 'utm' && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'UTM Source', value: utmSource, onChange: setUtmSource, placeholder: 'e.g. newsletter, google' },
                { label: 'UTM Medium', value: utmMedium, onChange: setUtmMedium, placeholder: 'e.g. email, cpc, social' },
                { label: 'UTM Campaign', value: utmCampaign, onChange: setUtmCampaign, placeholder: 'e.g. summer_sale_2025' },
                { label: 'UTM Content', value: utmContent, onChange: setUtmContent, placeholder: 'e.g. hero_cta, banner_a' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-xs text-white/40 mb-1 uppercase tracking-wider">{field.label}</label>
                  <input
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:border-[#39FF14]/50 text-white placeholder-white/25 text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'utm' && utmFull && utmFull !== url && (
            <div className="bg-white/3 border border-white/8 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/40 uppercase tracking-wider">Generated UTM URL</span>
                <button onClick={() => handleCopy(utmFull, 'utm-preview')} className="text-xs text-[#39FF14] flex items-center gap-1 hover:text-[#2de010] transition-colors">
                  {copiedId === 'utm-preview' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <p className="text-xs text-white/50 break-all font-mono">{utmFull}</p>
            </div>
          )}

          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all text-sm tracking-wide"
          >
            <Plus className="w-4 h-4" />
            {activeTab === 'shortener' ? 'Shorten Link' : 'Create UTM Link'}
          </button>
        </div>
      </div>

      {/* Links List */}
      {links.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-white text-sm">Your Links ({links.length})</h2>
          {links.map(link => (
            <div key={link.id} className="bg-[#111111] rounded-2xl border border-white/8 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={link.original}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#39FF14] hover:text-[#2de010] font-medium text-sm flex items-center gap-1 transition-colors"
                    >
                      {link.short}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-xs text-white/25">Created {link.created}</span>
                  </div>
                  <p className="text-xs text-white/35 truncate font-mono">{link.original}</p>
                  {(link.utmSource || link.utmMedium || link.utmCampaign) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {link.utmSource && <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded">{link.utmSource}</span>}
                      {link.utmMedium && <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded">{link.utmMedium}</span>}
                      {link.utmCampaign && <span className="bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] text-xs px-2 py-0.5 rounded">{link.utmCampaign}</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(link.short, link.id)}
                    className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    {copiedId === link.id ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4 text-white/40" />}
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="p-2 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UTM Guide */}
      <div className="mt-8 bg-[#111111] border border-white/8 rounded-2xl p-6">
        <h3 className="font-bold text-white mb-3 text-sm">UTM Parameter Guide</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { param: 'utm_source', desc: 'Where traffic comes from', examples: 'google, newsletter, facebook' },
            { param: 'utm_medium', desc: 'Marketing channel type', examples: 'cpc, email, social, organic' },
            { param: 'utm_campaign', desc: 'Specific campaign name', examples: 'spring_sale, product_launch' },
            { param: 'utm_content', desc: 'Differentiates ads/links', examples: 'hero_btn, sidebar_ad' },
          ].map(item => (
            <div key={item.param} className="bg-white/3 border border-white/5 rounded-xl p-3">
              <code className="text-[#39FF14] text-xs font-mono">{item.param}</code>
              <p className="text-white/60 text-xs font-medium mt-1">{item.desc}</p>
              <p className="text-white/30 text-xs mt-0.5">e.g. {item.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}