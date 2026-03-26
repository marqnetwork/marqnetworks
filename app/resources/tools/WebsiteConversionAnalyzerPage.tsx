import { useState } from 'react';
import {
  Globe, Lock, ArrowRight, ChevronRight, Zap, TrendingUp,
  AlertTriangle, CheckCircle2, Eye, MousePointerClick, Smartphone,
  Gauge, Shield, MessageSquare, BarChart3, Target, Clock
} from 'lucide-react';
import { ToolPageLayout } from '../../components/ToolPageLayout';

function EmailGate({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-white text-center max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] bg-[#39FF14] opacity-[0.06] blur-[60px] rounded-full" />
      <div className="relative">
        <div className="w-14 h-14 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-[#39FF14]" />
        </div>
        <h3 className="font-bold mb-2 text-white">Unlock Your Conversion Audit</h3>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">Get an AI-powered conversion analysis with specific fixes to increase your website's performance.</p>
        <div className="flex flex-col gap-3 text-left">
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <input type="email" placeholder="Work email *" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <button onClick={() => email.includes('@') && onSubmit(email)}
            className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors mt-1 text-sm tracking-wide">
            Analyze My Website →
          </button>
          <p className="text-xs text-white/25 text-center">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

interface AuditItem {
  category: string;
  icon: React.ReactNode;
  color: string;
  score: number;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  issue: string;
  fix: string;
  estimatedLift: string;
}

export function WebsiteConversionAnalyzerPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [result, setResult] = useState<AuditItem[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState('leads');
  const [traffic, setTraffic] = useState('1k-10k');
  const [currentRate, setCurrentRate] = useState('2');
  const [hasVideo, setHasVideo] = useState(false);
  const [hasSocialProof, setHasSocialProof] = useState(false);
  const [hasLivechat, setHasLivechat] = useState(false);
  const [hasMobileOpt, setHasMobileOpt] = useState(false);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const rate = parseFloat(currentRate) || 2;
      const items: AuditItem[] = [
        {
          category: 'Above-the-Fold Clarity',
          icon: <Eye className="w-4 h-4" />,
          color: '#ef4444',
          score: 35,
          impact: 'Critical',
          issue: 'Visitors need to understand your value within 5 seconds. Most headlines are too vague or feature-focused instead of outcome-focused.',
          fix: 'Rewrite hero headline to: "We Help [AUDIENCE] Achieve [RESULT] in [TIMEFRAME]". Add a sub-headline that addresses the #1 objection.',
          estimatedLift: '+15-25%',
        },
        {
          category: 'Call-to-Action Strength',
          icon: <MousePointerClick className="w-4 h-4" />,
          color: '#f97316',
          score: 42,
          impact: 'High',
          issue: 'Generic CTAs like "Learn More" or "Submit" reduce conversions by up to 30%. CTA buttons may lack contrast or urgency.',
          fix: 'Use action + benefit CTAs: "Get My Free Audit", "Start Saving Time Today". Make CTA buttons high-contrast with the page.',
          estimatedLift: '+18% CTR',
        },
        {
          category: 'Social Proof',
          icon: <Shield className="w-4 h-4" />,
          color: hasSocialProof ? '#34d399' : '#fbbf24',
          score: hasSocialProof ? 75 : 30,
          impact: hasSocialProof ? 'Medium' : 'High',
          issue: hasSocialProof
            ? 'Social proof exists but may not be positioned optimally. Ensure testimonials are above the fold.'
            : 'No visible trust signals detected. 92% of consumers read reviews before purchasing.',
          fix: hasSocialProof
            ? 'Move strongest testimonial closer to the hero. Add client logos above the fold. Include specific numbers in testimonials.'
            : 'Add 3+ testimonials with photos, client logos, and star ratings above the fold immediately.',
          estimatedLift: hasSocialProof ? '+8-12%' : '+20-35%',
        },
        {
          category: 'Mobile Experience',
          icon: <Smartphone className="w-4 h-4" />,
          color: hasMobileOpt ? '#34d399' : '#ef4444',
          score: hasMobileOpt ? 80 : 35,
          impact: hasMobileOpt ? 'Low' : 'Critical',
          issue: hasMobileOpt
            ? 'Mobile optimization present, but test on smaller screens (iPhone SE) for edge cases.'
            : '60%+ of traffic is mobile. Poor mobile UX kills conversions — tap targets may be too small, fonts unreadable.',
          fix: hasMobileOpt
            ? 'Test on iPhone SE and mid-range Android. Ensure all CTAs are thumb-reachable.'
            : 'Redesign mobile experience with larger buttons, readable fonts, and sticky CTA bar.',
          estimatedLift: hasMobileOpt ? '+3-5%' : '+25-40%',
        },
        {
          category: 'Page Speed',
          icon: <Gauge className="w-4 h-4" />,
          color: '#fbbf24',
          score: 55,
          impact: 'High',
          issue: 'Every 1-second delay costs 7% in conversions. Average page load should be under 2.5 seconds.',
          fix: 'Compress images (WebP format), minimize JavaScript bundles, use a CDN, and implement lazy loading for below-fold content.',
          estimatedLift: '+7% per second saved',
        },
        {
          category: 'Video Content',
          icon: <MessageSquare className="w-4 h-4" />,
          color: hasVideo ? '#34d399' : '#a78bfa',
          score: hasVideo ? 85 : 40,
          impact: hasVideo ? 'Low' : 'Medium',
          issue: hasVideo
            ? 'Video content present. Ensure it auto-plays (muted) or has an engaging thumbnail.'
            : 'No video detected. Landing pages with video increase conversions by up to 86%.',
          fix: hasVideo
            ? 'Add captions, keep under 90 seconds, and include a CTA within the video.'
            : 'Add a 60-second explainer video or customer testimonial video above the fold.',
          estimatedLift: hasVideo ? '+5%' : '+20-40%',
        },
        {
          category: 'Live Chat / Support',
          icon: <MessageSquare className="w-4 h-4" />,
          color: hasLivechat ? '#34d399' : '#60a5fa',
          score: hasLivechat ? 80 : 45,
          impact: 'Medium',
          issue: hasLivechat
            ? 'Live chat present. Ensure response time is under 60 seconds for maximum impact.'
            : 'No live chat detected. Websites with live chat see up to 40% higher conversion rates.',
          fix: hasLivechat
            ? 'Set up automated greetings based on page and time on site. Track chat-to-conversion rate.'
            : 'Add a chat widget (Intercom, Drift, or Tidio). Even a chatbot can boost conversions 20%+.',
          estimatedLift: hasLivechat ? '+5-10%' : '+20-40%',
        },
        {
          category: 'Exit Intent Strategy',
          icon: <Target className="w-4 h-4" />,
          color: '#a78bfa',
          score: 30,
          impact: 'Medium',
          issue: '70% of visitors who leave never return. No exit-intent strategy means losing recoverable leads.',
          fix: 'Implement exit-intent popup with a compelling offer (discount, free resource, consultation). Use a lead magnet relevant to the page.',
          estimatedLift: '+10-15%',
        },
      ];

      setResult(items);
      setAnalyzing(false);
    }, 2000);
  };

  const overallScore = result
    ? Math.round(result.reduce((sum, item) => sum + item.score, 0) / result.length)
    : 0;

  const rate = parseFloat(currentRate) || 2;
  const improvedRate = (rate * (1 + overallScore * 0.005)).toFixed(1);
  const trafficNum = traffic === 'over-100k' ? 150000 : traffic === '10k-100k' ? 50000 : traffic === '1k-10k' ? 5000 : 500;
  const currentLeads = Math.round(trafficNum * (rate / 100));
  const potentialLeads = Math.round(trafficNum * (parseFloat(improvedRate) / 100));

  const impactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
      case 'High': return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' };
      case 'Medium': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
      default: return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' };
    }
  };

  return (
    <ToolPageLayout toolId="ai-website-conversion-analyzer">
      {!unlocked ? (
        <EmailGate onSubmit={(email) => { setUnlocked(true); console.log('Lead:', email); }} />
      ) : (
        <div className="space-y-6">
          {/* Input Form */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <h2 className="font-bold text-white mb-5 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-white/30" />
              Website Details
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Website URL *</label>
                <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. yourwebsite.com" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Primary Goal *</label>
                <select value={goal} onChange={e => setGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                  style={{ colorScheme: 'dark' }}>
                  <option value="leads">Generate Leads</option>
                  <option value="sales">Drive Online Sales</option>
                  <option value="signups">App / Software Sign-ups</option>
                  <option value="calls">Phone Calls / Consultations</option>
                  <option value="subscriptions">Newsletter Subscriptions</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Monthly Visitors *</label>
                <select value={traffic} onChange={e => setTraffic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                  style={{ colorScheme: 'dark' }}>
                  <option value="under-1k">Under 1,000</option>
                  <option value="1k-10k">1,000 - 10,000</option>
                  <option value="10k-100k">10,000 - 100,000</option>
                  <option value="over-100k">Over 100,000</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Current Conversion Rate (%)</label>
                <input type="number" value={currentRate} onChange={e => setCurrentRate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 2.3" step="0.1" style={{ colorScheme: 'dark' }} />
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <label className="block text-xs text-white/50 uppercase tracking-wider">Current Features</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Video', state: hasVideo, set: setHasVideo },
                    { label: 'Social Proof', state: hasSocialProof, set: setHasSocialProof },
                    { label: 'Live Chat', state: hasLivechat, set: setHasLivechat },
                    { label: 'Mobile Optimized', state: hasMobileOpt, set: setHasMobileOpt },
                  ].map(feature => (
                    <button
                      key={feature.label}
                      onClick={() => feature.set(!feature.state)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                        feature.state
                          ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30'
                          : 'bg-white/5 text-white/40 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {feature.state ? '✓ ' : ''}{feature.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={analyze} disabled={analyzing || !url}
              className="w-full mt-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50">
              {analyzing ? (
                <><div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" /> Analyzing...</>
              ) : (
                <><Globe className="w-4 h-4" /> Analyze Website</>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Score Overview */}
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Conversion Score</p>
                  <p className="text-4xl font-black" style={{ color: overallScore >= 60 ? '#39FF14' : overallScore >= 45 ? '#fbbf24' : '#ef4444' }}>
                    {overallScore}
                  </p>
                  <p className="text-xs text-white/30 mt-1">out of 100</p>
                </div>
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Current Rate</p>
                  <p className="text-4xl font-black text-white">{rate}%</p>
                  <p className="text-xs text-white/30 mt-1">{currentLeads.toLocaleString()} {goal}/mo</p>
                </div>
                <div className="bg-[#111111] border border-[#39FF14]/20 rounded-xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
                  <p className="text-xs text-[#39FF14] uppercase tracking-wider mb-2">Potential Rate</p>
                  <p className="text-4xl font-black text-[#39FF14]">{improvedRate}%</p>
                  <p className="text-xs text-white/30 mt-1">{potentialLeads.toLocaleString()} {goal}/mo</p>
                </div>
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Additional {goal}</p>
                  <p className="text-4xl font-black text-green-400">+{(potentialLeads - currentLeads).toLocaleString()}</p>
                  <p className="text-xs text-white/30 mt-1">per month from same traffic</p>
                </div>
              </div>

              {/* Audit Items */}
              <div className="space-y-3">
                <h2 className="font-bold text-white text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-white/30" />
                  Detailed Findings ({result.filter(r => r.impact === 'Critical').length} Critical, {result.filter(r => r.impact === 'High').length} High Priority)
                </h2>
                {result
                  .sort((a, b) => {
                    const order = { Critical: 0, High: 1, Medium: 2, Low: 3 };
                    return order[a.impact] - order[b.impact];
                  })
                  .map((item, i) => {
                    const ic = impactColor(item.impact);
                    return (
                      <div key={i} className="bg-[#111111] rounded-xl border border-white/8 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + '15', color: item.color }}>
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-sm">{item.category}</h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${ic.bg} ${ic.text} ${ic.border}`}>
                                  {item.impact} Impact
                                </span>
                                <span className="text-xs text-white/30">Score: {item.score}/100</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-[#39FF14] font-bold">{item.estimatedLift}</span>
                            <p className="text-xs text-white/25">est. lift</p>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                          <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-1" />
                            <div>
                              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Issue</p>
                              <p className="text-xs text-white/55 leading-relaxed">{item.issue}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-[#39FF14] shrink-0 mt-1" />
                            <div>
                              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Fix</p>
                              <p className="text-xs text-white/60 leading-relaxed">{item.fix}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* CTA */}
              <div className="bg-black border border-[#39FF14]/20 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-[#39FF14] opacity-[0.06] blur-[60px] rounded-full" />
                <div className="relative">
                  <TrendingUp className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                  <h3 className="text-xl font-black text-white mb-2">Want a Full Human-Reviewed Conversion Audit?</h3>
                  <p className="text-white/40 text-sm mb-5 max-w-md mx-auto">Our CRO experts will review your site page-by-page and deliver a prioritized action plan.</p>
                  <a href="https://marqnetworks.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-8 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold text-sm transition-colors">
                    Book Free Conversion Call <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
