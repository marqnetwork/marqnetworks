import { useCallback, useState } from 'react';
import { Check, Copy, Lightbulb, RefreshCw, Zap } from 'lucide-react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const PATTERNS = [
  (b: string, v: string, a: string) => `${b}. ${v}.`,
  (b: string, v: string, a: string) => `${v} for ${a}.`,
  (b: string, v: string, a: string) => `Where ${a} find ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `${b} — ${v}.`,
  (b: string, v: string, a: string) => `Empowering ${a} to ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `${v}. It's what we do.`,
  (b: string, v: string, a: string) => `Your partner in ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `${b}: Because ${a} deserve ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `Think ${v.split(' ')[0]}. Think ${b}.`,
  (b: string, v: string, a: string) => `${v} starts here.`,
  (b: string, v: string, a: string) => `Built for ${a}. Driven by ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `The smarter way to ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `${b}. ${v}. Every time.`,
  (b: string, v: string, a: string) => `Don't just dream it. ${v}.`,
  (b: string, v: string, a: string) => `${a}? Meet ${b}.`,
  (b: string, v: string, a: string) => `More than ${v.toLowerCase()}.`,
  (b: string, v: string, a: string) => `Redefining ${v.toLowerCase()} for ${a}.`,
  (b: string, v: string, a: string) => `${b}. Simply ${v.split(' ')[0].toLowerCase()}.`,
  (b: string, v: string, a: string) => `Where ${v.toLowerCase()} meets innovation.`,
  (b: string, v: string, a: string) => `${v} — made simple.`,
];

const POWER_VERBS = ['accelerate','amplify','boost','build','craft','deliver','drive','elevate','empower','fuel','grow','ignite','inspire','launch','master','optimize','power','scale','spark','transform','unleash','unlock'];
const ADJECTIVES = ['bold','brilliant','effortless','fast','fearless','innovative','intelligent','next-gen','powerful','proven','reliable','seamless','simple','smart','stunning','superior','trusted','ultimate','unmatched','unstoppable'];

function generateSlogans(brand: string, value: string, audience: string, tone: string): string[] {
  const b = brand || 'Your Brand';
  const v = value || 'deliver results';
  const a = audience || 'businesses';

  const slogans = new Set<string>();

  // Pattern-based
  for (const pattern of PATTERNS) {
    slogans.add(pattern(b, v, a));
  }

  // Power verb combos
  for (let i = 0; i < 5; i++) {
    const verb = POWER_VERBS[Math.floor(Math.random() * POWER_VERBS.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    slogans.add(`${verb.charAt(0).toUpperCase() + verb.slice(1)} your ${v.toLowerCase()} with ${b}.`);
    slogans.add(`${adj.charAt(0).toUpperCase() + adj.slice(1)} ${v.toLowerCase()} for ${a}.`);
  }

  return Array.from(slogans).sort(() => Math.random() - 0.5).slice(0, 15);
}

export function BusinessSloganGeneratorPage() {
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('professional');
  const [slogans, setSlogans] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    setSlogans(generateSlogans(brand, value, audience, tone));
  }, [brand, value, audience, tone]);

  const toggleFavorite = (slogan: string) => {
    setFavorites(prev => {
      const n = new Set(prev);
      if (n.has(slogan)) n.delete(slogan); else n.add(slogan);
      return n;
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolPageLayout toolId="business-slogan-generator">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Input */}
        <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-white/8 p-6">
          <h2 className="font-bold text-white text-sm mb-5">Your Brand Info</h2>
          <div className="flex flex-col gap-4">
            {[
              { key: 'brand', label: 'Brand / Business Name', value: brand, set: setBrand, ph: 'e.g. MarQ Networks' },
              { key: 'value', label: 'Core Value / Promise', value, set: setValue, ph: 'e.g. AI-powered marketing growth' },
              { key: 'audience', label: 'Target Audience', value: audience, set: setAudience, ph: 'e.g. small businesses, startups' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">{f.label}</label>
                <input
                  type="text"
                  value={f.value}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Tone</label>
              <div className="flex flex-wrap gap-1.5">
                {['professional', 'bold', 'playful', 'inspirational', 'minimal'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tone === t ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 hover:bg-white/8'}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generate}
              className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <RefreshCw className="w-4 h-4" /> Generate Slogans
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="md:col-span-3 flex flex-col gap-4">
          {slogans.length > 0 ? (
            <>
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-white text-sm">{slogans.length} Slogans Generated</h2>
                  <button onClick={generate} className="text-xs text-white/30 hover:text-[#39FF14] transition-colors flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {slogans.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-lg p-3 border transition-all ${favorites.has(s) ? 'bg-[#39FF14]/5 border-[#39FF14]/20' : 'bg-white/3 border-white/5 hover:border-white/10'}`}
                    >
                      <p className="text-sm text-white/70 flex-1">{s}</p>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button
                          onClick={() => toggleFavorite(s)}
                          className={`text-xs transition-colors ${favorites.has(s) ? 'text-[#39FF14]' : 'text-white/20 hover:text-[#39FF14]'}`}
                        >
                          {favorites.has(s) ? '★' : '☆'}
                        </button>
                        <button
                          onClick={() => handleCopy(s)}
                          className="text-white/20 hover:text-[#39FF14] transition-colors"
                        >
                          {copied === s ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorites */}
              {favorites.size > 0 && (
                <div className="bg-[#111111] rounded-2xl border border-[#39FF14]/20 p-5">
                  <h3 className="font-semibold text-[#39FF14] text-sm mb-3">Your Favorites ({favorites.size})</h3>
                  <div className="flex flex-col gap-1.5">
                    {Array.from(favorites).map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{f}</span>
                        <button onClick={() => handleCopy(f)} className="text-white/20 hover:text-[#39FF14] transition-colors">
                          {copied === f ? <Check className="w-3 h-3 text-[#39FF14]" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Enhance */}
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#39FF14]" />
                  <h3 className="font-semibold text-white text-sm">AI Creative Slogans</h3>
                </div>
                <p className="text-xs text-white/40 mb-3">Get unique, creative slogans crafted by AI based on your brand identity.</p>
                <AIEnhanceButton
                  prompt={`Create 10 unique, creative slogans/taglines for:\n\nBrand: ${brand || 'a growing business'}\nCore value: ${value || 'delivering results'}\nTarget audience: ${audience || 'businesses'}\nTone: ${tone}\n\nMake them:\n- Memorable and catchy\n- Under 10 words each\n- Mix of styles: powerful, witty, emotional, aspirational\n- Include at least 2 that use wordplay or alliteration\n\nNumber each slogan and add a brief note on why it works.`}
                  systemPrompt="You are a brand strategist and copywriter who creates iconic slogans and taglines. Think Nike 'Just Do It', Apple 'Think Different', De Beers 'A Diamond is Forever' level quality."
                  buttonLabel="Generate AI Slogans"
                />
              </div>
            </>
          ) : (
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 flex flex-col items-center justify-center text-center py-20">
              <Lightbulb className="w-10 h-10 text-white/10 mb-3" />
              <p className="text-white/25 text-xs">Fill in your brand details and click Generate</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
