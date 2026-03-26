import { useState, useCallback } from 'react';
import { Hash, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';

const HASHTAG_DB: Record<string, string[]> = {
  marketing: ['marketing','digitalmarketing','marketingtips','contentmarketing','marketingstrategy','socialmediamarketing','onlinemarketing','brandmarketing','growthmarketing','marketingdigital','inboundmarketing','emailmarketing','affiliatemarketing','influencermarketing','performancemarketing'],
  business: ['business','entrepreneur','startup','smallbusiness','businessowner','businesstips','entrepreneurship','success','motivation','hustle','grind','ceo','founder','leadership','management'],
  technology: ['technology','tech','ai','machinelearning','coding','programming','developer','software','innovation','digital','automation','cloud','data','cybersecurity','blockchain'],
  socialmedia: ['socialmedia','instagram','facebook','tiktok','linkedin','twitter','youtube','threads','reels','viral','engagement','followers','content','creator','influencer'],
  design: ['design','graphicdesign','uidesign','uxdesign','webdesign','branding','creative','designer','designinspiration','typography','logo','illustration','figma','dribbble','behance'],
  fitness: ['fitness','workout','gym','health','wellness','fitnessmotivation','exercise','healthylifestyle','training','fitlife','bodybuilding','nutrition','yoga','crossfit','personaltrainer'],
  food: ['food','foodie','cooking','recipe','homemade','foodphotography','instafood','delicious','chef','baking','healthyfood','vegan','plantbased','foodblogger','restaurantlife'],
  travel: ['travel','wanderlust','adventure','explore','travelgram','travelphotography','vacation','roadtrip','travelblogger','backpacking','digitalnomad','beach','nature','sunset','landscape'],
  photography: ['photography','photo','photographer','photooftheday','naturephotography','streetphotography','portrait','landscape','canon','nikon','sony','lightroom','photoshoot','editing','visualstorytelling'],
  realestate: ['realestate','realtor','property','home','househunting','homebuyer','investment','luxuryrealestate','realestateagent','firsttimehomebuyer','mortgage','commercialrealestate','openhouse','justlisted','homesale'],
  ecommerce: ['ecommerce','onlineshopping','shopify','dropshipping','onlinestore','amazon','etsy','shopsmall','handmade','retail','wholesale','productphotography','packaging','branddevelopment','sellonline'],
  saas: ['saas','software','b2b','startup','productmanagement','devtools','api','cloud','subscription','scalability','userexperience','customersuccess','mrr','churnrate','growthhacking'],
};

const NICHE_SIZES = {
  broad: { label: 'Broad (500K+)', prefix: '' },
  medium: { label: 'Medium (50K-500K)', prefix: '' },
  niche: { label: 'Niche (<50K)', prefix: '' },
};

function generateHashtags(keywords: string[], platform: string): { tag: string; category: string; size: string }[] {
  const results: { tag: string; category: string; size: string }[] = [];
  const used = new Set<string>();

  const add = (tag: string, category: string, size: string) => {
    const clean = tag.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!used.has(clean) && clean.length >= 3) {
      used.add(clean);
      results.push({ tag: '#' + clean, category, size });
    }
  };

  for (const kw of keywords) {
    const kwClean = kw.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Direct keyword
    add(kwClean, 'Direct', 'broad');

    // From database
    for (const [cat, tags] of Object.entries(HASHTAG_DB)) {
      if (cat.includes(kwClean) || kwClean.includes(cat) || tags.some(t => t.includes(kwClean) || kwClean.includes(t))) {
        const shuffled = [...tags].sort(() => Math.random() - 0.5);
        for (const tag of shuffled.slice(0, 5)) {
          add(tag, cat, Math.random() > 0.5 ? 'broad' : 'medium');
        }
      }
    }

    // Generated variants
    add(kwClean + 'tips', 'Generated', 'medium');
    add(kwClean + 'strategy', 'Generated', 'niche');
    add(kwClean + 'life', 'Generated', 'medium');
    add(kwClean + '2026', 'Generated', 'niche');
    add(kwClean + 'community', 'Generated', 'niche');
    add(kwClean + 'goals', 'Generated', 'medium');
    add(kwClean + 'motivation', 'Generated', 'medium');
    add(kwClean + 'growth', 'Generated', 'niche');
  }

  // Platform-specific
  if (platform === 'instagram' || platform === 'tiktok') {
    add('fyp', 'Platform', 'broad');
    add('viral', 'Platform', 'broad');
    add('trending', 'Platform', 'broad');
    add('explore', 'Platform', 'broad');
  }
  if (platform === 'linkedin') {
    add('thoughtleadership', 'Platform', 'medium');
    add('careergrowth', 'Platform', 'medium');
    add('networking', 'Platform', 'broad');
    add('professionaldevelopment', 'Platform', 'niche');
  }

  return results.sort(() => Math.random() - 0.5).slice(0, 30);
}

export function HashtagGeneratorPage() {
  const [keywords, setKeywords] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [hashtags, setHashtags] = useState<{ tag: string; category: string; size: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const kws = keywords.split(/[,\s]+/).filter(w => w.trim().length >= 2);
    if (kws.length === 0) return;
    setHashtags(generateHashtags(kws, platform));
  }, [keywords, platform]);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(hashtags.map(h => h.tag).join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeColors: Record<string, string> = {
    broad: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    medium: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    niche: 'bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/20',
  };

  const maxTags: Record<string, number> = { instagram: 30, tiktok: 5, linkedin: 5, twitter: 3, facebook: 10 };

  return (
    <ToolPageLayout toolId="hashtag-generator">
      {/* Input */}
      <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 mb-6">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[
              { id: 'instagram', name: 'Instagram', icon: '📸' },
              { id: 'tiktok', name: 'TikTok', icon: '🎵' },
              { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
              { id: 'twitter', name: 'X / Twitter', icon: '𝕏' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${platform === p.id ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 hover:bg-white/8'}`}
              >
                <span>{p.icon}</span> {p.name}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="Enter keywords (e.g. marketing, startup, AI)"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                onKeyDown={e => e.key === 'Enter' && generate()}
              />
            </div>
            <button
              onClick={generate}
              className="px-6 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm tracking-wide shrink-0"
            >
              <RefreshCw className="w-4 h-4" /> Generate
            </button>
          </div>
        </div>

        {hashtags.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Hashtag list */}
            <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-white/8 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white text-sm">{hashtags.length} Hashtags</h2>
                <button onClick={handleCopyAll} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#39FF14] transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {hashtags.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => { navigator.clipboard.writeText(h.tag); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-105 cursor-pointer ${sizeColors[h.size]}`}
                    title={`${h.category} — ${h.size} reach`}
                  >
                    {h.tag}
                  </button>
                ))}
              </div>

              {/* Copy block */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="text-xs text-white/30 mb-2">Copy-paste block:</p>
                <div className="bg-white/3 rounded-lg p-3">
                  <p className="text-xs text-white/50 font-mono break-all">{hashtags.map(h => h.tag).join(' ')}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                <h3 className="font-semibold text-white text-sm mb-3">Reach Breakdown</h3>
                {['broad', 'medium', 'niche'].map(size => {
                  const count = hashtags.filter(h => h.size === size).length;
                  return (
                    <div key={size} className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${size === 'broad' ? 'bg-blue-400' : size === 'medium' ? 'bg-purple-400' : 'bg-[#39FF14]'}`} />
                        <span className="text-white/50 capitalize">{size}</span>
                      </div>
                      <span className="text-white/70 font-medium">{count}</span>
                    </div>
                  );
                })}
                <p className="text-xs text-white/25 mt-3 leading-relaxed">
                  Recommended: Use max {maxTags[platform] || 10} hashtags on {platform === 'twitter' ? 'X' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                </p>
              </div>

              <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                <h3 className="font-semibold text-white text-sm mb-3">Strategy Tip</h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  Mix broad, medium, and niche hashtags for maximum reach. Broad hashtags get visibility; niche hashtags get engaged followers. Aim for a 20/50/30 split.
                </p>
              </div>

              {/* AI Enhance */}
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#39FF14]" />
                  <h3 className="font-semibold text-white text-sm">AI Hashtags</h3>
                </div>
                <p className="text-xs text-white/40 mb-3">Get trending, niche-specific hashtags from AI.</p>
                <AIEnhanceButton
                  prompt={`Generate 20 strategic hashtags for ${platform === 'twitter' ? 'X/Twitter' : platform} about: ${keywords}\n\nOrganize them into:\n- 5 Broad reach (500K+ posts)\n- 10 Medium reach (50K-500K posts)\n- 5 Niche/specific (under 50K posts)\n\nInclude the # symbol. Make them specific and relevant, not generic. Consider trending topics in this niche.`}
                  systemPrompt={`You are a social media strategist specializing in ${platform} hashtag research. Generate hashtags that maximize both reach and engagement.`}
                  buttonLabel="Get AI Hashtags"
                />
              </div>
            </div>
          </div>
        )}
    </ToolPageLayout>
  );
}