import { useState, useCallback } from 'react';
import { Globe, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const PREFIXES = ['get','try','use','go','my','the','hey','hi','join','meet','one','pro','super','ultra','mega','hyper','neo','next','smart','fast','quick','easy','simple','pure','bold','bright','clear','prime','apex','peak','core','hub','base','flow','wave','pulse','spark','glow','rise','leap','lift','sync','blend','craft','forge','mint','hatch','snap','dash'];
const SUFFIXES = ['ly','ify','io','co','ai','app','hub','lab','hq','zone','spot','nest','box','pad','deck','stack','base','space','ware','works','forge','craft','shift','boost','path','line','point','verse','scale','cloud','logic','mind','sense','wise','byte','bit','node','link','net','wave'];
const TLDS = ['.com', '.io', '.co', '.ai', '.app', '.dev', '.tech', '.org', '.net', '.xyz'];

function generateDomains(keywords: string[], style: string): { name: string; tld: string; type: string }[] {
  const results: { name: string; tld: string; type: string }[] = [];
  const used = new Set<string>();

  const add = (name: string, tld: string, type: string) => {
    const key = name + tld;
    if (!used.has(key) && name.length >= 3 && name.length <= 20) {
      used.add(key);
      results.push({ name, tld, type });
    }
  };

  const kws = keywords.map(k => k.toLowerCase().replace(/[^a-z0-9]/g, ''));

  for (const kw of kws) {
    // Direct keyword
    for (const tld of TLDS.slice(0, 4)) add(kw, tld, 'Direct');

    // Prefix + keyword
    for (let i = 0; i < 5; i++) {
      const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
      const tld = TLDS[Math.floor(Math.random() * TLDS.length)];
      add(prefix + kw, tld, 'Prefix');
    }

    // Keyword + suffix
    for (let i = 0; i < 5; i++) {
      const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
      const tld = TLDS[Math.floor(Math.random() * TLDS.length)];
      add(kw + suffix, tld, 'Suffix');
    }

    // Two keyword combo
    for (const kw2 of kws) {
      if (kw !== kw2) {
        const tld = TLDS[Math.floor(Math.random() * TLDS.length)];
        add(kw + kw2, tld, 'Combo');
      }
    }
  }

  // Brandable / mashup style
  for (const kw of kws) {
    if (kw.length >= 4) {
      const half = Math.ceil(kw.length / 2);
      const randomSuffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
      add(kw.slice(0, half) + randomSuffix, '.com', 'Brandable');
      add(kw.slice(0, half) + 'ify', '.com', 'Brandable');
      add(kw + 'r', '.com', 'Brandable');
    }
  }

  // Shuffle and limit
  return results.sort(() => Math.random() - 0.5).slice(0, 30);
}

export function DomainNameGeneratorPage() {
  const [keywords, setKeywords] = useState('');
  const [style, setStyle] = useState('all');
  const [domains, setDomains] = useState<{ name: string; tld: string; type: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    const kws = keywords.split(/[,\s]+/).filter(w => w.trim().length >= 2);
    if (kws.length === 0) return;
    setDomains(generateDomains(kws, style));
  }, [keywords, style]);

  const handleCopy = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopied(domain);
    setTimeout(() => setCopied(null), 2000);
  };

  const typeColors: Record<string, string> = {
    Direct: 'bg-[#39FF14]/10 text-[#39FF14]',
    Prefix: 'bg-blue-500/10 text-blue-400',
    Suffix: 'bg-purple-500/10 text-purple-400',
    Combo: 'bg-pink-500/10 text-pink-400',
    Brandable: 'bg-yellow-500/10 text-yellow-400',
  };

  return (
    <ToolPageLayout toolId="domain-name-generator">
      {/* Input */}
        <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Keywords (comma or space separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="e.g. cloud, sync, data"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                onKeyDown={e => e.key === 'Enter' && generate()}
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Style</label>
              <select
                value={style}
                onChange={e => setStyle(e.target.value)}
                className="px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                style={{ colorScheme: 'dark' }}
              >
                <option value="all">All Styles</option>
                <option value="brandable">Brandable</option>
                <option value="descriptive">Descriptive</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={generate}
                className="px-6 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm tracking-wide"
              >
                <RefreshCw className="w-4 h-4" /> Generate
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {domains.length > 0 && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-sm">{domains.length} Domain Ideas</h2>
              <button onClick={generate} className="text-xs text-white/30 hover:text-[#39FF14] transition-colors flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {domains.map(d => (
                <div
                  key={d.name + d.tld}
                  className="flex items-center justify-between bg-white/3 border border-white/5 rounded-lg p-3 hover:border-[#39FF14]/20 transition-all group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/80 font-mono truncate">
                      {d.name}<span className="text-white/40">{d.tld}</span>
                    </p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded mt-1 inline-block ${typeColors[d.type] || 'bg-white/5 text-white/30'}`}>
                      {d.type}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(d.name + d.tld)}
                    className="text-white/20 hover:text-[#39FF14] transition-colors shrink-0 ml-2"
                  >
                    {copied === d.name + d.tld ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Enhance */}
        {domains.length > 0 && (
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#39FF14]" />
              <h3 className="font-semibold text-white text-sm">AI Creative Domains</h3>
            </div>
            <p className="text-xs text-white/40 mb-3">Get AI-generated creative, memorable domain name ideas based on your keywords.</p>
            <AIEnhanceButton
              prompt={`Generate 10 creative, brandable domain name ideas for these keywords: ${keywords}\n\nConsider:\n- Short, memorable names (under 12 chars)\n- Portmanteaus and word mashups\n- Made-up words that sound good\n- Names that work well as brands\n\nFor each domain, suggest the best TLD (.com, .io, .co, .ai, etc.) and briefly explain why the name works.`}
              systemPrompt="You are a branding expert who specializes in creating memorable, unique domain names. Focus on names that are easy to spell, pronounce, and remember."
              buttonLabel="Generate AI Domain Ideas"
            />
          </div>
        )}
    </ToolPageLayout>
  );
}