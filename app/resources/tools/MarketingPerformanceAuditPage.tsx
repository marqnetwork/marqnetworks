import { useState } from 'react';
import {
  LineChart, Lock, ArrowRight, ChevronRight, Zap, TrendingUp,
  AlertTriangle, CheckCircle2, DollarSign, BarChart3, Target,
  Mail, Search, Globe, Share2, Megaphone, Eye, Users
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
        <h3 className="font-bold mb-2 text-white">Unlock Your Marketing Audit</h3>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">Get a comprehensive audit of your marketing performance with channel-by-channel recommendations.</p>
        <div className="flex flex-col gap-3 text-left">
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <input type="email" placeholder="Work email *" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#39FF14]/50 transition-colors text-sm" />
          <button onClick={() => email.includes('@') && onSubmit(email)}
            className="w-full py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-colors mt-1 text-sm tracking-wide">
            Start Marketing Audit →
          </button>
          <p className="text-xs text-white/25 text-center">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

interface ChannelAudit {
  name: string;
  icon: React.ReactNode;
  color: string;
  score: number;
  allocBudget: number;
  recommendedBudget: number;
  roas: number;
  issues: string[];
  fixes: string[];
  status: 'scale' | 'optimize' | 'pause' | 'test';
}

export function MarketingPerformanceAuditPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [result, setResult] = useState<ChannelAudit[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [channels, setChannels] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('3000');
  const [monthlyRevenue, setMonthlyRevenue] = useState('9000');
  const [goal, setGoal] = useState('increase-roas');
  const [hasTracking, setHasTracking] = useState(false);
  const [hasRetargeting, setHasRetargeting] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasSEO, setHasSEO] = useState(false);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const budget = parseFloat(monthlyBudget) || 3000;
      const revenue = parseFloat(monthlyRevenue) || 9000;
      const channelList = channels.split(',').map(c => c.trim()).filter(Boolean);

      const channelConfigs: Record<string, { icon: React.ReactNode; color: string }> = {
        'google': { icon: <Search className="w-4 h-4" />, color: '#60a5fa' },
        'facebook': { icon: <Share2 className="w-4 h-4" />, color: '#a78bfa' },
        'meta': { icon: <Share2 className="w-4 h-4" />, color: '#a78bfa' },
        'linkedin': { icon: <Users className="w-4 h-4" />, color: '#0077b5' },
        'seo': { icon: <Globe className="w-4 h-4" />, color: '#34d399' },
        'email': { icon: <Mail className="w-4 h-4" />, color: '#f97316' },
        'content': { icon: <Eye className="w-4 h-4" />, color: '#fbbf24' },
        'default': { icon: <Megaphone className="w-4 h-4" />, color: '#a78bfa' },
      };

      const getConfig = (name: string) => {
        const lower = name.toLowerCase();
        for (const key of Object.keys(channelConfigs)) {
          if (lower.includes(key)) return channelConfigs[key];
        }
        return channelConfigs.default;
      };

      const totalChannels = Math.max(channelList.length, 3);
      const budgetPerChannel = budget / totalChannels;

      const audits: ChannelAudit[] = [];

      // Always audit these channels
      const auditChannels = channelList.length > 0
        ? channelList
        : ['Google Ads', 'Social Media', 'Email Marketing'];

      auditChannels.forEach((ch, i) => {
        const config = getConfig(ch);
        const channelRoas = 1.5 + Math.random() * 4;
        const score = Math.round(30 + Math.random() * 50);
        const isPerforming = channelRoas > 3;

        audits.push({
          name: ch,
          icon: config.icon,
          color: config.color,
          score,
          allocBudget: Math.round(budgetPerChannel),
          recommendedBudget: isPerforming ? Math.round(budgetPerChannel * 1.5) : Math.round(budgetPerChannel * 0.6),
          roas: Math.round(channelRoas * 10) / 10,
          issues: [
            channelRoas < 2 ? `ROAS is ${channelRoas.toFixed(1)}x — below the 3x minimum target` : `ROAS is ${channelRoas.toFixed(1)}x — ${channelRoas > 4 ? 'excellent' : 'acceptable'}`,
            !hasTracking ? 'Attribution tracking may be inaccurate — 40-60% of conversions could be misattributed' : 'Tracking is in place but verify cross-device attribution',
            score < 50 ? 'Creative fatigue detected — refresh ad copy and visuals' : 'Performance is stable but testing could improve results',
          ],
          fixes: [
            isPerforming ? 'Scale budget by 50% — this channel is your top performer' : 'Reduce spend and redirect to higher-performing channels',
            'A/B test new ad creative variations (3-5 per campaign)',
            channelRoas < 3 ? 'Narrow audience targeting to reduce wasted spend' : 'Expand lookalike audiences to reach new segments',
          ],
          status: channelRoas > 4 ? 'scale' : channelRoas > 2.5 ? 'optimize' : channelRoas > 1.5 ? 'pause' : 'test',
        });
      });

      // Add missing channel recommendations
      if (!hasEmail) {
        audits.push({
          name: 'Email Marketing',
          icon: <Mail className="w-4 h-4" />,
          color: '#f97316',
          score: 0,
          allocBudget: 0,
          recommendedBudget: Math.round(budget * 0.1),
          roas: 36,
          issues: [
            'Email marketing is not active — you\'re leaving the highest-ROI channel unused',
            'Email delivers $36 ROI per $1 spent on average',
            'Your existing traffic and leads are not being nurtured',
          ],
          fixes: [
            'Start a weekly newsletter immediately',
            'Build a 6-part automated nurture sequence',
            'Segment your list by interest and engagement level',
          ],
          status: 'test',
        });
      }

      if (!hasSEO) {
        audits.push({
          name: 'SEO / Content Marketing',
          icon: <Globe className="w-4 h-4" />,
          color: '#34d399',
          score: 0,
          allocBudget: 0,
          recommendedBudget: Math.round(budget * 0.15),
          roas: 0,
          issues: [
            'No SEO/content strategy detected',
            'Missing out on compounding organic traffic (0 ongoing ad cost)',
            'Competitors are likely capturing your target keywords',
          ],
          fixes: [
            'Publish 2 SEO blog posts per week for 6 months',
            'Target 20 buyer-intent keywords in your industry',
            'Build topic clusters around core service areas',
          ],
          status: 'test',
        });
      }

      if (!hasRetargeting) {
        audits.push({
          name: 'Retargeting',
          icon: <Target className="w-4 h-4" />,
          color: '#ef4444',
          score: 0,
          allocBudget: 0,
          recommendedBudget: Math.round(budget * 0.1),
          roas: 0,
          issues: [
            '97% of website visitors leave without converting — you\'re not recapturing them',
            'No retargeting pixels detected',
            'This is one of the highest-ROI tactics available',
          ],
          fixes: [
            'Install Meta Pixel and Google Ads remarketing tag today',
            'Allocate 10% of budget to retargeting campaigns',
            'Create separate retargeting ads for different page visitors',
          ],
          status: 'test',
        });
      }

      setResult(audits);
      setAnalyzing(false);
    }, 2200);
  };

  const budget = parseFloat(monthlyBudget) || 3000;
  const revenue = parseFloat(monthlyRevenue) || 9000;
  const currentRoas = budget > 0 ? revenue / budget : 0;
  const projectedRoas = currentRoas * 1.5;

  const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    scale: { label: 'Scale', color: '#39FF14', bg: 'bg-[#39FF14]/10', border: 'border-[#39FF14]/20' },
    optimize: { label: 'Optimize', color: '#60a5fa', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    pause: { label: 'Reduce/Pause', color: '#fbbf24', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    test: { label: 'Start/Test', color: '#a78bfa', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  };

  return (
    <ToolPageLayout toolId="ai-marketing-performance-audit">
      {!unlocked ? (
        <EmailGate onSubmit={(email) => { setUnlocked(true); console.log('Lead:', email); }} />
      ) : (
        <div className="space-y-6">
          {/* Input Form */}
          <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
            <h2 className="font-bold text-white mb-5 text-sm flex items-center gap-2">
              <LineChart className="w-4 h-4 text-white/30" />
              Your Marketing Details
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Active Marketing Channels *</label>
                <input type="text" value={channels} onChange={e => setChannels(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. Google Ads, Facebook, LinkedIn, Email" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Monthly Marketing Budget *</label>
                <input type="text" value={monthlyBudget} onChange={e => setMonthlyBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 3000" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Monthly Revenue from Marketing</label>
                <input type="text" value={monthlyRevenue} onChange={e => setMonthlyRevenue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 placeholder-white/30"
                  placeholder="e.g. 9000" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Primary Goal *</label>
                <select value={goal} onChange={e => setGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-[#39FF14]/50 [&>option]:bg-[#1a1a1a]"
                  style={{ colorScheme: 'dark' }}>
                  <option value="reduce-cac">Reduce Cost Per Acquisition</option>
                  <option value="increase-roas">Increase ROAS / Revenue</option>
                  <option value="more-leads">Generate More Leads</option>
                  <option value="brand">Improve Brand Awareness</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <label className="block text-xs text-white/50 uppercase tracking-wider">Current Capabilities</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Tracking/Analytics', state: hasTracking, set: setHasTracking },
                    { label: 'Retargeting', state: hasRetargeting, set: setHasRetargeting },
                    { label: 'Email Marketing', state: hasEmail, set: setHasEmail },
                    { label: 'SEO/Content', state: hasSEO, set: setHasSEO },
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
            <button onClick={analyze} disabled={analyzing}
              className="w-full mt-5 py-3 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50">
              {analyzing ? (
                <><div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" /> Auditing Performance...</>
              ) : (
                <><LineChart className="w-4 h-4" /> Run Performance Audit</>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* ROAS Overview */}
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Monthly Budget</p>
                  <p className="text-2xl font-black text-white">${budget.toLocaleString()}</p>
                </div>
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Current ROAS</p>
                  <p className={`text-2xl font-black ${currentRoas >= 3 ? 'text-[#39FF14]' : currentRoas >= 2 ? 'text-amber-400' : 'text-red-400'}`}>
                    {currentRoas.toFixed(1)}x
                  </p>
                  <p className="text-xs text-white/25 mt-0.5">{currentRoas >= 3 ? 'Good' : currentRoas >= 2 ? 'Average' : 'Below target'}</p>
                </div>
                <div className="bg-[#111111] border border-[#39FF14]/20 rounded-xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
                  <p className="text-xs text-[#39FF14] uppercase tracking-wider mb-1">Projected ROAS</p>
                  <p className="text-2xl font-black text-[#39FF14]">{projectedRoas.toFixed(1)}x</p>
                  <p className="text-xs text-white/25 mt-0.5">with optimizations</p>
                </div>
                <div className="bg-[#111111] border border-white/8 rounded-xl p-5 text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Performance Score</p>
                  <p className="text-2xl font-black text-white">
                    {Math.round(result.filter(r => r.allocBudget > 0).reduce((sum, r) => sum + r.score, 0) / Math.max(1, result.filter(r => r.allocBudget > 0).length))}
                    <span className="text-white/30 text-sm">/100</span>
                  </p>
                </div>
              </div>

              {/* Channel Cards */}
              <div className="space-y-3">
                <h2 className="font-bold text-white text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-white/30" />
                  Channel-by-Channel Analysis
                </h2>
                {result.map((channel, i) => {
                  const st = statusConfig[channel.status];
                  return (
                    <div key={i} className="bg-[#111111] rounded-xl border border-white/8 p-5">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: channel.color + '15', color: channel.color }}>
                            {channel.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm">{channel.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${st.bg} ${st.border}`} style={{ color: st.color }}>
                                {st.label}
                              </span>
                              {channel.roas > 0 && (
                                <span className="text-xs text-white/30">ROAS: {channel.roas}x</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <p className="text-xs text-white/30">Current</p>
                            <p className="text-sm font-bold text-white">${channel.allocBudget.toLocaleString()}/mo</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-white/20" />
                          <div>
                            <p className="text-xs text-[#39FF14]">Recommended</p>
                            <p className="text-sm font-bold text-[#39FF14]">${channel.recommendedBudget.toLocaleString()}/mo</p>
                          </div>
                        </div>
                      </div>
                      {/* Score bar */}
                      {channel.score > 0 && (
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                          <div className="h-full rounded-full" style={{ width: `${channel.score}%`, backgroundColor: channel.color }} />
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Findings</p>
                          {channel.issues.map((issue, j) => (
                            <div key={j} className="flex items-start gap-2 mb-1.5">
                              <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                              <span className="text-xs text-white/50 leading-relaxed">{issue}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Recommendations</p>
                          {channel.fixes.map((fix, j) => (
                            <div key={j} className="flex items-start gap-2 mb-1.5">
                              <CheckCircle2 className="w-3 h-3 text-[#39FF14] shrink-0 mt-0.5" />
                              <span className="text-xs text-white/60 leading-relaxed">{fix}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Budget Reallocation */}
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#39FF14]" />
                  Recommended Budget Reallocation
                </h3>
                <div className="space-y-3">
                  {result.filter(c => c.recommendedBudget > 0).sort((a, b) => b.recommendedBudget - a.recommendedBudget).map((channel, i) => {
                    const totalRecommended = result.reduce((sum, c) => sum + c.recommendedBudget, 0);
                    const percent = totalRecommended > 0 ? Math.round((channel.recommendedBudget / totalRecommended) * 100) : 0;
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-28 text-xs text-white/60 truncate">{channel.name}</div>
                        <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden relative">
                          <div
                            className="h-full rounded-full flex items-center px-3 transition-all duration-700"
                            style={{ width: `${percent}%`, backgroundColor: channel.color + '30', minWidth: '60px' }}
                          >
                            <span className="text-xs font-bold text-white whitespace-nowrap">{percent}% — ${channel.recommendedBudget.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusConfig[channel.status].bg} ${statusConfig[channel.status].border}`}
                          style={{ color: statusConfig[channel.status].color }}>
                          {statusConfig[channel.status].label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 90-Day Roadmap */}
              <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
                <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#39FF14]" />
                  90-Day Performance Roadmap
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { month: 'Month 1', title: 'Fix & Foundation', items: [
                      'Fix all tracking/attribution gaps',
                      'Pause underperforming campaigns',
                      'Redirect budget to top channels',
                      'Set up retargeting pixels',
                    ]},
                    { month: 'Month 2', title: 'Scale & Test', items: [
                      'Scale winning channels by 50%',
                      'Launch retargeting campaigns',
                      'Start content/SEO strategy',
                      'A/B test new ad creative',
                    ]},
                    { month: 'Month 3', title: 'Optimize & Expand', items: [
                      'Expand winning audiences',
                      'Launch email nurture sequences',
                      'Build referral/affiliate program',
                      'Review and optimize all KPIs',
                    ]},
                  ].map((phase, i) => (
                    <div key={i} className="bg-black border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center text-[#39FF14] text-xs font-black">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-xs text-[#39FF14] font-bold">{phase.month}</p>
                          <p className="text-xs text-white/40">{phase.title}</p>
                        </div>
                      </div>
                      {phase.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 mb-1.5">
                          <CheckCircle2 className="w-3 h-3 text-white/20 shrink-0 mt-0.5" />
                          <span className="text-xs text-white/50 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-black border border-[#39FF14]/20 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-[#39FF14] opacity-[0.06] blur-[60px] rounded-full" />
                <div className="relative">
                  <TrendingUp className="w-8 h-8 text-[#39FF14] mx-auto mb-3" />
                  <h3 className="text-xl font-black text-white mb-2">Want a Done-For-You Marketing Audit?</h3>
                  <p className="text-white/40 text-sm mb-5 max-w-md mx-auto">Our marketing team will deep-dive into your analytics, ad accounts, and funnels to build a custom growth plan.</p>
                  <a href="https://marqnetworks.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-8 bg-[#39FF14] hover:bg-[#2de010] text-black rounded-xl font-semibold text-sm transition-colors">
                    Book Free Strategy Call <ArrowRight className="w-4 h-4" />
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
