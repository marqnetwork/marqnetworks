import { useState, useCallback } from 'react';
import { User, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { AIEnhanceButton } from '../../components/AIEnhanceButton';
import { ToolPageLayout } from '../../components/ToolPageLayout';

interface BioTemplate {
  id: string;
  label: string;
  template: (vars: Record<string, string>) => string;
}

const TEMPLATES: BioTemplate[] = [
  { id: 'professional', label: 'Professional', template: v => `${v.role} at ${v.company || 'a growing startup'}. Helping ${v.audience || 'businesses'} ${v.value || 'grow and scale'}. ${v.cta || 'Let\'s connect!'}` },
  { id: 'creative', label: 'Creative / Personal', template: v => `${v.emoji || '🚀'} ${v.role} | ${v.value || 'Building the future'} | ${v.passion || 'Coffee enthusiast'} | ${v.cta || 'DM me'}` },
  { id: 'authority', label: 'Authority / Expert', template: v => `${v.role} with ${v.experience || '10'}+ years in ${v.industry || 'tech'}. Featured in ${v.features || 'top publications'}. ${v.cta || 'Follow for insights.'}` },
  { id: 'startup', label: 'Startup Founder', template: v => `Founder of ${v.company || '[Company]'} — ${v.value || 'making X simple for Y'}. Previously ${v.previous || 'built and sold 2 startups'}. ${v.cta || 'Building in public 🏗️'}` },
  { id: 'minimal', label: 'Minimalist', template: v => `${v.role}. ${v.value || 'Making things simple'}. ${v.location || ''}`.trim() },
  { id: 'listicle', label: 'Bullet Points', template: v => `${v.emoji || '💡'} ${v.role}\n📍 ${v.location || 'Remote'}\n🎯 ${v.value || 'Helping you grow'}\n${v.hobby ? `🌟 ${v.hobby}` : '🌟 Always learning'}\n${v.cta ? `👉 ${v.cta}` : '👉 Link below ↓'}` },
  { id: 'storyteller', label: 'Storyteller', template: v => `From ${v.origin || 'humble beginnings'} to ${v.role}. Now I help ${v.audience || 'others'} ${v.value || 'achieve their goals'}. Every day is a new chapter. ${v.cta || '📖 Follow the journey'}` },
  { id: 'hashtag', label: 'Hashtag-Driven', template: v => `${v.role} | ${v.value || 'Digital strategist'} | ${v.company ? `@${v.company.replace(/\s/g, '')}` : ''} #${(v.industry || 'marketing').replace(/\s/g, '')} #${(v.passion || 'growth').replace(/\s/g, '')} #${(v.role || 'leader').split(' ').pop()?.replace(/\s/g, '')}`.trim() },
];

const PLATFORMS = [
  { id: 'twitter', name: 'X / Twitter', maxChars: 160, icon: '𝕏' },
  { id: 'linkedin', name: 'LinkedIn', maxChars: 2600, icon: 'in' },
  { id: 'instagram', name: 'Instagram', maxChars: 150, icon: '📸' },
  { id: 'tiktok', name: 'TikTok', maxChars: 80, icon: '🎵' },
  { id: 'threads', name: 'Threads', maxChars: 150, icon: '🧵' },
];

export function SocialMediaBioGeneratorPage() {
  const [platform, setPlatform] = useState('twitter');
  const [vars, setVars] = useState<Record<string, string>>({
    role: '', company: '', audience: '', value: '', industry: '',
    cta: '', location: '', emoji: '', passion: '', experience: '',
    features: '', previous: '', origin: '', hobby: '',
  });
  const [generated, setGenerated] = useState<{ template: string; bio: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const updateVar = (key: string, val: string) => setVars(prev => ({ ...prev, [key]: val }));

  const currentPlatform = PLATFORMS.find(p => p.id === platform)!;

  const generate = useCallback(() => {
    const results = TEMPLATES.map(t => ({
      template: t.label,
      bio: t.template(vars),
    }));
    setGenerated(results);
  }, [vars]);

  const handleCopy = (bio: string, id: string) => {
    navigator.clipboard.writeText(bio);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolPageLayout toolId="social-media-bio-generator">
      <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            {/* Platform selector */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${platform === p.id ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white/50 hover:bg-white/8'}`}
                >
                  <span>{p.icon}</span> {p.name}
                </button>
              ))}
            </div>

            <p className="text-xs text-white/25 mb-4">Max {currentPlatform.maxChars} characters for {currentPlatform.name}</p>

            <div className="flex flex-col gap-3">
              {[
                { key: 'role', label: 'Your Role / Title', ph: 'e.g. Marketing Director, Founder, Designer' },
                { key: 'company', label: 'Company / Brand', ph: 'e.g. MarQ Networks' },
                { key: 'audience', label: 'Who You Help', ph: 'e.g. startups, small businesses, creators' },
                { key: 'value', label: 'Your Value / What You Do', ph: 'e.g. grow revenue with AI-powered marketing' },
                { key: 'industry', label: 'Industry / Niche', ph: 'e.g. SaaS, e-commerce, real estate' },
                { key: 'cta', label: 'Call to Action', ph: 'e.g. Book a free call ↓, DM me, Follow for tips' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-white/40 mb-1 uppercase tracking-wider">{f.label}</label>
                  <input
                    type="text"
                    value={vars[f.key]}
                    onChange={e => updateVar(f.key, e.target.value)}
                    placeholder={f.ph}
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={generate}
              className="w-full mt-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <RefreshCw className="w-4 h-4" /> Generate Bios
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            {generated.length > 0 ? (
              generated.map((g, i) => {
                const overLimit = g.bio.length > currentPlatform.maxChars;
                return (
                  <div key={i} className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/40 font-medium">{g.template}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${overLimit ? 'text-red-400' : 'text-white/25'}`}>
                          {g.bio.length}/{currentPlatform.maxChars}
                        </span>
                        <button
                          onClick={() => handleCopy(g.bio, `${i}`)}
                          className="text-white/30 hover:text-[#39FF14] transition-colors"
                        >
                          {copied === `${i}` ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-white/65 whitespace-pre-wrap leading-relaxed">{g.bio}</p>
                    {overLimit && (
                      <p className="text-xs text-red-400/60 mt-2">Over character limit by {g.bio.length - currentPlatform.maxChars}</p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6 flex flex-col items-center justify-center text-center py-20">
                <User className="w-10 h-10 text-white/10 mb-3" />
                <p className="text-white/25 text-xs">Fill in your details and click Generate</p>
              </div>
            )}

            {/* AI Enhance */}
            {generated.length > 0 && (
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#39FF14]" />
                  <h3 className="font-semibold text-white text-sm">AI-Powered Bios</h3>
                </div>
                <p className="text-xs text-white/40 mb-3">Get uniquely crafted bios with personality and flair.</p>
                <AIEnhanceButton
                  prompt={`Create 5 unique, engaging ${currentPlatform.name} bios (max ${currentPlatform.maxChars} chars each) for:\n\nRole: ${vars.role || 'Professional'}\nCompany: ${vars.company || 'N/A'}\nHelps: ${vars.audience || 'businesses'}\nValue: ${vars.value || 'growing and scaling'}\nIndustry: ${vars.industry || 'tech'}\nCTA: ${vars.cta || 'Follow for tips'}\n\nMake each bio unique in tone: professional, witty, bold, storytelling, and minimalist. Keep each under ${currentPlatform.maxChars} characters.`}
                  systemPrompt={`You are a social media branding expert. Create compelling, authentic bios for ${currentPlatform.name}. Each bio MUST be under ${currentPlatform.maxChars} characters. Include character count after each.`}
                  buttonLabel="Generate AI Bios"
                />
              </div>
            )}
          </div>
      </div>
    </ToolPageLayout>
  );
}